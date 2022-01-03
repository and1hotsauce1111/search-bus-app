<template>
  <div>
    <main class="main relative">
      <Map />
      <SideMenu />
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