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
      <div v-for="(num, i) in detailNums" :key="i">
        <div
          class="detail flex justify-between items-center mb-4"
          v-for="(card, index) in cardDetails"
          :key="index"
        >
          <span
            v-if="!card.isStop"
            class="
              status
              px-3
              py-2
              border
              rounded-lg
              border-grey-400
              text-grey-400 text-xm text-center
              font-bold
            "
            >{{ card.countDown === -1 ? "此站不停" : "末班已過" }}</span
          >
          <span
            v-else
            class="
              status
              px-3
              py-2
              border
              rounded-lg
              text-xm text-center
              font-bold
            "
            :class="{
              'border-green-100': card.light === 'green',
              'border-alert-400': card.light === 'red',
              'text-primary-400': card.countDown > 5,
              'text-alert-400': card.countDown <= 5,
            }"
            >{{ card.countDown + "分" }}</span
          >
          <span class="grow text-left ml-3 text-grey-500 text-sm">{{
            card.stopName
          }}</span>

          <Popper v-if="card.light === 'grey'" arrow placement="left">
            <button>
              <img class="light-img" src="@/assets/light/grey.png" alt="grey" />
            </button>
            <template #content>
              <div>{{ msg }}</div>
            </template>
          </Popper>
          <Popper v-if="card.light === 'green'" arrow placement="left">
            <button>
              <img
                class="light-img"
                src="@/assets/light/green.png"
                alt="green"
              />
            </button>
            <template #content>
              <div>{{ msg }}</div>
            </template>
          </Popper>
          <Popper v-if="card.light === 'red'" arrow placement="left">
            <button>
              <img class="light-img" src="@/assets/light/red.png" alt="red" />
            </button>
            <template #content>
              <div>{{ msg }}</div>
            </template>
          </Popper>
        </div>

        <div
          class="
            buffer
            bg-primary-100
            text-primary-400
            w-full
            text-center text-xm
            py-0.5
            mb-4
            rounded-lg
          "
        >
          緩衝區
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  setup() {
    let msg = ref("Hello");
    let cardDetails = [
      {
        stopName: "連城中正路口",
        isStop: false,
        countDown: 0,
        light: "grey",
      },
      {
        stopName: "連城錦和路口",
        isStop: false,
        countDown: -1,
        light: "grey",
      },
      {
        stopName: "台貿一村",
        isStop: true,
        countDown: 30,
        light: "green",
      },
      {
        stopName: "連城景平站",
        isStop: true,
        countDown: 5,
        light: "red",
      },
    ];
    let detailNums = 10;

    return { msg, cardDetails, detailNums };
  },
};
</script>

<style scoped>
.detail-container {
  max-height: calc(100vh - 10rem);
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