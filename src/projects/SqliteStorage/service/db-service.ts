import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import { Task, CreateTaskData, UpdateTaskData } from '../models/Task';

enablePromise(true);

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  return openDatabase({name: 'todo-data.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase): Promise<void> => {
  const query = `CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    isCompleted INTEGER DEFAULT 0,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );`;
  
  await db.executeSql(query);
};

export const getTasks = async (db: SQLiteDatabase): Promise<Task[]> => {
  try {
    const tasks: Task[] = [];
    const results = await db.executeSql('SELECT * FROM tasks ORDER BY createdAt DESC');
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const row = result.rows.item(index);
        tasks.push({
          id: row.id,
          title: row.title,
          description: row.description,
          isCompleted: Boolean(row.isCompleted),
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        });
      }
    });
    return tasks;
  } catch (error) {
    console.error('Error getting tasks:', error);
    throw Error('Failed to get tasks from database');
  }
};

export const createTask = async (db: SQLiteDatabase, taskData: CreateTaskData): Promise<void> => {
  const now = new Date().toISOString();
  const insertQuery = `INSERT INTO tasks(title, description, createdAt, updatedAt) VALUES(?, ?, ?, ?)`;
  
  await db.executeSql(insertQuery, [
    taskData.title,
    taskData.description || '',
    now,
    now
  ]);
};

export const updateTask = async (db: SQLiteDatabase, taskData: UpdateTaskData): Promise<void> => {
  const now = new Date().toISOString();
  
  // Construir query dinámicamente basado en los campos proporcionados
  const fields = [];
  const values = [];
  
  if (taskData.title !== undefined) {
    fields.push('title = ?');
    values.push(taskData.title);
  }
  
  if (taskData.description !== undefined) {
    fields.push('description = ?');
    values.push(taskData.description);
  }
  
  if (taskData.isCompleted !== undefined) {
    fields.push('isCompleted = ?');
    values.push(taskData.isCompleted ? 1 : 0);
  }
  
  fields.push('updatedAt = ?');
  values.push(now);
  values.push(taskData.id);
  
  const updateQuery = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
  
  await db.executeSql(updateQuery, values);
};

export const deleteTask = async (db: SQLiteDatabase, id: number): Promise<void> => {
  const deleteQuery = 'DELETE FROM tasks WHERE id = ?';
  await db.executeSql(deleteQuery, [id]);
};

export const getTaskById = async (db: SQLiteDatabase, id: number): Promise<Task | null> => {
  try {
    const results = await db.executeSql('SELECT * FROM tasks WHERE id = ?', [id]);
    if (results[0].rows.length > 0) {
      const row = results[0].rows.item(0);
      return {
        id: row.id,
        title: row.title,
        description: row.description,
        isCompleted: Boolean(row.isCompleted),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting task by id:', error);
    throw Error('Failed to get task from database');
  }
};
