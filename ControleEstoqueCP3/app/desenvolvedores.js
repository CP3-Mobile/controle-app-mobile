import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';
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
    },
    {
      nome: 'Julio Cesar',
      rm: '557298',
      sala: '2TDSPF',
      imgSrc: require('../assets/julio.png'),
      githubUrl: 'https://github.com/Julio-CRodrigues',
      linkedinUrl: 'https://www.linkedin.com/in/julio-cesar-rodrigues29/',
    },
    {
      nome: 'João Vitor Broggine Lopes',
      rm: '557129',
      sala: '2TDSPF',
      imgSrc: require('../assets/jvb.png'),
      githubUrl: 'https://github.com/joaobroggine',
      linkedinUrl: 'https://www.linkedin.com/in/joaobroggine/',
    },
  ];

  return (
    <LinearGradient colors={['#2951ff', '#ff5959']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <MotiText
          style={styles.title}
          from={{ opacity: 0, translateY: -6 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 320 }}
        >
          Devs
        </MotiText>

        {devs.map((d, i) => (
          <MotiView
            key={d.rm}
            from={{ opacity: 0, translateY: 12, scale: 0.98 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{ type: 'timing', duration: 320, delay: 120 + i * 120 }}
          >
            <Desenvolvedor
              nome={d.nome}
              rm={d.rm}
              sala={d.sala}
              imgSrc={d.imgSrc}
              githubUrl={d.githubUrl}
              linkedinUrl={d.linkedinUrl}
            />
          </MotiView>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { padding: 16, paddingBottom: 40 },
  title: {
    fontSize: 23, color: 'white', fontWeight: 'bold', alignSelf: 'center', marginBottom: 24, marginTop: 25,
  },
});
