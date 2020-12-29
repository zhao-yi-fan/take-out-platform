<!-- 分类页面 -->
<template>
  <div class="wsw-Classification">
    <van-nav-bar :title="option1[classificationId - 1].text" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" @change="changeType" />
      <van-dropdown-item v-model="value2" :options="option2" @change="changeSort" />
    </van-dropdown-menu>
    <div class="wsw-Classification-list">
      <van-empty description="暂无商铺" v-if="shopsList.length == 0" />
      <div class="wsw-Classification-list-item wsw-clearfix" v-for="(item, index) in shopsList" :key="index" @click="toDetail(item.shopsId)">
        <img :src="item.shopsImage" alt="" srcset="" class="wsw-l" />
        <div class="wsw-l">
          <p class="wsw-clearfix">
            <span class="wsw-l wsw-fb">{{ item.shopsName }}</span>
            <span class="wsw-r wsw-f12 wsw-red wsw-fb">{{ item.score }}</span>
          </p>
          <p class="wsw-clearfix">
            <span class="wsw-l wsw-f12">起送：{{ item.shopsStart }}</span>
            <span class="wsw-l wsw-f12">运费：{{ item.freight }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, toRefs, computed, onMounted } from "vue";
import { Notify, Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "",
  components: {},

  setup (propes, { root }) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const model = reactive({
      value1: 0,
      value2: 0,
      classificationId: route.query.classificationId || null,
      shopsList: []
      // computed(() => {
      //   console.log(store.state.shopsList, "store.state.shopsList===");
      //   var arr = [];
      //   store.state.shopsList.forEach((item, index) => {
      //     if (model.classificationId == item.classificationType) {
      //       arr.push(item);
      //     }
      //   });
      //   console.log(arr, "arr===");
      //   return arr;
      // }),
    });
    onMounted(() => {
      changeType(model.classificationId);
    })
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
      var arr = []
      if (!value) {
        console.log('a', model.shopsList);
        arr = store.state.shopsList;
      } else {
        store.state.shopsList.forEach((item, index) => {
          if (value == item.classificationType) {
            arr.push(item);
          }
        });
      }
      model.value2 = 0; // 初始化排序方式
      model.value1 = Number(value);
      model.shopsList = arr;
    }

    const changeSort = (value) => {
      console.log(value, '排序');
      let shopsList = JSON.parse(JSON.stringify(store.state.shopsList));
      shopsList = shopsList.filter((item, index) => {
        return item.classificationType == model.value1
      })
      if (value == 1) {
        shopsList.sort((a, b) => {
          return b.score - a.score;
        })
      } else if (value == 2) {
        shopsList.sort((a, b) => {
          return a.freight - b.freight;
        })
      }

      model.shopsList = shopsList;
    }
    return {
      ...toRefs(model),
      option1,
      option2,
      onClickLeft,
      toDetail,
      changeType,
      changeSort
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
    height: calc(100% - 50px);
    margin: 100px 0 50px 0;
    overflow: auto;
    .wsw-Classification-list-item {
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
