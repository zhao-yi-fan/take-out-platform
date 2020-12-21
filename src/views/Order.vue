<!-- 订单列表 -->
<template>
  <div class="wsw-top-Order">
    <div class="wsw-top-Order-title">订单</div>
    <div class="wsw-top-Order-list">
      <van-tabs>
        <van-tab title="全部订单">
          <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
              <template #title>
                <div class="wsw-top-Order-list-collapse">
                  <img
                    src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2665539707,3309730618&fm=26&gp=0.jpg"
                    alt=""
                    width="75"
                  />
                  <span>汉堡王</span>
                </div>
                <div class="wsw-top-Order-list-money">
                  <span class="wsw-l">已送达</span>
                  <span class="wsw-r">共计：15元</span>
                </div>
              </template>
              <div class="wsw-top-Order-list-orderList wsw-clearfix">
                <p>
                  <span>鱼香肉丝</span>
                  <span>¥&nbsp;25</span>
                  <span><van-icon name="cross" />5</span>
                </p>
                <p>
                  <span>鱼香肉丝</span>
                  <span>¥&nbsp;25</span>
                  <span><van-icon name="cross" />5</span>
                </p>
                <p>
                  <span>鱼香肉丝</span>
                  <span>¥&nbsp;25</span>
                  <span><van-icon name="cross" />5</span>
                </p>
                <p>
                  <span>鱼香肉丝</span>
                  <span>¥&nbsp;25</span>
                  <span><van-icon name="cross" />5</span>
                </p>
                <van-button
                  class="wsw-r"
                  color="linear-gradient(to right, #ff6034, #ee0a24)"
                  size="small"
                  round
                  @click="Evaluation"
                >
                  评价
                </van-button>
              </div>
            </van-collapse-item>
            <van-collapse-item title="标题2" name="2"> 内容 </van-collapse-item>
          </van-collapse>
        </van-tab>
      </van-tabs>
    </div>
    <van-dialog v-model:show="show" title="评价" show-cancel-button>
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="评价"
        type="textarea"
        maxlength="50"
        placeholder="请输入评价"
        show-word-limit
      />
    </van-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "",
  components: {},
  setup(propes, { root }) {
    const model = reactive({
        message: null,
    });
    const activeNames = ref(["1"]);
    const show = ref(false);

    const Evaluation = ()=>{
        show.value = true
    }
    return { model, activeNames, show, Evaluation };
  },
};
</script>

<style lang="scss" scoped>
.wsw-top-Order {
  width: 100%;
  height: 100%;
  background: #fdf4e9;
  .wsw-top-Order-title {
    font-size: 18px;
    font-weight: bolder;
    margin-left: 5%;
    padding-top: 10px;
    color: #333;
  }
  .wsw-top-Order-list {
    width: 90%;
    margin-left: 5%;
    //   border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 70px;
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
        height: 24px;
        line-height: 24px;
        span {
          display: inline-block;
          &:first-child {
            width: 70%;
          }
          &:nth-child(2),
          &:last-child {
            width: 15%;
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
</style>
