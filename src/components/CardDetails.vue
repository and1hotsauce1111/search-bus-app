<template>
  <div class="detail-container overflow-scroll no-scrollbar relative">
    <div
      class="
        sticky
        top-0
        left-0
        w-full
        change-direction
        flex
        justify-between
        items-center
        bg-primary-200
        px-5
        py-1
      "
    >
      <button class="left-btn px-12 py-1 w-3/6 text-primary-500">
        往 撫遠街
      </button>
      <button class="right-btn px-12 py-1 w-3/6 text-grey-100">往 板橋</button>
    </div>

    <!-- card details -->
    <div class="card-details-block px-4 pt-3 md:px-8 md:pt-7">
      <div class="detail flex justify-between items-center mb-4">
        <span
          class="
            status
            px-3
            py-2
            border
            rounded-lg
            border-grey-400
            text-grey-500 text-xm text-center
            font-bold
          "
          >末班已過</span
        >
        <span class="grow text-left ml-3 text-grey-500 text-sm"
          >連城中正路口</span
        >

        <Popper arrow placement="left">
          <button>
            <img class="light-img" src="@/assets/light/grey.png" alt="grey" />
          </button>
          <template #content>
            <div>{{ msg }}</div>
          </template>
        </Popper>
      </div>
      <div class="detail flex justify-between items-center mb-4">
        <span
          class="
            status
            px-3
            py-2
            border
            rounded-lg
            border-grey-400
            text-grey-500 text-xm text-center
            font-bold
          "
          >此站不停</span
        >
        <span class="grow text-left ml-3 text-grey-500 text-sm"
          >連城錦和路口</span
        >
        <img class="light-img" src="@/assets/light/grey.png" alt="grey" />
      </div>
      <div class="detail flex justify-between items-center mb-4">
        <span
          class="
            status
            px-3
            py-2
            border
            rounded-lg
            border-green-100
            text-primary-400 text-xm text-center
            font-bold
          "
          >10分</span
        >
        <span class="grow text-left ml-3 text-grey-500 text-sm">台貿一村</span>
        <img class="light-img" src="@/assets/light/green.png" alt="green" />
      </div>
      <div class="detail flex justify-between items-center mb-4">
        <span
          class="
            status
            px-3
            py-2
            border
            rounded-lg
            border-alert-400
            text-alert-400 text-xm text-center
            font-bold
          "
          >10分</span
        >
        <span class="grow text-left ml-3 text-grey-500 text-sm"
          >連城景平站</span
        >
        <img class="light-img" src="@/assets/light/red.png" alt="red" />
      </div>

      <div
        class="
          buffer
          bg-primary-100
          text-primary-400
          w-full
          text-center text-xm
          py-0.5
          rounded-lg
        "
      >
        緩衝區
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let msg = ref("Hello");

    return { msg };
  },
};
</script>

<style scoped>
.detail-container {
  max-height: calc(100vh - 22rem);
}
.left-btn::after {
  position: absolute;
  content: "";
  width: 1px;
  height: 45%;
  left: 50%;
  top: 25%;
  background: #fff;
}
.status {
  min-width: 4.5rem;
}

@media (min-width: 768px) {
  .detail-container {
    max-height: 38.85rem;
  }
  .light-img {
    width: 1rem;
  }
}
</style>