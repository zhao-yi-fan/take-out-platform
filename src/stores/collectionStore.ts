import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { showToast } from "vant";
import { IcollectionState } from "@/types/collection";

export const useCollectionStore = defineStore("collection", {
  state: (): IcollectionState => ({
    collectionList: [
      {
        collectionId: 1,
        userId: 1,
        shopsIds: [2, 3],
      },
    ],
  }),
  getters: {},
  actions: {
    setCollectionList(collectionList: Array<any>) {
      this.collectionList = collectionList;
    },
    // 当前店铺是否被收藏
    isCollection(shopId: number) {
      const userStore = useUserStore();
      if (!userStore.isLogin) {
        return false;
      }
      const curr = this.collectionList.find(
        (item) => item.userId === userStore.loginInfo.userId
      );
      if (curr) {
        return curr.shopsIds.includes(shopId);
      } else {
        return false;
      }
    },
    // 收藏
    addCollection(collection: any) {
      const userStore = useUserStore();
      if (!userStore.isLogin) {
        showToast("请先登录");
        return;
      }
      const curr = this.collectionList.find(
        (item) => item.userId === userStore.loginInfo.userId
      );
      if (curr) {
        if (curr.shopsIds.includes(collection.shopId)) {
          curr.shopsIds = curr.shopsIds.filter(
            (item) => item !== collection.shopId
          );
          showToast("取消收藏");
        } else {
          curr.shopsIds.push(collection.shopId);
          showToast("收藏成功");
        }
      } else {
        this.collectionList.push({
          collectionId: this.collectionList.length + 1,
          userId: userStore.loginInfo.userId,
          shopsIds: [collection.shopId],
        });
        showToast("收藏成功");
      }
    },
  },
  persist: true,
});
