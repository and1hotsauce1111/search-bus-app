<template>
  <div class="keyboard_container h-max-80 w-full fixed bottom-0">
    <div class="city-select py-3 px-5 bg-primary-200">
      <div
        class="scroll-wrapper whitespace-nowrap overflow-hidden w-full"
        ref="scroll"
      >
        <div class="scroll-content city-list inline-block">
          <span
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
            "
            v-for="(city, index) in cityData"
            :key="index"
          >
            {{ city.CityName }}
          </span>
        </div>
      </div>
    </div>
    <!-- nums keys -->
    <div class="nums-key pt-3 px-5 pb-4 bg-grey-100">
      <div class="route-color flex justify-between items-center">
        <button
          class="
            route-btn
            red
            bg-alert-100
            border border-alert-300 border-solid
            text-alert-300
            rounded-lg
          "
        >
          紅
        </button>
        <button
          class="
            route-btn
            green
            bg-primary-100
            border border-primary-400 border-solid
            text-primary-500
            rounded-lg
          "
        >
          綠
        </button>
        <button
          class="
            route-btn
            orange
            bg-accent-100
            border border-accent-100 border-solid
            text-accent-400
            rounded-lg
          "
        >
          橘
        </button>
        <button
          class="
            route-btn
            blue
            bg-blue-100
            border border-blue-200 border-solid
            text-blue-200
            rounded-lg
          "
        >
          藍
        </button>
        <button
          class="
            route-btn
            brown
            bg-brown-100
            border border-accent-500 border-solid
            text-accent-500
            rounded-lg
          "
        >
          棕
        </button>
      </div>

      <div class="route-nums">
        <div class="route-nums-row flex justify-between items-center mt-3">
          <button
            class="
              route-type-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            幹線
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            1
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            2
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            3
          </button>
        </div>
        <div class="route-nums-row flex justify-between items-center mt-3">
          <button
            class="
              route-type-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            通勤
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            4
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            5
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            6
          </button>
        </div>
        <div class="route-nums-row flex justify-between items-center mt-3">
          <button
            class="
              route-type-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            小巴
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            7
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            8
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            9
          </button>
        </div>
        <div
          class="route-nums-row flex justify-between items-center gap-3 mt-3"
        >
          <button
            class="
              route-type-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            接駁
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-primary-400
              text-primary-400
              rounded-lg
            "
          >
            0
          </button>
          <button
            class="
              num-btn
              bg-grey-100
              border border-solid border-alert-400
              text-alert-400
              rounded-lg
              grow
            "
          >
            <i class="fas fa-backspace"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import BScroll from "@better-scroll/core";

export default {
  setup() {
    let cityData = ref();
    // get ref element
    const scroll = ref(null);
    axios
      .get("../../static/CityCountyData.json")
      .then((res) => (cityData.value = res.data));

    onMounted(() => {
      nextTick(() => {
        const bs = new BScroll(scroll.value, {
          scrollX: true,
          probeType: 3,
        });
        console.log(bs);
      });
    });
    return {
      cityData,
      scroll,
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
</style>