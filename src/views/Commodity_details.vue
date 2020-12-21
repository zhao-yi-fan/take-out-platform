<!-- 商品详情 -->
<template>
  <div class="wsw-top-Commodity">
    <van-nav-bar :title="currentShopInfo.shopsName" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon name="star" size="18" />
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
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from "vue";
import { Dialog, Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
// import { watch } from 'vue'

export default {
  name: "",
  components: {},
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
      currentShopInfo: null,
      items: null,
      shopsId: '',
      price: 0
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
    const onClickRight = () => {
      Toast("按钮");
    };
    const onSubmit = async () => {
      if(model.price == 0){
        Toast.fail('请选择商品');
      }
      let commodity = model.currentShopInfo.commodity
      let foodArr = [];
      commodity.forEach((item, index) => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          item.children.forEach((sonItem, sonIndex) => {
            if (sonItem.num && sonItem.num > 0) {
              foodArr.push({
                foodId: item.classificationId + '_' + sonItem.commodityId,
                num: sonItem.num
              })
            }
          })
        }
      })
      var obj = {
        shopsId: model.shopsId,
        userId: store.state.loginInfo.userId,
        foodList: foodArr,
        money: model.price/100
      }
      console.log(model.currentShopInfo);
      console.log(obj,'obj====');
      let code = await store.dispatch('setOrder', obj);
      Toast.loading({
        message: '订单提交中...',
        forbidClick: true,
      });
      setTimeout(() => {
        Toast.clear();
        if (code) {
          Toast.success('下单成功');
          router.push("/Bill");
          console.log(store.state.orderList);
        } else {
          Toast.fail('下单失败');
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
    const addShop = (status, num, i) => {
      if (status == "delect") {
        if (num - 1 >= 0) {
          model.currentShopInfo.commodity[model.activeIndex].children[i].num = num - 1;
        }
      } else {
        model.currentShopInfo.commodity[model.activeIndex].children[i].num = num + 1;
      }
      let commodity = model.currentShopInfo.commodity
      let sum = 0;
      commodity.forEach((item, index) => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          item.children.forEach((sonItem, sonIndex) => {
            if (typeof sonItem.num == 'number') {
              sum += sonItem.num * sonItem.commodityMoney;
            }
          })
        }
      })
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
