<!-- 未登录的提示 -->
<template>
  <div class="wsw-component-prompt" v-if="!userId">
    <span>还未登陆？</span>
    <van-button type="warning" size="mini" class="wsw-r" to="/Login">马上登陆</van-button>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  name: "",
  components: {},
  setup(propes, { root }) {
    const store = useStore();
    const model = reactive({
      userId: store.state.loginInfo ? true : false,
    });
    console.log(model.userId, "userId");
    return { ...toRefs(model) };
  },
};
</script>

<style lang="scss" scoped>
.wsw-component-prompt {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 50px;
  z-index: 2000;
  background: #333;
  opacity: 0.7;
  line-height: 50px;
  span {
    margin-left: 10px;
    display: inline-block;
    color: #fff;
    font-weight: bolder;
  }
  ::v-deep .van-button {
    margin: 14px 10px 0 0;
  }
}
</style>
