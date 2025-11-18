import {
  IRegisterData,
  IUserState,
  ILoginData,
  LoginInfo,
  IUser,
  IResponse,
  ILoginResponse,
  IRegisterResponse,
} from "@/types/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): IUserState => ({
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
    loginInfo: null, // 登录后的信息
  }),

  getters: {
    isLogin(): boolean {
      return !!this.loginInfo;
    },
  },

  actions: {
    /**
     * 私有方法：根据用户名查找用户
     */
    _findUserByUsername(username: string): IUser | undefined {
      return this.userList.find((item) => item.username === username);
    },

    /**
     * 私有方法：根据用户ID查找用户
     */
    _findUserById(userId: number): IUser | undefined {
      return this.userList.find((item) => item.userId === userId);
    },

    /**
     * 私有方法：生成新用户ID（处理边界情况）
     */
    _generateNewUserId(): number {
      if (this.userList.length === 0) {
        return 1;
      }
      return this.userList[this.userList.length - 1].userId + 1;
    },

    /**
     * 设置登录信息
     */
    setLoginInfo(loginInfo: LoginInfo) {
      this.loginInfo = loginInfo;
    },

    /**
     * 用户登录
     */
    login(loginData: ILoginData): ILoginResponse {
      const { username, password } = loginData;
      const userInfo = this._findUserByUsername(username);

      if (!userInfo) {
        return { success: false, msg: "用户不存在" };
      }

      if (userInfo.password !== password) {
        return { success: false, msg: "密码错误" };
      }

      this.loginInfo = userInfo;
      return { success: true };
    },

    /**
     * 用户注册
     */
    register(registerData: IRegisterData): IRegisterResponse {
      const { username, password, secret } = registerData;

      // 检查用户是否已存在
      if (this._findUserByUsername(username)) {
        return { success: false, msg: "用户名已存在" };
      }

      // 安全地生成新ID
      const newUserId = this._generateNewUserId();

      this.userList.push({
        userId: newUserId,
        username,
        password,
        secret,
      });

      return { success: true, msg: "注册成功" };
    },

    /**
     * 设置用户列表
     */
    setUserList(userList: IUser[] = []) {
      this.userList = userList;
    },

    /**
     * 忘记密码（通过暗号重置密码）
     */
    forgetPwd(forgetPwd: IRegisterData): IResponse {
      const { username, password, secret } = forgetPwd;
      const userItem = this._findUserByUsername(username);

      if (!userItem) {
        return { code: 3, msg: "修改失败，用户名不存在！" };
      }

      if (userItem.secret !== secret) {
        return { code: 2, msg: "修改失败，暗号错误！" };
      }

      userItem.password = password;
      return { code: 1, msg: "修改成功！" };
    },

    /**
     * 修改密码
     */
    setPwd(setPwdForm: {
      userId: number;
      rawPassword: string;
      password: string;
      rePassword: string;
    }): IResponse {
      const { userId, rawPassword, password, rePassword } = setPwdForm;

      // 验证：两次密码是否一致
      if (password !== rePassword) {
        return {
          code: 2,
          msg: "两次密码输入不一致，请检查后重新提交！",
        };
      }

      // 查找用户
      const userItem = this._findUserById(userId);
      if (!userItem) {
        return {
          code: 2,
          msg: "用户不存在，非法操作！",
        };
      }

      // 验证：原密码是否正确
      if (userItem.password !== rawPassword) {
        return {
          code: 2,
          msg: "原密码输入错误，请检查后重新提交！",
        };
      }

      // 验证：新旧密码不能相同
      if (userItem.password === password) {
        return {
          code: 2,
          msg: "原密码和新密码不能一样！",
        };
      }

      // 更新密码
      userItem.password = password;
      return {
        code: 1,
        msg: "修改成功！",
      };
    },
  },

  persist: true,
});
