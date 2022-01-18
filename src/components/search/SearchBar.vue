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
      v-if="showBusInputSearch"
      class="show-search flex justify-center items-center"
    >
      <div
        class="input-area w-full flex justify-center items-center md:basis-9/12"
      >
        <input
          v-if="toggleKeyBoard && isInputDisable"
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
          :placeholder="searchBusInputPlaceholder"
          readonly
        />
        <input
          v-else
          :value="searchInputValue"
          @input="updateInput"
          @compositionstart="onCompositionStart"
          @compositionend="onCompositionEnd"
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
          :placeholder="searchBusInputPlaceholder"
        />
        <button class="absolute right-9 md:right-36" @click.stop="searchData">
          <i class="fas fa-search text-grey-500 md:text-primary-500"></i>
        </button>
      </div>
      <Popper class="white-popper" offsetDistance="1" offsetSkid="200">
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
        <template #content>
          <div
            class="
              drop-down-city
              border-b border-grey-300
              last:border-0
              mt-3
              first:mt-0
            "
            v-for="(area, index) in dropdownCity"
            :key="index"
          >
            <p class="flex items-center mb-2">
              <span class="text-md text-grey-600 font-bold">{{
                area.area
              }}</span>
              <span
                v-if="!area.active"
                class="text-lg text-grey-500 cursor-pointer ml-2"
                @click.stop="toggleCollapseCityMenu(index)"
                ><i class="fas fa-caret-right"></i
              ></span>
              <span
                v-else
                class="text-lg text-grey-500 cursor-pointer ml-2"
                @click.stop="toggleCollapseCityMenu(index)"
                ><i class="fas fa-caret-down"></i
              ></span>
            </p>
            <div
              class="
                cities
                grid-cols-6
                gap-x-5 gap-y-2
                text-grey-600 text-sm
                font-medium
                pb-4
                scale-y-0
                hidden
                origin-top
                overflow-hidden
                transition-transform
                ease-in-out
                duration-300
              "
              :class="{ active: area.active }"
            >
              <span
                class="cursor-pointer"
                v-for="(city, i) in area.cities"
                :key="i"
                @click.stop="searchBusByCity(city)"
                >{{ getCityNameZh(city) }}</span
              >
            </div>
          </div>
        </template>
      </Popper>
    </div>

    <!-- search bicycle -->
    <div
      v-if="isSearching && searchType === 'bicycle'"
      class="search-bicycle-block flex justify-between items-center"
    >
      <div class="toggle-btn text-lg text-grey-100 md:hidden basis-8">
        <button v-if="isSlideUp" @click.stop="toggleSlideMenu">
          <i class="fas fa-angle-down cursor-pointer md:hidden"></i>
        </button>
        <button v-else @click.stop="toggleSlideMenu">
          <i class="fas fa-angle-up cursor-pointer md:hidden"></i>
        </button>
      </div>
      <div class="search flex justify-center items-center grow">
        <input
          v-if="toggleKeyBoard && isInputDisable"
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
        <input
          v-else
          :value="searchInputValue"
          @input="updateInput"
          @compositionstart="onCompositionStart"
          @compositionend="onCompositionEnd"
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
      <button @click.stop="backToSearch">
        <i class="fas fa-angle-left cursor-pointer hidden md:block"></i>
      </button>
      <button v-if="isSlideUp" class="md:hidden" @click.stop="toggleSlideMenu">
        <i class="fas fa-angle-down cursor-pointer md:hidden"></i>
      </button>
      <button v-else class="md:hidden" @click.stop="toggleSlideMenu">
        <i class="fas fa-angle-up cursor-pointer md:hidden"></i>
      </button>
      <span
        class="
          bus-num
          grow
          text-center
          overflow-hidden
          text-ellipsis
          whitespace-nowrap
          px-4
        "
        >{{ currentRouteName }}</span
      >
      <button>
        <i class="fas fa-info-circle cursor-pointer"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, computed, onUnmounted, onMounted, watch } from "vue";
import { useStore } from "vuex";
import getCityNameZh from "@/utils/getCityNameZh.js";
import axios from "axios";

export default {
  props: {
    currentBus: {
      type: Object,
      requied: true,
      default: {},
    },
    isSearching: {
      type: Boolean,
      required: true,
    },
    isSlideUp: {
      type: Boolean,
      required: true,
      default: false,
    },
    searchType: {
      type: String,
      required: true,
      default: "bus",
    },
    toggleKeyBoard: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  setup(props, { emit }) {
    const { isSearching, isSlideUp, searchType, toggleKeyBoard, currentBus } =
      toRefs(props);

    let isInputDisable = ref(true);
    let dropdownCity = ref();
    const store = useStore();
    let searchInputValue = ref("");
    let typingCh = ref(false);

    function backToSearch() {
      store.commit("CHANGE_SEARCHING_STATUS");
      store.commit("TOGGLE_GOTO_FIRST_STOP", true);
    }

    function onCompositionStart() {
      typingCh.value = true;
    }

    function onCompositionEnd(e) {
      typingCh.value = false;
      updateInput(e);
    }

    function searchData() {
      if (searchInputValue.value === "") return;

      const currentCity = store.getters.currentDistrict;
      if (searchType.value === "bus") {
        const searchInput = {
          city: currentCity,
          keyword: searchInputValue.value,
        };
        store.dispatch("getBusByKeyword", searchInput);
      }

      if (searchType.value === "intercityBus")
        store.dispatch("getIntercityBusByKeyword", searchInputValue.value);

      // if (searchType.value === "bike")
      //   store.dispatch("getCurrentCityBikeStation", currentCity);
    }

    function searchBusByCity(city) {
      if (searchType.value === "bus") store.dispatch("getAllCityBus", city);
      // reset current city
      store.commit("GET_CURRENT_DISTRICT", city);
    }

    function toggleSlideMenu() {
      emit("toggleSlideMenu");
    }

    function toggleCollapseCityMenu(index) {
      dropdownCity.value[index].active = !dropdownCity.value[index].active;
    }

    function toggleInputDisable() {
      const innerWidth = window.innerWidth;
      if (innerWidth >= 768) {
        isInputDisable.value = false;
      } else {
        isInputDisable.value = true;
      }
    }

    function updateInput(e) {
      if (typingCh.value) return;
      if (e.inputType === "insertText" || e.type === "compositionend") {
        searchInputValue.value += e.data;
      } else {
        searchInputValue.value = searchInputValue.value.slice(0, -1);
      }
      store.commit("UPDATE_SEARCH_INPUT_VALUE", searchInputValue.value);
    }

    watch(
      () => store.getters.searchInputValue,
      (newVal) => {
        if (newVal === "") {
          store.commit("CLEAR_BUSLIST");
        }
        searchInputValue.value = newVal;
        searchData();
      }
    );

    const currentRouteName = computed(
      () => currentBus.value.RouteName.Zh_tw || "無法顯示路線名稱"
    );

    const searchingClassObject = computed(() => {
      return {
        fixed: isSearching.value,
        "py-4": isSearching.value,
        "py-2": !isSearching.value || searchType.value === "bicycle",
        "bg-primary-300": !isSearching.value || searchType.value === "bicycle",
        "rounded-t-2xl": !isSearching.value || searchType.value === "bicycle",
      };
    });

    const showBusInputSearch = computed(
      () =>
        isSearching.value &&
        (searchType.value === "bus" || searchType.value === "intercityBus")
    );

    const searchBusInputPlaceholder = computed(() =>
      searchType.value === "bus"
        ? "尋找公車路線或站牌..."
        : "尋找公路或國道路線或目的地..."
    );

    axios
      .get("../../static/dropDownCity.json")
      .then((res) => (dropdownCity.value = res.data));

    onMounted(() => {
      const innerWidth = window.innerWidth;
      if (innerWidth >= 768) isInputDisable.value = false;
      window.addEventListener("resize", toggleInputDisable);
    });
    onUnmounted(() => window.removeEventListener("resize", toggleInputDisable));

    return {
      backToSearch,
      currentRouteName,
      dropdownCity,
      getCityNameZh,
      isSlideUp,
      isInputDisable,
      onCompositionStart,
      onCompositionEnd,
      searchInputValue,
      showBusInputSearch,
      searchingClassObject,
      searchBusInputPlaceholder,
      searchData,
      searchBusByCity,
      toggleSlideMenu,
      toggleKeyBoard,
      toggleInputDisable,
      toggleCollapseCityMenu,
      updateInput,
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
.drop-down-city {
  min-width: 425px;
}
.cities.active {
  display: grid;
  transform: scaleY(1);
}
.bus-num {
  min-width: 18rem;
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