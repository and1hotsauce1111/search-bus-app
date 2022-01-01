<template>
  <header
    class="
      header-container
      flex
      justify-center
      md:justify-between
      items-center
      px-6
      py-3
      md:px md:py-5 md:relative
      w-full
      fixed
      top-0
      left-0
      z-30
      bg-grey-100
    "
  >
    <div class="hamberger absolute left-3 text-grey-500">
      <i class="fas fa-bars hamburger-icon"></i>
    </div>
    <div class="logo">
      <img
        class="mobile-logo"
        src="../assets/logo/mobile-logo.png"
        alt="mobileLogo"
      />
      <img
        class="desktop-logo"
        src="../assets/logo/desktop-logo.png"
        alt="desktopLogo"
      />
    </div>
    <div class="nav flex justify-center items-center">
      <button
        class="
          flex
          justify-center
          items-center
          border border-solid border-primary-500
        "
      >
        <span class="text-sm mr-2 text-primary-500">找公車</span>
        <i class="fas fa-bus-alt nav-icon-size text-primary-500"></i>
      </button>
      <button
        class="
          flex
          justify-center
          items-center
          border border-solid border-primary-500
        "
      >
        <span class="text-sm mr-2 text-primary-500">找客運</span>
        <i class="fas fa-road nav-icon-size text-primary-400"></i>
      </button>
      <button
        class="
          flex
          justify-center
          items-center
          border border-solid border-primary-500
        "
      >
        <span class="text-sm mr-2 text-primary-500">找單車</span>
        <i class="fas fa-bicycle nav-icon-size text-primary-400"></i>
      </button>
      <button
        class="
          flex
          justify-center
          items-center
          border border-solid border-grey-300
        "
        disabled
      >
        <span class="text-sm mr-2 text-grey-300">轉乘資訊</span>
        <i class="fas fa-subway nav-icon-size text-grey-300"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header-container {
  height: 3.06rem;
}
.hamburger-icon {
  font-size: 1.5rem;
}
.nav {
  display: none;
}
.nav-icon-size {
  font-size: 0.875rem;
}
.nav button {
  border-radius: 3.93rem;
  padding: 0.56rem 1.31rem;
  margin-right: 1rem;
}
.nav button:last-child {
  margin-right: 0;
}
.desktop-logo {
  display: none;
}

@media (min-width: 768px) {
  .header-container {
    height: 4.375rem;
  }
  .hamberger {
    display: none;
  }
  .nav {
    display: flex;
  }
  .mobile-logo {
    display: none;
  }
  .desktop-logo {
    display: block;
  }
}
</style>