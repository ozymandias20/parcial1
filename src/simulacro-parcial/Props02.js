import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Props02 = ({ route }) => {
  const { inputValue } = route.params;

  return (
    <View style={styles.container}>
      <Text>Nombre: {inputValue}</Text>
      <Text>Estado: false</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default Props02;