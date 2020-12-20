import { createStore } from 'vuex'

export default createStore({
  state: {
    userList: [
      {
        userId: 1,
        username: 'admin',
        password: '123456',
        secret: '111'
      },
      {
        userId: 2,
        username: 'zhangsan',
        password: '123456',
        secret: ''
      },
    ],
    loginInfo: null // 登录后的信息
  },
  mutations: {
    SET_LOGIN_INFO: (state, loginInfo) => {
      console.log(loginInfo, 'loginInfo===');
      state.loginInfo = loginInfo
    },
    SET_USER_LIST: (state, userList) => {
      console.log(userList, 'userList===');
      state.userList = userList
    },
  },
  actions: {
    login ({ commit, state }, loginData = {}) {
      let { username, password } = loginData;
      for (let i = 0; i < state.userList.length; i++) {
        let userItem = state.userList[i];
        if (userItem.password === password && userItem.username === username) {
          commit('SET_LOGIN_INFO', userItem);
          return true; // 登录成功
        }
      }
      return false; // 登陆失败
    },
    register ({ commit, state }, registerData = {}) {
      let { username, password, secret } = registerData;
      let lastId = state.userList[state.userList.length - 1].userId;
      lastId++;
      for (let i = 0; i < state.userList.length; i++) {
        let userItem = state.userList[i];
        if (userItem.username === username) {
          return false; // 用户已存在
        }
      }
      state.userList.push({
        lastId,
        username,
        password,
        secret,
      })
      return true; // 注册成功
    },
    forgetPwd ({ commit, state }, forgetPwd = {}) {
      let { username, password, secret } = forgetPwd;
      let userList = state.userList;
      for (let i = 0; i < userList.length; i++) {
        let userItem = userList[i];
        if (userItem.username === username) {
          if (userItem.secret === secret) {
            userItem.password = password
            commit('SET_USER_LIST',userList)
            return {
              code: 1,
              msg: '修改成功！'
            };
          } else {
            return {
              code: 2,
              msg: '修改失败，暗号错误！'
            };
          }
        }
      }
      return {
        code: 3,
        msg: '修改失败，用户名不存在！'
      };
    },
  },
  modules: {
  }
})
