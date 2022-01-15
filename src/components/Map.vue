<template>
  <div id="map" class="z-10"></div>
</template>

<script>
import { onMounted, toRefs, watch, ref } from "vue";
import { useStore } from "vuex";
import DrawMap from "@/utils/drawMap";
import { filterRouteStopPositionData } from "@/utils/mappingData.js";

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
      [
        () => store.getters.busRouteShapeData,
        () => store.getters.showBusStopDirection,
        () => store.getters.clearAllGeoJSONLayer,
      ],
      (newVals) => {
        const shapeData = newVals[0];
        const direction = newVals[1];
        const clearGeoJSONLayer = newVals[2];
        if (clearGeoJSONLayer) mapInstance.value.removeGeoJSONLayer();
        const allRouteStopsPosition = store.getters.allRouteStopsPosition;
        const filteredShapeData = filterRouteStopPositionData(
          allRouteStopsPosition,
          direction
        );
        if (shapeData[direction]) {
          mapInstance.value.drawLine(shapeData[direction].Geometry);
        } else {
          mapInstance.value.drawLine(shapeData[0].Geometry);
        }
        mapInstance.value.drawBusStopIcon(filteredShapeData);
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