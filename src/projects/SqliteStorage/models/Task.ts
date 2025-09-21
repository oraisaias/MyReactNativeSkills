export interface Task {
  id?: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
}

export interface UpdateTaskData {
  id: number;
  title?: string;
  description?: string;
  isCompleted?: boolean;
}
