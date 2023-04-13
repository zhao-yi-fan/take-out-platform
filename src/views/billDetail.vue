<template>
  <div class="top-bill">
    <div class="top-bill-return">
      <van-icon name="arrow-left" @click="returnGo" />
    </div>
    <van-notice-bar
      scrollable
      text="为减少接触，降低风险，请注意与外卖人员的安全距离。"
    />
    <div class="top-bill-title">外卖配送</div>
    <div class="top-bill-address">
      <p>{{ baseAddress }}</p>
      <van-field
        v-model="form.address"
        name="address"
        label="详细地址"
        placeholder="详细地址"
        :rules="[{ required: true, message: '请填写详细地址' }]"
      />
      <van-field
        v-model="form.people"
        label="收货人"
        name="people"
        placeholder="收货人"
        :rules="[{ required: true, message: '请填写收货人' }]"
      />
      <van-field
        v-model="form.phone"
        name="phone"
        type="tel"
        label="联系方式"
        placeholder="联系方式"
        :rules="[{ required: true, message: '请填写联系方式' }]"
      />
      <p>
        <span>立即送出</span>
        <span class="r">大概15分钟后抵达</span>
      </p>
    </div>
    <div class="top-bill-shopList">
      <van-card
        v-for="item in currentOrderInfo.foodList"
        :num="item.foodNum"
        :price="item.foodMoney"
        :desc="item.commodityDescribe"
        :title="item.foodName"
        :thumb="item.foodImageUrl"
        :key="item.foodId"
      />
    </div>
    <van-submit-bar
      :price="currentOrderInfo.money * 100"
      button-text="确认支付"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import {
  showSuccessToast,
  showFailToast,
  showLoadingToast,
  closeToast,
} from "vant";
import { useRouter, useRoute, LocationQueryValue } from "vue-router";
import { useShopStore } from "@/stores/shopStore";
import { useOrderStore } from "@/stores/orderStore";

const shopStore = useShopStore();
const orderStore = useOrderStore();
const route = useRoute();
const router = useRouter();
const baseAddress = ref(shopStore.baseAddress.name);
const currentOrderInfo = ref<{
  foodList: {
    foodId: string,
    foodName: string,
    foodMoney: number,
    foodNum: number,
    foodImageUrl: string
    commodityDescribe: string;
  }[];
  money: number;
}>({
  foodList: [],
  money: 0,
});
const form = reactive<{
  address: string;
  people: string;
  phone: string;
  businessesId: string | null | LocationQueryValue[];
}>({
  address: "",
  people: "",
  phone: "",
  businessesId: "",
});
const onSubmit = async () => {
  if (!form.address) {
    return showFailToast("请填写收货地址");
  } else if (!form.people) {
    return showFailToast("请填写收货人");
  } else if (!form.phone) {
    return showFailToast("请填写联系方式");
  }
  let code = await orderStore.setOrderStatus({
    address: baseAddress + "--" + form.address,
    businessesId: form.businessesId,
    people: form.people,
    phone: form.phone,
  });
  showLoadingToast({
    message: "正在支付请稍候...",
    forbidClick: true,
  });

  setTimeout(() => {
    closeToast();
    if (code) {
      showSuccessToast("支付成功");
      router.push("/Home/Index");
    } else {
      showFailToast("支付失败");
    }
  }, 2000);
};
const returnGo = () => {
  router.go(-1);
};
const init = () => {
  form.businessesId = route.query.businessesId;
  const item = orderStore.orderList.find(
    (item) => item.businessesId == form.businessesId && item.status == "apply"
  );
  currentOrderInfo.value = item;
};

init();
</script>

<style lang="scss" scoped>
.top-bill {
  width: 100%;
  background: #ed9428;
  position: relative;
  padding-top: 40px;
  padding-bottom: 95px;
  .top-bill-return {
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
  .top-bill-title {
    width: 40%;
    height: 30px;
    background: #fff;
    border-radius: 10px 30px 0 0;
    margin-left: 7.5%;
    margin-top: 50px;
    text-align: center;
    line-height: 30px;
  }
  .top-bill-address {
    width: 85%;
    margin-left: 7.5%;
    background: #fff;
    border-radius: 0 10px 10px 10px;
    font-size: 14px;
    :deep(.van-cell) {
      border-radius: 0 10px 0 0;
    }
    p {
      padding: 20px 16px;
    }
  }
  .top-bill-shopList {
    max-height: calc(100% - 480px);
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
