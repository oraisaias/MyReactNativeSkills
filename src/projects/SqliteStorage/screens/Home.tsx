import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { SqliteStorageStackParamList } from '../types/navigation';
import { Task } from '../models/Task';
import TaskItem from '../components/TaskItem';
import { 
  getDBConnection, 
  createTable, 
  getTasks, 
  updateTask, 
  deleteTask 
} from '../service/db-service';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<SqliteStorageStackParamList>>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDataCallback = useCallback(async () => {
    try {
      setLoading(true);
      const db: SQLiteDatabase = await getDBConnection();
      await createTable(db);
      const storedTasks = await getTasks(db);
      setTasks(storedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      Alert.alert('Error', 'No se pudieron cargar las tareas');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDataCallback();
    }, [loadDataCallback])
  );

  const handleEditTask = (taskId: number) => {
    navigation.navigate('EditTask', { taskId });
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const db: SQLiteDatabase = await getDBConnection();
      await deleteTask(db, taskId);
      await loadDataCallback();
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'No se pudo eliminar la tarea');
    }
  };

  const handleToggleComplete = async (taskId: number, isCompleted: boolean) => {
    try {
      const db: SQLiteDatabase = await getDBConnection();
      await updateTask(db, { id: taskId, isCompleted });
      await loadDataCallback();
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'No se pudo actualizar la tarea');
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem 
      task={item} 
      onEdit={handleEditTask}
      onDelete={handleDeleteTask}
      onToggleComplete={handleToggleComplete}
    />
  );

  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const totalTasks = tasks.length;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Tareas</Text>
        <Text style={styles.subtitle}>
          {completedTasks} de {totalTasks} completadas
        </Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id!.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📝</Text>
            <Text style={styles.emptyTitle}>No hay tareas</Text>
            <Text style={styles.emptySubtitle}>¡Agrega tu primera tarea!</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  listContainer: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;