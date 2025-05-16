import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Ir para Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
