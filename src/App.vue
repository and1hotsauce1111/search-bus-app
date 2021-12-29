<template>
  <div>
    <Header />
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Header from "./layout/Header.vue";

export default {
  components: {
    Home,
    Header,
  },
  setup() {
    return {};
  },
};
</script>

<style>
</style>