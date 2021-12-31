<template>
  <div class="mobile_container bg-primary-100 z-10">
    <!-- search bar -->
    <div
      class="
        search_input--block
        bg-primary-100
        px-5
        pt-4
        pb-4
        w-full
        fixed
        z-30
      "
    >
      <div class="flex justify-center items-center">
        <input
          type="text"
          class="w-80 py-1.5 px-4 outline-none"
          placeholder="尋找公車路線或站牌..."
        />
        <i class="fas fa-search absolute right-12 text-grey-500"></i>
      </div>
    </div>

    <!-- bus card -->
    <div class="card_container--block w-80 my-0 mx-auto">
      <div
        class="card py-3 px-5 mb-5 h-20 bg-grey-100 rounded-lg relative"
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

    <!-- KeyBoard -->
    <key-board />
  </div>
</template>

<script>
import KeyBoard from "@/components/KeyBoard.vue";

export default {
  components: {
    KeyBoard,
  },
  setup() {
    const listNum = 30;
    return {
      listNum,
    };
  },
};
</script>

<style scoped>
.mobile_container {
  display: none;
  min-height: calc(100vh - 5.56rem);
  padding-bottom: 1.5rem;
  margin-top: 3.06rem;
}
.search_input--block {
  left: 0;
}
input {
  border-radius: 3.81rem;
}
.card_container--block {
  padding-top: 4.25rem;
}
.card:last-child {
  margin-bottom: 0;
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

@media (max-width: 414px) {
  .mobile_container {
    display: block;
  }
}
</style>