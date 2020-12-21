import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
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
    shopsList: [
      {
        shopsId: "1",
        shopsName: "华莱士",
        shopsImage:
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3931901972,2904817796&fm=26&gp=0.jpg",
        signImage:
          "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1480947573,857613235&fm=26&gp=0.jpg",
        shopsStart: "20",
        freight: "2",
        score: "4.5",
        address: "北京市通州区砖厂南里40号楼华远铭悦好天地1层139号",
        notice: "xxxx good",
        commodity: [
          {
            classificationId: 1,
            text: "汉堡",
            children: [
              {
                commodityId: "1",
                commodityName: "汉堡",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3285227120,3432336058&fm=26&gp=0.jpg",
                commodityMoney: "12.50",
                commodityDescribe: "描述",
              },
            ],
          },
        ],
      },
      {
        shopsId: "2",
        shopsName: "汉堡王",
        shopsImage:
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2665539707,3309730618&fm=26&gp=0.jpg",
        signImage:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608389530755&di=0bf62e45f9bfe4d61c47bdfef93cf0c3&imgtype=0&src=http%3A%2F%2Fd1.5ikfc.com%2Fcoupons%2Fhbw%2F2014%2Fhbw-5ikfc-1219_01.jpg",
        shopsStart: "20",
        freight: "2",
        score: "4.5",
        address: "北京市通州区砖厂南里40号楼华远铭悦好天地1层139号",
        notice: "xxxx good",
        commodity: [
          {
            classificationId: 1,
            text: "汉堡",
            children: [
              {
                commodityId: "1",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "2",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "3",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
            ]
          },
          {
            classificationId: 2,
            text: "饮品",
            children: [
              {
                commodityId: "1",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "2",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "3",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
            ],
          }
        ],
      },
      {
        shopsId: "2",
        shopsName: "汉堡王",
        shopsImage:
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2665539707,3309730618&fm=26&gp=0.jpg",
        signImage:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608389530755&di=0bf62e45f9bfe4d61c47bdfef93cf0c3&imgtype=0&src=http%3A%2F%2Fd1.5ikfc.com%2Fcoupons%2Fhbw%2F2014%2Fhbw-5ikfc-1219_01.jpg",
        shopsStart: "20",
        freight: "2",
        score: "4.5",
        address: "北京市通州区砖厂南里40号楼华远铭悦好天地1层139号",
        notice: "xxxx good",
        commodity: [
          {
            classificationId: 1,
            text: "汉堡",
            children: [
              {
                commodityId: "1",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "2",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "3",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
            ]
          },
          {
            classificationId: 2,
            text: "饮品",
            children: [
              {
                commodityId: "1",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "2",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "3",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: "12.50",
                commodityDescribe: "充满了夏天的味道",
              },
            ],
          }
        ],
      },
    ],
    orderList: [
      {
        businessesId: 1,
        shopsId: 1,
        userId: 1,
        foodList: [
          {
            foodId: '1_1',
            num: 3
          },
          {
            foodId: '2_2',
            num: 6
          }
        ],
        money: '',
        evaluate: {
          content: '挺好',
          score: 5
        }
      }
    ]
  },
  mutations: {
    SET_LOGIN_INFO: (state, loginInfo) => {
      console.log(loginInfo, "loginInfo===");
      state.loginInfo = loginInfo;
    },
    SET_USER_LIST: (state, userList) => {
      console.log(userList, "userList===");
      state.userList = userList;
    },
  },
  actions: {
    login ({ commit, state }, loginData = {}) {
      let { username, password } = loginData;
      for (let i = 0; i < state.userList.length; i++) {
        let userItem = state.userList[i];
        if (userItem.password === password && userItem.username === username) {
          commit("SET_LOGIN_INFO", userItem);
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
      });
      return true; // 注册成功
    },
    forgetPwd ({ commit, state }, forgetPwd = {}) {
      let { username, password, secret } = forgetPwd;
      let userList = state.userList;
      for (let i = 0; i < userList.length; i++) {
        let userItem = userList[i];
        if (userItem.username === username) {
          if (userItem.secret === secret) {
            userItem.password = password;
            commit("SET_USER_LIST", userList);
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
        }
      }
      return {
        code: 3,
        msg: "修改失败，用户名不存在！",
      };
    },
    setOrder ({ commit, state }, orderForm = {}) {
      let { userId, shopsId, money, foodList } = orderForm;
      let businessesId = state.orderList[state.orderList.length - 1].businessesId;
      businessesId++;

      state.orderList.push({
        businessesId,
        shopsId,
        userId,
        foodList,
        money,
        evaluate: {
          content: '',
          score: null
        }
      });
      return true; // 下单成功

    },
    getMyOrder ({ commit, state }, myForm = {}) {
      let { userId } = myForm;
      let myOrderList = [];
      state.orderList.forEach((item, index) => {
        if (item.useId == userId) {
          myOrderList.push(item)
        }
      });
      // 增加商品信息
      myOrderList.map((currentItem, index) => {
        for (let i = 0; i < state.shopsList.length; i++) {
          if (currentItem.shopsId == state.shopsList[i].shopsId) {
            let shopsInfo = state.shopsList[i];
            currentItem.foodList.forEach((foodItem, foodIndex) => {
              let idArr = foodItem.foodId.split('_');
              shopsInfo.commodity.forEach((typeItem, typeIndex) => {
                if (typeItem.classificationId == idArr[0]) {
                  foodItem.text = typeItem.text;
                  typeItem.children.forEach((typeSonItem, typeSonIndex) => {
                    if (typeSonItem.commodityId == idArr[1]) {
                      foodItem.text += '-' + typeSonItem.commodityName;
                      foodItem.price = typeSonItem.commodityMoney;
                    }
                  })
                }
              })
            })
            currentItem.shopsInfo = shopsInfo;
          }
        }
        return currentItem;
      })
      return myOrderList;
    },
  },
  plugins: [createPersistedState()],
  modules: {},
});
