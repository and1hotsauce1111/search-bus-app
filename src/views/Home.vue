<template>
  <div>
    <MobileHome />
    <main class="main">
      <Map />
    </main>
  </div>
</template>

<script>
import MobileHome from "@/views/MobileHome.vue";
import Map from "@/components/Map.vue";

export default {
  components: {
    MobileHome,
    Map,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.main {
  display: none;
}
@media (min-width: 768px) {
  .main {
    display: block;
  }
}
</style>