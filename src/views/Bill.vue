<!-- 付款页面 -->
<template>
  <div class="wsw-top-bill">
    <div class="wsw-top-bill-return">
      <van-icon name="arrow-left" @click="returnGo" />
    </div>
    <van-notice-bar scrollable text="为减少接触，降低风险，请注意与外卖人员的安全距离。" />
    <div class="wsw-top-bill-title">
      外卖配送
    </div>
    <div class="wsw-top-bill-address">
      <p>{{baseAddress}}</p>
      <van-field v-model="address" name="address" label="详细地址" placeholder="详细地址" :rules="[{ required: true, message: '请填写详细地址' }]" />
      <van-field v-model="people" label="收货人" name="people" placeholder="收货人" :rules="[{ required: true, message: '请填写收货人' }]" />
      <van-field v-model="phone" name="phone" type="tel" label="联系方式" placeholder="联系方式" :rules="[{ required: true, message: '请填写联系方式' }]" />
      <p>
        <span>立即送出</span>
        <span class="wsw-r">大概15分钟后抵达</span>
      </p>
    </div>
    <div class="wsw-top-bill-shopList">
      <p>{{}}</p>
      <van-card :num="item.foodNum" :price="item.foodMoney" :desc="item.commodityDescribe" :title="item.foodName" :thumb="item.foodImageUrl" v-for="(item) in currentOrderInfo.foodList" :key="item.foodId" />
    </div>
    <van-submit-bar :price="currentOrderInfo.money * 100" button-text="确认支付" @submit="onSubmit" />
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted, ref } from "vue";
import { Dialog, Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: '',
  components: {},
  setup (propes, { root }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const active = ref(0);
    const model = reactive({
      baseAddress: store.state.baseAddress.name,
      address: '',
      people: '',
      phone: '',
      businessesId: '',
      currentOrderInfo: null
    })
    const onSubmit = async () => {
      if (!model.address) {
        return Toast.fail('请填写收货地址');
      }else if(!model.people){
        return Toast.fail('请填写收货人');
      }else if(!model.phone){
        return Toast.fail('请填写联系方式');
      }
      let code = await store.dispatch('setOrderStatus', {
        address: model.baseAddress + '--' +model.address,
        businessesId: model.businessesId,
        people: model.people,
        phone: model.phone
      });
      Toast.loading({
        message: '正在支付请稍候...',
        forbidClick: true,
      });


      setTimeout(() => {
        Toast.clear();
        if (code) {
          Toast.success('支付成功');
          router.push('/Home/Index')
        } else {
          Toast.fail('支付失败');
        }

      }, 2000)
    };
    const returnGo = () => {
      router.go(-1)
    }
    const init = () => {
      console.log(store.state.orderList, 'store.state.orderList====');
      model.businessesId = route.query.businessesId;
      store.state.orderList.forEach((item, index) => {
        if (item.businessesId == model.businessesId && item.status == 'apply') {
          model.currentOrderInfo = item;
        }
      })
      console.log(model.currentOrderInfo, 'model.currentOrderInfo===');
    }

    init();
    onMounted(() => {
    })
    return {
      ...toRefs(model),
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
  .van-notice-bar {
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
    max-height: calc(100% - 480px);;
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
