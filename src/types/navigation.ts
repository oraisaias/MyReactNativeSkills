export type RootStackParamList = {
  Navigator: { name: string };
  Home: undefined;
  EverySingleComponentBeingUsed: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type EverySingleComponentStackParamList = {
  Home: undefined;
  ActivityIndicator: undefined;
  FlatList: undefined;
};