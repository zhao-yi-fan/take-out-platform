<!-- 分类页面 -->
<template>
  <div class="wsw-Classification">
    <van-nav-bar
      :title="option1[classificationId - 1].text"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
    <div class="wsw-Classification-list">
      <van-empty description="暂无商铺" v-if="shopsList.length == 0" />
      <div
        class="wsw-Classification-list-item wsw-clearfix"
        v-for="(item, index) in shopsList"
        :key="index"
      >
        <div class="wsw-l">
          <img :src="item.shopsImage" alt="" srcset="" width="100" />
        </div>
        <div class="wsw-l">
          <p class="wsw-clearfix">
            <span>{{ item.shopsName }}</span>
            <span>{{ item.score }}</span>
          </p>
          <p>
            <span>起送：{{ item.shopsStart }}</span>
            <span>运费：{{ item.freight }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, toRefs, computed } from "vue";
import { Notify, Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "",
  components: {},

  setup(propes, { root }) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const model = reactive({
      value1: 1,
      value2: 0,
      classificationId: route.query.classificationId || null,
      shopsList: computed(() => {
        console.log(store.state.shopsList, "store.state.shopsList===");
        var arr = [];
        store.state.shopsList.forEach((item, index) => {
          if (model.classificationId == item.classificationType) {
            arr.push(item);
          }
        });
        console.log(arr, "arr===");
        return arr;
      }),
    });
    const option1 = [
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

    return {
      ...toRefs(model),
      option1,
      option2,
      onClickLeft,
    };
  },
};
</script>
<style lang="scss" scoped>
.wsw-Classification {
  position: relative;
  width: 100%;
  height: 100%;
  ::v-deep .van-nav-bar {
    width: 100%;
    position: fixed;
    top: 0;
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
  ::v-deep .van-dropdown-menu {
    width: 100%;
    position: fixed;
    top: 46px;
  }
  .wsw-Classification-list {
    width: 90%;
    padding: 0 5%;
    height: calc(100% - 150px);
    margin: 100px 0 50px 0;
    overflow: auto;
    background: #a32121;
    .wsw-Classification-list-item {
      width: 100%;
      margin: 10px 0;
      border-radius: 10px;
      background: olive;
      div {
        padding: 10px;
        img {
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
