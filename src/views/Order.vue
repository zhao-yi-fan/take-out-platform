<template>
  <div class="top-Order">
    <div class="top-Order-title">我的订单</div>
    <div class="top-Order-list">
      <van-tabs>
        <van-tab title="全部订单">
          <van-empty
            description="无订单？赶快去下单吧"
            v-if="myOrderList.length == 0"
          />
          <van-collapse v-model="activeNames" v-else>
            <van-collapse-item
              :name="item.businessesId"
              v-for="item in myOrderList"
              :key="item.businessesId"
            >
              <template #title>
                <div class="top-Order-list-collapse">
                  <img :src="item.shopsInfo.shopsImage" alt="" width="75" />
                  <span>{{ item.shopsInfo.shopsName }}</span>
                </div>
                <div class="top-Order-list-money">
                  <span class="l">已送达</span>
                  <span class="r">共计：{{ item.money }}元</span>
                </div>
              </template>
              <div class="top-Order-list-orderList clearfix">
                <p>收货地址：{{ item.address }}</p>
                <p>收货人　：{{ item.people }}</p>
                <p>联系方式：{{ item.phone }}</p>
                <p>创建时间：{{ item.createDate }}</p>
                <p>送达时间：{{ item.sendDate }}</p>
                <p v-for="foodItem in item.foodList" :key="foodItem.foodId">
                  <span>{{ foodItem.foodName || "" }}</span>
                  <span>¥&nbsp;{{ foodItem.foodMoney || 0 }}</span>
                  <span> x{{ foodItem.foodNum || 0 }} </span>
                </p>
                <van-button
                  class="r"
                  color="linear-gradient(to right, #ff6034, #ee0a24)"
                  size="small"
                  round
                  @click="evaluation(item.businessesId)"
                  v-if="item.evaluate.content == ''"
                >
                  评价
                </van-button>
              </div>
            </van-collapse-item>
          </van-collapse>
        </van-tab>
      </van-tabs>
    </div>
    <van-dialog
      v-model:show="show"
      title="评价"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-rate
        v-model="score"
        :size="25"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="评价内容"
        type="textarea"
        maxlength="50"
        placeholder="请输入评价内容"
        show-word-limit
      />
    </van-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed, onMounted, ref } from "vue";
import { Dialog, showToast, showSuccessToast, showFailToast, showLoadingToast, closeToast } from "vant";
import { useUserStore } from "@/store/userStore";
import { useOrderStore } from "@/store/orderStore";
const userStore = useUserStore();
const orderStore = useOrderStore();
let myOrderList = reactive([]);
const score = ref(5);
const message = ref("");
const businessesId = ref(null);
const activeNames = ref(["1"]);
const show = ref(false);

const evaluation = (id) => {
  show.value = true;
  businessesId.value = id;
};

const init = async (userId) => {
  myOrderList = await orderStore.getMyOrder(userId);
};

onMounted(() => {
  if (!userStore.loginInfo) return;
  let userId = userStore.loginInfo.userId;
  init(userId);
});
const beforeClose = (action, done) => {
  console.log(action);
  if (action == "confirm") {
    if (message) {
      let orderList = orderStore.orderList;
      orderList.forEach((item, index) => {
        if (item.businessesId == businessesId) {
          item.evaluate.content = message;
          item.evaluate.score = score;
        }
      });
      orderStore.setOrderList(orderList);
      showToast("评价成功");
      return true;
    } else {
      showToast("评价内容不能为空");
      return false;
    }
  } else {
    return true;
  }
};
</script>

<style lang="scss" scoped>
.top-Order {
  width: 100%;
  height: calc(100% - 50px);
  background: #f8f8fa;
  .top-Order-title {
    font-size: 18px;
    padding-left: 5%;
    line-height: 50px;
    color: #fff;
    background-image: linear-gradient(to right, #f1b815, #efa71c);
  }
  .top-Order-list {
    height: calc(100% - 50px);
    overflow: auto;
    // position: relative;
    // opacity: 0.99;
    .van-tabs {
      .top-Order-list-collapse {
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
      .top-Order-list-money {
        padding: 20px 0;
      }
      .top-Order-list-orderList {
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

  // .top-Order-list::after {
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
