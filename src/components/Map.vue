<template>
  <div id="map" class="z-10"></div>
</template>

<script>
import { onMounted, toRefs, watch, ref } from "vue";
import DrawMap from "@/utils/drawMap";
import { useStore } from "vuex";

export default {
  name: "Map",
  props: {
    mapLocation: {
      type: Object,
      required: true,
      default: {},
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const mapInstance = ref(null);

    onMounted(() => {
      const defaultPosition = [24.136944, 120.684722];
      const map = new DrawMap();
      mapInstance.value = map;
      const { mapLocation } = toRefs(props);

      map.init();
      const innerWidth = window.innerWidth;
      if (!mapLocation.value.coords) {
        if (innerWidth >= 640) {
          map
            .getGeoInfo()
            .then((position) => {
              map.updateUserPosition(position.coords);
              store.dispatch("getCurrentDistrict", position.coords);
              store.dispatch("getNearByBus", position.coords);
              emit("toggleAgreeLocation");
            })
            .catch((err) => {
              map.map.setView(defaultPosition, 18);
            });
        }
      } else {
        map.updateUserPosition(mapLocation.value.coords);
      }
    });

    watch(
      () => store.getters.busRouteShapeData,
      (busRouteShapeData) => {
        // direction 0 or 1
        mapInstance.value.drawLine(busRouteShapeData[0].Geometry);
      }
    );

    return {
      mapInstance,
    };
  },
};
</script>

<style scoped>
#map {
  height: calc(100vh - 5.56rem);
  margin-top: 3.06rem;
}

@media (min-width: 768px) {
  #map {
    height: calc(100vh - 8.125rem);
    margin-top: 0;
  }
}
</style>