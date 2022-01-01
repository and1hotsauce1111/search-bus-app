<template>
  <div
    class="
      header-container
      flex
      justify-center
      items-center
      px-6
      py-3
      w-full
      fixed
      top-0
      left-0
      z-30
      bg-grey-100
    "
  >
    <div class="hamberger absolute left-3 text-grey-500">
      <i class="fas fa-bars icon"></i>
    </div>
    <div class="logo">
      <img src="../assets/logo.png" alt="logo" />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.header-container {
  height: 3.06rem;
}
.icon {
  font-size: 1.5rem;
}

@media (min-width: 768px) {
  .hamberger {
    display: none;
  }
}
</style>