<!-- 首页 -->
<template>
  <div class="wsw-top-home-logo">
    <!-- <img src="../assets/images/Logo.png" width="130" /> -->
    <!-- <span>饿了么</span> -->
    <div class="wsw-top-home-address">
      <van-icon name="location-o" color="#fff" size="24" class="wsw-l" />
      <i class="wsw-l" @click="showArea = true">{{
        value || "请先选择收货地址"
      }}</i>
    </div>
    <van-icon name="search" color="#fff" size="24" class="wsw-r" @click="toSearch" />
  </div>
  <div class="wsw-top-home">
    <div class="wsw-top-home-top">
      <van-swipe class="wsw-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
        <router-link to="/Commodity_details?shopsId=14">
          <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4083615963,856728706&fm=11&gp=0.jpg" />
        </router-link>
        </van-swipe-item>
        <van-swipe-item>
         <router-link to="/Commodity_details?shopsId=20">
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1004056377,3540152604&fm=26&gp=0.jpg" />
        </router-link>
        </van-swipe-item>
        <van-swipe-item>
         <router-link to="/Commodity_details?shopsId=13">
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3487836899,16466550&fm=26&gp=0.jpg" />
        </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="wsw-top-home-classification">
      <van-swipe class="classification-swipe" indicator-color="white">
        <van-swipe-item>
          <van-grid :gutter="10" square>
            <van-grid-item to="/Home/Classification?classificationId=1">
              <img src="../assets/images/cf1.png" alt="" srcset="" />
              美食
            </van-grid-item>
            <van-grid-item to="/Home/Classification?classificationId=2">
              <img src="../assets/images/cf2.png" alt="" srcset="" />
              饮品
            </van-grid-item>
            <van-grid-item to="/Home/Classification?classificationId=3">
              <img src="../assets/images/cf3.png" alt="" srcset="" />
              甜品
            </van-grid-item>
            <van-grid-item to="/Home/Classification?classificationId=4">
              <img src="../assets/images/cf4.png" alt="" srcset="" />
              鲜花
            </van-grid-item>
          </van-grid>
        </van-swipe-item>
        <van-swipe-item>
          <van-grid :gutter="10" square>
            <van-grid-item to="/Home/Classification?classificationId=5">
              <img src="../assets/images/cf5.png" alt="" srcset="" />
              下午茶
            </van-grid-item>
            <van-grid-item to="/Home/Classification?classificationId=6">
              <img src="../assets/images/cf6.png" alt="" srcset="" />
              超市
            </van-grid-item>
            <van-grid-item to="/Home/Classification?classificationId=7">
              <img src="../assets/images/cf7.png" alt="" srcset="" />
              药品
            </van-grid-item>
            <van-grid-item to="/Home/Classification?classificationId=8">
              <img src="../assets/images/cf8.png" alt="" srcset="" />
              买菜
            </van-grid-item>
          </van-grid>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- <van-tag type="warning">今日推荐</van-tag> -->
    <div style="text-align: center;">
      <img src="../assets/images/jrtj.png" alt="" width="120" style="margin: 0 0 20px 0" />
    </div>
    <van-empty description="该地区暂无商铺" v-if="shopsList.length == 0" />
    <div class="wsw-top-home-List" v-else>
      <div class="list-item" v-for="(item, index) in shopsList" :key="index" text="文字" @click="toDetail(item.shopsId)">
        <img :src="item.shopsImage" />
        <div class="wsw-top-home-List-title">
          <p class="wsw-clearfix">
            <span class="wsw-l">{{ item.shopsName }}</span>
            <span class="wsw-r wsw-red">{{ item.score }}</span>
          </p>
          <p class="wsw-clearfix">
            <span class="wsw-l wsw-f14">起送：{{ item.shopsStart }}</span>
            <span class="wsw-r wsw-f14">运费：{{ item.freight }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <van-popup v-model:show="showArea" position="bottom">
    <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
  </van-popup>
</template>

<script>
import { ref, reactive, toRefs, computed, onMounted } from "vue";
import { Notify, Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import areaList from "@/mock/area.js";

export default {
  name: "",
  components: {},
  setup (propes, { root }) {
    const router = useRouter();
    const store = useStore();
    const model = reactive({
      active: ref(0),
      shopsList: [],
      showArea: false,
      value: computed(() => {
        return store.state.baseAddress.name || "";
      }),
      areaList: computed(() => areaList),
    });
    onMounted(() => {
      let shopsList = JSON.parse(JSON.stringify(store.state.shopsList));
      var code = store.state.baseAddress.code
      shopsList = shopsList.filter((item, index) => {
        return item.addressCode == code;
      })
      model.shopsList = shopsList || [];
    })
    const toDetail = (shopsId) => {
      router.push({
        path: "/Commodity_details",
        query: {
          shopsId,
        },
      });
    };
    const toSearch = (shopsId) => {
      router.push({
        path: "/search",
      });
    };
    const onConfirm = (values) => {
      console.log(values, '2222');
      let shopsList = JSON.parse(JSON.stringify(store.state.shopsList));
      let districtCode = values[values.length - 1].code;
      model.showArea = false;
      let value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      store.dispatch("setCurrAddress", {
        name: value,
        code: districtCode
      });
      shopsList = shopsList.filter((item, index) => {
        return item.addressCode == districtCode;
      })
      model.shopsList = shopsList || [];
    };

    return {
      ...toRefs(model),
      toDetail,
      toSearch,
      onConfirm,
    };
  },
};
</script>

<style lang="scss" scoped>
.wsw-top-home-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-image: linear-gradient(to right, #fcba02, #fdaa05);
  .wsw-top-home-address {
    height: 80px;
    line-height: 80px;
    display: inline-block;
    color: #fff;
    i {
      font-weight: bolder;
    }
    .van-icon {
      height: 80px;
      line-height: 80px;
    }
  }
  span {
    display: inline-block;
    line-height: 80px;
    color: #ed9428;
    font-weight: bolder;
  }
  img {
    margin: 5px 0;
  }
  .van-icon,
  i {
    margin-right: 10px;
  }
}
.wsw-top-home {
  width: 100%;
  height: calc(100% - 80px);
  background: #f8f8fa;
  overflow: auto;
  .wsw-top-home-top {
    background: url("../assets/images/round.png");
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
    .wsw-swipe {
      margin: 0 auto;
      width: 90%;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .wsw-top-home-classification {
    margin: 10px 0;
    ::v-deep [class*="van-hairline"]::after {
      border: none;
    }
    .classification-swipe {
      padding: 0 0 25px 0;
      ::v-deep .van-grid-item__content {
        background: transparent;
        // box-shadow: 0 1px 4px 0 rgb(240 172 26 / 30%);
        img {
          margin: 5px 0;
          width: 70%;
          height: 90%;
        }
      }
      ::v-deep .van-swipe__indicator {
        width: 20px;
        border-radius: 5px;
        opacity: 0.5;
      }
      ::v-deep .van-swipe__indicator--active {
        background: #f0ab1a !important;
      }
    }
  }
  .van-tag {
    margin: 10px;
  }
  .wsw-top-home-List {
    width: 96%;
    margin: 0 auto;
    margin-bottom: 30px;
    background: #f8f8fa;
    column-count: 2;
    column-gap: 10px;
    .list-item {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      background: #fefcf9;
      padding: 0;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      -webkit-column-break-inside: avoid;
      img {
        width: 100%;
      }
      .wsw-top-home-List-title {
        box-sizing: border-box;
        width: 100%;
        padding: 5px;
        p {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
