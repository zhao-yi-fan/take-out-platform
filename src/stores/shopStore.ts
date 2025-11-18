import type { ShopState } from "@/types/shop";
import { defineStore } from "pinia";
import { initialShopsData } from "@/data/shopData";

export const useShopStore = defineStore("shop", {
  state: (): ShopState => ({
    baseAddress: {
      name: "北京市/北京市/东城区",
      code: "110101",
    },
    shopsList: initialShopsData,
  }),
  getters: {},
  actions: {
    setCurrAddress(addressForm: { name: string; code: string }): void {
      const { name, code } = addressForm;
      this.baseAddress = {
        name,
        code,
      };
    },
    search(key: string = ""): ShopState["shopsList"] {
      key = key.trim();
      return this.shopsList.filter(
        (item) =>
          item.shopsName.indexOf(key) > -1 &&
          item.addressCode === this.baseAddress.code
      );
    },
  },
  persist: true,
});
