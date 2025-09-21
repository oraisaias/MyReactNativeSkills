export type RootStackParamList = {
  Home: undefined;
  Profile: { name: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
