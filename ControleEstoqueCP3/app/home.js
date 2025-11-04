import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';

export default function Home({ navigation }) {
  return (
    <LinearGradient colors={['#2951ff', '#ff5959']} style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: -12, scale: 0.98 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ type: 'timing', duration: 450 }}
      >
        <Image source={require('../assets/back_home.png')} style={styles.logo} />
      </MotiView>

      <MotiText
        style={styles.title}
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 350, delay: 100 }}
      >
        Bem-vindo ao Controle de Estoque!
      </MotiText>

      <MotiText
        style={styles.title2}
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 350, delay: 180 }}
      >
        👇🏼 Selecione uma das opções abaixo para prosseguir 👇🏼
      </MotiText>

      {[
        { label: 'Cadastrar Produtos', to: 'Cadastro', delay: 260 },
        { label: 'Lista de Produtos', to: 'Lista', delay: 320 },
        { label: 'Desenvolvedores', to: 'Desenvolvedores', delay: 380 },
      ].map((item, idx) => (
        <MotiView
          key={item.to}
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 350, delay: item.delay }}
          style={{ width: '80%' }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(item.to)}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>{item.label}</Text>
          </TouchableOpacity>
        </MotiView>
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
  button: { backgroundColor: 'white', paddingVertical: 12, borderWidth: 1, borderColor: 'black', paddingHorizontal: 24, borderRadius: 8, marginBottom: 25, alignItems: 'center' },
  buttonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
});
