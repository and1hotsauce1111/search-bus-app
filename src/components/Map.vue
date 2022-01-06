<template>
  <div id="map" class="z-10"></div>
</template>

<script>
import { onMounted, toRefs } from "vue";
import DrawMap from "@/utils/drawMap";

export default {
  name: "Map",
  props: {
    mapLocation: {
      type: Object,
      required: true,
      default: {},
    },
  },
  setup(props, { emit }) {
    onMounted(() => {
      const { mapLocation } = toRefs(props);
      const map = new DrawMap();
      map.init();
      if (!mapLocation.value.coords) {
        map
          .getGeoInfo()
          .then((position) => {
            map.update(position);
            emit("toggleAgreeLocation");
          })
          .catch(({ errMsg, defaultPosition }) => {
            map.map.setView(defaultPosition, 18);
          });
      } else {
        map.update(mapLocation.value);
      }
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