
<template>
  <van-nav-bar
    title="注册"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="set-login">
    <div class="set-login-cont">
      <van-form @submit="onSubmit">
        <van-field
          v-model="form.username"
          name="username"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div>
          <van-field
            v-model="form.passwordAgain"
            type="password"
            name="passwordAgain"
            label="密码确认"
            placeholder="再次输入密码"
            :rules="[
              { required: true, message: '请确认密码' },
              { validator: Validator, message: '请输入正确密码' },
            ]"
          />
          <van-field
            v-model="form.secret"
            type="secret"
            name="secret"
            label="暗号"
            placeholder="请输入暗号"
            :rules="[{ required: true, message: '请填写暗号' }]"
          />
        </div>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import { Notify, showToast, showSuccessToast, showFailToast, showLoadingToast, closeToast } from "vant";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore.ts";
const userStore = useUserStore();
const router = useRouter();
const form = reactive({
  username: "",
  password: "",
  secret: "",
  passwordAgain: "",
});
const onClickLeft = () => {
  router.go(-1);
};
const onSubmit = async (values) => {
  let isSuccess = await userStore.register(values);
  showLoadingToast({
    message: "注册中...",
    forbidClick: true,
  });
  setTimeout(() => {
    closeToast();
    if (isSuccess) {
      showSuccessToast, showFailToast("注册成功，请登录");
      router.push({
        path: "/newLogin",
      });
    } else {
      showFailToast("用户名已存在，请修改后重新提交！");
    }
  }, 1000);
};
const Validator = (val) => {
  return val == form.password;
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
