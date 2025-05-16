import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home({ navigation }) {
  return (
    <LinearGradient colors={['#94b9ff', '#cdffd8']} style={styles.container}>
      <Image source={require('../assets/controle-estoque.png')} style={styles.logo} />

      <Text style={styles.title}>Bem-vindo ao Controle de Estoque!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Cadastrar Produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lista')}
      >
        <Text style={styles.buttonText}>Lista de Produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Desenvolvedores')}
      >
        <Text style={styles.buttonText}>Desenvolvedores</Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 170,
    height: 220,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffffffaa',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 25,
  },
  buttonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
