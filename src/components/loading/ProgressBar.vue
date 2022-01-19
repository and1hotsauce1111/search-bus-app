<template>
  <div
    ref="progressBar"
    class="
      progress-bar
      w-full
      opacity-60
      h-1
      transition-all
      ease-linear
      duration-1000
    "
    :class="customClass"
  ></div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from "vue";

export default {
  name: "ProgressBar",
  props: {
    bgColor: {
      type: String,
      default: "light",
    },
    interval: {
      type: Number,
      default: 5,
    },
    opacity: {
      type: Number,
      default: 60,
    },
    updateFunc: {
      type: Function,
    },
  },
  setup(props) {
    let progressPercent = 100;
    let intervalID = null;
    const progressBar = ref(null);

    const customClass = computed(() => {
      return {
        "bg-green-100": props.bgColor === "light",
        "bg-primary-500": props.bgColor === "dark",
        "opacity-60": props.opacity === 60,
        "opacity-100": props.opacity === 100,
      };
    });

    onMounted(() => {
      intervalID = setInterval(() => {
        if (progressPercent === 0) {
          if (props.updateFunc) props.updateFunc();
          progressPercent = 100;
          progressBar.value.style.width = progressPercent + "%";
        } else {
          progressPercent -= props.interval;
          progressBar.value.style.width = progressPercent + "%";
        }
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(intervalID);
    });

    return {
      customClass,
      progressBar,
    };
  },
};
</script>

<style scoped>
</style>