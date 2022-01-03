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
    <SearchBar :isSearching="isSearching" @toggleSlideMenu="toggleSlideMenu" />
    <div v-if="isSearching" class="show-cardlist">
      <CardList ref="cardListContainer" :toggleKeyBoard="toggleKeyBoard" />
      <KeyBoard
        class="md:hidden"
        :toggleKeyBoard="toggleKeyBoard"
        @changeMaxHeight="changeMaxHeight"
      />
    </div>
    <div v-else class="show-carddetail">
      <CardDetails />
    </div>
  </div>
</template>

<script>
import KeyBoard from "@/components/KeyBoard.vue";
import CardList from "@/components/card/CardList.vue";
import SearchBar from "@/components/search/SearchBar.vue";
import CardDetails from "@/components/card/CardDetails.vue";
import { onUnmounted, ref, watch } from "vue";

export default {
  components: {
    KeyBoard,
    CardList,
    SearchBar,
    CardDetails,
  },
  setup() {
    let isSearching = ref(false);
    let toggleKeyBoard = ref(true);
    const cardListContainer = ref(null);
    const sideMenuContainer = ref(null);

    const sideMenuClassObject = {
      "bg-primary-100": isSearching.value,
      "bg-grey-100": !isSearching.value,
      "rounded-t-2xl": !isSearching.value,
      "top-3/4": !isSearching.value,
      "is-search": isSearching.value,
      "not-search": !isSearching.value,
    };

    function searchRoute() {
      toggleKeyBoard.value = false;
    }

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
      if (!container || !isNotSearch) return;
      if (container && isNotSearch && window.innerWidth >= 768) {
        container.style.top = "7rem";
      } else {
        container.style.top = "70%";
      }
    }

    watch(toggleKeyBoard, (newVal) => {
      // change cardlist maxheight when toggle keyboard
      const container = cardListContainer.value.$refs.cardContainer;
      if (!newVal) {
        container.style.maxHeight = "calc(100vh - 5.56rem)";
      } else {
        container.style.maxHeight = "calc(100vh - 22rem)";
      }
    });

    window.addEventListener("resize", resizeSideMenu);

    onUnmounted(() => {
      window.removeEventListener("resize", resizeSideMenu);
    });

    return {
      toggleKeyBoard,
      changeMaxHeight,
      cardListContainer,
      sideMenuContainer,
      isSearching,
      sideMenuClassObject,
      toggleSlideMenu,
    };
  },
};
</script>

<style scoped>
.sideMenu-container.is-search {
  height: calc(100vh - 3.06rem);
  top: 3.06rem;
}
.sideMenu-container.not-search {
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
  .sideMenu-container.is-search,
  .sideMenu-container.not-search {
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