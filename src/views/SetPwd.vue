<template>
  <van-nav-bar
    title="修改密码"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="set-pwd">
    <div class="set-pwd-cont">
      <van-form @submit="onSubmit">
        <van-field
          v-model="form.rawPassword"
          name="rawPassword"
          label="原密码"
          placeholder="原密码"
          :rules="[{ required: true, message: '请填写原密码' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="form.rePassword"
          type="password"
          name="rePassword"
          label="重新输入密码"
          placeholder="重新输入密码"
          :rules="[{ required: true, message: '请再次填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, computed, onMounted, ref } from "vue";
import { Dialog, showToast, showSuccessToast, showFailToast, showLoadingToast, closeToast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const form = reactive({
  rawPassword: "",
  password: "",
  rePassword: "",
});
const onClickLeft = () => {
  router.go(-1);
};
const onSubmit = async (values) => {
  console.log("submit", values);
  let { rawPassword, password, rePassword } = values;
  let setPwdForm = {
    userId: userStore.loginInfo.userId,
    rawPassword,
    password,
    rePassword,
  };

  let resObj = await userStore.setPwd(setPwdForm);
  showLoadingToast({
    message: "正在修改密码请稍候...",
    forbidClick: true,
  });
  setTimeout(() => {
    closeToast();
    if (resObj.code == 1) {
      showSuccessToast("修改密码成功，请您重新登录");
      userStore.setLoginInfo(null);
      router.push("/Home/User");
    } else {
      showFailToast(resObj.msg);
    }
  }, 2000);
};
</script>

<style lang="scss" scoped>
:deep(.van-nav-bar__left) {
  span,
  .van-icon {
    color: #ed9428;
  }
}
.set-pwd {
  width: 100%;
  height: calc(100% - 46px);
  overflow: auto;
  background: #f8f8fa;
  .set-pwd-cont {
    margin-top: 15px;
  }
}
</style>
