import { defineStore } from "pinia";

export const useCollectionStore = defineStore("collection", {
  state: () => ({
    collectionList: [
      {
        collectionId: 1,
        userId: 1,
        shopsIds: ["2", "3"],
      },
    ],
  }),
  getters: {},
  actions: {
    setCollectionList(collectionList: Array<any>) {
      this.collectionList = collectionList;
    },
  },
  persist: true,
});
