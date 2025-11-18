// 用户信息接口
export interface IUser {
  userId: number;
  username: string;
  password: string;
  secret: string;
}

// 登录信息类型
export type LoginInfo = IUser | null;

// 用户状态接口
export interface IUserState {
  userList: IUser[];
  loginInfo: LoginInfo;
}

// 登录表单数据接口
export interface ILoginData {
  username: string;
  password: string;
}

// 注册表单数据接口
export type IRegisterData = Pick<ILoginData, "username" | "password"> & {
  secret: string;
};

// 统一响应接口
export interface IResponse {
  code: number;
  msg: string;
}

// 登录响应接口
export interface ILoginResponse {
  success: boolean;
  msg?: string;
}

// 注册响应接口
export interface IRegisterResponse {
  success: boolean;
  msg: string;
}
