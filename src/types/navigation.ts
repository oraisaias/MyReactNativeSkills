export type RootStackParamList = {
  Home: undefined;
  Navigator: { name: string };
  RealmApp: undefined;
};
export type RealmAppStackParamList = {
  Start: undefined;
  Data: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
