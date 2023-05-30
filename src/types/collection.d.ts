export interface IcollectionState {
  collectionList: Array<{
    collectionId: number;
    userId: number;
    shopsIds: Array<number>;
  }>;
}
