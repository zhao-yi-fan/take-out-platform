<template>
  <div class="search">
    <van-search
      v-model="key"
      show-action
      background="#ffb04d"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch()">搜索</div>
      </template>
    </van-search>
    <van-empty description="无对应搜索商铺" v-if="searchList.length == 0" />
    <div class="search-list" v-else>
      <div
        class="list-item"
        v-for="item in searchList"
        :key="item.shopsId"
        @click="toDetail(item.shopsId)"
      >
        <span>{{ item.shopsName }}</span>
        <span>
          <van-icon name="arrow" size="24" color="#f5d3d3" />
        </span>
      </div>
    </div>
  </div>
  <tab-bar></tab-bar>
</template>
<script>
import { ref, reactive, toRefs, defineComponent } from "vue";
import TabBar from "./TabBar";
import { useRouter } from "vue-router";
import { useShopStore } from "@/stores/shopStore";

export default defineComponent({
  name: "Search",
  components: {
    TabBar,
  },
  setup(propes, { root }) {
    const shopStore = useShopStore();
    const router = useRouter();
    const model = reactive({
      key: "",
      searchList: [],
    });
    const onSearch = async () => {
      model.searchList = await shopStore.search(model.key);
      console.log(model.searchList, " model.searchList====");
    };
    const toDetail = (shopsId) => {
      router.push({
        path: "/Commodity_details",
        query: {
          shopsId,
        },
      });
    };
    return {
      ...toRefs(model),
      onSearch,
      toDetail,
    };
  },
});
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
