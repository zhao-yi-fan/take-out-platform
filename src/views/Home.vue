<!-- 首页 -->
<template>
  <div class="wsw-top-Home">
    <router-view></router-view>
    <van-tabbar v-model="active" inactive-color="#ed9428" active-color="#f44336">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: '',
  components: {},
  setup (propes, { root }) {
    const active = ref(0);

    return {
      active,
    }
  }
}
</script>

<style lang="scss" scoped>
.wsw-top-Home{
  width: 100%;
  height: 100%;
}
</style>
