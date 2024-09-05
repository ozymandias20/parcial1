import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageCRUD = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [editingCedula, setEditingCedula] = useState(null); // Guardar cédula del alumno en edición

  useEffect(() => {
    loadAlumnos();
  }, []);

  const saveOrUpdateAlumno = async () => {
    if (nombre && cedula) {
      if (editingCedula !== null) {
        // Modo edición
        const updatedAlumnos = alumnos.map(alumno => 
          alumno.cedula === editingCedula ? { nombre, cedula } : alumno
        );
        await AsyncStorage.setItem('alumnos', JSON.stringify(updatedAlumnos));
        setAlumnos(updatedAlumnos);
        setEditingCedula(null); // Salir del modo edición
      } else {
        // Modo agregar nuevo alumno
        const newAlumno = { nombre, cedula };
        const updatedAlumnos = [...alumnos, newAlumno];
        await AsyncStorage.setItem('alumnos', JSON.stringify(updatedAlumnos));
        setAlumnos(updatedAlumnos);
      }
      // Limpiar campos después de guardar o actualizar
      setNombre('');
      setCedula('');
    }
  };

  const loadAlumnos = async () => {
    const storedAlumnos = await AsyncStorage.getItem('alumnos');
    if (storedAlumnos) {
      setAlumnos(JSON.parse(storedAlumnos));
    }
  };

  const deleteAlumno = async (cedulaToDelete) => {
    const updatedAlumnos = alumnos.filter(alumno => alumno.cedula !== cedulaToDelete);
    await AsyncStorage.setItem('alumnos', JSON.stringify(updatedAlumnos));
    setAlumnos(updatedAlumnos);
  };

  const editAlumno = (alumno) => {
    setNombre(alumno.nombre);
    setCedula(alumno.cedula);
    setEditingCedula(alumno.cedula); // Guardar cédula del alumno que se está editando
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Alumno"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={saveOrUpdateAlumno}>
        <Text style={styles.buttonText}>
          {editingCedula !== null ? "Actualizar Alumno" : "Agregar Alumno"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>Lista de Alumnos:</Text>
      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.cedula}
        renderItem={({ item }) => (
          <View style={styles.alumnoContainer}>
            <Text>{item.nombre} - {item.cedula}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => editAlumno(item)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => deleteAlumno(item.cedula)}>
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
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  alumnoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AsyncStorageCRUD;
