<template>
  <div class="detail-container overflow-scroll no-scrollbar relative">
    <div
      class="
        sticky
        top-0
        left-0
        w-full
        change-direction
        flex
        justify-between
        items-center
        bg-primary-200
        px-5
        py-1
      "
    >
      <button
        class="left-btn px-2 py-1 w-3/6"
        :class="showGoRoute === 0 ? 'text-primary-500' : 'text-grey-100'"
        @click="showOtherRoute(0)"
      >
        往 {{ currentBus.DestinationStopNameZh }}
      </button>
      <button
        class="right-btn px-2 py-1 w-3/6"
        :class="showGoRoute === 1 ? 'text-primary-500' : 'text-grey-100'"
        @click="showOtherRoute(1)"
      >
        往 {{ currentBus.DepartureStopNameZh }}
      </button>
    </div>

    <!-- card details go -->
    <div
      v-show="showGoRoute === 0"
      class="card-details-block px-4 pt-3 md:px-8 md:pt-7"
    >
      <div v-for="stop in goRouteStops" :key="stop.StopUID">
        <div
          v-if="bufferZone.length && bufferZone[0] === stop.StopName.Zh_tw"
          class="
            buffer
            bg-primary-100
            text-primary-400
            w-full
            text-center text-xm
            py-0.5
            mb-4
            rounded-lg
          "
        >
          緩衝區
        </div>
        <div class="detail flex justify-between items-center mb-4">
          <span
            class="
              status
              px-3
              py-2
              border
              rounded-lg
              text-xm text-center
              font-bold
            "
            :class="{
              'border-grey-400':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'grey',
              'text-grey-400':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'grey',
              'border-green-100':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'green',
              'text-primary-400':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'green',
              'border-alert-400':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'red',
              'text-alert-400':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'red',
            }"
          >
            {{ stopStatus(stop.StopStatus, stop.EstimateTime) }}
          </span>

          <span class="grow text-left ml-3 text-grey-500 text-sm">{{
            stop.StopName.Zh_tw
          }}</span>

          <div class="light-container relative">
            <img
              v-if="isNearStop(stop.StopStatus, stop.EstimateTime) === 'grey'"
              class="light-img"
              src="@/assets/light/grey.png"
              alt="grey"
            />
            <img
              v-if="isNearStop(stop.StopStatus, stop.EstimateTime) === 'green'"
              class="light-img"
              src="@/assets/light/green.png"
              alt="green"
            />
            <img
              v-if="isNearStop(stop.StopStatus, stop.EstimateTime) === 'red'"
              class="light-img"
              src="@/assets/light/red.png"
              alt="red"
            />
            <!-- show nearby bus -->
            <div
              v-if="stop.NearByBus"
              class="
                nearby-bus
                text-grey-100 text-xs
                bg-primary-400
                rounded
                py-1
                px-1.5
                absolute
                right-7
                -top-1.5
              "
            >
              <div
                class="nearby-bus-items flex justify-between items-center"
                v-for="bus in stop.NearByBus"
                :key="bus.PlateNumb"
              >
                <i
                  v-if="bus.VehicleType === 1"
                  class="fas fa-wheelchair text-xs"
                ></i>
                <span class="whitespace-nowrap ml-1.5">{{
                  bus.PlateNumb
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="bufferZone.length && bufferZone[1] === stop.StopName.Zh_tw"
          class="
            buffer
            bg-primary-100
            text-primary-400
            w-full
            text-center text-xm
            py-0.5
            mb-4
            rounded-lg
          "
        >
          緩衝區
        </div>
      </div>
    </div>

    <!-- card details back -->
    <div
      v-show="showGoRoute === 1"
      class="card-details-block px-4 pt-3 md:px-8 md:pt-7"
    >
      <div v-for="stop in backRouteStops" :key="stop.StopUID">
        <div
          v-if="bufferZone.length && bufferZone[1] === stop.StopName.Zh_tw"
          class="
            buffer
            bg-primary-100
            text-primary-400
            w-full
            text-center text-xm
            py-0.5
            mb-4
            rounded-lg
          "
        >
          緩衝區
        </div>
        <div class="detail flex justify-between items-center mb-4">
          <span
            class="
              status
              px-3
              py-2
              border
              rounded-lg
              text-xm text-center
              font-bold
            "
            :class="{
              'border-grey-400':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'grey',
              'text-grey-400':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'grey',
              'border-green-100':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'green',
              'text-primary-400':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'green',
              'border-alert-400':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'red',
              'text-alert-400':
                isNearStop(stop.StopStatus, stop.EstimateTime) === 'red',
            }"
          >
            {{ stopStatus(stop.StopStatus, stop.EstimateTime) }}
          </span>

          <span class="grow text-left ml-3 text-grey-500 text-sm">{{
            stop.StopName.Zh_tw
          }}</span>

          <div class="light-container relative">
            <img
              v-if="isNearStop(stop.StopStatus, stop.EstimateTime) === 'grey'"
              class="light-img"
              src="@/assets/light/grey.png"
              alt="grey"
            />
            <img
              v-if="isNearStop(stop.StopStatus, stop.EstimateTime) === 'green'"
              class="light-img"
              src="@/assets/light/green.png"
              alt="green"
            />
            <img
              v-if="isNearStop(stop.StopStatus, stop.EstimateTime) === 'red'"
              class="light-img"
              src="@/assets/light/red.png"
              alt="red"
            />
            <!-- show nearby bus -->
            <div
              v-if="stop.NearByBus"
              class="
                nearby-bus
                text-grey-100 text-xs
                bg-primary-400
                rounded
                py-1
                px-1.5
                absolute
                right-7
                -top-1.5
              "
            >
              <div
                class="nearby-bus-items flex justify-between items-center"
                v-for="bus in stop.NearByBus"
                :key="bus.PlateNumb"
              >
                <i
                  v-if="bus.VehicleType === 1"
                  class="fas fa-wheelchair text-xs"
                ></i>
                <span class="whitespace-nowrap ml-1.5">{{
                  bus.PlateNumb
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="bufferZone.length && bufferZone[0] === stop.StopName.Zh_tw"
          class="
            buffer
            bg-primary-100
            text-primary-400
            w-full
            text-center text-xm
            py-0.5
            mb-4
            rounded-lg
          "
        >
          緩衝區
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onUnmounted, ref, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    currentBus: {
      type: Object,
      required: true,
      default: {},
    },
    searchType: {
      type: String,
      required: true,
      default: "bus",
    },
  },
  setup(props) {
    let msg = ref("Hello");
    let showGoRoute = ref(0);
    const store = useStore();
    const { currentBus, searchType } = toRefs(props);

    function isNearStop(status, estimateTime) {
      if (estimateTime === undefined || status !== 0) return "grey";
      const min = Math.floor(estimateTime / 60);
      return min <= 5 ? "red" : "green";
    }

    function stopStatus(status, estimateTime) {
      var currentStatus = "";
      switch (status) {
        case 0:
          if (estimateTime !== undefined) {
            const min = Math.floor(estimateTime / 60);
            if (min <= 3) {
              currentStatus = "即將進站";
            } else {
              currentStatus = Math.floor(estimateTime / 60) + "分";
            }
          }
          break;
        case 1:
          currentStatus = "尚未發車";
          break;
        case 2:
          currentStatus = "此站不停";
          break;
        case 3:
          currentStatus = "末班車已過";
          break;
        case 4:
          currentStatus = "今日未營運";
          break;
      }

      return currentStatus;
    }

    function showOtherRoute(cur) {
      if (cur === showGoRoute.value) return;
      showGoRoute.value === 0
        ? (showGoRoute.value = 1)
        : (showGoRoute.value = 0);
      store.commit("TOGGLE_SHOW_BUS_STOP_DIRECTION", showGoRoute.value);
    }

    const goRouteStops = computed(() =>
      store.getters.busStopOfRoute[0]
        ? store.getters.busStopOfRoute[0].Stops
        : []
    );
    const backRouteStops = computed(() => {
      if (store.getters.busStopOfRoute[1]) {
        return store.getters.busStopOfRoute[1].Stops;
      } else if (store.getters.busStopOfRoute[0]) {
        return store.getters.busStopOfRoute[0].Stops;
      } else {
        return [];
      }
    });
    const bufferZone = computed(
      () =>
        store.getters.fareBufferZoneDescriptionZh(currentBus.value.RouteUID) ||
        []
    );

    const intervalID = setInterval(() => {
      let searchInfo = {};
      if (searchType.value === "bus") {
        searchInfo = {
          type: "bus",
          city: currentBus.value.City,
          currentSelectedRoute: currentBus.value,
          changeSideMenuHeight: false,
          routeName: currentBus.value.RouteName.Zh_tw,
        };
      }

      if (searchType.value === "intercityBus") {
        searchInfo = {
          type: "intercityBus",
          currentSelectedRoute: currentBus.value,
          changeSideMenuHeight: false,
          routeName: currentBus.value.RouteName.Zh_tw,
        };
      }

      store.dispatch("getBusDisplayOfRouteStops", searchInfo);
    }, 20000);

    onUnmounted(() => {
      clearInterval(intervalID);
    });

    return {
      bufferZone,
      backRouteStops,
      currentBus,
      goRouteStops,
      isNearStop,
      msg,
      stopStatus,
      showGoRoute,
      showOtherRoute,
      searchType,
    };
  },
};
</script>

<style scoped>
.change-direction {
  z-index: 99;
}
.detail-container {
  max-height: calc(100vh - 10rem);
}
.left-btn::after {
  position: absolute;
  content: "";
  width: 1px;
  height: 45%;
  left: 50%;
  top: 25%;
  background: #fff;
}
.status {
  min-width: 4.5rem;
}
.nearby-bus::before {
  position: absolute;
  right: -8px;
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5.5px 0 5.5px 9.5px;
  border-color: transparent transparent transparent #4ea476;
}

@media (min-width: 768px) {
  .detail-container {
    max-height: 38.85rem;
  }
  .light-img {
    width: 1rem;
  }
}
</style>