<template>
  <Loading v-if="!renderList.length" />
  <div
    v-else
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
        class="item py-5 border-b border-grey-300 last:border-b-0"
        v-for="stop in renderList"
        :key="stop.StationUID"
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
              >{{ stop.StationName.Zh_tw }}</span
            >
            <span
              class="border text-xm rounded py-1 px-2 md:hidden"
              :class="statusTagClassObj"
              >{{
                showStatusTag(
                  stop.Availability.AvailableRentBikes,
                  stop.Availability.AvailableReturnBikes
                )
              }}</span
            >
          </div>
          <div class="distance flex items-center justify-between md:hidden">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">{{
              latLngToDistance(stop.StationPosition)
            }}</span>
          </div>
        </div>
        <div class="status grid grid-cols-2 gap-x-4">
          <div
            class="
              rent-bicycle
              py-2.5
              px-5
              rounded-lg
              flex
              justify-between
              items-center
              md:flex-col md:py-2 md:px-14
            "
            :class="toggleRentBlockClass(stop.Availability.AvailableRentBikes)"
          >
            <div class="rentable">
              <i class="fas fa-bicycle mr-1"></i>
              <span class="text-sm">可租借</span>
            </div>
            <span class="avaible-nums text-lg font-bold">{{
              stop.Availability.AvailableRentBikes
            }}</span>
          </div>
          <div
            class="
              park-bicycle
              py-2.5
              px-5
              rounded-lg
              flex
              justify-between
              items-center
              md:flex-col md:py-2 md:px-1.5
            "
            :class="
              toggleRentBlockClass(stop.Availability.AvailableReturnBikes)
            "
          >
            <div class="rentable">
              <i class="fas fa-parking mr-1"></i>
              <span class="text-sm">可停車</span>
            </div>
            <span class="avaible-nums text-lg font-bold">{{
              stop.Availability.AvailableReturnBikes
            }}</span>
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
            class="border text-xm rounded py-1 px-2 hidden md:inline-block"
            :class="statusTagClassObj"
            >{{
              showStatusTag(
                stop.Availability.AvailableRentBikes,
                stop.Availability.AvailableReturnBikes
              )
            }}</span
          >
          <div class="distance hidden items-center justify-between md:flex">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">{{
              latLngToDistance(stop.StationPosition)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Loading from "@/components/Loading.vue";
import { getDistance } from "@/utils/getDistance.js";

export default {
  components: {
    Loading,
  },
  setup() {
    const store = useStore();

    let tagStatus = ref("");

    function latLngToDistance(position) {
      const getUserPosition = store.getters.userPosition;
      const userPosition = {
        userLat: getUserPosition.lat,
        userLng: getUserPosition.lng,
      };
      const stationPosition = {
        stationLat: position.PositionLat,
        stationLng: position.PositionLon,
      };
      const toMeter = getDistance(userPosition, stationPosition, "M");

      return `距離${toMeter}公尺`;
    }

    function showStatusTag(rentCount, returnCount) {
      if (rentCount === 0) {
        tagStatus.value = "red";
        return "只可停車";
      }
      if (returnCount === 0) {
        tagStatus.value = "red";
        return "只可借車";
      }
      if (rentCount !== 0 && returnCount !== 0) {
        tagStatus.value = "brown";
        return "可借可還";
      }
      if (rentCount === 0 && returnCount === 0) {
        tagStatus.value = "grey";
        return "站點施工中";
      }
    }

    function toggleRentBlockClass(count) {
      if (count > 5) {
        return ["bg-primary-200", "text-primary-500"];
      }
      if (count <= 5) {
        return ["bg-alert-200", "text-alert-600"];
      }
      if (count === 0) {
        return ["bg-grey-200", "text-grey-300"];
      }
    }

    const statusTagClassObj = computed(() => {
      return {
        "border-alert-300": tagStatus.value === "red",
        "text-alert-400": tagStatus.value === "red",
        "border-brown-200": tagStatus.value === "brown",
        "text-brown-200": tagStatus.value === "brown",
        "border-grey-300": tagStatus.value === "grey",
        "text-grey-400": tagStatus.value === "grey",
      };
    });
    const renderList = computed(() => store.getters.bikeCardList || []);

    return {
      latLngToDistance,
      showStatusTag,
      statusTagClassObj,
      toggleRentBlockClass,
      renderList,
    };
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