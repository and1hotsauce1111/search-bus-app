<template>
  <div>
    <main class="main relative">
      <Map />
      <Search class="absolute top-8 left-8 z-50" />
    </main>
  </div>
</template>

<script>
import Map from "@/components/Map.vue";
import Search from "@/components/Search.vue";

export default {
  components: {
    Map,
    Search,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
</style>