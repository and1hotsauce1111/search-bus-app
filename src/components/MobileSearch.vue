<template>
  <div class="container bg-primary-100 w-full md:rounded-lg md:bg-grey-100">
    <!-- search bar -->
    <div
      class="
        search_input--block
        bg-primary-100
        md:bg-primary-300 md:relative md:rounded-t-lg
        px-5
        pt-4
        pb-4
        w-full
        fixed
        z-10
        md:py-6 md:px-8
      "
    >
      <div
        v-if="searching"
        class="show-search flex justify-center items-center"
      >
        <div class="flex justify-center items-center">
          <input
            type="text"
            class="
              w-80
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
          <button class="absolute right-12 md:right-36" @click="searchRoute">
            <i class="fas fa-search text-grey-500 md:text-primary-500"></i>
          </button>
        </div>
        <button
          class="
            py-2
            px-3
            ml-2.5
            bg-grey-100
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
      <div
        v-else
        class="
          show-current-bus
          w-100
          flex
          justify-between
          items-center
          text-lg text-grey-100
        "
      >
        <button @click="searching = true">
          <i class="fas fa-angle-left cursor-pointer hidden md:block"></i>
        </button>
        <button @click="searching = true">
          <i class="fas fa-angle-up cursor-pointer md:hidden"></i>
        </button>
        <span class="bus-num grow text-center">306</span>
        <button>
          <i class="fas fa-info-circle cursor-pointer"></i>
        </button>
      </div>
    </div>

    <!-- bus card -->
    <div
      ref="cardContainer"
      class="
        card_container--block
        w-80
        my-0
        mx-auto
        overflow-scroll
        no-scrollbar
        duration-500
        rounded-lg
        md:px-8 md:mx-0 md:w-full
      "
    >
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
          md:shadow-none
          md:py-0
          md:px-0
          md:border-b
          md:border-grey-300
          md:rounded-none
          md:last:border-0
        "
        v-for="(list, index) in listNum"
        :key="index"
      >
        <div class="bus-info">
          <div class="bus-num flex items-center justify-between mb-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-lg pr-2">307</span>
              <span
                class="
                  rounded-lg
                  bg-primary-400
                  text-xs
                  px-1.5
                  py-0.5
                  text-grey-100
                  inline-block
                "
                >台北市</span
              >
            </div>
            <i class="fas fa-angle-right text-grey-500"></i>
          </div>
          <div class="bus-station flex justify-between items-center">
            <span class="start text-sm text-grey-500">撫遠街</span>
            <span class="end text-sm text-grey-500">板橋</span>
          </div>
        </div>
      </div>
    </div>

    <!-- KeyBoard -->
    <!-- <key-board
      :toggleKeyBoard="toggleKeyBoard"
      @changeMaxHeight="changeMaxHeight"
    /> -->
  </div>
</template>

<script>
import KeyBoard from "@/components/KeyBoard.vue";
import { ref, watch } from "vue";

export default {
  components: {
    KeyBoard,
  },
  setup() {
    const listNum = 30;
    let toggleKeyBoard = ref(true);
    let searching = ref(true);
    const cardContainer = ref(null);

    function searchRoute() {
      // toggleKeyBoard.value = false;
      searching.value = false;
    }

    function changeMaxHeight() {
      toggleKeyBoard.value = !toggleKeyBoard.value;
    }

    watch(toggleKeyBoard, (newVal) => {
      if (!newVal) {
        cardContainer.value.style.maxHeight = "calc(100vh - 5.56rem)";
      } else {
        cardContainer.value.style.maxHeight = "calc(100vh - 22rem)";
      }
    });

    return {
      listNum,
      searching,
      toggleKeyBoard,
      cardContainer,
      searchRoute,
      changeMaxHeight,
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
.card_container--block {
  padding-top: 4.25rem;
  max-height: calc(100vh - 22rem);
}
.start::after {
  position: absolute;
  top: 3.43rem;
  left: 4.875rem;
  content: "";
  height: 1px;
  width: 55.8%;
  background: #767676;
}
.start::before {
  content: "";
  position: absolute;
  left: 4.85rem;
  top: 3.375rem;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background: #767676;
}
.end::before {
  content: "";
  position: absolute;
  right: 3.85rem;
  top: 3.375rem;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background: #767676;
}

@media (min-width: 768px) {
  .container {
    margin-top: 0;
    min-height: 45.85rem;
  }
  .card_container--block {
    padding-top: 2rem;
    max-height: 38.85rem;
  }
  input {
    border-radius: 0.5rem;
    width: 17rem;
  }
  .start::after {
    width: 60.8%;
  }
}
</style>