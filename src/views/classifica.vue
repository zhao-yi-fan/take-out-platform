<template>
  <div class="classification">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="router.go(-1)"
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
      <van-empty v-if="shopsList.length == 0" description="暂无商铺" />
      <div
        v-for="(item, index) in shopsList"
        :key="index"
        class="classification-list-item flex gap-4"
        @click="toDetail(item.shopsId)"
      >
        <img :src="item.shopsImage" alt="" srcset="" class="w-1/3 min-h-[80px] rounded-[10px]" />
        <div class="flex flex-1 flex-col justify-between">
          <p class="flex items-center justify-between">
            <span class="font-bold">{{ item.shopsName }}</span>
            <span class="text-xs text-red-500 font-bold">{{ item.score }}</span>
          </p>
          <p class="mt-1 flex flex-wrap gap-4 text-xs text-gray-600">
            <span>起送：{{ item.shopsStart }}</span>
            <span>运费：{{ item.freight }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useShopStore } from "@/stores/shopStore";
import { computed } from "vue";
defineOptions({
  name: "classification",
});
const shopStore = useShopStore();
const route = useRoute();
const router = useRouter();
const districtCode = ref(shopStore.baseAddress.code);
const shopsList = ref([]);
const value1 = ref(0);
const value2 = ref(0);

const title = computed(() => {
  return option1.find((item) => item.value == value1.value)?.text;
});

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
const toDetail = (shopsId) => {
  router.push({
    path: "/Commodity_details",
    query: {
      shopsId,
    },
  });
};
const changeType = (value) => {
  console.log(typeof value, "分类");
  value2.value = 0; // 初始化排序方式
  shopsList.value = (shopStore.shopsList || []).filter((item, index) => {
    return (
      item.addressCode == districtCode.value && item.classificationType == value
    );
  });
};

const changeSort = (value: number) => {
  console.log(value, "排序");
  let shopsList1 = JSON.parse(JSON.stringify(shopStore.shopsList));
  shopsList1 = shopsList1.filter((item, index) => {
    return item.addressCode == districtCode.value;
  });
  if (value1.value) {
    shopsList1 = shopsList1.filter((item, index) => {
      return item.classificationType == value1.value;
    });
  }
  if (value == 1) {
    console.log(shopsList1, "shopsList1===");

    shopsList1.sort((a, b) => {
      return b.score - a.score;
    });
  } else if (value == 2) {
    shopsList1.sort((a, b) => {
      return a.freight - b.freight;
    });
  }

  shopsList.value = shopsList1;
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
        border-radius: 10px;
      }
      div {
        width: 65%;
        p {
          width: 100%;
          line-height: 30px;
          span {
            margin: 5px 0;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
