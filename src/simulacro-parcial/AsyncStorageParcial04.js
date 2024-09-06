import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageCRUD = () => {
  const [codigo, setCodigo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [facultad, setFacultad] = useState('');
  const [items, setItems] = useState([]);
  const [editingCodigo, setEditingCodigo] = useState(null); // Guardar código del item en edición

  useEffect(() => {
    loadItems();
  }, []);

  const saveOrUpdateItem = async () => {
    if (codigo && carrera && facultad) {
      if (editingCodigo !== null) {
        // Modo edición
        const updatedItems = items.map(item =>
          item.codigo === editingCodigo ? { codigo, carrera, facultad } : item
        );
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        setItems(updatedItems);
        setEditingCodigo(null); // Salir del modo edición
      } else {
        // Modo agregar nuevo item
        const newItem = { codigo, carrera, facultad };
        const updatedItems = [...items, newItem];
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        setItems(updatedItems);
      }
      // Limpiar campos después de guardar o actualizar
      setCodigo('');
      setCarrera('');
      setFacultad('');
    }
  };

  const loadItems = async () => {
    const storedItems = await AsyncStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  };

  const deleteItem = async (codigoToDelete) => {
    const updatedItems = items.filter(item => item.codigo !== codigoToDelete);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const editItem = (item) => {
    setCodigo(item.codigo);
    setCarrera(item.carrera);
    setFacultad(item.facultad);
    setEditingCodigo(item.codigo); // Guardar código del item que se está editando
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Código"
        placeholderTextColor="black"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        style={styles.input}
        placeholder="Carrera"
        placeholderTextColor="black"
        value={carrera}
        onChangeText={setCarrera}
      />
      <TextInput
        style={styles.input}
        placeholder="Facultad"
        placeholderTextColor="black"
        value={facultad}
        onChangeText={setFacultad}
      />
      <TouchableOpacity style={styles.button} onPress={saveOrUpdateItem}>
        <Text style={styles.buttonText}>
          {editingCodigo !== null ? "Actualizar Item" : "Agregar Item"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>Lista de Items:</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.codigo} - {item.carrera} - {item.facultad}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => editItem(item)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => deleteItem(item.codigo)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    color: 'black',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AsyncStorageCRUD;