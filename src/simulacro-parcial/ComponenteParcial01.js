import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ComponenteParcial01 = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const items = [
    { key: 'PropsParcial02', component: 'PropsParcial02' },
    { key: 'AxiosParcial03', component: 'AxiosParcial03' },
    { key: 'AsyncStorageParcial04', component: 'AsyncStorageParcial04' },
  ];

  const handleNavigate = (component) => {
    if (component === 'PropsParcial02') {
      // Aquí envías los parámetros de nombre y edad
      navigation.navigate(component, { nombre: 'Yamili', edad: 22 });
    } else {
      navigation.navigate(component);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Examen Primera Parcial</Text>

      <Button title="Mostrar Overlay" onPress={() => setModalVisible(true)} />

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayText}>Bienvenido al examen</Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate(item.component)}
          >
            <Text style={styles.buttonText}>{item.key}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: "black",
  },
  button: {
    padding: 15,
    backgroundColor: 'green',
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 18,
    marginBottom: 10,
    color: "black",
  },
});

export default ComponenteParcial01;