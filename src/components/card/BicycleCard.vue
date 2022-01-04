<template>
  <div
    class="
      bicyclecard-container
      px-6
      pt-16
      md:pt-4
      overflow-scroll
      no-scrollbar
    "
  >
    <div class="bicyclecard-list-wrapper">
      <div
        class="item py-5 border-b border-grey-300"
        v-for="(item, index) in 100"
        :key="index"
      >
        <div class="station flex justify-between items-center md:w-full">
          <div
            class="
              station-name
              flex
              items-center
              justify-between
              mb-2
              md:w-full md:block
            "
          >
            <span
              class="
                inline-block
                text-sm
                font-bold
                mr-2
                w-36
                overflow-hidden
                whitespace-nowrap
                text-ellipsis
                md:text-lg md:w-full
              "
              >太原廣場太原廣場太原廣場太原廣場太原廣場太原廣場太原廣場太原廣場太原廣場太原廣場太原廣場太原廣場</span
            >
            <!-- <span
              class="
                border border-alert-300
                text-alert-400 text-xm
                rounded
                py-1
                px-2
              "
              >只可停車</span
            >
            <span
              class="
                border border-brown-200
                text-brown-200 text-xm
                rounded
                py-1
                px-2
              "
              >可借可還</span
            > -->
            <span
              class="
                border border-grey-300
                text-grey-400 text-xm
                rounded
                py-1
                px-2
                md:hidden
              "
              >站點施工中</span
            >
          </div>
          <div class="distance flex items-center justify-between md:hidden">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
        </div>
        <div class="status grid grid-cols-2 gap-x-4">
          <div
            class="
              rent-bicycle
              bg-primary-200
              py-2.5
              px-5
              rounded-lg
              flex
              justify-between
              items-center
              md:flex-col md:py-2 md:px-14
            "
          >
            <div class="rentable md:">
              <i class="fas fa-bicycle mr-1 text-primary-500"></i>
              <span class="text-sm text-primary-500">可租借</span>
            </div>
            <span class="avaible-nums text-lg text-primary-500 font-bold"
              >43</span
            >
          </div>
          <div
            class="
              park-bicycle
              bg-alert-200
              py-2.5
              px-5
              rounded-lg
              flex
              justify-between
              items-center
              md:flex-col md:py-2 md:px-1.5
            "
          >
            <div class="rentable">
              <i class="fas fa-parking mr-1 text-alert-600"></i>
              <span class="text-sm text-alert-600">可停車</span>
            </div>
            <span class="avaible-nums text-lg text-alert-600 font-bold">4</span>
          </div>
        </div>
        <!-- 768px -->
        <div
          class="
            desktop-show-distance
            hidden
            md:flex md:justify-between md:items-center md:pt-3
          "
        >
          <span
            class="
              border border-grey-300
              text-grey-400 text-xm
              rounded
              py-1
              px-2
              hidden
              md:inline-block
            "
            >站點施工中</span
          >
          <div class="distance hidden items-center justify-between md:flex">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.bicyclecard-container {
  max-height: calc(100vh - 10rem);
}

@media (min-width: 768px) {
  .bicyclecard-container {
    max-height: 38.85rem;
  }
}
</style>