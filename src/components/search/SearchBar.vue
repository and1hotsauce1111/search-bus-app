<template>
  <!-- search bar -->
  <div
    class="
      search_input--block
      bg-primary-100
      md:bg-primary-300 md:relative md:rounded-t-lg
      px-5
      w-screen
      z-10
      md:py-6 md:px-8 md:w-full
    "
    :class="searchingClassObject"
  >
    <div
      v-if="isSearching"
      class="show-search flex justify-center items-center"
    >
      <div
        class="input-area w-full flex justify-center items-center md:basis-9/12"
      >
        <input
          type="text"
          class="
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

    <!-- show current bus title -->

    <div
      v-else
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
  },
  setup(props, { emit }) {
    const { isSearching } = toRefs(props);
    let isSlideUp = ref(false);

    const searchingClassObject = {
      fixed: isSearching.value,
      "py-4": isSearching.value,
      "py-2": !isSearching.value,
      "bg-primary-300": !isSearching.value,
      "rounded-t-2xl": !isSearching.value,
    };

    function toggleSlideMenu() {
      isSlideUp.value = !isSlideUp.value;
      emit("toggleSlideMenu", isSlideUp.value);
    }

    return {
      isSearching,
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
input {
  border-radius: 3.81rem;
}

@media (min-width: 768px) {
  .container {
    margin-top: 0;
    min-height: 45.85rem;
  }
  input {
    border-radius: 0.5rem;
  }
}
</style>