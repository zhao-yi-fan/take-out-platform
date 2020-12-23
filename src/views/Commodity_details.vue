<!-- 商品详情 -->
<template>
  <div class="wsw-top-Commodity">
    <van-nav-bar :title="currentShopInfo.shopsName" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon :name="collectionStatus ? 'star' : 'star-o'" size="18" />
        收藏
      </template>
    </van-nav-bar>
    <div class="wsw-top-Commodity-shop">
      <img :src="currentShopInfo.signImage" alt="" />
      <div class="wsw-top-Commodity-shop-card">
        <p>{{ currentShopInfo.shopsName }}</p>
        <div>
          评分：<span>{{ currentShopInfo.score }}</span>
        </div>
        <van-tag type="danger">优质商家</van-tag>
        <br />
        <span class="wsw-top-Commodity-shop-card-address">地址：{{ currentShopInfo.address }}</span>
        <van-notice-bar scrollable :text="currentShopInfo.notice" />
      </div>
      <div class="wsw-top-Commodity-list">
        <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items">
          <template #content>
            <van-card v-for="(item, index) in items[activeIndex].children" :key="index" :price="item.commodityMoney" :desc="item.commodityDescribe" :title="item.commodityName" :thumb="item.commodityImage">
              <template #footer>
                <van-button icon="minus" type="primary" size="mini" round plain @click="addShop('delect', item.num, index)" />
                <span>{{ item.num }}</span>
                <van-button icon="plus" type="primary" size="mini" round @click="addShop('add', item.num, index)" />
              </template>
            </van-card>
          </template>
        </van-tree-select>
      </div>
      <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit" />
    </div>
    <wsw-prompt></wsw-prompt>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from "vue";
import { Dialog, Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import prompt from "@/components/Prompt.vue"

export default {
  name: "",
  components: {
    "wsw-prompt": prompt
  },
  setup (propes, { root }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const model = reactive({
      activeId: 1,
      activeIndex: 0,
      shopsList: computed(() => {
        return store.state.shopsList;
      }),
      collectionList: computed(() => {
        return store.state.collectionList;
      }),
      currentShopInfo: null,
      items: null,
      shopsId: "",
      price: 0,
      collectionStatus: false,
    });

    const onClickLeft = () => {
      Dialog.confirm({
        title: "",
        message: "返回首页会清空购物车",
      })
        .then(() => {
          router.push("/Home/Index");
        })
        .catch(() => {
          // on cancel
        });
    };

    const onSubmit = async () => {
      if (!store.state.loginInfo) return Toast("您未登录");
      if (model.price == "0") {
        console.log(model.price);
        return Toast.fail("请选择商品");
      }
      let commodity = model.currentShopInfo.commodity;
      let foodArr = [];
      commodity.forEach((item, index) => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          item.children.forEach((sonItem, sonIndex) => {
            if (sonItem.num && sonItem.num > 0) {
              foodArr.push({
                foodId: item.classificationId + "_" + sonItem.commodityId,
                foodNum: sonItem.num,
                foodMoney: sonItem.commodityMoney,
                foodName: sonItem.commodityName,
                foodImageUrl: sonItem.commodityImage,
              });
            }
          });
        }
      });
      var obj = {
        shopsId: model.shopsId,
        userId: store.state.loginInfo ? store.state.loginInfo.userId : null,
        foodList: foodArr,
        money: model.price / 100,
      };
      console.log(model.currentShopInfo);
      console.log(obj, "obj====");
      let resObj = await store.dispatch("setOrderInfo", obj);
      Toast.loading({
        message: "订单提交中...",
        forbidClick: true,
      });
      setTimeout(() => {
        Toast.clear();
        if (resObj.code) {
          Toast.success("下单成功");
          router.push({
            path: "/Bill",
            query: {
              businessesId: resObj.businessesId,
            },
          });
          console.log(store.state.orderList);
        } else {
          Toast.fail("下单失败");
        }
      }, 1000);
    };
    // watch(()=>route.path,(newValue)=>{

    // })
    const init = (shopsId) => {
      for (let i = 0; i < model.shopsList.length; i++) {
        let item = model.shopsList[i];
        if (shopsId === item.shopsId) {
          model.currentShopInfo = item;
          model.items = model.currentShopInfo.commodity;
          console.log(model.items);
          console.log(model, "a");
        }
      }
    };
    model.shopsId = route.query.shopsId;
    init(model.shopsId);
    console.log(model.currentShopInfo);
    model.currentShopInfo.commodity.forEach((item, index) => {
      item.children.forEach((son, i) => {
        son.num = 0;
      });
    });
    model.collectionList.forEach((item, index) => {
      if (!store.state.loginInfo) return;
      if (item.userId == store.state.loginInfo.userId) {
        item.shopsIds.forEach((el, inde) => {
          if (el == model.shopsId) {
            console.log(el);
            model.collectionStatus = true;
          }
        });
      }
    });
    const onClickRight = () => {
      if (!store.state.loginInfo) return Toast("您未登录");
      if (model.collectionStatus) {
        model.collectionList.forEach((item, index) => {
          if (item.userId == store.state.loginInfo.userId) {
            item.shopsIds.forEach((el, inde) => {
              if (el == model.shopsId) {
                console.log(el);
                item.shopsIds.splice(inde, 1);
                model.collectionStatus = false;
                Toast("取消收藏");
              }
            });
          }
        });
      } else {
        model.collectionList.forEach((item, index) => {
          if (item.userId == store.state.loginInfo.userId) {
            item.shopsIds.push(model.shopsId);
            model.collectionStatus = true;
            Toast("收藏成功");
          }
        });
      }
    };
    const addShop = (status, num, i) => {
      if (status == "delect") {
        if (num - 1 >= 0) {
          model.currentShopInfo.commodity[model.activeIndex].children[i].num =
            num - 1;
        }
      } else {
        model.currentShopInfo.commodity[model.activeIndex].children[i].num =
          num + 1;
      }
      let commodity = model.currentShopInfo.commodity;
      let sum = 0;
      commodity.forEach((item, index) => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          item.children.forEach((sonItem, sonIndex) => {
            if (typeof sonItem.num == "number") {
              sum += sonItem.num * Number(sonItem.commodityMoney);
            }
          });
        }
      });
      model.price = sum * 100;
    };

    return {
      ...toRefs(model),
      onClickLeft,
      onClickRight,
      onSubmit,
      addShop,
    };
  },
};
</script>

<style lang="scss" scoped>
$a: 100vh;
$b: 390px;
.wsw-top-Commodity {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fefcf9;
  ::v-deep .van-nav-bar {
    .van-nav-bar__left i,
    .van-nav-bar__left span,
    .van-nav-bar__right,
    .van-nav-bar__right i {
      color: #ed9428;
    }
  }
  .wsw-top-Commodity-shop {
    img {
      width: 100%;
      height: 220px;
    }
    .wsw-top-Commodity-shop-card {
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
      .wsw-top-Commodity-shop-card-address {
        font-size: 12px;
        color: #333;
      }
    }
  }
  .wsw-top-Commodity-list {
    margin-top: 45px;
    height: calc(#{$a} - #{$b});
    ::v-deep .van-tree-select {
      height: 100% !important;
    }
    button {
      vertical-align: middle;
      margin: 0 3px;
    }
  }
  ::v-deep .van-submit-bar__text {
    text-align: left;
  }
}
</style>
