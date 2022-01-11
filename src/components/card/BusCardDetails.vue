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
      v-if="showGoRoute"
      class="card-details-block px-4 pt-3 md:px-8 md:pt-7"
    >
      <div v-for="stop in goRouteStops" :key="stop.StopUID">
        <div class="detail flex justify-between items-center mb-4">
          <!-- <span
            class="
              status
              px-3
              py-2
              border
              rounded-lg
              border-grey-400
              text-grey-400 text-xm text-center
              font-bold
            "
            >{{ stopStatus(stop.StopStatus) }}</span
          > -->
          <!-- <span
            v-else
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
              'border-green-100': card.light === 'green',
              'border-alert-400': card.light === 'red',
              'text-primary-400': card.countDown > 5,
              'text-alert-400': card.countDown <= 5,
            }"
            >{{ card.countDown + "分" }}</span
          > -->
          <span class="grow text-left ml-3 text-grey-500 text-sm">{{
            stop.StopName.Zh_tw
          }}</span>

          <!-- <Popper v-if="card.light === 'grey'" arrow placement="left">
            <button>
              <img class="light-img" src="@/assets/light/grey.png" alt="grey" />
            </button>
            <template #content>
              <div>{{ msg }}</div>
            </template>
          </Popper>
          <Popper v-if="card.light === 'green'" arrow placement="left">
            <button>
              <img
                class="light-img"
                src="@/assets/light/green.png"
                alt="green"
              />
            </button>
            <template #content>
              <div>{{ msg }}</div>
            </template>
          </Popper>
          <Popper v-if="card.light === 'red'" arrow placement="left">
            <button>
              <img class="light-img" src="@/assets/light/red.png" alt="red" />
            </button>
            <template #content>
              <div>{{ msg }}</div>
            </template>
          </Popper> -->
        </div>
        <div
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
    <div v-else class="card-details-block px-4 pt-3 md:px-8 md:pt-7">
      <div v-for="stop in backRouteStops" :key="stop.StopUID">
        <div class="detail flex justify-between items-center mb-4">
          <!-- <span
            class="
              status
              px-3
              py-2
              border
              rounded-lg
              border-grey-400
              text-grey-400 text-xm text-center
              font-bold
            "
            >{{ stopStatus(stop.StopStatus) }}</span
          > -->
          <!-- <span
            v-else
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
              'border-green-100': card.light === 'green',
              'border-alert-400': card.light === 'red',
              'text-primary-400': card.countDown > 5,
              'text-alert-400': card.countDown <= 5,
            }"
            >{{ card.countDown + "分" }}</span
          > -->
          <span class="grow text-left ml-3 text-grey-500 text-sm">{{
            stop.StopName.Zh_tw
          }}</span>

          <!-- <Popper v-if="card.light === 'grey'" arrow placement="left">
            <button>
              <img class="light-img" src="@/assets/light/grey.png" alt="grey" />
            </button>
            <template #content>
              <div>{{ msg }}</div>
            </template>
          </Popper>
          <Popper v-if="card.light === 'green'" arrow placement="left">
            <button>
              <img
                class="light-img"
                src="@/assets/light/green.png"
                alt="green"
              />
            </button>
            <template #content>
              <div>{{ msg }}</div>
            </template>
          </Popper>
          <Popper v-if="card.light === 'red'" arrow placement="left">
            <button>
              <img class="light-img" src="@/assets/light/red.png" alt="red" />
            </button>
            <template #content>
              <div>{{ msg }}</div>
            </template>
          </Popper> -->
        </div>
        <div
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
    const bufferZone = store.getters.fareBufferZoneDescriptionZh(
      currentBus.value.RouteUID
    );

    function stopStatus(status) {
      var currentStatus = "";
      switch (status) {
        case 0:
          currentStatus = "正常";
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

    function showOtherRoute() {
      showGoRoute.value = !showGoRoute.value;
    }

    return {
      bufferZone,
      backRouteStops,
      currentBus,
      goRouteStops,
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