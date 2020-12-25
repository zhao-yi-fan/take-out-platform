<template>
  <van-tabbar v-model="active" inactive-color="#ed9428" active-color="#f44336">
    <van-tabbar-item icon="wap-home" to="/Home/Index">首页</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart" to="/Home/Order">订单</van-tabbar-item>
    <van-tabbar-item icon="manager" to="/Home/User">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from 'vue'

export default {
  name: '',
  components: {
  },
  setup (propes, { root }) {
    const active = ref(0);
    return {
      active,
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
