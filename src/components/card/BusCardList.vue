<template>
  <!-- bus card -->
  <div
    ref="cardContainer"
    class="
      card_container--block
      w-full
      px-5
      overflow-scroll
      no-scrollbar
      duration-300
      rounded-lg
      md:px-8 md:mx-0
    "
  >
    <div v-if="renderBusList.length" class="card-wrapper">
      <div
        class="
          card
          py-3
          px-5
          mb-5
          h-20
          bg-grey-100
          rounded-lg
          relative
          shadow-md
          cursor-pointer
          md:shadow-none
          md:py-0
          md:px-0
          md:border-b
          md:border-grey-300
          md:rounded-none
          md:last:border-0
        "
        v-for="bus in renderBusList"
        :key="bus.RouteUID"
      >
        <div class="bus-info" @click.stop="goToRouteStops(bus)">
          <div class="bus-num flex items-center justify-between mb-2">
            <div class="flex items-center justify-between">
              <span
                class="
                  route-name
                  font-bold
                  text-lg
                  pr-2
                  overflow-hidden
                  text-ellipsis
                  whitespace-nowrap
                "
                >{{ bus.RouteName.Zh_tw }}</span
              >
              <span
                v-if="bus.City"
                class="
                  rounded-lg
                  bg-primary-400
                  text-xs
                  px-1.5
                  py-0.5
                  text-grey-100
                  inline-block
                "
                >{{ currentCity }}</span
              >
            </div>
            <i class="fas fa-angle-right text-grey-500"></i>
          </div>
          <div class="bus-station flex justify-between items-center">
            <span class="start text-sm text-grey-500">{{
              bus.DepartureStopNameZh
            }}</span>
            <span
              class="
                separate-line
                h-px
                inline-block
                grow
                bg-grey-500
                mx-3.5
                relative
              "
            ></span>
            <span class="end text-sm text-grey-500">{{
              bus.DestinationStopNameZh
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- no result -->
    <div
      v-else
      class="no-search-result flex justify-center items-center flex-wrap"
    >
      <img
        src="@/assets/search/no-result.png"
        alt="no-result"
        class="w-3/4 flex-full"
      />
      <p class="flex-full mt-3 text-grey-500 text-md hidden md:block">
        輸入公車路線或站牌找看看吧！
      </p>
      <p class="flex-full mt-3 text-grey-500 text-xm md:hidden">
        點選下面鍵盤搜尋客運路線吧！
      </p>
    </div>
  </div>
</template>

<script>
import { computed, onUnmounted, ref, toRefs } from "vue";
import { useStore } from "vuex";
import getCityNameZh from "@/utils/getCityNameZh";

export default {
  name: "BusCardList",
  props: {
    toggleKeyBoard: {
      type: Boolean,
      required: true,
    },
    searchType: {
      type: String,
      required: true,
      default: "bus",
    },
  },
  setup(props, { emit }) {
    const cardContainer = ref(null);
    const { toggleKeyBoard, searchType } = toRefs(props);
    const store = useStore();

    const renderBusList = computed(() => {
      return store.getters.busCardList || [];
    });

    function adjustMaxHeight() {
      if (!cardContainer.value) return;
      if (cardContainer.value && window.innerWidth >= 768) {
        cardContainer.value.style.maxHeight = "38.85rem";
      } else if (toggleKeyBoard.value && window.innerWidth < 768) {
        cardContainer.value.style.maxHeight = "calc(100vh - 22rem)";
      } else {
        cardContainer.value.style.maxHeight = "calc(100vh - 5.56rem)";
      }
    }

    function goToRouteStops(bus) {
      let searchInfo = {};

      store.commit("CHANGE_SEARCHING_STATUS");
      if (searchType.value === "bus") {
        const currentCity = store.getters.currentDistrict;
        searchInfo = {
          type: "bus",
          city: currentCity,
          changeSideMenuHeight: true,
          currentSelectedRoute: bus,
          routeName: bus.RouteName.Zh_tw,
        };
      }

      if (searchType.value === "intercityBus") {
        searchInfo = {
          type: "intercityBus",
          changeSideMenuHeight: true,
          currentSelectedRoute: bus,
          routeName: bus.RouteName.Zh_tw,
        };
      }
      store.dispatch("getBusDisplayOfRouteStops", searchInfo);
      store.commit("TOGGLE_GOTO_FIRST_STOP", true);
      emit("goToRouteStops", bus);
    }

    const currentCity = computed(() => {
      const city = store.state.currentDistrict;
      return getCityNameZh(city) || "";
    });

    window.addEventListener("resize", adjustMaxHeight);

    onUnmounted(() => {
      window.removeEventListener("resize", adjustMaxHeight);
    });

    return {
      currentCity,
      cardContainer,
      goToRouteStops,
      renderBusList,
      searchType,
      toggleKeyBoard,
    };
  },
};
</script>

<style scoped>
.card_container--block {
  padding-top: 4.25rem;
  max-height: calc(100vh - 22rem);
}
.separate-line::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background: #767676;
}
.separate-line::after {
  content: "";
  position: absolute;
  right: 0;
  top: -1px;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background: #767676;
}
.route-name {
  max-width: 235px;
}
@media (min-width: 768px) {
  .card_container--block {
    padding-top: 2rem;
    max-height: 38.85rem;
  }
  .route-name {
    max-width: 290px;
  }
}
</style>