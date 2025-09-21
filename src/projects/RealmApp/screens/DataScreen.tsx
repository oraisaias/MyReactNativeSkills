import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRealm } from '@realm/react';
import { Realm } from '@realm/react';
import { RealmAppStackParamList } from '../types/navigation';
import Task from '../models/Task';

type DataScreenRouteProp = RouteProp<RealmAppStackParamList, 'EditTask'>;
type DataScreenNavigationProp = StackNavigationProp<RealmAppStackParamList>;

const DataScreen = () => {
  const navigation = useNavigation<DataScreenNavigationProp>();
  const route = useRoute<DataScreenRouteProp>();
  const realm = useRealm();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    if (route.params?.taskId) {
      setIsEditing(true);
      const task = realm.objectForPrimaryKey(Task, new Realm.BSON.ObjectId(route.params.taskId));
      if (task) {
        setCurrentTask(task);
        setTitle(task.title);
        setDescription(task.description || '');
      }
    }
  }, [route.params, realm]);

  const saveTask = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }

    try {
      realm.write(() => {
        if (isEditing && currentTask) {
          // Editar tarea existente
          currentTask.title = title.trim();
          currentTask.description = description.trim();
          currentTask.updatedAt = new Date();
        } else {
          // Crear nueva tarea
          realm.create(Task, {
            title: title.trim(),
            description: description.trim(),
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      });

      Alert.alert(
        'Éxito',
        isEditing ? 'Tarea actualizada correctamente' : 'Tarea creada correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la tarea');
      console.error('Error saving task:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Título *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Escribe el título de la tarea..."
              placeholderTextColor="#999"
              maxLength={100}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe tu tarea (opcional)..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={saveTask}
            >
              <Text style={styles.buttonText}>
                {isEditing ? '✏️ Actualizar' : '💾 Guardar'}
              </Text>
            </TouchableOpacity>

            {!isEditing && (
              <TouchableOpacity
                style={[styles.button, styles.resetButton]}
                onPress={resetForm}
              >
                <Text style={styles.buttonText}>🔄 Limpiar</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>❌ Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  resetButton: {
    backgroundColor: '#FF9500',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DataScreen;