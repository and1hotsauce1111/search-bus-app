<template>
  <div id="map" class="z-10"></div>
</template>

<script>
import { onMounted, toRefs, watch, ref } from "vue";
import { useStore } from "vuex";
import DrawMap from "@/utils/drawMap";
import { filterRouteStopData } from "@/utils/mappingData.js";

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
    let map = null;

    onMounted(() => {
      const defaultPosition = [24.136944, 120.684722];
      map = new DrawMap();
      map.init();

      const { mapLocation } = toRefs(props);

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
              map.setView(defaultPosition, 18);
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
      ],
      (newVals, oldVals) => {
        map.removeLayer();
        const shapeData = newVals[0];
        const newDirection = newVals[1];
        const oldDirection = oldVals[1];
        const toggleMoveToFirstStop = store.getters.goToFirstStop;
        const isMoveToStart =
          newDirection !== oldDirection || toggleMoveToFirstStop ? true : false;
        const allRouteStopsPosition = store.getters.allRouteStopsPosition;
        const routeStopData = filterRouteStopData(
          allRouteStopsPosition,
          newDirection
        );
        // draw route line
        if (shapeData[newDirection]) {
          map.drawLine(shapeData[newDirection].Geometry, isMoveToStart);
        } else {
          map.drawLine(shapeData[0].Geometry, isMoveToStart);
        }
        map.drawStopIcon(routeStopData, "stop");
        store.commit("TOGGLE_GOTO_FIRST_STOP", false);
      }
    );

    return {};
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