<!-- 首页 -->
<template>
  <div class="wsw-top-bill">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <div class="wsw-top-bill-title">
      外卖配送
    </div>
    <div class="wsw-top-bill-body"></div>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: '',
  components: {},
  setup (propes, { root }) {
    const active = ref(0);
    const onSubmit = () => {
      router.push("/Bill");
    };
    return {
      active,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.wsw-top-bill {
  width: 100%;
  height: 100%;
  background: #ed9428;
  .van-nav-bar {
    opacity: 0.5;
    border: none;
  }
  .wsw-top-bill-title {
    width: 90%;
    height: 30px;
    background: #fff;
  }
  .wsw-top-bill-body {
  }
}
</style>
