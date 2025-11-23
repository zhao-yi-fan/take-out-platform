<template>
  <div class="top-home-logo">
    <div class="top-home-address flex items-center gap-2">
      <van-icon name="location-o" color="#fff" size="24" />
      <i @click="showArea = true">{{ value || "请先选择收货地址" }}</i>
    </div>
    <van-icon name="search" color="#fff" size="24" @click="toSearch" />
  </div>
  <div class="top-home">
    <div class="top-home-top">
      <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <router-link to="/commodityDetail?shopsId=14">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
            />
          </router-link>
        </van-swipe-item>
        <van-swipe-item>
          <router-link to="/commodityDetail?shopsId=20">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
            />
          </router-link>
        </van-swipe-item>
        <van-swipe-item>
          <router-link to="/commodityDetail?shopsId=13">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80"
            />
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="top-home-classification">
      <van-swipe class="classification-swipe" indicator-color="white">
        <van-swipe-item>
          <van-grid :gutter="10" square>
            <van-grid-item to="/home/classifica?classificationId=1">
              <img src="../assets/images/cf1.png" alt="" srcset="" />
              美食
            </van-grid-item>
            <van-grid-item to="/home/classifica?classificationId=2">
              <img src="../assets/images/cf2.png" alt="" srcset="" />
              饮品
            </van-grid-item>
            <van-grid-item to="/home/classifica?classificationId=3">
              <img src="../assets/images/cf3.png" alt="" srcset="" />
              甜品
            </van-grid-item>
            <van-grid-item to="/home/classifica?classificationId=4">
              <img src="../assets/images/cf4.png" alt="" srcset="" />
              鲜花
            </van-grid-item>
          </van-grid>
        </van-swipe-item>
        <van-swipe-item>
          <van-grid :gutter="10" square>
            <van-grid-item to="/home/classifica?classificationId=5">
              <img src="../assets/images/cf5.png" alt="" srcset="" />
              下午茶
            </van-grid-item>
            <van-grid-item to="/home/classifica?classificationId=6">
              <img src="../assets/images/cf6.png" alt="" srcset="" />
              超市
            </van-grid-item>
            <van-grid-item to="/home/classifica?classificationId=7">
              <img src="../assets/images/cf7.png" alt="" srcset="" />
              药品
            </van-grid-item>
            <van-grid-item to="/home/classifica?classificationId=8">
              <img src="../assets/images/cf8.png" alt="" srcset="" />
              买菜
            </van-grid-item>
          </van-grid>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- <van-tag type="warning">今日推荐</van-tag> -->
    <div style="text-align: center">
      <img
        src="../assets/images/jrtj.png"
        alt=""
        width="120"
        style="margin: 0 auto 20px"
      />
    </div>
    <van-empty v-if="shopsList.length == 0" description="该地区暂无商铺" />
    <div v-else class="top-home-List">
      <div
        v-for="(item, index) in shopsList"
        :key="index"
        class="list-item"
        text="文字"
        @click="toDetail(item.shopsId)"
      >
        <img :src="item.shopsImage" />
        <div class="top-home-List-title">
          <p class="flex items-center justify-between">
            <span>{{ item.shopsName }}</span>
            <span class="text-red-500">{{ item.score }}</span>
          </p>
          <p class="mt-1 flex items-center justify-between text-sm text-gray-600">
            <span>起送：{{ item.shopsStart }}</span>
            <span>运费：{{ item.freight }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <van-popup v-model:show="showArea" position="bottom">
    <van-area
      :area-list="areaArr"
      @confirm="onConfirm"
      @cancel="showArea = false"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { areaList } from "@vant/area-data";
import { useShopStore } from "@/stores/shopStore";
const shopStore = useShopStore();

const router = useRouter();
const showArea = ref(false);
const shopsList = ref([]);
const areaArr = computed(() => areaList);
const value = computed(() => {
  return shopStore.baseAddress.name || "";
});
onMounted(() => {
  const code = shopStore.baseAddress.code;
  shopsList.value = (shopStore.shopsList || []).filter((item) => {
    return item.addressCode == code;
  });
});
const toDetail = (shopsId) => {
  router.push({
    path: "/commodityDetail",
    query: {
      shopsId,
    },
  });
};
const toSearch = () => {
  router.push({
    path: "/search",
  });
};
const onConfirm = ({ selectedOptions }) => {
  const districtCode = selectedOptions[selectedOptions.length - 1].value;
  showArea.value = false;
  shopStore.setCurrAddress({
    name: selectedOptions.map((item) => item.text).join("/"),
    code: districtCode,
  });
  shopsList.value = shopStore.shopsList.filter(
    (item) => item.addressCode === districtCode
  );
};
</script>

<style lang="scss" scoped>
.top-home-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-image: linear-gradient(to right, #fcba02, #fdaa05);
  .top-home-address {
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
.top-home {
  width: 100%;
  height: calc(100% - 80px);
  background: #f8f8fa;
  overflow: auto;
  .top-home-top {
    background: url("../assets/images/round.png");
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
    .swipe {
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
  .top-home-classification {
    margin: 10px 0;
    :deep([class*="van-hairline"]::after) {
      border: none;
    }
    .classification-swipe {
      padding: 0 0 25px 0;
      :deep(.van-grid-item__content) {
        background: transparent;
        // box-shadow: 0 1px 4px 0 rgb(240 172 26 / 30%);
        img {
          margin: 5px 0;
          width: 70%;
          height: 90%;
        }
      }
      :deep(.van-swipe__indicator) {
        width: 20px;
        border-radius: 5px;
        opacity: 0.5;
      }
      :deep(.van-swipe__indicator--active) {
        background: #f0ab1a !important;
      }
    }
  }
  .van-tag {
    margin: 10px;
  }
  .top-home-List {
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
        min-height: 50px;
        width: 100%;
      }
      .top-home-List-title {
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
