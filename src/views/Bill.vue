<!-- 首页 -->
<template>
  <div class="wsw-top-bill">
    <div class="wsw-top-bill-return">
      <van-icon name="arrow-left" @click="returnGo"/>
    </div>
    <van-notice-bar scrollable text="为减少接触，降低风险，请注意与外卖人员的安全距离。" />
    <div class="wsw-top-bill-title">
      外卖配送
    </div>
    <div class="wsw-top-bill-address">
      <van-field v-model="username" name="收货地址" label="收货地址" placeholder="收货地址" :rules="[{ required: true, message: '请填写收货地址' }]" />
      <p>
        <span>立即送出</span>
        <span class="wsw-r">大概15分钟后抵达</span>
      </p>
    </div>
    <div class="wsw-top-bill-shopList">
      <p>汉堡王</p>
      <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
      <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
      <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
      <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
    </div>
    <van-submit-bar :price="3050" button-text="确认支付" @submit="onSubmit" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: '',
  components: {},
  setup (propes, { root }) {
    const route = useRoute();
    const router = useRouter();
    const active = ref(0);
    const onSubmit = () => {
      Toast.loading({
        message: '正在支付请稍候...',
        forbidClick: true,
      });
      setTimeout(()=>{
        Toast.success('支付成功');
        router.push('/Home/Index')
      }, 2000)
    };
    const returnGo = () =>{
      router.go(-1)
    }
    return {
      active,
      onSubmit,
      returnGo
    }
  }
}
</script>

<style lang="scss" scoped>
.wsw-top-bill {
  width: 100%;
  height: 100%;
  background: #ed9428;
  position: relative;
  padding-top: 40px;
  padding-bottom: 95px;
  .wsw-top-bill-return {
    border: none;
    position: fixed;
    top: 0;
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    width: 100%;
    background: #f6c993;
    z-index: 99;
  }
  .van-notice-bar{
    position: fixed;
    top: 40px;
    width: 100%;
  }
  .wsw-top-bill-title {
    width: 40%;
    height: 30px;
    background: #fff;
    border-radius: 10px 30px 0 0;
    margin-left: 7.5%;
    margin-top: 50px;
    text-align: center;
    line-height: 30px;
  }
  .wsw-top-bill-address {
    width: 85%;
    margin-left: 7.5%;
    background: #fff;
    border-radius: 0 10px 10px 10px;
    font-size: 14px;
    ::v-deep .van-cell {
      border-radius: 0 10px 0 0;
    }
    p {
      padding: 20px 16px;
    }
  }
  .wsw-top-bill-shopList {
    width: 85%;
    margin-left: 7.5%;
    background: #fff;
    border-radius: 10px;
    padding: 20px 0;
    margin-top: 10px;
    p {
      padding: 0 16px;
    }
  }
  .van-submit-bar {
    position: fixed;
    bottom: 0;
  }
}
</style>
