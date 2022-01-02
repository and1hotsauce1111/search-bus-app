<template>
  <div class="search-container rounded-lg bg-grey-100">
    <MobileSearch />
  </div>
</template>

<script>
import MobileSearch from "@/components/MobileSearch.vue";

export default {
  components: {
    MobileSearch,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
</style>