import { RegisterData, UserState, loginData, loginInfo } from "@/types/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userList: [
      {
        userId: 1,
        username: "admin",
        password: "123456",
        secret: "111",
      },
      {
        userId: 2,
        username: "zhangsan",
        password: "123456",
        secret: "",
      },
    ],
    loginInfo: null, // 登录后的信息,
  }),
  getters: {
    isLogin(): boolean {
      return !!this.loginInfo;
    },
  },
  actions: {
    setLoginInfo(loginInfo: loginInfo) {
      this.loginInfo = loginInfo;
    },
    login(loginData: loginData) {
      let { username, password } = loginData;
      let userInfo = this.userList.find((item) => {
        return item.password === password && item.username === username;
      });
      if (userInfo) {
        this.loginInfo = userInfo;
        return true; // 登录成功
      } else {
        return false;
      }
    },
    register(registerData: RegisterData) {
      let { username, password, secret } = registerData;
      let lastId = this.userList[this.userList.length - 1].userId;
      lastId++;
      let isExist = this.userList.some((item) => {
        return item.username === username;
      });
      if (isExist) {
        return false; // 用户已存在
      }
      this.userList.push({
        userId: lastId,
        username,
        password,
        secret,
      });
      return true; // 注册成功
    },
    setUserList(userList = []) {
      this.userList = userList;
    },
    forgetPwd(forgetPwd: RegisterData) {
      let { username, password, secret } = forgetPwd;
      let userList = this.userList;
      let userItem = userList.find((item) => {
        return item.username === username;
      });
      if (userItem) {
        if (userItem.secret === secret) {
          userItem.password = password;
          this.setUserList(userList);
          return {
            code: 1,
            msg: "修改成功！",
          };
        } else {
          return {
            code: 2,
            msg: "修改失败，暗号错误！",
          };
        }
      } else {
        return {
          code: 3,
          msg: "修改失败，用户名不存在！",
        };
      }
    },
    setPwd(setPwdForm: {
      userId: number;
      rawPassword: string;
      password: string;
      rePassword: string;
    }) {
      let { userId, rawPassword, password, rePassword } = setPwdForm;
      if (password !== rePassword) {
        return {
          code: 2,
          msg: "两次密码输入不一致，请检查后重新提交！",
        };
      }
      let userList = this.userList;
      // 使用find代替for循环
      let userItem = userList.find((item) => {
        return item.userId === userId;
      });
      if (userItem) {
        if (userItem.password !== rawPassword) {
          return {
            code: 2,
            msg: "原密码输入错误，请检查后重新提交！",
          };
        } else if (userItem.password === password) {
          return {
            code: 2,
            msg: "原密码和新密码不能一样！",
          };
        } else {
          userItem.password = password;
          this.setUserList(userList);
          return {
            code: 1,
            msg: "修改成功！",
          };
        }
      }

      return {
        code: 2,
        msg: "用户不存在，非法操作！",
      };
    },
  },
  persist: true,
});
