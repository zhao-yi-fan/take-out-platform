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
                commodityMoney: 12.50,
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
                commodityMoney: 12.50,
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "2",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: 12.50,
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "3",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: 12.50,
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
                commodityMoney: 12.50,
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "2",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: 12.50,
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "3",
                commodityImage: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg",
                commodityName: "夏威夷菠萝堡",
                commodityMoney: 12.50,
                commodityDescribe: "充满了夏天的味道",
              },
            ],
          }
        ],
      },
      {
        shopsId: "3",
        shopsName: "肯德基",
        shopsImage:
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2971128110,1131389812&fm=26&gp=0.jpg",
        signImage:
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3931371177,3952576752&fm=26&gp=0.jpg",
        shopsStart: "20",
        freight: "2",
        score: "4.5",
        address: "肯德基KFC坚持“立足中国、融入生活”,打造新快餐,提供早餐,午餐,下午茶,晚餐,夜宵和甜品站等丰富选择。",
        notice: "肯德基24小时外卖送餐电话:4008823823。",
        commodity: [
          {
            classificationId: 1,
            text: "汉堡主食",
            children: [
              {
                commodityId: "1",
                commodityImage: "http://d3.5ikfc.com/p/1/136/5ikfc_2wbba8.jpg",
                commodityName: "新奥尔良烤鸡腿堡",
                commodityMoney: 16.50,
                commodityDescribe: "烤鸡，非油炸",
              },
              {
                commodityId: "2",
                commodityImage: "http://d3.5ikfc.com/p/1/136/5ikfc_2zqhth.jpg",
                commodityName: "香辣鸡腿堡",
                commodityMoney: 16.50,
                commodityDescribe: "油炸鸡腿肉，酥脆",
              },
              {
                commodityId: "3",
                commodityImage: "http://d3.5ikfc.com/p/1/136/5ikfc_2actcd.jpg",
                commodityName: "半鸡半虾堡",
                commodityMoney: 19.00,
                commodityDescribe: "一半虾，一半鸡肉，更加香",
              },
              {
                commodityId: "4",
                commodityImage: "http://d3.5ikfc.com/p/1/136/5ikfc_2taexx.jpg",
                commodityName: "BBQ手撕猪肉堡",
                commodityMoney: 18.00,
                commodityDescribe: "充满烧烤风情",
              },
              {
                commodityId: "5",
                commodityImage: "http://d3.5ikfc.com/p/1/136/5ikfc_29jve2.jpg",
                commodityName: "培根烤鸡堡",
                commodityMoney: 17.50,
                commodityDescribe: "双重肉类冲击味蕾",
              },
            ]
          },
          {
            classificationId: 2,
            text: "饮品",
            children: [
              {
                commodityId: "1",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/dessertanddrink/preview/kfc-5ikfc-19325_07.jpg",
                commodityName: "桃汁恋乌龙茶",
                commodityMoney: 13.50,
                commodityDescribe: "桃子与乌龙茶恋爱了",
              },
              {
                commodityId: "2",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/dessertanddrink/preview/kfc-5ikfc-19325_06.jpg",
                commodityName: "恋柠恋桔乌龙茶",
                commodityMoney: 13.50,
                commodityDescribe: "酸酸甜甜清爽的味道",
              },
              {
                commodityId: "3",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/dessertanddrink/preview/kfc-5ikfc-191121_221.jpg",
                commodityName: "九龙金玉珍珠奶茶",
                commodityMoney: 14.50,
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "4",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/dessertanddrink/preview/kfc-5ikfc-191121_223.jpg",
                commodityName: "九龙金玉乌龙奶茶",
                commodityMoney: 12.50,
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "5",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/dessertanddrink/preview/kfc-5ikfc-22427_162.jpg",
                commodityName: "樱之语特饮",
                commodityMoney: 16.00,
                commodityDescribe: "充满了夏天的味道",
              },
              {
                commodityId: "6",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/dessertanddrink/preview/kfc-5ikfc-22723_02.jpg",
                commodityName: "粉椒西柚莫吉托(鸡尾酒)",
                commodityMoney: 18.00,
                commodityDescribe: "充满了夏天的味道",
              },
            ],
          },
          {
            classificationId: 2,
            text: "酥脆小食",
            children: [
              {
                commodityId: "1",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/snack/preview/Snack_1.jpg",
                commodityName: "吮指原味鸡",
                commodityMoney: 10.00,
                commodityDescribe: "酥脆、多汁",
              },
              {
                commodityId: "2",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/snack/preview/Snack_2.jpg",
                commodityName: "香辣鸡翅",
                commodityMoney: 9.50,
                commodityDescribe: "酥脆、多汁",
              },
              {
                commodityId: "3",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/snack/preview/Snack_3.jpg",
                commodityName: "新奥尔良烤翅",
                commodityMoney: 10.50,
                commodityDescribe: "酥脆、多汁",
              },
              {
                commodityId: "4",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/snack/preview/Snack_5.jpg",
                commodityName: "上校鸡块",
                commodityMoney: 12.50,
                commodityDescribe: "酥脆、多汁",
              },
              {
                commodityId: "5",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/snack/preview/Snack_4.jpg",
                commodityName: "劲爆鸡米花",
                commodityMoney: 11.50,
                commodityDescribe: "酥脆、多汁",
              },
              {
                commodityId: "6",
                commodityImage: "http://cache.5ikfc.com/imgs/kfc/menu/snack/preview/kfc-xinsutiao-16713_01.jpg",
                commodityName: "薯条",
                commodityMoney: 10.00,
                commodityDescribe: "酥脆",
              },
            ],
          }
        ],
      },
    ],
    orderList: [
      {
        businessesId: 1,
        shopsId: 2,
        userId: 1,
        status: 'success',
        address: '',
        foodList: [
          {
            foodId: '1_1',
            foodMoney: 12.5,
            foodName: '汉堡',
            foodNum: 3,
            foodImageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3285227120,3432336058&fm=26&gp=0.jpg'
          },
        ],
        money: '37.5',
        evaluate: {
          content: '唉呀妈呀相当好吃',
          score: '4.5'
        }
      }
    ],
    collectionList:[
      {
        collectionId: 1,
        userId:1,
        shopsIds:['2', '3']
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
    setOrderInfo ({ commit, state }, orderForm = {}) {
      let { userId, shopsId, money, foodList } = orderForm;
      let businessesId = state.orderList[state.orderList.length - 1].businessesId;
      businessesId++;

      state.orderList.push({
        businessesId,
        shopsId,
        userId,
        foodList,
        money,
        status: 'apply',
        evaluate: {
          content: '',
          score: null
        }
      });
      return {
        code: 1,
        businessesId
      }; // 下单成功

    },
    setOrderStatus ({ commit, state }, statusForm={}) {
      let {businessesId,address} = statusForm;
      let isExist = false;
      state.orderList.forEach((item, index) => {
        if (item.businessesId == businessesId) {
          isExist = true;
          item.status = 'success'
          item.address = address;
        }
      })
      if (isExist) {
        return true; // 下单成功
      } else {
        return false; // 下单失败
      }
    },
    getMyOrder ({ commit, state }, myForm = {}) {
      let { userId } = myForm;
      let myOrderList = [];
      state.orderList.forEach((item, index) => {
        if (item.useId == userId && item.status == 'success') {
          myOrderList.push(item)
        }
      });
      // 增加商品信息
      myOrderList.map((currentItem, index) => {
        for (let i = 0; i < state.shopsList.length; i++) {
          if (currentItem.shopsId == state.shopsList[i].shopsId) {
            let shopsInfo = state.shopsList[i];
            // currentItem.foodList.forEach((foodItem, foodIndex) => {
            // let idArr = foodItem.foodId.split('_');
            // shopsInfo.commodity.forEach((typeItem, typeIndex) => {
            //   if (typeItem.classificationId == idArr[0]) {
            //     foodItem.text = typeItem.text;
            //     typeItem.children.forEach((typeSonItem, typeSonIndex) => {
            //       if (typeSonItem.commodityId == idArr[1]) {
            //         foodItem.text += '-' + typeSonItem.commodityName;
            //         foodItem.price = typeSonItem.commodityMoney;
            //       }
            //     })
            //   }
            // })
            // })
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
