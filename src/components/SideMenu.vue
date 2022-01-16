<template>
  <div
    ref="sideMenuContainer"
    class="
      sideMenu-container
      fixed
      w-screen
      z-50
      transition-all
      duration-300
      md:rounded-lg md:bg-grey-100 md:left-8
    "
    :class="sideMenuClassObject"
  >
    <SearchBar
      :isSearching="isSearching"
      :isSlideUp="isSlideUp"
      :searchType="searchType"
      :toggleKeyBoard="sideMenuState.toggleKeyBoard"
      :currentBus="sideMenuState.currentBus"
      @toggle-slide-menu="toggleSlideMenu"
    />
    <!-- show search bus result -->
    <div v-show="showSearchBusList" class="show-bus-cardlist">
      <BusCardList
        ref="cardListContainer"
        :toggleKeyBoard="sideMenuState.toggleKeyBoard"
        @go-to-route-stops="goToRouteStops"
      />
      <KeyBoard
        class="md:hidden"
        :toggleKeyBoard="sideMenuState.toggleKeyBoard"
        :searchType="searchType"
        @change-max-height="changeMaxHeight"
      />
    </div>
    <!-- show search bus details -->
    <div v-if="showSearchBusDetails" class="show-bus-carddetail">
      <BusCardDetails :currentBus="sideMenuState.currentBus" />
    </div>
    <div
      v-if="showSearchBusDetails"
      class="
        fixed
        top-14
        left-4
        w-9
        h-9
        back-to-search-btn
        cursor-pointer
        bg-grey-100
        rounded-full
        flex
        justify-center
        items-center
        md:hidden
      "
      @click="backToSearch"
    >
      <i class="fas fa-angle-left"></i>
    </div>
    <!-- search bicycle -->
    <BicycleCard v-if="isSearching && searchType === 'bicycle'" />

    <!-- geo location icon -->
    <div
      class="
        absolute
        -top-2
        right-6
        geo-icon
        w-12
        h-12
        rounded-full
        bg-grey-100
        flex
        justify-center
        items-center
        text-lg
        cursor-pointer
        md:w-14
        md:h-14
        md:bg-primary-400
        md:text-grey-100
        md:z-10
        md:top-0
        md:-right-20
        md:text-xl
      "
      @click="goToUserPosition"
    >
      <i class="fas fa-crosshairs"></i>
    </div>
  </div>
</template>

<script>
import KeyBoard from "@/components/KeyBoard.vue";
import BusCardList from "@/components/card/BusCardList.vue";
import SearchBar from "@/components/search/SearchBar.vue";
import BusCardDetails from "@/components/card/BusCardDetails.vue";
import BicycleCard from "@/components/card/BicycleCard.vue";
import { onUnmounted, reactive, ref, toRefs, watch, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    searchType: {
      type: String,
      required: true,
      default: "bus",
    },
  },
  components: {
    KeyBoard,
    BusCardList,
    SearchBar,
    BusCardDetails,
    BicycleCard,
  },
  setup(props, { emit }) {
    const sideMenuState = reactive({
      currentBus: {},
      inputValue: "",
      toggleKeyBoard: true,
    });
    const { searchType } = toRefs(props);
    const cardListContainer = ref(null);
    const sideMenuContainer = ref(null);
    let isSlideUp = ref(false);
    const store = useStore();

    // key functions

    function backToSearch() {
      store.commit("CHANGE_SEARCHING_STATUS");
      store.commit("TOGGLE_CLEAR_ALL_GEOJSON_LAYER", true);
      // change sideMenu top 3.06rem
      resetSideMenuContainerHeight("3.06rem");
    }

    function goToRouteStops(bus) {
      sideMenuState.currentBus = bus;
      // emit to close mobile home
      emit("closeMobileHome");
    }

    function goToUserPosition() {
      store.commit("TOGGLE_GOTO_USER_POSITION");
    }

    // custom styles
    window.addEventListener("resize", resizeSideMenu);

    function changeMaxHeight() {
      sideMenuState.toggleKeyBoard = !sideMenuState.toggleKeyBoard;
    }

    function resetSideMenuContainerHeight(top) {
      const container = sideMenuContainer.value;
      const innerWidth = window.innerWidth;
      if (container && innerWidth < 640) container.style.top = top;
      isSlideUp.value = false;
    }

    function resizeSideMenu() {
      const container = sideMenuContainer.value;
      const isNotSearch = container.classList.contains("not-search");
      const isSearchBus = container.classList.contains("search-bus");
      const isSearchBicycle = container.classList.contains("search-bicycle");
      const innerWidth = window.innerWidth;

      if (!container) return;
      // searching
      if (isSearchBus && innerWidth >= 768) container.style.top = "7rem";
      if (isSearchBus && innerWidth < 640) container.style.top = "3.06rem";
      // not searching or search bicycle
      if ((isNotSearch || isSearchBicycle) && window.innerWidth >= 768)
        container.style.top = "7rem";
      if ((isNotSearch || isSearchBicycle) && window.innerWidth < 640)
        container.style.top = "70%";
    }

    function toggleSlideMenu() {
      isSlideUp.value = !isSlideUp.value;
      const container = sideMenuContainer.value;
      if (container && isSlideUp.value) {
        container.style.top = "15%";
      } else {
        container.style.top = "75%";
      }
    }

    // watch and computed
    watch(
      () => sideMenuState.toggleKeyBoard,
      (newVal) => {
        // change cardlist maxheight when toggle keyboard
        const container = cardListContainer.value.$refs.cardContainer;
        if (!newVal) {
          container.style.maxHeight = "calc(100vh - 5.56rem)";
        } else {
          container.style.maxHeight = "calc(100vh - 22rem)";
        }
      }
    );

    watch(
      () => store.getters.isChangeSideMenuHeight,
      (newVal) => {
        resetSideMenuContainerHeight("75%");
        store.commit("CHANGE_SEARCHING_STATUS");
      }
    );

    const isSearching = computed(() => store.getters.isSearching);

    const sideMenuClassObject = computed(() => {
      return {
        "bg-primary-100":
          isSearching.value &&
          (searchType.value === "bus" || searchType.value === "intercityBus"),
        "search-bicycle": isSearching.value && searchType.value === "bicycle",
        "search-bus":
          isSearching.value &&
          (searchType.value === "bus" || searchType.value === "intercityBus"),
        "bg-grey-100": !isSearching.value || searchType.value === "bicycle",
        "rounded-t-2xl": !isSearching.value || searchType.value === "bicycle",
        "top-3/4": !isSearching.value || searchType.value === "bicycle",
        "not-search": !isSearching.value,
      };
    });

    const showSearchBusList = computed(
      () =>
        isSearching.value &&
        (searchType.value === "bus" || searchType.value === "intercityBus")
    );

    const showSearchBusDetails = computed(
      () =>
        !isSearching.value &&
        (searchType.value === "bus" || searchType.value === "intercityBus")
    );

    const searchInputValue = computed(() => store.getters.searchInputValue);

    onUnmounted(() => {
      window.removeEventListener("resize", resizeSideMenu);
    });

    return {
      backToSearch,
      changeMaxHeight,
      cardListContainer,
      goToRouteStops,
      goToUserPosition,
      isSearching,
      isSlideUp,
      searchType,
      sideMenuState,
      sideMenuContainer,
      sideMenuClassObject,
      showSearchBusList,
      showSearchBusDetails,
      searchInputValue,
      toggleSlideMenu,
    };
  },
};
</script>

<style scoped>
.sideMenu-container.search-bus {
  height: calc(100vh - 3.06rem);
  top: 3.06rem;
}
.sideMenu-container.not-search,
.sideMenu-container.search-bicycle {
  height: calc(100vh - 3.06rem);
  top: 70%;
}
.search_input--block {
  left: 0;
}
input {
  border-radius: 3.81rem;
}

@media (min-width: 768px) {
  .sideMenu-container.search-bus,
  .sideMenu-container.not-search,
  .sideMenu-container.search-bicycle {
    margin-top: 0;
    max-width: 26.7rem;
    max-height: 45.85rem;
    top: 7rem;
  }
  input {
    border-radius: 0.5rem;
    width: 17rem;
  }
}
</style>