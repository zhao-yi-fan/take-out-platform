<!-- 订单列表 -->
<template>
  <div class="wsw-top-Order">
    <div class="wsw-top-Order-title">我的订单</div>
    <div class="wsw-top-Order-list">
      <van-tabs>
        <van-tab title="全部订单">
          <van-empty description="无订单？赶快去下单吧" v-if="myOrderList.length == 0" />
          <van-collapse v-model="activeNames" v-else>
            <van-collapse-item :name="item.businessesId" v-for="item in myOrderList" :key="item.businessesId">
              <template #title>
                <div class="wsw-top-Order-list-collapse">
                  <img :src="item.shopsInfo.shopsImage" alt="" width="75" />
                  <span>{{ item.shopsInfo.shopsName }}</span>
                </div>
                <div class="wsw-top-Order-list-money">
                  <span class="wsw-l">已送达</span>
                  <span class="wsw-r">共计：{{ item.money }}元</span>
                </div>
              </template>
              <div class="wsw-top-Order-list-orderList wsw-clearfix">
                <p>收货地址：{{item.address}}</p>
                <p>收货人　：{{item.people}}</p>
                <p>联系方式：{{item.phone}}</p>
                <p>创建时间：{{item.createDate}}</p>
                <p>送达时间：{{item.sendDate}}</p>
                <p v-for="foodItem in item.foodList" :key="foodItem.foodId">
                  <span>{{ foodItem.foodName || "" }}</span>
                  <span>¥&nbsp;{{ foodItem.foodMoney || 0 }}</span>
                  <span>
                    x{{ foodItem.foodNum || 0 }}
                  </span>
                </p>
                <van-button class="wsw-r" color="linear-gradient(to right, #ff6034, #ee0a24)" size="small" round @click="Evaluation(item.businessesId)" v-if="item.evaluate.content == ''">
                  评价
                </van-button>
              </div>
            </van-collapse-item>
          </van-collapse>
        </van-tab>
      </van-tabs>
    </div>
    <van-dialog v-model:show="show" title="评价" show-cancel-button :before-close="beforeClose">
      <van-rate v-model="score" :size="25" color="#ffd21e" void-icon="star" void-color="#eee" />
      <van-field v-model="message" rows="2" autosize label="评价内容" type="textarea" maxlength="50" placeholder="请输入评价内容" show-word-limit />
    </van-dialog>
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
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const model = reactive({
      message: null,
      myOrderList: [],
      score: 5,
      businessesId: null,
    });
    const activeNames = ref(["1"]);
    const show = ref(false);

    const Evaluation = (id) => {
      show.value = true;
      model.businessesId = id;
    };

    const init = async (userId) => {
      model.myOrderList = await store.dispatch("getMyOrder", userId);
      console.log(model.myOrderList, "model.myOrderList===");
    };

    onMounted(() => {
      if(!store.state.loginInfo)return
      let userId = store.state.loginInfo.userId;
      init(userId);
    });
    const beforeClose = (action, done) => {
      console.log(action);
      if (action == "confirm") {
        if (model.message) {
          let orderList = store.state.orderList;
          orderList.forEach((item, index) => {
            console.log(item, model.businessesId);
            if (item.businessesId == model.businessesId) {
              item.evaluate.content = model.message;
              item.evaluate.score = model.score;
            }
          });
          store.commit('SET_ORDER_LIST', orderList)
          Toast("评价成功");
          return true;
        } else {
          Toast("评价内容不能为空");
          return false;
        }
      } else {
        return true;
      }
    };

    return {
      ...toRefs(model),
      activeNames,
      show,
      Evaluation,
      beforeClose,
    };
  },
};
</script>

<style lang="scss" scoped>
.wsw-top-Order {
  width: 100%;
  height: calc(100% - 50px);
  background: #f8f8fa;
  .wsw-top-Order-title {
    font-size: 18px;
    padding-left: 5%;
    line-height: 50px;
    color: #fff;
    background-image: linear-gradient(to right, #f1b815, #efa71c);
  }
  .wsw-top-Order-list {
    height: calc(100% - 50px);
    overflow: auto;
    // position: relative;
    // opacity: 0.99;
    .van-tabs {
      .wsw-top-Order-list-collapse {
        img {
          border-radius: 50%;
          border: 1px solid #ccc;
        }
        span {
          margin-left: 20px;
          font-size: 16px;
          font-weight: bolder;
        }
      }
      .wsw-top-Order-list-money {
        padding: 20px 0;
      }
      .wsw-top-Order-list-orderList {
        padding: 5px 0;
        p {
          line-height: 24px;
          border-bottom: 1px solid #eae6e6;
          span {
            display: inline-block;
            &:first-child {
              width: 60%;
            }
            &:nth-child(2),
            &:last-child {
              width: 20%;
              text-align: right;
            }
          }
        }
        .van-button {
          margin-top: 22px;
        }
      }
    }
  }

  // .wsw-top-Order-list::after {
  //   content: "";
  //   background-image: url("../assets/images/hb.png");
  //   background-size: 200px;
  //   background-color: #ffffe9;
  //   opacity: 0.2;
  //   top: 0;
  //   left: 0;
  //   bottom: 0;
  //   right: 0;
  //   position: absolute;
  //   z-index: -1;
  // }
  :deep(.van-dialog__content) {
    text-align: center;
    .van-rate {
      margin: 15px 0;
    }
  }
}
</style>
