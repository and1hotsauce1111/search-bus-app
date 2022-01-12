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
        :class="showGoRoute ? 'text-primary-500' : 'text-grey-100'"
        @click="showOtherRoute"
      >
        往 {{ currentBus.DestinationStopNameZh }}
      </button>
      <button
        class="right-btn px-2 py-1 w-3/6"
        :class="!showGoRoute ? 'text-primary-500' : 'text-grey-100'"
        @click="showOtherRoute"
      >
        往 {{ currentBus.DepartureStopNameZh }}
      </button>
    </div>

    <!-- card details go -->
    <div
      v-show="showGoRoute"
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
                stop.StopStatus !== 0 ||
                isNearStop(stop.EstimateTime) === 'grey',
              'text-grey-400':
                stop.StopStatus !== 0 ||
                isNearStop(stop.EstimateTime) === 'grey',
              'border-green-100': isNearStop(stop.EstimateTime) === 'green',
              'text-primary-400': isNearStop(stop.EstimateTime) === 'green',
              'border-alert-400': isNearStop(stop.EstimateTime) === 'red',
              'text-alert-400': isNearStop(stop.EstimateTime) === 'red',
            }"
          >
            {{ stopStatus(stop.StopStatus, stop.EstimateTime) }}
          </span>

          <span class="grow text-left ml-3 text-grey-500 text-sm">{{
            stop.StopName.Zh_tw
          }}</span>

          <img
            v-if="isNearStop(stop.EstimateTime) === 'grey'"
            class="light-img"
            src="@/assets/light/grey.png"
            alt="grey"
          />
          <img
            v-if="isNearStop(stop.EstimateTime) === 'green'"
            class="light-img"
            src="@/assets/light/green.png"
            alt="green"
          />
          <img
            v-if="isNearStop(stop.EstimateTime) === 'red'"
            class="light-img"
            src="@/assets/light/red.png"
            alt="red"
          />
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
      v-show="!showGoRoute"
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
                stop.StopStatus !== 0 ||
                isNearStop(stop.EstimateTime) === 'grey',
              'text-grey-400':
                stop.StopStatus !== 0 ||
                isNearStop(stop.EstimateTime) === 'grey',
              'border-green-100': isNearStop(stop.EstimateTime) === 'green',
              'text-primary-400': isNearStop(stop.EstimateTime) === 'green',
              'border-alert-400': isNearStop(stop.EstimateTime) === 'red',
              'text-alert-400': isNearStop(stop.EstimateTime) === 'red',
            }"
          >
            {{ stopStatus(stop.StopStatus, stop.EstimateTime) }}
          </span>

          <span class="grow text-left ml-3 text-grey-500 text-sm">{{
            stop.StopName.Zh_tw
          }}</span>

          <img
            v-if="isNearStop(stop.EstimateTime) === 'grey'"
            class="light-img"
            src="@/assets/light/grey.png"
            alt="grey"
          />
          <img
            v-if="isNearStop(stop.EstimateTime) === 'green'"
            class="light-img"
            src="@/assets/light/green.png"
            alt="green"
          />
          <img
            v-if="isNearStop(stop.EstimateTime) === 'red'"
            class="light-img"
            src="@/assets/light/red.png"
            alt="red"
          />
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
import { ref, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    currentBus: {
      type: Object,
      required: true,
      default: {},
    },
  },
  setup(props) {
    let msg = ref("Hello");
    let showGoRoute = ref(true);
    const store = useStore();
    const { currentBus } = toRefs(props);
    const routeStops = store.getters.busStopOfRoute;
    const goRouteStops = routeStops[0].Stops || [];
    const backRouteStops = routeStops[1].Stops || [];
    const bufferZone =
      store.getters.fareBufferZoneDescriptionZh(currentBus.value.RouteUID) ||
      [];

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

    function isNearStop(estimateTime) {
      if (estimateTime === undefined) return "grey";
      const min = Math.floor(estimateTime / 60);
      return min <= 5 ? "red" : "green";
    }

    function showOtherRoute() {
      showGoRoute.value = !showGoRoute.value;
    }

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
    };
  },
};
</script>

<style scoped>
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

@media (min-width: 768px) {
  .detail-container {
    max-height: 38.85rem;
  }
  .light-img {
    width: 1rem;
  }
}
</style>