<template>
  <!-- bus card -->
  <div
    ref="cardContainer"
    class="
      card_container--block
      w-80
      my-0
      mx-auto
      overflow-scroll
      no-scrollbar
      duration-500
      rounded-lg
      md:px-8 md:mx-0 md:w-full
    "
  >
    <div
      class="
        card
        py-3
        px-5
        mb-5
        h-20
        bg-grey-100
        rounded-lg
        relative
        shadow-md
        md:shadow-none
        md:py-0
        md:px-0
        md:border-b
        md:border-grey-300
        md:rounded-none
        md:last:border-0
      "
      v-for="(list, index) in listNum"
      :key="index"
    >
      <div class="bus-info">
        <div class="bus-num flex items-center justify-between mb-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-lg pr-2">307</span>
            <span
              class="
                rounded-lg
                bg-primary-400
                text-xs
                px-1.5
                py-0.5
                text-grey-100
                inline-block
              "
              >台北市</span
            >
          </div>
          <i class="fas fa-angle-right text-grey-500"></i>
        </div>
        <div class="bus-station flex justify-between items-center">
          <span class="start text-sm text-grey-500">撫遠街</span>
          <span class="end text-sm text-grey-500">板橋</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const listNum = 30;
    return { listNum };
  },
};
</script>

<style scoped>
.card_container--block {
  padding-top: 4.25rem;
  max-height: calc(100vh - 22rem);
}
.start::after {
  position: absolute;
  top: 3.43rem;
  left: 4.875rem;
  content: "";
  height: 1px;
  width: 55.8%;
  background: #767676;
}
.start::before {
  content: "";
  position: absolute;
  left: 4.85rem;
  top: 3.375rem;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background: #767676;
}
.end::before {
  content: "";
  position: absolute;
  right: 3.85rem;
  top: 3.375rem;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background: #767676;
}
@media (min-width: 768px) {
  .card_container--block {
    padding-top: 2rem;
    max-height: 38.85rem;
  }
  .start::after {
    width: 60.8%;
  }
}
</style>