export type RootStackParamList = {
  Navigator: { name: string };
  Home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
