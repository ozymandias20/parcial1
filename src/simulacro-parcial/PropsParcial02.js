import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PropsParcial02 = ({ route }) => {
  // Desestructuración con verificación
  const { nombre, edad } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        {nombre ? `Mi nombre es: ${nombre}` : 'Nombre no disponible'}, 
        {edad ? ` actualmente tengo ${edad} años.` : ' edad no disponible.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default PropsParcial02;