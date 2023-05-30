export type loginInfo = {
  userId: number;
} | null;

export interface IuserState {
  userList: Array<any>;
  loginInfo: loginInfo;
}
export interface IloginData {
  username: string;
  password: string;
}

export type IRegisterData = Pick<IloginData, "username" | "password"> & {
  secret: string;
};
