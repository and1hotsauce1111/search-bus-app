<template>
  <div id="map"></div>
</template>

<script>
import { onMounted } from "vue";
import DrawMap from "@/utils/getGeoLocation";

export default {
  setup() {
    onMounted(() => {
      const map = new DrawMap();
      map.init();
    });

    return {};
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: calc(100vh - 8.125rem);
}
</style>