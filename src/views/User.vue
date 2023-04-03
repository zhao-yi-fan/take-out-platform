
<template>
  <div class="top-User">
    <div class="top-User-top clearfix">
      <img
        src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1077445954,4130602423&fm=26&gp=0.jpg"
        alt=""
      />
      <div class="user-cont">
        <p v-if="loginInfo">{{ loginInfo.username }}</p>
        <p v-else>
          <router-link to="/newLogin">登录</router-link>
          /
          <router-link to="/newRegister">注册</router-link>
        </p>
        <p>填满了肚子，人就不会空虚</p>
      </div>
    </div>
    <div class="module">
      <div class="module-title">
        <van-icon name="orders-o" color="#fff" size="24" />
        <span>我的订单</span>
      </div>
      <div class="module-cont">
        <div class="cont-btn" @click="toOrder">
          <van-icon name="orders-o" color="#e6ba3d" size="30" />
          <span>全部订单</span>
        </div>
      </div>
    </div>

    <div class="module">
      <div class="module-title">
        <van-icon name="like-o" color="#fff" size="24" />
        <span>收藏关注</span>
      </div>
      <div class="module-cont">
        <div class="cont-btn" @click="toCollect">
          <van-icon name="goods-collect-o" color="#ee0a24" size="30" />
          <span>全部收藏</span>
        </div>
      </div>
    </div>

    <div class="module">
      <div class="module-title">
        <van-icon name="edit" color="#fff" size="24" />
        <span>我的评价</span>
      </div>
      <div class="module-cont">
        <div class="cont-btn" @click="toComment">
          <van-icon name="good-job-o" color="#da5ef1" size="30" />
          <span>全部评价</span>
        </div>
      </div>
    </div>

    <div class="setting" @click="toSetting" v-if="loginInfo">
      <div class="setting-left">
        <van-icon name="setting-o" color="#fff" size="24" />
        <span>设置</span>
      </div>
      <van-icon name="arrow" color="#ccc" size="24" />
    </div>
    <!-- <van-button type="warning" class="outLogin" round>退出登录</van-button> -->
  </div>
</template>

<script setup>
import { reactive, toRefs, computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const loginInfo = computed(() => userStore.loginInfo);


const toOrder = () => {
  router.push("/Home/Order");
};
const toComment = () => {
  router.push("/Comment");
};
const toCollect = () => {
  router.push("/Collect");
};
const toSetting = () => {
  router.push("/Setting");
};
</script>

<style lang="scss" scoped>
$a: 100vh;
$b: 390px;
.top-User {
  width: 100%;
  height: calc(100% - 50px);
  overflow: auto;
  background: #f8f8fa;
  position: relative;
  .top-User-top {
    background: #ed9428;
    border-radius: 10px;
    position: relative;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 20px;
      vertical-align: top;
    }
    .user-cont {
      display: inline-block;
      p:nth-child(1) {
        margin-top: 30px;
        font-size: 16px;
        font-weight: bolder;
        a {
          color: #000;
        }
      }
      p:nth-child(2) {
        margin-top: 20px;
        font-size: 12px;
      }
    }
    .van-icon {
      position: absolute;
      right: 20px;
      top: 0;
    }
  }
  .module {
    background-color: #fff;
    margin-top: 10px;
    .module-title {
      padding: 0 0 0 10px;
      display: flex;
      align-items: center;
      line-height: 40px;
      border-bottom: 1px solid #eae6e6;
      i {
        border-radius: 50%;
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      i:before {
        font-size: 18px;
      }
      span {
        margin-left: 10px;
      }
    }

    .module-cont {
      display: flex;
      align-items: center;
      .cont-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        span {
          font-size: 12px;
        }
      }
    }
  }
  .module:nth-child(2) {
    .module-title {
      i {
        background-color: #fd805a;
      }
    }
  }
  .module:nth-child(3) {
    .module-title {
      i {
        background-color: #ea6d32;
      }
    }
  }
  .module:nth-child(4) {
    .module-title {
      i {
        background-color: #25bb4c;
      }
    }
  }
  .setting {
    margin-top: 10px;
    background-color: #fff;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting-left {
      display: flex;
      align-items: center;
      i {
        border-radius: 50%;
        width: 25px;
        height: 25px;
        background-color: #5ca0e6;
        margin: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      i:before {
        font-size: 18px;
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
