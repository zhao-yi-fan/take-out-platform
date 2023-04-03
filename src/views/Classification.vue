<template>
  <div class="classification">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @change="changeType"
      />
      <van-dropdown-item
        v-model="value2"
        :options="option2"
        @change="changeSort"
      />
    </van-dropdown-menu>
    <div class="classification-list">
      <van-empty description="暂无商铺" v-if="shopsList.length == 0" />
      <div
        class="classification-list-item clearfix"
        v-for="(item, index) in shopsList"
        :key="index"
        @click="toDetail(item.shopsId)"
      >
        <img :src="item.shopsImage" alt="" srcset="" class="l" />
        <div class="l">
          <p class="clearfix">
            <span class="l fb">{{ item.shopsName }}</span>
          </p>
          <p class="clearfix">
            <span class="l f12">起送：{{ item.shopsStart }}</span>
            <span class="l f12">运费：{{ item.freight }}</span>
            <span class="r f12 red fb">{{ item.score }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useShopStore } from "@/store/shopStore";
const shopStore = useShopStore();
const route = useRoute();
const router = useRouter();
const districtCode = ref(shopStore.baseAddress.code);
let shopsList = reactive([]);
const title = ref("");
const value1 = ref(0);
const value2 = ref(0);

onMounted(() => {
  changeType(route.query.classificationId);
});
const option1 = [
  { text: "全部", value: 0 },
  { text: "美食", value: 1 },
  { text: "饮品", value: 2 },
  { text: "甜品", value: 3 },
  { text: "鲜花", value: 4 },
  { text: "下午茶", value: 5 },
  { text: "超市", value: 6 },
  { text: "药品", value: 7 },
  { text: "买菜", value: 8 },
];
const option2 = [
  { text: "默认排序", value: 0 },
  { text: "好评排序", value: 1 },
  { text: "起送费排序", value: 2 },
];
const onClickLeft = () => {
  router.go(-1);
};
const toDetail = (shopsId) => {
  router.push({
    path: "/Commodity_details",
    query: {
      shopsId,
    },
  });
};
const changeType = (value) => {
  let list = shopStore.shopsList.filter((item, index) => {
    return item.addressCode == districtCode;
  });
  value2.value = 0; // 初始化排序方式
  value1.value = Number(value);
  title.value = option1[value].text;
  shopsList = value
    ? list.filter((item, index) => {
        return item.classificationType == value;
      })
    : list;
};

const changeSort = (value) => {
  console.log(value, "排序");
  let shopsList = JSON.parse(JSON.stringify(shopStore.shopsList));
  shopsList = shopsList.filter((item, index) => {
    return item.addressCode == districtCode;
  });
  if (value1) {
    shopsList = shopsList.filter((item, index) => {
      return item.classificationType == value1.value;
    });
  }
  if (value == 1) {
    shopsList.sort((a, b) => {
      return b.score - a.score;
    });
  } else if (value == 2) {
    shopsList.sort((a, b) => {
      return a.freight - b.freight;
    });
  }

  shopsList = shopsList;
};
</script>
<style lang="scss" scoped>
.classification {
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  :deep(.van-nav-bar) {
    width: 100%;
    .van-nav-bar__content {
      background: #ed9428;
      .van-nav-bar__left {
        span,
        .van-icon {
          color: #fff;
        }
      }
      .van-nav-bar__title {
        color: #fff;
      }
    }
  }
  :deep(.van-dropdown-menu) {
    width: 100%;
  }
  .classification-list {
    width: 90%;
    padding: 0 5%;
    height: calc(100% - 95px);
    overflow: auto;
    .classification-list-item {
      width: 95%;
      padding: 10px 2.5%;
      margin: 10px 0;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      img {
        width: 30%;
        border-radius: 10px;
        min-height: 80px;
      }
      div {
        width: 65%;
        height: 40px;
        p {
          width: 100%;
          line-height: 30px;
          &:last-child {
            line-height: 40px;
          }
          span {
            margin: 5px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
