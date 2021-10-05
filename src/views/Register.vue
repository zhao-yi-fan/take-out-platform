<!-- 注册页面 -->
<template>
  <div class="wsw-login">
    <router-link tag="span" to="/" class="wsw-login-title">饿了么</router-link>
    <div class="wsw-login-body">
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="username" label="账号" placeholder="请输入账号" :rules="[{ required: true, message: '请填写账号' }]" />
        <van-field v-model="password" type="password" name="password" label="新密码" placeholder="请输入新密码" :rules="[{ required: true, message: '请填写新密码' }]" />
        <van-field v-model="passwordAgain" type="password" name="passwordAgain" label="密码确认" placeholder="再次输入密码" :rules="[
            { required: true, message: '请确认密码' },
            { validator: Validator, message: '请输入正确密码' },
          ]" />
        <van-field v-model="secret" type="secret" name="secret" label="暗号" placeholder="请输入暗号" :rules="[{ required: true, message: '请填写暗号' }]" />
        <div>
          <router-link to="/Login" tag="a" class="wsw-r">返回</router-link>
        </div>
        <van-button round block plain type="info" native-type="submit" color="#ed9428">注册</van-button>
      </van-form>
    </div>
    <div class="wsw-login-footer">Copyright © 移应2018-1-21吴尚尉</div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { Notify, Toast } from 'vant';
import {useRouter} from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: "",
  components: {},
  setup (propes, { root }) {
    const router = useRouter()
    const store = useStore();
    const model = reactive({
      username: "",
      password: "",
      secret: "",
      passwordAgain: "",
    });
    const onSubmit = async(values) => {
      console.log("submit", values);
      let isSuccess = await store.dispatch('register', values);
      Toast.loading({
        message: '注册中...',
        forbidClick: true,
      });
      setTimeout(() => {
        Toast.clear();
        if (isSuccess) {
          Toast.success('注册成功，请登录');
          router.push({
            path:'/Login'
          })
          console.log(store.state.userList);
        } else {
          Toast.fail('用户名已存在，请修改后重新提交！');
        }
      }, 1000);
    };
    const Validator = (val) => {
      if (val == model.password) {
        return true;
      } else {
        return false;
      }
    };
    return {
      ...toRefs(model),
      onSubmit,
      Validator,
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
    top: 60px;
    left: 20px;
    font-size: 20px;
    font-weight: bolder;
  }
  .wsw-login-body {
    width: 80%;
    margin: 0 auto;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-75%);
    .van-form {
      .van-cell {
        border-radius: 5px;
        margin-bottom: 10px;
        background-color: #f8df96;
        :deep(.van-cell__value) {
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
        :deep(span) {
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
