<template>
  <div id="map" class="z-10"></div>
</template>

<script>
import { onMounted } from "vue";
import DrawMap from "@/utils/drawMap";

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
  height: calc(100vh - 5.56rem);
  margin-top: 3.06rem;
}

@media (min-width: 768px) {
  #map {
    height: calc(100vh - 8.125rem);
    margin-top: 0;
  }
}
</style>