<!-- 我的页面 -->
<template>
  <van-nav-bar title="全部收藏" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="collect">
    <van-empty description="无收藏的商家" v-if="currCollectionShops.length == 0" />
    <div class="collect-item wsw-clearfix" v-for="(item) in currCollectionShops" :key="item.shopsId" @click="toDetail(item.shopsId)" v-else>
      <img class="wsw-l" :src="item.shopsImage" alt="" srcset="" width="50" />
      <span class="wsw-r">{{item.shopsName}}</span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted, ref } from "vue";
import { Dialog, Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "",
  components: {},
  setup (propes, { root }) {
    const router = useRouter();
    const store = useStore();
    const activeNames = ref(["1"]);
    const model = reactive({
      currCollectionShops: [],
    })
    const init = () => {
      let { collectionList, loginInfo, shopsList, orderList } = store.state;
      let userId = loginInfo.userId;
      let shopsIds = [];
      collectionList.forEach((item, index) => {
        if (item.userId == userId) {
          shopsIds = item.shopsIds;
        }
      })
      shopsList.forEach((item, index) => {
        if (shopsIds.includes(item.shopsId)) {
          model.currCollectionShops.push(item);
        }
      })
      console.log(model.currCollectionShops, 'currCollectionShops===');
    }
    init();
    const onClickLeft = () => {
      router.go(-1)
    }

    const toDetail = (shopsId) => {
      router.push({
        path: '/Commodity_details',
        query: {
          shopsId
        }
      })
    }

    return {
      ...toRefs(model),
      activeNames,
      onClickLeft,
      toDetail
    };
  },
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
