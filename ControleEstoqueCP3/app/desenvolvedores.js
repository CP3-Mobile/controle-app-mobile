import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimateOnFocusView, AnimateOnFocusText } from '../utils/AnimateOnFocus';
import Desenvolvedor from '../components/Desenvolvedor';

export default function Desenvolvedores() {
  const devs = [
    {
      nome: 'Gustavo de Aguiar',
      rm: '557707',
      sala: '2TDSPF',
      imgSrc: require('../assets/gu.png'),
      githubUrl: 'https://github.com/gudeaguiar',
      linkedinUrl: 'https://www.linkedin.com/in/gustavo-de-aguiar-sn160308/',
    }
  ];

  return (
    <LinearGradient colors={['#2951ff', '#ff5959']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <AnimateOnFocusText style={styles.title}>Devs</AnimateOnFocusText>
        {devs.map((d, i) => (
          <AnimateOnFocusView key={d.rm} transition={{ type: 'timing', duration: 320, delay: 120 + i * 120 }}>
            <Desenvolvedor
              nome={d.nome}
              rm={d.rm}
              sala={d.sala}
              imgSrc={d.imgSrc}
              githubUrl={d.githubUrl}
              linkedinUrl={d.linkedinUrl}
            />
          </AnimateOnFocusView>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 23, color: 'white', fontWeight: 'bold', alignSelf: 'center', marginBottom: 24, marginTop: 25 },
});
