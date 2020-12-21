<!-- 我的页面 -->
<template>
  <div class="wsw-top-User">
    <div class="wsw-top-User-top wsw-clearfix">
      <img class="wsw-l" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1077445954,4130602423&fm=26&gp=0.jpg" alt="" />
      <span class="wsw-l">蜡笔小新</span>
      <i class="wsw-l">填满了肚子，人就不会空虚</i>
      <van-icon name="weapp-nav" size="24" color="#fff" @click="outLogin" />
    </div>
    <div class="wsw-top-User-top-menu">
      <van-tabs type="card">
        <van-tab title="收藏商家">
          <div class="wsw-top-User-top-menu-item wsw-clearfix" v-for="(item) in currCollectionShops" :key="item.shopsId">
            <img class="wsw-l" :src="item.shopsImage" alt="" srcset="" width="50" />
            <span class="wsw-r">{{item.shopsName}}</span>
          </div>

        </van-tab>
        <van-tab title="历史评价">
          <van-collapse v-model="activeNames">
            <van-collapse-item :title="item.shopsName" :name="item.businessesId" v-for="(item) in currEvaluateList" :key="item.businessesId">
              <template #title>
                <div>
                  <van-icon name="smile" size="20" color="#ed9428" />{{item.shopsName}}
                  <span class="wsw-r">{{item.evaluate.score}}</span>
                </div>
              </template>
              {{item.evaluate.content}}
            </van-collapse-item>
          </van-collapse>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <van-button type="warning" class="outLogin" round>退出登录</van-button> -->
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
      currEvaluateList: []
    })
    const outLogin = () => {
      Dialog.confirm({
        title: "退出登录",
        message: "",
      })
        .then(() => {
          console.log('aaa');
          store.state.loginInfo = null;
          router.push('/Home/Order')
        })
        .catch(() => {
          // on cancel
        });
    };
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

      orderList.forEach((item, index) => {
        if (item.userId == userId) {
          shopsList.forEach((shopItem, shopIndex) => {
            if (shopItem.shopsId == item.shopsId) {
              item.shopsName = shopItem.shopsName;
              model.currEvaluateList.push(item);
            }
          })
        }
      })
      console.log(model.currEvaluateList, 'currEvaluateList===');
    }
    init();
    return {
      ...toRefs(model),
      activeNames,
      outLogin
    };
  },
};
</script>

<style lang="scss" scoped>
$a: 100vh;
$b: 390px;
.wsw-top-User {
  width: 100%;
  height: 100%;
  background: #fdf4e9;
  position: relative;
  .wsw-top-User-top {
    top: 20px;
    background: #ed9428;
    width: 85%;
    margin-left: 7.5%;
    height: 200px;
    border-radius: 10px;
    position: relative;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-left: 20px;
      margin-top: 50px;
    }
    span,
    i {
      display: inline-block;
      margin-left: 20px;
    }
    span {
      margin-top: 70px;
      font-size: 16px;
      font-weight: bolder;
    }
    i {
      margin-top: 20px;
      font-size: 12px;
    }
    .van-icon {
      position: absolute;
      right: 20px;
      top: 0;
    }
  }
  .wsw-top-User-top-menu {
    width: 85%;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 180px;
    ::v-deep .van-tabs__wrap {
      width: 95%;
      margin-left: 2.5%;
      height: 60px;
      .van-tabs__nav {
        height: 100%;
        border: none;
      }
    }
    ::v-deep .van-tabs__content {
      margin-top: 30px;
      background: #fff;
      padding: 20px;
      height: calc(#{$a} - #{$b});
      border-radius: 10px;
      .wsw-top-User-top-menu-item {
        margin: 5px 0;
        img {
          width: 60px;
          height: 60px;
          border: 1px solid #ccc;
          margin: 0;
        }
        span {
          display: inline-block;
          line-height: 60px;
          margin: 0;
        }
      }
      .van-cell__title {
        height: 30px;
        line-height: 30px;
        .van-badge__wrapper {
          vertical-align: middle;
        }
      }
    }
  }
  .outLogin {
    width: 85%;
    margin-left: 7.5%;
    position: absolute;
    bottom: 85px;
  }
}
</style>
