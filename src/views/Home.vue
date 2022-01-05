<template>
  <div>
    <main class="main relative">
      <keep-alive include="Map">
        <component
          :is="activeComponent"
          @search-location="searchLocation"
          @get-map-location="getMapLocation"
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
    let isMobileHome = ref(true);
    let toggleMobileHome = ref(true);
    let mapLocation = shallowRef({});
    const currentInnerWidth = window.innerWidth;
    if (currentInnerWidth >= 768) {
      toggleMobileHome.value = false;
    }

    function searchLocation(type) {
      isMobileHome.value = false;
    }

    function toggleMobileHomeWidth() {
      if (!isMobileHome.value) return;
      if (window.innerWidth >= 768) {
        toggleMobileHome.value = false;
      } else {
        toggleMobileHome.value = true;
      }
    }

    function getMapLocation(position) {
      mapLocation.value = position;
    }

    const activeComponent = computed(() => {
      if (isMobileHome.value && toggleMobileHome.value) return "MobileHome";
      return "Map";
    });

    window.addEventListener("resize", toggleMobileHomeWidth);

    onUnmounted(() =>
      window.removeEventListener("resize", toggleMobileHomeWidth)
    );
    return {
      activeComponent,
      isMobileHome,
      searchLocation,
      toggleMobileHome,
      getMapLocation,
      mapLocation,
    };
  },
};
</script>

<style scoped>
</style>