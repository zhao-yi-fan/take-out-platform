<!-- 商品详情 -->
<template>
  <div class="wsw-top-Commodity">
    <van-nav-bar
      :title="currentShopInfo.shopsName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
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
        <span class="wsw-top-Commodity-shop-card-address"
          >地址：{{ currentShopInfo.address }}</span
        >
        <van-notice-bar scrollable :text="currentShopInfo.notice" />
      </div>
      <div class="wsw-top-Commodity-list">
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
                  @click="addShop(delect, item.num, index)"
                />
                <span>{{ item.num }}</span>
                <van-button
                  icon="plus"
                  type="primary"
                  size="mini"
                  round
                  @click="addShop(add, item.num)"
                />
              </template>
            </van-card>
          </template>
        </van-tree-select>
      </div>
      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
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
  setup(propes, { root }) {
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
    const onSubmit = () => {
      router.push("/Bill");
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
    var shopsId = route.query.shopsId;
    init(shopsId);
    // model.currentShopInfo.forEach((item, index) => {
    //   // item.commodity.forEach((son, i) => {
    //   //   son.children.forEach((el, n) => {
    //   //     el.num = 0;
    //   //   });
    //   // });
    //   console.log(item);
    // });
    // const addShop = (status, num, i) => {
    //   console.log(model.currentShopInfo);
    //   console.log(
    //     model.currentShopInfo[model.activeIndex].commodity[0].children[i]
    //   );

    //   if (status == "delect") {
    //     // num - 1
    //   }
    // };

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
