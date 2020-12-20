import { createStore } from 'vuex'

export default createStore({
  state: {
    userList: [
      {
        userId: 1,
        username: 'admin',
        password: '123456',
        secret: ''
      },
      {
        userId: 2,
        username: 'zhangsan',
        password: '123456',
        secret: ''
      },
    ]
  },
  mutations: {
  },
  actions: {
    login ({ commit, state }, loginData = {}) {
      let { username, password } = loginData;
      for (let i = 0; i < state.userList.length; i++) {
        let userItem = state.userList[i];
        if (userItem.password === password && userItem.username === username) {
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
  },
  modules: {
  }
})
