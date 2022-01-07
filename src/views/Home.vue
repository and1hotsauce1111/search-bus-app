<template>
  <div>
    <main class="main relative">
      <keep-alive include="Map">
        <component
          :is="activeComponent"
          @search-location="searchLocation"
          @get-map-location="getMapLocation"
          @toggle-agree-location="toggleAgreeLocation"
          :isArgreeGeoLocation="homeState.isArgreeGeoLocation"
          :mapLocation="mapLocation"
        ></component>
      </keep-alive>
      <SideMenu v-if="activeComponent === 'Map'" />
    </main>
  </div>
</template>

<script>
import {
  onUnmounted,
  ref,
  shallowRef,
  defineAsyncComponent,
  computed,
  reactive,
} from "vue";
import SideMenu from "@/components/SideMenu.vue";

export default {
  components: {
    MobileHome: defineAsyncComponent(() =>
      import("@/components/MobileHome.vue")
    ),
    Map: defineAsyncComponent(() => import("@/components/Map.vue")),
    SideMenu,
  },
  setup() {
    const homeState = reactive({
      isMobileHome: true,
      toggleMobileHome: true,
      isArgreeGeoLocation: false,
    });

    let mapLocation = shallowRef({});
    const currentInnerWidth = window.innerWidth;
    if (currentInnerWidth >= 768) {
      homeState.toggleMobileHome = false;
    }

    function searchLocation(type) {
      homeState.isMobileHome = false;
    }

    function toggleMobileHomeWidth() {
      if (!homeState.isMobileHome) return;
      if (window.innerWidth >= 768) {
        homeState.toggleMobileHome = false;
      } else {
        homeState.toggleMobileHome = true;
      }
    }

    function getMapLocation(position) {
      mapLocation.value = position;
    }

    function toggleAgreeLocation() {
      homeState.isArgreeGeoLocation = !homeState.isArgreeGeoLocation;
    }

    const activeComponent = computed(() => {
      if (homeState.isMobileHome && homeState.toggleMobileHome)
        return "MobileHome";
      return "Map";
    });

    window.addEventListener("resize", toggleMobileHomeWidth);

    onUnmounted(() =>
      window.removeEventListener("resize", toggleMobileHomeWidth)
    );
    return {
      homeState,
      activeComponent,
      toggleAgreeLocation,
      searchLocation,
      getMapLocation,
      mapLocation,
    };
  },
};
</script>

<style scoped>
</style>