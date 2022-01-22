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
      md:px-9 md:py-5 md:relative
      w-full
      fixed
      top-0
      left-0
      z-30
      bg-grey-100
    "
  >
    <div
      v-if="showHamburger"
      class="hamberger absolute left-3 text-grey-500 cursor-pointer"
      @click="toggleMobileNav"
    >
      <i class="fas fa-bars hamburger-icon"></i>
    </div>
    <div
      v-else
      class="close absolute left-3 text-grey-500 cursor-pointer"
      @click="toggleMobileNav"
    >
      <img src="@/assets/Close.png" alt="close" />
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
    <!-- mobile nav -->
    <div
      ref="mobileNav"
      class="mobile-nav-container fixed top-0 w-screen h-screen bg-primary-200"
    >
      <ul class="mobile-nav-list px-11 pt-28 text-primary-500 text-lg">
        <li
          class="
            item
            flex
            justify-between
            items-center
            cursor-pointer
            border-b border-primary-300
            pb-7
          "
        >
          <i class="fas fa-bus-alt basis-2/12 mr-3"></i>
          <h2 class="font-bold basis-10/12">找公車</h2>
        </li>
        <li
          class="
            item
            flex
            justify-between
            items-center
            cursor-pointer
            border-b border-primary-300
            pt-7
            pb-7
          "
        >
          <i class="fas fa-road basis-2/12 mr-3"></i>
          <h2 class="font-bold basis-10/12">找客運</h2>
        </li>
        <li
          class="
            item
            flex
            justify-between
            items-center
            cursor-pointer
            border-b border-primary-300
            pb-7
            pt-7
          "
        >
          <i class="fas fa-bicycle basis-2/12 mr-3"></i>
          <h2 class="font-bold basis-10/12">找單車</h2>
        </li>
        <li
          class="
            item
            flex
            justify-between
            items-center
            cursor-pointer
            text-primary-300
            pt-7
            pb-7
          "
        >
          <i class="fas fa-subway basis-2/12 mr-3"></i>
          <h2 class="font-bold basis-10/12">轉乘資訊</h2>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let showHamburger = ref(true);
    const mobileNav = ref(null);

    function toggleMobileNav() {
      if (mobileNav.value) {
        mobileNav.value.classList.toggle("active");
        showHamburger.value = !showHamburger.value;
      }
    }

    return {
      mobileNav,
      showHamburger,
      toggleMobileNav,
    };
  },
};
</script>

<style scoped>
.header-container {
  height: 3.06rem;
}
.hamburger-icon {
  font-size: 1.5rem;
}
.close {
  z-index: 999;
}
.mobile-nav-container {
  z-index: 99;
  transform: translateX(-150%);
  transition: all 0.5s linear;
  transform-origin: left;
}
.mobile-nav-container.active {
  transform: translateX(0);
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
    width: 95%;
  }
}
</style>