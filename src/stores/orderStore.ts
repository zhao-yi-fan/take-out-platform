import { defineStore } from "pinia";
import { useShopStore } from "./shopStore";
import dayjs from "dayjs";
import { orderForm } from "@/types/order";

export const useOrderStore = defineStore("order", {
  state: (): OrderState => {
    return {
      orderList: [
        {
          businessesId: 1,
          shopsId: 13,
          userId: 1,
          status: "success",
          address: "长沙湖南工业职业技术学院",
          people: "xxx",
          phone: "18974868294",
          foodList: [
            {
              foodId: "1_1",
              foodMoney: 12.5,
              foodName: "汉堡",
              foodNum: 3,
              foodImageUrl:
                "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3285227120,3432336058&fm=26&gp=0.jpg",
            },
          ],
          money: "37.5",
          evaluate: {
            content: "唉呀妈呀相当好吃",
            score: 4.5,
          },
          createDate: "2021-01-06 08:41:39",
          sendDate: "2021-01-06 08:56:39",
        },
      ],
    };
  },
  getters: {},
  actions: {
    setOrderList(orderList: Array<any>) {
      this.orderList = orderList;
    },
    getMyOrder(userId = {}) {
      const shopStore = useShopStore();
      let myOrderList = this.orderList.filter(
        (item) => item.userId == userId && item.status == "success"
      );

      // 增加商品信息
      return myOrderList.map((currentItem, index) => {
        const shopsInfo = shopStore.shopsList.find(
          (item) => item.shopsId == currentItem.shopsId
        );
        return {
          ...currentItem,
          shopsInfo: shopsInfo || {},
        };
      });
    },
    setOrderInfo(orderForm: orderForm) {
      let { userId, shopsId, money, foodList } = orderForm;
      let businessesId = this.orderList[this.orderList.length - 1].businessesId;
      businessesId++;
      this.orderList.push({
        businessesId,
        shopsId,
        userId,
        foodList,
        money,
        status: "apply",
        evaluate: {
          content: "",
          score: null,
        },
        address: "",
        people: "",
        phone: "",
        createDate: "",
        sendDate: "",
      });
      return {
        code: 1,
        businessesId,
      }; // 下单成功
    },
    setOrderStatus(statusForm = {}) {
      let { businessesId, address, people, phone } = statusForm;
      let isExist = false;
      let orderList = this.orderList;
      let orderItem = orderList.find((item, index) => {
        return item.businessesId == businessesId;
      });
      if (orderItem) {
        let currDayjs = dayjs();
        orderItem.status = "success";
        orderItem.address = address;
        orderItem.people = people;
        orderItem.phone = phone;
        orderItem.createDate = currDayjs.format("YYYY-MM-DD hh:mm:ss");
        orderItem.sendDate = currDayjs
          .add(15, "minute")
          .format("YYYY-MM-DD hh:mm:ss");
        isExist = true;
      }
      this.setOrderList(orderList);
      if (isExist) {
        return true; // 下单成功
      } else {
        return false; // 下单失败
      }
    },
  },
  persist: true,
});
