<template>
  <van-nav-bar
    title="设置"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="setting">
    <div class="setting-cont">
      <div class="setting-btn" @click="toSetPwd">
        <span>修改密码</span>
        <van-icon name="arrow" color="#ccc" size="24" />
      </div>
      <div class="setting-btn" @click="pfShow = true">
        <span>欢迎评分</span>
        <van-icon name="arrow" color="#ccc" size="24" />
      </div>
      <div class="setting-btn" @click="fankuiShow = true">
        <span>意见反馈</span>
        <van-icon name="arrow" color="#ccc" size="24" />
      </div>
      <div class="setting-btn" @click="tips('请联系 xxx')">
        <span>联系客服</span>
        <van-icon name="arrow" color="#ccc" size="24" />
      </div>
      <div class="setting-btn" @click="aboutUs()">
        <span>关于我们</span>
        <van-icon name="arrow" color="#ccc" size="24" />
      </div>
      <div class="logout-btn" @click="outLogin">
        <span>退出登录</span>
        <van-icon name="arrow" color="#ccc" size="24" />
      </div>
    </div>
  </div>
  <van-dialog
    style="text-align:center;"
    v-model:show="pfShow"
    title="评分"
    show-cancel-button
    :before-close="pfbeforeClose"
  >
    <van-rate
      v-model="score"
      :size="25"
      color="#ffd21e"
      void-icon="star"
      void-color="#eee"
    />
  </van-dialog>
  <van-dialog
    v-model:show="fankuiShow"
    title="评价"
    show-cancel-button
    :before-close="beforeClose"
  >
    <van-field
      v-model="fkmsg"
      rows="2"
      autosize
      label="反馈内容"
      type="textarea"
      maxlength="50"
      placeholder="请输入反馈内容"
      show-word-limit
    />
  </van-dialog>
</template>

<script>
import { reactive, toRefs, computed, onMounted, ref } from "vue";
import { Dialog, showToast, showSuccessToast, showLoadingToast, closeToast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/userStore";
const userStore = useUserStore();
const router = useRouter();
const fankuiShow = ref(false);
const pfShow = ref(false);
const fkmsg = ref("");
const score = ref(5);
const onClickLeft = () => {
  router.go(-1);
};
const outLogin = () => {
  Dialog.confirm({
    title: "退出登录",
    message: "",
  })
    .then(() => {
      userStore.setLoginInfo(null);
      router.push("/Home/Index");
    })
    .catch(() => {
      // on cancel
    });
};
const aboutUs = () => {
  Dialog.alert({
    title: "关于我们",
    confirmButtonColor: "#0570db",
    message: `Copyright © xxx`,
  }).then(() => {
    // on close
  });
};
// 评分
const pfbeforeClose = (action, done) => {
  console.log(action);
  if (action == "confirm") {
    score.value = 5;
    showToast("评分成功");
    return true;
  } else {
    return true;
  }
};
// 反馈
const beforeClose = (action, done) => {
  console.log(action);
  if (action == "confirm") {
    if (fkmsg) {
      fkmsg.value = "";
      showToast("反馈成功");
      return true;
    } else {
      showToast("反馈内容不能为空");
      return false;
    }
  } else {
    return true;
  }
};

const toSetPwd = () => {
  router.push("/SetPwd");
};

const tips = (msg) => {
  showToast(msg);
};
</script>

<style lang="scss" scoped>
.setting {
  width: 100%;
  height: calc(100% - 46px);
  overflow: auto;
  background: #f8f8fa;
  .setting-cont {
    margin-top: 15px;
    .setting-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid #eae6e6;
      line-height: 45px;
      span {
        margin-left: 10px;
      }
    }
    .logout-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid #eae6e6;
      line-height: 45px;
      margin-top: 30px;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
