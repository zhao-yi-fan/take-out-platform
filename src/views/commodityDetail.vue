<template>
  <div class="top-commodity">
    <van-nav-bar
      :title="currentShopInfo?.shopsName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon :name="collectionStatus ? 'star' : 'star-o'" size="18" />
        收藏
      </template>
    </van-nav-bar>
    <div class="top-commodity-shop">
      <img :src="currentShopInfo.signImage" alt="" />
      <div class="top-commodity-shop-card">
        <p>{{ currentShopInfo.shopsName }}</p>
        <div>
          评分：<span>{{ currentShopInfo.score }}</span>
        </div>
        <van-tag type="danger">优质商家</van-tag>
        <br />
        <span class="top-commodity-shop-card-address"
          >地址：{{ currentShopInfo.address }}</span
        >
        <van-notice-bar scrollable :text="currentShopInfo.notice" />
      </div>
      <div class="top-commodity-list">
        <van-tree-select
          v-model:active-id="activeId"
          v-model:main-active-index="activeIndex"
          :items="items"
        >
          <template #content>
            <van-card
              v-for="(item, index) in items[activeIndex].children"
              :key="index"
              :price="item.commodityMoney"
              :desc="item.commodityDescribe"
              :title="item.commodityName"
              :thumb="item.commodityImage"
            >
              <template #footer>
                <van-button
                  icon="minus"
                  type="primary"
                  size="mini"
                  round
                  plain
                  @click="addShop('delect', item.num, index)"
                />
                <span>{{ item.num }}</span>
                <van-button
                  icon="plus"
                  type="primary"
                  size="mini"
                  round
                  @click="addShop('add', item.num, index)"
                />
              </template>
            </van-card>
          </template>
        </van-tree-select>
      </div>
      <van-submit-bar
        :price="price"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
    <prompt></prompt>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref } from "vue";
import {
  showToast,
  showSuccessToast,
  showFailToast,
  showLoadingToast,
  closeToast,
} from "vant";
import { useRouter, useRoute, LocationQueryValue } from "vue-router";
import prompt from "@/components/prompt";
import { useUserStore } from "@/stores/userStore";
import { useOrderStore } from "@/stores/orderStore";
import { useShopStore } from "@/stores/shopStore";
import { useCollectionStore } from "@/stores/collectionStore";
import { Shop } from "@/types/shop";

const shopStore = useShopStore();
const orderStore = useOrderStore();
const userStore = useUserStore();
const collectionStore = useCollectionStore();
const route = useRoute();
const router = useRouter();
const activeId = ref(1);
const activeIndex = ref(0);
const shopsList = computed(() => shopStore.shopsList);
const currentShopInfo = ref<Shop | null>(null);
const items = ref({});
const shopsId = ref(Number(route.query.shopsId as LocationQueryValue));

const price = ref(0);
const collectionStatus = computed(() => {
  return collectionStore.isCollection(shopsId.value);
});

const onClickLeft = () => {
  router.go(-1);
};

const onSubmit = async () => {
  if (!userStore.loginInfo) return showToast("您未登录");
  if (price.value === 0) {
    return showFailToast("请选择商品");
  }
  const resObj = await orderStore.setOrderInfo({
    shopsId: shopsId.value,
    userId: userStore.loginInfo?.userId || null,
    foodList: currentShopInfo.value.commodity.reduce((prev, cur) => {
      return prev.concat(
        cur.children
          .filter((item) => item.num && item.num > 0)
          .map((item) => {
            return {
              foodId: cur.classificationId + "_" + item.commodityId,
              foodNum: item.num,
              foodMoney: item.commodityMoney,
              foodName: item.commodityName,
              foodImageUrl: item.commodityImage,
            };
          })
      );
    }, []),
    money: price.value / 100,
  });
  showLoadingToast({
    message: "订单提交中...",
    forbidClick: true,
  });
  setTimeout(() => {
    closeToast();
    if (resObj.code) {
      showSuccessToast("挑选成功");
      router.push({
        path: "/billDetail",
        query: {
          businessesId: resObj.businessesId,
        },
      });
    } else {
      showFailToast("下单失败");
    }
  }, 1000);
};
const init = () => {
  const shop = shopsList.value.find((item) => item.shopsId === shopsId.value);
  if (shop) {
    currentShopInfo.value = shop;
    items.value = (currentShopInfo.value.commodity || []).map((item, index) => {
      return {
        ...item,
        children: item.children.map((son, i) => {
          return {
            ...son,
            num: 0,
          };
        }),
      };
    });
  }
};
init();

const onClickRight = () => {
  collectionStore.addCollection({
    shopId: shopsId.value,
  });
};
const addShop = (status, num, i) => {
  if (status == "delect") {
    if (num - 1 >= 0) {
      currentShopInfo.value.commodity[activeIndex.value].children[i].num =
        num - 1;
    }
  } else {
    currentShopInfo.value.commodity[activeIndex.value].children[i].num =
      num + 1;
  }
  const commodity = currentShopInfo.value.commodity;
  let sum = 0;
  commodity.forEach((item, index) => {
    if (Array.isArray(item.children) && item.children.length > 0) {
      item.children.forEach((sonItem, sonIndex) => {
        if (typeof sonItem.num === "number") {
          sum += sonItem.num * Number(sonItem.commodityMoney);
        }
      });
    }
  });
  price.value = sum * 100;
};
</script>

<style lang="scss" scoped>
$a: 100vh;
$b: 390px;
.top-commodity {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fefcf9;
  :deep(.van-nav-bar) {
    .van-nav-bar__left i,
    .van-nav-bar__left span,
    .van-nav-bar__right,
    .van-nav-bar__right i {
      color: #ed9428;
    }
  }
  .top-commodity-shop {
    img {
      width: 100%;
      height: 220px;
    }
    .top-commodity-shop-card {
      width: 80%;
      height: 150px;
      background: #fff;
      // opacity: 0.8;
      border-radius: 10px;
      position: absolute;
      left: 0;
      right: 0;
      top: 150px;
      margin: 0 auto;
      padding: 5px 10px;
      p {
        font-weight: bolder;
      }
      div {
        font-size: 14px;
        text-align: right;
        span {
          color: red;
          font-weight: bolder;
        }
      }
      .top-commodity-shop-card-address {
        font-size: 12px;
        color: #333;
      }
    }
  }
  .top-commodity-list {
    margin-top: 45px;
    height: calc(#{$a} - #{$b});
    :deep(.van-tree-select) {
      height: 100% !important;
    }
    button {
      vertical-align: middle;
      margin: 0 3px;
    }
  }
  :deep(.van-submit-bar__text) {
    text-align: left;
  }
}
</style>
