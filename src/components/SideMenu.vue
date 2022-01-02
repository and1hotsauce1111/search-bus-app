<template>
  <div class="container bg-primary-100 w-full md:rounded-lg md:bg-grey-100">
    <SearchBar />
    <!-- <CardList  /> -->
    <CardDetails />
    <!-- KeyBoard -->
    <!-- <key-board
      :toggleKeyBoard="toggleKeyBoard"
      @changeMaxHeight="changeMaxHeight"
    /> -->
  </div>
</template>

<script>
import KeyBoard from "@/components/KeyBoard.vue";
import CardList from "@/components/CardList.vue";
import SearchBar from "@/components/SearchBar.vue";
import CardDetails from "@/components/CardDetails.vue";
import { ref, watch } from "vue";

export default {
  components: {
    KeyBoard,
    CardList,
    SearchBar,
    CardDetails,
  },
  setup() {
    let toggleKeyBoard = ref(true);
    // const cardContainer = ref(null);

    function searchRoute() {
      toggleKeyBoard.value = false;
    }

    function changeMaxHeight() {
      toggleKeyBoard.value = !toggleKeyBoard.value;
    }

    // watch(toggleKeyBoard, (newVal) => {
    //   if (!newVal) {
    //     cardContainer.value.style.maxHeight = "calc(100vh - 5.56rem)";
    //   } else {
    //     cardContainer.value.style.maxHeight = "calc(100vh - 22rem)";
    //   }
    // });

    return {};
  },
};
</script>

<style scoped>
.container {
  width: 26.7rem;
  margin-top: 3.06rem;
}
.search_input--block {
  left: 0;
}
input {
  border-radius: 3.81rem;
}

@media (min-width: 768px) {
  .container {
    margin-top: 0;
    min-height: 45.85rem;
  }
  input {
    border-radius: 0.5rem;
    width: 17rem;
  }
}
</style>