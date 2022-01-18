<template>
  <div>
    <main class="main relative">
      <keep-alive include="Map">
        <component
          :is="activeComponent"
          @search-type="toggleSearchType"
          @get-map-location="getMapLocation"
          @toggle-agree-location="toggleAgreeLocation"
          :isArgreeGeoLocation="homeState.isArgreeGeoLocation"
          :mapLocation="mapLocation"
        ></component>
      </keep-alive>
      <SideMenu
        v-if="activeComponent === 'Map'"
        :searchType="homeState.searchType"
        @close-mobile-home="closeMobileHome"
      />
    </main>
  </div>
</template>

<script>
import {
  onUnmounted,
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
      isArgreeGeoLocation: false,
      searchType: "bus",
      toggleMobileHome: true,
    });

    let mapLocation = shallowRef({});
    const currentInnerWidth = window.innerWidth;
    if (currentInnerWidth >= 768) {
      homeState.toggleMobileHome = false;
    }

    function closeMobileHome() {
      homeState.isMobileHome = false;
    }

    function getMapLocation(position) {
      mapLocation.value = position;
    }

    function toggleSearchType(type) {
      homeState.searchType = type;
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
      activeComponent,
      closeMobileHome,
      getMapLocation,
      homeState,
      mapLocation,
      toggleAgreeLocation,
      toggleSearchType,
    };
  },
};
</script>

<style scoped>
</style>