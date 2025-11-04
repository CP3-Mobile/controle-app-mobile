import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimateOnFocusView, AnimateOnFocusText } from '../utils/AnimateOnFocus';

export default function Home({ navigation }) {
  return (
    <LinearGradient colors={['#2951ff', '#ff5959']} style={styles.container}>
      <AnimateOnFocusView>
        <Image source={require('../assets/back_home.png')} style={styles.logo} />
      </AnimateOnFocusView>

      <AnimateOnFocusText style={styles.title}>
        Bem-vindo ao Controle de Estoque!
      </AnimateOnFocusText>

      <AnimateOnFocusText style={styles.title2}>
        👇🏼 Selecione uma das opções abaixo para prosseguir 👇🏼
      </AnimateOnFocusText>

      {[
        { label: 'Cadastrar Produtos', to: 'Cadastro' },
        { label: 'Lista de Produtos', to: 'Lista' },
        { label: 'Desenvolvedores', to: 'Desenvolvedores' },
      ].map((item) => (
        <AnimateOnFocusView key={item.to} style={{ width: '80%' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(item.to)}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>{item.label}</Text>
          </TouchableOpacity>
        </AnimateOnFocusView>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 220, height: 250, marginBottom: 40 },
  title: {
    fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 15,
    textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 1, textAlign: 'center',
  },
  title2: { fontSize: 13, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  button: {
    backgroundColor: 'white', paddingVertical: 12, borderWidth: 1, borderColor: 'black',
    paddingHorizontal: 24, borderRadius: 8, marginBottom: 25, alignItems: 'center',
  },
  buttonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
});
