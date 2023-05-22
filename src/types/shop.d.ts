export type Shop = {
  shopsId: number;
  shopsName: string;
  classificationType: number;
  addressCode: string;
  shopsImage: string;
  signImage: string;
  shopsStart: string;
  freight: string;
  score: string;
  address: string;
  notice: string;
  commodity: Array<{
    classificationId: number;
    text: string;
    children: Array<{
      commodityId: string;
      commodityImage: string;
      commodityName: string;
      commodityMoney: string | number;
      commodityDescribe: string;
    }>;
  }>;
};
export type ShopsList = Array<Shop>;
export type ShopState = {
  baseAddress: {
    name: string;
    code: string;
  };
  shopsList: ShopsList;
};
