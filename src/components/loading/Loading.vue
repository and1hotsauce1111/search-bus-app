<template>
  <div
    class="
      loading
      fixed
      top-0
      left-0
      w-screen
      h-screen
      bg-grey-100
      opacity-90
      flex
      justify-center
      items-center
    "
  >
    <div class="pin"></div>
    <div class="pulse"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  setup() {
    return {};
  },
};
</script>

<style scoped>
.loading {
  z-index: 999;
}

.pin {
  width: 50px;
  height: 50px;
  border-radius: 50% 50% 50% 0;
  background: #4ea476;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -45px 0 0 -30px;
  z-index: 999;
}
.pin::after {
  content: "";
  width: 25px;
  height: 25px;
  margin: 11px 0 0 14px;
  background: #fff;
  position: absolute;
  border-radius: 50%;
}
.pulse {
  background: #88c6a5;
  border-radius: 50%;
  height: 15px;
  width: 25px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 12px 0px 0px -17px;
  transform: rotateX(55deg);
  z-index: -2;
  z-index: 999;
}
.pulse::after {
  content: "";
  border-radius: 50%;
  height: 50px;
  width: 50px;
  position: absolute;
  margin: -20px 0 0 -13px;
  animation: pulse 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;
  box-shadow: 0 0 1px 2px #88c6a5;
  animation-delay: 1.1s;
}

@keyframes pulse {
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
  }
}
</style>
