<template>
  <van-tabbar
    v-model="active"
    inactive-color="#ed9428"
    active-color="#f44336"
    @change="change"
  >
    <van-tabbar-item
      :icon="item.icon"
      :name="item.name"
      :to="item.path"
      v-for="(item, index) in list"
      :key="index"
      >{{ item.title }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/userStore";
const userStore = useUserStore();

const route = useRoute();
let list = reactive([
  {
    name: "index",
    icon: "wap-home",
    path: "/Home/Index",
    title: "首页",
  },
  {
    name: "order",
    icon: "shopping-cart",
    path: "/Home/Order",
    title: "订单",
  },
  {
    name: "user",
    icon: "manager",
    path: "/Home/User",
    title: "我的",
  },
]);
const model = reactive({
  active: "index",
  loginInfo: computed(() => {
    return userStore.loginInfo;
  }),
});

const change = (name) => {
  if (!model.loginInfo) {
    model.active = "index";
  }
};
const init = () => {
  let item = list.find((item) => {
    return route.path == item.path;
  });
  if (item) {
    model.active = item.name;
  }
};
init();
</script>

<style lang="scss" scoped></style>
