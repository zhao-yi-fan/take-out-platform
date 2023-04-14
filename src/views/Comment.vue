<template>
  <van-nav-bar
    title="全部评价"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="top-User">
    <van-empty v-if="currEvaluateList.length == 0" description="无历史评价" />
    <van-collapse v-model="activeNames">
      <van-collapse-item
        v-for="item in currEvaluateList"
        :key="item.businessesId"
        :title="item.shopsName"
        :name="item.businessesId"
      >
        <template #title>
          <div>
            <van-icon name="smile" size="20" color="#ed9428" />{{
              item.shopsName
            }}
            <span class="r">{{ item.evaluate.score }}</span>
          </div>
        </template>
        {{ item.evaluate.content }}
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useShopStore } from "@/stores/shopStore";
import { useOrderStore } from "@/stores/orderStore";

const shopStore = useShopStore();
const userStore = useUserStore();
const orderStore = useOrderStore();

const router = useRouter();
const activeNames = ref(["1"]);
const currEvaluateList = ref([]);
const init = () => {
  const userId = userStore.loginInfo.userId;

  orderStore.orderList.forEach((item, index) => {
    if (item.userId == userId && item.evaluate.content) {
      shopStore.shopsList.forEach((shopItem, shopIndex) => {
        if (shopItem.shopsId == item.shopsId) {
          item.shopsName = shopItem.shopsName;
          currEvaluateList.value.push(item);
        }
      });
    }
  });
};
init();
const onClickLeft = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
$a: 100vh;
$b: 390px;
.top-User {
  width: 100%;
  height: calc(100% - 46px);
  overflow: auto;
  background: #f8f8fa;
}
</style>
