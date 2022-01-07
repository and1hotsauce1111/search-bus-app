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
      :searchType="searchType"
      @toggleSlideMenu="toggleSlideMenu"
    />
    <!-- show search bus result -->
    <div v-if="isSearching && searchType === 'bus'" class="show-bus-cardlist">
      <BusCardList ref="cardListContainer" :toggleKeyBoard="toggleKeyBoard" />
      <KeyBoard
        class="md:hidden"
        :toggleKeyBoard="toggleKeyBoard"
        @changeMaxHeight="changeMaxHeight"
      />
    </div>
    <!-- show search bus details -->
    <div
      v-if="!isSearching && searchType === 'bus'"
      class="show-bus-carddetail"
    >
      <BusCardDetails />
    </div>
    <!-- search bicycle -->
    <BicycleCard v-if="isSearching && searchType === 'bicycle'" />
  </div>
</template>

<script>
import KeyBoard from "@/components/KeyBoard.vue";
import BusCardList from "@/components/card/BusCardList.vue";
import SearchBar from "@/components/search/SearchBar.vue";
import BusCardDetails from "@/components/card/BusCardDetails.vue";
import BicycleCard from "@/components/card/BicycleCard.vue";
import { onUnmounted, ref, toRefs, watch } from "vue";

export default {
  components: {
    KeyBoard,
    BusCardList,
    SearchBar,
    BusCardDetails,
    BicycleCard,
  },
  setup() {
    let isSearching = ref(true);
    let searchType = ref("bus");
    let toggleKeyBoard = ref(true);
    const cardListContainer = ref(null);
    const sideMenuContainer = ref(null);

    // key functions

    function searchRoute() {
      toggleKeyBoard.value = false;
    }

    // custom styles
    window.addEventListener("resize", resizeSideMenu);
    const sideMenuClassObject = {
      "bg-primary-100": isSearching.value && searchType.value === "bus",
      "search-bicycle": isSearching.value && searchType.value === "bicycle",
      "search-bus": isSearching.value && searchType.value === "bus",
      "bg-grey-100": !isSearching.value || searchType.value === "bicycle",
      "rounded-t-2xl": !isSearching.value || searchType.value === "bicycle",
      "top-3/4": !isSearching.value || searchType.value === "bicycle",
      "not-search": !isSearching.value,
    };

    function changeMaxHeight() {
      toggleKeyBoard.value = !toggleKeyBoard.value;
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

    watch(toggleKeyBoard, (newVal) => {
      // change cardlist maxheight when toggle keyboard
      const container = cardListContainer.value.$refs.cardContainer;
      if (!newVal) {
        container.style.maxHeight = "calc(100vh - 5.56rem)";
      } else {
        container.style.maxHeight = "calc(100vh - 22rem)";
      }
    });

    onUnmounted(() => {
      window.removeEventListener("resize", resizeSideMenu);
    });

    return {
      toggleKeyBoard,
      changeMaxHeight,
      cardListContainer,
      sideMenuContainer,
      isSearching,
      searchType,
      sideMenuClassObject,
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