<template>
  <div class="component-prompt" v-if="!userStore.isLogin">
    <span>还未登陆？</span>
    <van-button type="warning" size="mini" class="r" to="/newLogin"
      >马上登陆</van-button
    >
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.component-prompt {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 50px;
  z-index: 2000;
  background: #333;
  opacity: 0.7;
  line-height: 50px;
  span {
    margin-left: 10px;
    display: inline-block;
    color: #fff;
    font-weight: bolder;
  }
  :deep(.van-button) {
    margin: 14px 10px 0 0;
  }
}
</style>
