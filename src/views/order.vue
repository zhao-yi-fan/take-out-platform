<template>
  <div class="top-order">
    <div class="top-order-title">我的订单</div>
    <div class="top-order-list">
      <van-tabs>
        <van-tab title="全部订单">
          <van-empty
            v-if="myOrderList.length == 0"
            description="无订单？赶快去下单吧"
          />
          <van-collapse v-else v-model="activeNames">
            <van-collapse-item
              v-for="item in myOrderList"
              :key="item.businessesId"
              :name="item.businessesId"
            >
              <template #title>
                <div class="top-order-list-collapse">
                  <img :src="item.shopsInfo.shopsImage" alt="" width="75" />
                  <span>{{ item.shopsInfo.shopsName }}</span>
                </div>
                <div class="top-order-list-money">
                  <span class="l">已送达</span>
                  <span class="r">共计：{{ item.money }}元</span>
                </div>
              </template>
              <div class="top-order-list-orderList clearfix">
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
                  v-if="!item.evaluate.content"
                  class="r"
                  color="linear-gradient(to right, #ff6034, #ee0a24)"
                  size="small"
                  round
                  @click="evaluation(item.businessesId)"
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

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { showToast } from "vant";
import { useUserStore } from "@/stores/userStore";
import { useOrderStore } from "@/stores/orderStore";
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

const init = async () => {
  if (!userStore.loginInfo) return;
  myOrderList = await orderStore.getMyOrder(userStore.loginInfo.userId);
};

init();
const beforeClose = (action) => {
  if (action === "confirm") {
    if (message.value) {
      const orderList = orderStore.orderList;
      orderList.forEach((item) => {
        if (item.businessesId === businessesId.value) {
          item.evaluate.content = message.value;
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
.top-order {
  width: 100%;
  height: calc(100% - 50px);
  background: #f8f8fa;
  .top-order-title {
    font-size: 18px;
    padding-left: 5%;
    line-height: 50px;
    color: #fff;
    background-image: linear-gradient(to right, #f1b815, #efa71c);
  }
  .top-order-list {
    height: calc(100% - 50px);
    overflow: auto;
    // position: relative;
    // opacity: 0.99;
    .van-tabs {
      .top-order-list-collapse {
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
      .top-order-list-money {
        padding: 20px 0;
      }
      .top-order-list-orderList {
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

  :deep(.van-dialog__content) {
    text-align: center;
    .van-rate {
      margin: 15px 0;
    }
  }
}
</style>
