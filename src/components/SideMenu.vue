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
      :isSearching="sideMenuState.isSearching"
      :searchType="searchType"
      :searchInputValue="sideMenuState.inputValue"
      :toggleKeyBoard="sideMenuState.toggleKeyBoard"
      @toggle-slide-menu="toggleSlideMenu"
    />
    <!-- show search bus result -->
    <div v-if="showSearchBusList" class="show-bus-cardlist">
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
        @input-value="keyboardInput"
      />
    </div>
    <!-- show search bus details -->
    <div v-if="showSearchBusDetails" class="show-bus-carddetail">
      <BusCardDetails
        :currentRouteUID="sideMenuState.currentRoutUID"
        :currentRouteName="sideMenuState.currentRouteName"
      />
    </div>
    <!-- search bicycle -->
    <BicycleCard v-if="sideMenuState.isSearching && searchType === 'bicycle'" />
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
  setup(props) {
    const sideMenuState = reactive({
      currentRoutUID: "",
      currentRouteName: "",
      // isSearching: true,
      inputValue: "",
      toggleKeyBoard: true,
    });
    const { searchType } = toRefs(props);
    const cardListContainer = ref(null);
    const sideMenuContainer = ref(null);
    const store = useStore();
    const isSearching = store.state.isSearching;

    // key functions

    function keyboardInput(inputValue) {
      sideMenuState.inputValue = inputValue;
      const currentCity = store.getters.currentDistrict;
      if (inputValue === "") {
        store.commit("CLEAR_BUSLIST");
        return;
      }
      const searchInput = {
        city: currentCity,
        keyword: inputValue,
      };
      store.dispatch("getBusByKeyword", searchInput);
    }

    function goToRouteStops({ routeName, routeUID }) {
      sideMenuState.currentRoutUID = routeUID;
      sideMenuState.currentRouteName = routeName;
      sideMenuState.isSearching = !sideMenuState.isSearching;
    }

    // custom styles
    window.addEventListener("resize", resizeSideMenu);

    function changeMaxHeight() {
      sideMenuState.toggleKeyBoard = !sideMenuState.toggleKeyBoard;
    }

    function toggleSlideMenu(isSlide) {
      const container = sideMenuContainer.value;
      if (container && isSlide) {
        container.style.top = "15%";
      } else {
        container.style.top = "75%";
      }
    }

    function resizeSideMenu() {
      const container = sideMenuContainer.value;
      const isNotSearch = container.classList.contains("not-search");
      const isSearchBus = container.classList.contains("search-bus");
      const isSearchBicycle = container.classList.contains("search-bicycle");

      if (!container || isSearchBus) return;
      if (
        container &&
        (isNotSearch || isSearchBicycle) &&
        window.innerWidth >= 768
      ) {
        container.style.top = "7rem";
      } else {
        container.style.top = "70%";
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

    const sideMenuClassObject = computed(() => {
      return {
        "bg-primary-100":
          sideMenuState.isSearching &&
          (searchType.value === "bus" || searchType.value === "intercityBus"),
        "search-bicycle":
          sideMenuState.isSearching && searchType.value === "bicycle",
        "search-bus":
          sideMenuState.isSearching &&
          (searchType.value === "bus" || searchType.value === "intercityBus"),
        "bg-grey-100":
          !sideMenuState.isSearching || searchType.value === "bicycle",
        "rounded-t-2xl":
          !sideMenuState.isSearching || searchType.value === "bicycle",
        "top-3/4": !sideMenuState.isSearching || searchType.value === "bicycle",
        "not-search": !sideMenuState.isSearching,
      };
    });

    const showSearchBusList = computed(
      () =>
        sideMenuState.isSearching &&
        (searchType.value === "bus" || searchType.value === "intercityBus")
    );

    const showSearchBusDetails = computed(
      () =>
        !sideMenuState.isSearching &&
        (searchType.value === "bus" || searchType.value === "intercityBus")
    );

    onUnmounted(() => {
      window.removeEventListener("resize", resizeSideMenu);
    });

    return {
      changeMaxHeight,
      cardListContainer,
      goToRouteStops,
      isSearching,
      keyboardInput,
      searchType,
      sideMenuState,
      sideMenuContainer,
      sideMenuClassObject,
      showSearchBusList,
      showSearchBusDetails,
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