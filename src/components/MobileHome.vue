<template>
  <div class="mobile_container bg-primary-100 px-8 pt-1 md:hidden">
    <!-- weather block -->
    <div class="weather_block flex items-center">
      <div class="weather_block--icon text-primary-400 basis-1/4">
        <i class="fas fa-sun fa-4x icon-weather"></i>
      </div>
      <div class="weather_block--content pl-3 pt-5 basis-3/4">
        <div
          class="city-block flex justify-between items-center font-bold mb-3.5"
        >
          <div class="date flex items-center">
            <span
              class="
                rounded-lg
                bg-primary-500
                text-xs
                px-1.5
                py-0.5
                text-grey-100
                inline-block
              "
            >
              台北市
            </span>
            <span class="text-xm ml-1 text-primary-500 inline-block"
              >11/20</span
            >
          </div>
          <div class="change flex items-center">
            <span
              class="
                rounded-lg
                bg-primary-500
                text-xs
                px-1.5
                py-0.5
                text-grey-100
                inline-block
              "
            >
              更換縣市
            </span>
            <span class="text-primary-400 ml-1"
              ><i class="fas fa-redo-alt fa-sm"></i
            ></span>
          </div>
        </div>
        <div class="temperature-block flex items-center justify-between">
          <div class="temperature flex items-center text-primary-500 font-bold">
            <span class="high mr-4 text-xl">30&deg;C</span>
            <span class="low relative text-md">22&deg;C</span>
          </div>
          <div class="rain-rate text-primary-400 ml-4 flex items-center">
            <span class=""><i class="fas fa-cloud-showers-heavy"></i></span>
            <span class="text-xm ml-1">80%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- main block -->
    <div class="main_block">
      <!-- find bus -->
      <div
        class="
          feature_list--wrapper
          grid grid-cols-2
          gap-x-[1.1875rem] gap-y-[1.25rem]
        "
      >
        <button
          class="
            feature
            bg-grey-100
            rounded-xl
            flex
            justify-center
            items-center
          "
          @click="searchLocation('bus')"
        >
          <div
            class="feature-content flex flex-col justify-center items-center"
          >
            <i class="fas fa-bus-alt fa-4x text-primary-400"></i>
            <div class="feature-title mt-2 text-grey-500 text-sm font-bold">
              找公車
            </div>
          </div>
        </button>
        <!-- find transport -->
        <button
          class="
            feature
            bg-grey-100
            rounded-xl
            flex
            justify-center
            items-center
          "
          @click="searchLocation('transport')"
        >
          <div
            class="feature-content flex flex-col justify-center items-center"
          >
            <i class="fas fa-road fa-4x text-primary-400"></i>
            <div class="feature-title mt-2 text-grey-500 text-sm font-bold">
              找客運
            </div>
          </div>
        </button>
        <!-- find bicycle -->
        <button
          class="
            feature
            bg-grey-100
            rounded-xl
            flex
            justify-center
            items-center
          "
          @click="searchLocation('bicycle')"
        >
          <div
            class="feature-content flex flex-col justify-center items-center"
          >
            <i class="fas fa-bicycle fa-3x text-primary-400"></i>
            <div class="feature-title mt-6 text-grey-500 text-sm font-bold">
              找單車
            </div>
          </div>
        </button>
        <button
          class="
            feature
            bg-grey-100
            rounded-xl
            flex
            justify-center
            items-center
            cursor-not-allowed
          "
        >
          <div
            class="feature-content flex flex-col justify-center items-center"
          >
            <i class="fas fa-subway fa-4x text-grey-300"></i>
            <div class="feature-title mt-2 text-sm text-grey-300 font-bold">
              轉乘資訊
            </div>
          </div>
        </button>
      </div>
    </div>
    <!-- geo location block -->
    <div
      v-if="!isArgreeGeoLocation"
      class="
        geo-location_block
        bg-alert-100
        h-11
        mt-5
        mb-7
        px-5
        flex
        items-center
        justify-between
        rounded-lg
      "
    >
      <i class="fas fa-crosshairs fa-xl text-alert-300"></i>
      <p class="text-xs ml-2">
        建議允許定位功能取用您的位置<br />以獲得更完整的服務
      </p>
      <div class="btn-block">
        <button
          class="py-0.5 px-2 text-xm bg-alert-300 text-grey-100 rounded-lg ml-2"
          @click="getMapLocation"
        >
          同意
        </button>
        <button
          class="py-0.5 px-2 text-xm bg-alert-300 text-grey-100 rounded-lg ml-2"
        >
          拒絕
        </button>
      </div>
    </div>

    <div
      v-else
      class="
        geo-location_block
        bg-accent-100
        h-11
        mt-5
        mb-7
        px-5
        flex
        items-center
        justify-center
        rounded-lg
      "
    >
      <i class="fas fa-crosshairs fa-xl text-accent-500"></i>
      <p class="text-xs ml-2">您已同意開啟定位服務</p>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";

export default {
  props: {
    isArgreeGeoLocation: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { isArgreeGeoLocation } = toRefs(props);

    function searchLocation(type) {
      emit("searchLocation", type);
    }

    function getMapLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            emit("getMapLocation", position);
            emit("toggleAgreeLocation");
          },
          () => {
            alert("無法判斷當前位置，將導向預設地點");
          }
        );
      } else {
        alert("不支援GPS定位");
      }
    }

    return { searchLocation, getMapLocation, isArgreeGeoLocation };
  },
};
</script>

<style scoped>
.mobile_container {
  height: calc(100vh - 5.56rem);
  margin-top: 3.06rem;
}
.main_block {
  margin-top: 2.31rem;
}
.icon-weather {
  font-size: 3.875rem;
}
.low::before {
  position: absolute;
  top: 30%;
  left: -0.5rem;
  content: "";
  width: 1px;
  height: 50%;
  background: #408560;
}
.feature {
  min-height: 10.375rem;
}
</style>
