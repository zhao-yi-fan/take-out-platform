<!-- 登录页面 -->
<template>
  <van-nav-bar
    title="登录"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="set-login">
    <div class="set-login-cont">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div>
          <router-link to="/newRegister" tag="a">还没有注册？</router-link>
          <router-link to="/newForgetPwd" tag="a" class="wsw-r"
            >忘记密码？</router-link
          >
        </div>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, toRefs } from "vue";
import { Notify, Toast } from "vant";
import { useRouter } from "vue-router";

export default {
  name: "",
  components: {},
  setup(propes, { root }) {
    const router = useRouter();
    const store = useStore();
    const model = reactive({
      username: "",
      password: "",
    });
    const onClickLeft = () => {
      router.go(-1);
    };
    const onSubmit = async (values) => {
      console.log("submit", values);
      let isExist = await store.dispatch("login", values);
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
      });
      setTimeout(() => {
        Toast.clear();
        if (isExist) {
          Toast.success("登录成功");
          router.push({
            path: "/Home/Index",
          });
        } else {
          Toast.fail("用户名或密码错误，请重试后登录！");
        }
      }, 1000);
    };

    return {
      ...toRefs(model),
      onSubmit,
      onClickLeft,
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.van-nav-bar__left) {
  span,
  .van-icon {
    color: #ed9428;
  }
}
.set-login {
  width: 100%;
  height: calc(100% - 46px);
  overflow: auto;
  background: #f8f8fa;
  .set-login-cont {
    margin-top: 15px;
    .van-form {
      .van-cell {
        border-radius: 5px;
        margin-bottom: 10px;
        :deep(.van-cell__value) {
          .van-field__error-message {
            position: absolute;
            right: 0;
            top: 1px;
          }
        }
      }
      .van-button {
        margin: 20px auto;
        border: none;
        background-color: #ed9428;
        :deep(span) {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
        }
      }
    }
  }
}
</style>
