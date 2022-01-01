<template>
  <div>
    <Header />
    <Home />
    <Footer />
  </div>
</template>

<script>
import Home from "@/views/Home.vue";
import Header from "@/layout/Header.vue";
import Footer from "@/layout/Footer.vue";

export default {
  components: {
    Home,
    Header,
    Footer,
  },
  setup() {
    return {};
  },
};
</script>

<style>
</style>