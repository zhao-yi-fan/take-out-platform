export type loginInfo = {
  userId: number;
} | null;

export interface UserState {
  userList: Array<any>;
  loginInfo: loginInfo;
}
export type loginData = {
  username: string;
  password: string;
};

export type RegisterData = Pick<loginData, "username" | "password"> & {
  secret: string;
};
