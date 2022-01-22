<template>
  <div id="map" class="z-10"></div>
</template>

<script>
import {
  computed,
  onMounted,
  onUnmounted,
  toRefs,
  watch,
  watchEffect,
} from "vue";
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

    function touchHandler(e) {
      e.preventDefault();
    }
    function clickHandler(e) {
      e.stopPropagation();
    }

    onMounted(() => {
      console.log("map mounted");
      const mapDOM = document.querySelector("#map");
      // prevent trigger click twice on mobile side
      mapDOM.addEventListener("touchstart", touchHandler);
      mapDOM.addEventListener("click", clickHandler);

      const defaultPosition = {
        lat: 24.136944,
        lng: 120.684722,
      };
      map = new DrawMap();
      map.init();

      const { mapLocation } = toRefs(props);

      const innerWidth = window.innerWidth;
      if (!mapLocation.value.coords) {
        if (searchType.value === "bicycle") {
          const userPosition = store.getters.userPosition;
          store.dispatch("getNearByBikeStation", userPosition);
        }
        if (innerWidth >= 640) {
          map
            .getGeoInfo()
            .then((position) => {
              console.log("get geo info");
              const userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              store.commit("GET_USER_POSITON", userPosition);
              map.updateUserPosition(userPosition);
              store.dispatch("getCurrentDistrict", userPosition);
              if (searchType.value === "bicycle")
                store.dispatch("getNearByBikeStation", userPosition);
              emit("toggleAgreeLocation");
            })
            .catch((err) => {
              map.map.setView(defaultPosition, 18);
            });
        }
      } else {
        const userPosition = {
          lat: mapLocation.value.coords.latitude,
          lng: mapLocation.value.coords.longitude,
        };
        if (searchType.value === "bicycle")
          store.dispatch("getNearByBikeStation", userPosition);
        map.updateUserPosition(userPosition);
      }
    });

    const searchType = computed(() => store.getters.searchType);

    onUnmounted(() => {
      document.removeEventListener("touchstart", touchHandler);
      document.removeEventListener("click", clickHandler);
    });

    watch(
      [
        () => store.state.busRouteShapeData,
        () => store.state.showBusStopDirection,
        () => store.state.goToUserPosition,
        () => store.getters.bikeCardList,
        () => store.getters.goBackToMobileSearch,
      ],
      (newVals, oldVals) => {
        const userPosition = store.getters.userPosition;

        if (newVals[4] !== oldVals[4]) {
          // use mobile nav
          // update nearby bike station
          console.log("update nearby bike");
          store.dispatch("getNearByBikeStation", userPosition);
          return;
        }

        if (searchType.value === "bus" || searchType.value === "intercityBus") {
          const shapeData = newVals[0];

          const newDirection = newVals[1];
          const oldDirection = oldVals[1];

          const newUserPosition = newVals[2];
          const oldUserPosition = oldVals[2];

          if (newUserPosition !== oldUserPosition) {
            map.updateUserPosition(userPosition);
            return;
          }

          const allRouteStopsPosition = store.getters.allRouteStopsPosition;
          const allRouteBusPosition = store.getters.allRouteBusPosition;
          const toggleMoveToFirstStop = store.getters.goToFirstStop;
          const isMoveToStart =
            newDirection !== oldDirection || toggleMoveToFirstStop
              ? true
              : false;

          const routeStopData = filterRouteStopData(
            allRouteStopsPosition,
            newDirection
          );

          // draw route line
          if (shapeData[newDirection]) {
            map.drawLine(shapeData[newDirection].Geometry);
          } else {
            if (shapeData[0]) map.drawLine(shapeData[0].Geometry);
          }

          map.drawStopIcon(routeStopData, isMoveToStart);
          map.drawBusIcon(allRouteBusPosition, newDirection);
          store.commit("TOGGLE_GOTO_FIRST_STOP", false);
        }

        if (searchType.value === "bicycle") {
          const innerWidth = window.innerWidth;
          const bikeData = newVals[3];
          map.drawBikeIcon(bikeData, innerWidth, userPosition);
        }
      }
    );

    return {
      searchType,
    };
  },
};
</script>

<style scoped>
#map {
  z-index: 0;
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