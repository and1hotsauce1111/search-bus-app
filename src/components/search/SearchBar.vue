<template>
  <!-- search bar -->
  <div
    class="
      search_input--block
      bg-primary-100
      md:bg-primary-300 md:relative md:rounded-t-lg
      px-6
      w-screen
      z-10
      md:py-6 md:px-8 md:w-full
    "
    :class="searchingClassObject"
  >
    <!-- search bus -->
    <div
      v-if="isSearching && searchType === 'bus'"
      class="show-search flex justify-center items-center"
    >
      <div
        class="input-area w-full flex justify-center items-center md:basis-9/12"
      >
        <input
          v-model="searchInputValue"
          type="text"
          class="
            search-bus
            w-full
            py-1.5
            pl-4
            pr-8
            outline-none
            relative
            md:py-2
            md:px-5
            md:text-sm
            md:bg-primary-100
            md:placeholder:text-primary-500
          "
          placeholder="尋找公車路線或站牌..."
          readonly
        />
        <button class="absolute right-9 md:right-36">
          <i class="fas fa-search text-grey-500 md:text-primary-500"></i>
        </button>
      </div>
      <button
        class="
          py-2
          px-3
          ml-2.5
          bg-grey-100
          md:basis-3/12
          justify-center
          items-center
          hidden
          rounded-lg
          md:flex
          text-primary-400
        "
      >
        <i class="fas fa-sort-amount-down text-sm mr-2.5"></i>
        <span class="text-sm">篩選</span>
      </button>
    </div>

    <!-- search bicycle -->
    <div
      v-if="isSearching && searchType === 'bicycle'"
      class="search-bicycle-block flex justify-between items-center"
    >
      <div class="toggle-btn text-lg text-grey-100 md:hidden basis-8">
        <button v-if="isSlideUp" @click="toggleSlideMenu">
          <i class="fas fa-angle-down cursor-pointer md:hidden"></i>
        </button>
        <button v-else @click="toggleSlideMenu">
          <i class="fas fa-angle-up cursor-pointer md:hidden"></i>
        </button>
      </div>
      <div class="search flex justify-center items-center grow">
        <input
          v-model="searchInputValue"
          type="text"
          class="
            w-full
            py-1.5
            pl-4
            pr-8
            outline-none
            relative
            text-xm
            rounded-lg
            bg-primary-100
            placeholder:text-primary-500
            md:py-2 md:px-5 md:text-sm md:bg-primary-100
          "
          placeholder="搜尋站點或鄰近地點"
          readonly
        />
        <button class="absolute right-28 md:right-36">
          <i class="fas fa-search text-grey-500 md:text-primary-500"></i>
        </button>
      </div>
      <button
        class="
          py-1.5
          px-3
          md:py-2 md:px-3
          ml-2.5
          bg-grey-100
          flex
          justify-center
          items-center
          rounded-lg
          text-primary-400
        "
      >
        <i class="fas fa-sort-amount-down text-xm mr-1 md:mr-2.5"></i>
        <span class="text-xm md:text-sm">排序</span>
      </button>
    </div>

    <!-- show current bus title -->
    <div
      v-if="!isSearching"
      class="
        show-current-bus
        w-100
        flex
        justify-between
        items-center
        md:rounded-t-lg
        text-lg text-grey-100
      "
    >
      <button @click="isSearching = true">
        <i class="fas fa-angle-left cursor-pointer hidden md:block"></i>
      </button>
      <button v-if="isSlideUp" class="md:hidden" @click="toggleSlideMenu">
        <i class="fas fa-angle-down cursor-pointer md:hidden"></i>
      </button>
      <button v-else class="md:hidden" @click="toggleSlideMenu">
        <i class="fas fa-angle-up cursor-pointer md:hidden"></i>
      </button>
      <span class="bus-num grow text-center">306</span>
      <button>
        <i class="fas fa-info-circle cursor-pointer"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";

export default {
  props: {
    isSearching: {
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
    const { isSearching, searchType } = toRefs(props);
    let isSlideUp = ref(false);
    let searchInputValue = ref("");

    const searchingClassObject = {
      fixed: isSearching.value,
      "py-4": isSearching.value,
      "py-2": !isSearching.value || searchType.value === "bicycle",
      "bg-primary-300": !isSearching.value || searchType.value === "bicycle",
      "rounded-t-2xl": !isSearching.value || searchType.value === "bicycle",
    };

    function toggleSlideMenu() {
      isSlideUp.value = !isSlideUp.value;
      emit("toggleSlideMenu", isSlideUp.value);
    }

    return {
      searchInputValue,
      isSearching,
      searchType,
      isSlideUp,
      searchingClassObject,
      toggleSlideMenu,
    };
  },
};
</script>

<style scoped>
.container {
  width: 26.7rem;
  margin-top: 3.06rem;
}
.search_input--block {
  left: 0;
}
input.search-bus {
  border-radius: 3.81rem;
}

@media (min-width: 768px) {
  .container {
    margin-top: 0;
    min-height: 45.85rem;
  }
  input.search-bus {
    border-radius: 0.5rem;
  }
}
</style>