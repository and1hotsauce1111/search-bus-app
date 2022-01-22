<template>
  <div>
    <main class="main relative">
      <keep-alive include="Map">
        <component
          :is="activeComponent"
          @toggle-mobile-home="toggleMobileHome"
          @get-map-location="getMapLocation"
          @toggle-agree-location="toggleAgreeLocation"
          :isArgreeGeoLocation="homeState.isArgreeGeoLocation"
          :mapLocation="mapLocation"
        ></component>
      </keep-alive>
      <SideMenu
        v-if="activeComponent === 'Map'"
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
import { useStore } from "vuex";

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
      toggleMobileHome: true,
    });

    const store = useStore();

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

    function toggleMobileHome() {
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

    const searchType = computed(() => store.getters.searchType);

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
      searchType,
      toggleAgreeLocation,
      toggleMobileHome,
    };
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 5.56rem);
  margin-top: 3.06rem;
}

@media (min-width: 768px) {
  .main {
    height: calc(100vh - 8.125rem);
    margin-top: 0;
  }
}
</style>