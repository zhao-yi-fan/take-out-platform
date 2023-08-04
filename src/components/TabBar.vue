<template>
  <van-tabbar
    v-model="active"
    inactive-color="#ed9428"
    active-color="#f44336"
    @change="change"
  >
    <van-tabbar-item
      v-for="(item, index) in list"
      :key="index"
      :icon="item.icon"
      :name="item.name"
      :to="item.path"
      >{{ item.title }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const route = useRoute();
const list = reactive([
  {
    name: "index",
    icon: "wap-home",
    path: "/home/index",
    title: "首页",
  },
  {
    name: "order",
    icon: "shopping-cart",
    path: "/home/order",
    title: "订单",
  },
  {
    name: "user",
    icon: "manager",
    path: "/home/user",
    title: "我的",
  },
]);
const active = ref("index");
const model = reactive({
  loginInfo: computed(() => {
    return userStore.loginInfo;
  }),
});

const change = () => {
  if (!model.loginInfo) {
    active.value = "index";
  }
};
const init = () => {
  const item = list.find((item) => {
    return route.path == item.path;
  });
  if (item) {
    active.value = item.name;
  }
};
init();
</script>

<style lang="scss" scoped></style>
