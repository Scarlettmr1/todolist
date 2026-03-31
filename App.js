import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { CheckBox } from '@rneui/themed';

const initialTasks = [
  { key: '1', description: 'Read the React Native docs',  completed: false },
  { key: '2', description: 'Build a FlatList component',  completed: true  },
  { key: '3', description: 'Style the task list',         completed: false },
  { key: '4', description: 'Submit the assignment',       completed: false },
];

export default function App() {
  const [tasks,    setTasks]    = useState(initialTasks);
  const [inputVal, setInputVal] = useState('');

  const toggleTask = (key) => {
    setTasks(prev =>
      prev.map(task =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    setTasks(prev => [
      ...prev,
      { key: String(Date.now()), description: trimmed, completed: false },
    ]);
    setInputVal('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)}
        containerStyle={styles.checkbox}
        checkedColor="#7F77DD"
      />
      <Text style={[styles.description, item.completed && styles.completed]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>My Tasks</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="New task..."
          value={inputVal}
          onChangeText={setInputVal}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    margin: 16,
    color: '#2C2C2A',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#D3D1C7',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  addBtn: {
    backgroundColor: '#7F77DD',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  list: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D3D1C7',
  },
  checkbox: {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
  },
  description: {
    flex: 1,
    fontSize: 16,
    color: '#2C2C2A',
  },
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#888780',
  },
});
