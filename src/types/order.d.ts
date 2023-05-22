type FoodList = Array<{
  foodId: string;
  foodMoney: number;
  foodName: string;
  foodNum: number;
  foodImageUrl: string;
}>;

type OrderState = {
  orderList: Array<{
    businessesId: number;
    shopsId: number;
    userId: number;
    status: string;
    address: string;
    people: string;
    phone: string;
    foodList: FoodList;
    money: string;
    evaluate: {
      content: string;
      score: number | null;
    };
    createDate: string;
    sendDate: string;
  }>;
};
type orderForm = {
  userId: number;
  shopsId: number;
  money: string;
  foodList: FoodList;
};
