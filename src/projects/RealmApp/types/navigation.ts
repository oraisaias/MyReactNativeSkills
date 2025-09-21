import { Realm } from '@realm/react';

export type RealmAppStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  EditTask: { taskId: string };
};
