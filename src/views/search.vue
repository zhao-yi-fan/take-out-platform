<template>
  <div class="search">
    <van-search
      v-model="keyWord"
      show-action
      background="#ffb04d"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch()">搜索</div>
      </template>
    </van-search>
    <van-empty v-if="!searchList.length" description="无对应搜索商铺" />
    <div v-else class="search-list">
      <div
        v-for="item in searchList"
        :key="item.shopsId"
        class="list-item"
        @click="toDetail(item.shopsId)"
      >
        <span>{{ item.shopsName }}</span>
        <span>
          <van-icon name="arrow" size="24" color="#f5d3d3" />
        </span>
      </div>
    </div>
  </div>
  <tab-bar />
</template>
<script setup>
import { ref } from "vue";
import TabBar from "@/components/TabBar";
import { useRouter } from "vue-router";
import { useShopStore } from "@/stores/shopStore";

const shopStore = useShopStore();
const router = useRouter();
const keyWord = ref("");
const searchList = ref([]);
const onSearch = async () => {
  searchList.value = await shopStore.search(keyWord.value);
};
const toDetail = (shopsId) => {
  router.push({
    path: "/commodityDetail",
    query: {
      shopsId,
    },
  });
};
</script>

<style lang="scss" scoped>
.search {
  .search-list {
    width: 95%;
    margin: 10px auto;
    border-radius: 10px;
    box-shadow: 0px 1px 8px 1px #ccc;
    .list-item {
      padding: 7px;
      background-color: #fff;
      border-bottom: 1px solid #c1c1c1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
