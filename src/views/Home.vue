<template>
  <div>
    <main class="main relative">
      <Map />
      <SideMenu class="absolute top-8 left-8 z-50" />
    </main>
  </div>
</template>

<script>
import Map from "@/components/Map.vue";
import SideMenu from "@/components/SideMenu.vue";

export default {
  components: {
    Map,
    SideMenu,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
</style>