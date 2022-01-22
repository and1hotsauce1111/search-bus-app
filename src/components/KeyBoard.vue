<template>
  <div
    class="
      keyboard_container
      h-max-80
      w-full
      fixed
      bottom-0
      transition-transform
      duration-300
    "
    ref="keyboard"
  >
    <!-- toggle keyboard -->
    <div
      ref="toggleBtn"
      class="
        toggle-keyboard
        bg-grey-100
        rounded-full
        w-12
        h-12
        flex
        justify-center
        items-center
        absolute
        right-6
        -top-16
        shadow-md
      "
      @click.stop="toggleKeyBoardHandler"
    >
      <i class="fas fa-keyboard text-grey-500"></i>
    </div>

    <!-- keyboard block -->
    <div class="keyboard-block">
      <!-- select city -->
      <div class="city-select py-3 px-5 bg-primary-200">
        <div
          class="scroll-wrapper whitespace-nowrap overflow-hidden w-full"
          ref="scroll"
        >
          <div class="scroll-content city-list inline-block">
            <button
              class="
                city
                text-xm
                rounded-lg
                bg-primary-400
                px-1.5
                py-0.5
                mr-3
                text-grey-100
                inline-block
                scroll-item
              "
              v-for="(city, index) in cityData"
              :key="index"
              @click.stop="searchCurrentCityBus(index, city.CityEngName)"
              :class="{ active: city.active }"
            >
              {{ city.CityName }}
            </button>
          </div>
        </div>
      </div>
      <!-- nums keys -->
      <div class="nums-key pt-3 px-5 pb-4 bg-grey-100">
        <div
          v-if="searchType === 'bus'"
          class="route-color grid grid-cols-5 gap-x-3.5"
        >
          <template v-for="(route, key) in keyboardType.routes" :key="key">
            <button
              class="route-btn red border border-solid rounded-lg"
              :class="keyClassObject[key]"
              @click.stop="getInputValue(route)"
            >
              {{ route }}
            </button>
          </template>
        </div>

        <div class="route-nums">
          <div class="route-nums-row grid grid-cols-4 gap-x-3.5 gap-y-3 mt-3">
            <template v-for="(key, index) in keyboardType.nums" :key="index">
              <button
                class="
                  route-type-btn
                  bg-grey-100
                  border border-solid border-primary-400
                  text-primary-400
                  rounded-lg
                "
              >
                {{ key.title }}
              </button>
              <button
                class="
                  num-btn
                  bg-grey-100
                  border border-solid border-primary-400
                  text-primary-400
                  rounded-lg
                "
                v-for="(num, k) in key.key"
                :key="k"
                @click.stop="getInputValue(num)"
              >
                {{ num }}
              </button>
            </template>
            <button
              class="
                num-btn
                bg-grey-100
                border border-solid border-alert-400
                text-alert-400
                rounded-lg
                grow
                col-span-2
              "
              @click.stop="deleteInputValue"
            >
              <i class="fas fa-backspace"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, toRefs, computed } from "vue";
import axios from "axios";
import BScroll from "@better-scroll/core";
import { busKey, intercityBusKey } from "@/utils/keyboard.js";
import { useStore } from "vuex";

export default {
  name: "Keyboard",
  props: {
    toggleKeyBoard: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    let cityData = ref();
    let currentCityIndex = null;
    // get ref element
    const scroll = ref(null);
    const toggleBtn = ref(null);
    const keyboard = ref(null);

    let searchInputValue = ref("");
    const store = useStore();

    const { toggleKeyBoard } = toRefs(props);

    const keyClassObject = {
      red: "bg-alert-100 border-alert-300 text-alert-300",
      green: "bg-primary-100 border-primary-400 text-primary-500",
      orange: "bg-accent-100 border-accent-400 text-accent-400",
      blue: "bg-blue-100 border-blue-200 text-blue-200",
      brown: "bg-brown-100 border-accent-500 text-accent-500",
    };

    // key functions
    function toggleKeyBoardHandler() {
      emit("changeMaxHeight");
      keyboard.value.classList.toggle("translate-y-80");
    }

    function searchCurrentCityBus(index, city) {
      if (currentCityIndex !== null) {
        cityData.value[currentCityIndex].active =
          !cityData.value[currentCityIndex].active;
      }
      cityData.value[index].active = !cityData.value[index].active;
      currentCityIndex = index;
      store.dispatch("getAllCityBus", city);
      // reset current city
      store.commit("GET_CURRENT_DISTRICT", city);
    }

    function getInputValue(value) {
      searchInputValue.value += value;
      store.commit("UPDATE_SEARCH_INPUT_VALUE", searchInputValue.value);
    }
    function deleteInputValue() {
      searchInputValue.value = searchInputValue.value.slice(0, -1);
      store.commit("UPDATE_SEARCH_INPUT_VALUE", searchInputValue.value);
    }

    // render cityt list
    axios
      .get("../../static/CityCountyData.json")
      .then((res) => (cityData.value = res.data));

    onMounted(() => {
      const bs = new BScroll(scroll.value, {
        scrollX: true,
        probeType: 3,
      });
    });

    // watch and computed

    watch(toggleKeyBoard, (newVal) => {
      if (newVal) {
        keyboard.value.classList.remove("translate-y-80");
      } else {
        keyboard.value.classList.add("translate-y-80");
      }
    });

    watch(
      () => store.getters.searchInputValue,
      (newVal) => {
        if (newVal === "") {
          store.commit("CLEAR_BUSLIST");
        }
        searchInputValue.value = newVal;
      }
    );

    const keyboardType = computed(() => {
      return searchType.value === "bus" ? busKey : intercityBusKey;
    });

    const searchType = computed(() => store.getters.searchType);

    return {
      cityData,
      deleteInputValue,
      getInputValue,
      keyboard,
      keyboardType,
      keyClassObject,
      searchType,
      scroll,
      searchCurrentCityBus,
      searchInputValue,
      toggleBtn,
      toggleKeyBoardHandler,
    };
  },
};
</script>

<style scoped>
.route-btn,
.route-type-btn {
  padding: 0.375rem 1.1875rem;
}
.num-btn {
  padding: 0.375rem 2rem;
}
.scroll-content {
  width: 90rem;
}
.city:last-child {
  margin-right: 0;
}
.city.active {
  background: #316649;
}
</style>