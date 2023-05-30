<template>
  <van-nav-bar
    title="全部收藏"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="collect">
    <van-empty
      v-if="currCollectionShops.length == 0"
      description="无收藏的商家"
    />
    <div
      v-else
      v-for="item in currCollectionShops"
      class="collect-item clearfix"
      :key="item.shopsId"
      @click="toDetail(item.shopsId)"
    >
      <img class="l" :src="item.shopsImage" alt="" srcset="" width="50" />
      <span class="r">{{ item.shopsName }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useShopStore } from "@/stores/shopStore";
import { useCollectionStore } from "@/stores/collectionStore";
import { Shop } from "@/types/shop";
const shopStore = useShopStore();
const userStore = useUserStore();
const collectionStore = useCollectionStore();

const router = useRouter();
const currCollectionShops = reactive<Shop[]>([]);
const init = () => {
  const userId = userStore.loginInfo?.userId;
  const shopsIds =
    collectionStore.collectionList.find((item) => item.userId === userId)
      ?.shopsIds || [];
  const filterArr = shopStore.shopsList.filter((item) =>
    shopsIds.includes(item.shopsId)
  );
  if (filterArr.length) {
    currCollectionShops.concat(filterArr);
  }
};
init();
const onClickLeft = () => {
  router.go(-1);
};

const toDetail = (shopsId: any) => {
  router.push({
    path: "/commodityDetail",
    query: {
      shopsId,
    },
  });
};
</script>

<style lang="scss" scoped>
.collect {
  width: 100%;
  height: calc(100% - 46px);
  overflow: auto;
  background: #f8f8fa;
  .collect-item {
    padding: 10px 20px;
    margin: 10px;
    border-bottom: 1px solid #eae6e6;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    img {
      width: 60px;
      height: 60px;
      margin: 0;
    }
    span {
      display: inline-block;
      line-height: 60px;
      margin: 0;
    }
  }
}
</style>
