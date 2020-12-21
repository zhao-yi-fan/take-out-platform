<!-- 首页 -->
<template>
  <div class="wsw-top-Home">
    <router-view></router-view>
    <van-tabbar v-model="active" inactive-color="#ed9428" active-color="#f44336">
      <van-tabbar-item icon="home-o" to="/Home/Index">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/Home/Order">订单</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/Home/User">我的</van-tabbar-item>
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
