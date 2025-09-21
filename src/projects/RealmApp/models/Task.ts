import { Realm } from '@realm/react';

export class Task extends Realm.Object<Task> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  description?: string;
  isCompleted!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
      title: { type: 'string', indexed: true },
      description: { type: 'string', optional: true },
      isCompleted: { type: 'bool', default: false },
      createdAt: { type: 'date', default: () => new Date() },
      updatedAt: { type: 'date', default: () => new Date() },
    },
  };
}

export default Task;
