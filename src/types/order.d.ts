export interface Food {
  foodId: string;
  foodMoney: number;
  foodName: string;
  foodNum: number;
  foodImageUrl: string;
}

export type FoodList = Food[];

export interface OrderState {
  orderList: Array<{
    businessesId: number;
    shopsId: number;
    userId: number;
    status: string;
    address: string;
    people: string;
    phone: string;
    foodList: FoodList;
    money: number;
    evaluate: {
      content: string;
      score: number | null;
    };
    createDate: string;
    sendDate: string;
  }>;
}
export interface orderForm {
  userId: number;
  shopsId: number;
  money: number;
  foodList: FoodList;
}
