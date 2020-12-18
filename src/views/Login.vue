<!-- 登录页面 -->
<template>
  <div class="wsw-login">
    <span class="wsw-login-title">校园外卖</span>
    <div class="wsw-login-body">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="账号"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div>
          <router-link to="/Register" tag="a">还没有注册？</router-link>
          <router-link to="/" tag="a" class="wsw-r">忘记密码？</router-link>
        </div>
        <van-button
          round
          block
          plain
          type="info"
          native-type="submit"
          color="#ed9428"
          >登录</van-button
        >
      </van-form>
    </div>
    <div class="wsw-login-footer">Copyright © 移应2018-1-21吴尚尉</div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  name: "",
  components: {},
  setup(propes, { root }) {
    const model = reactive({
      username: "",
      password: "",
    });
    const onSubmit = (values) => {
      console.log("submit", values);
    };

    return {
      ...toRefs(model),
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.wsw-login {
  background: url(../assets/images/loginBac.jpg);
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
  .wsw-login-title {
    position: absolute;
    color: #fff;
    top: 50px;
    left: 5px;
    font-size: 20px;
    font-weight: bolder;
  }
  .wsw-login-body {
    width: 80%;
    margin: 0 auto;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-80%);
    .van-form {
      .van-cell {
        border-radius: 5px;
        margin-bottom: 10px;
        background-color: #f8df96;
        ::v-deep .van-cell__value {
          input {
            color: #fff;
          }
          .van-field__error-message {
            position: absolute;
            right: 0;
            top: 1px;
          }
        }
      }
      .van-button {
        width: 50%;
        margin: 20px auto;
        border: none;
        background-color: rgb(255 255 255 / 70%);
        ::v-deep span {
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
  .wsw-login-footer {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    bottom: 10px;
    color: #f7d9a5;
  }
}
</style>
