<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import MobileHome from "@/views/MobileHome.vue";
import Header from "@/layout/Header.vue";
import Footer from "@/layout/Footer.vue";

export default {
  components: {
    MobileHome,
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