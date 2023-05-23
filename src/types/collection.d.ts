export type CollectionState = {
  collectionList: Array<{
    collectionId: number;
    userId: number;
    shopsIds: Array<number>;
  }>;
};
