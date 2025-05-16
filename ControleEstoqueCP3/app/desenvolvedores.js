import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Desenvolvedor from "../components/Desenvolvedor";

export default function Desenvolvedores() {
  return (
    <LinearGradient colors={['#2951ff', '#ff5959']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen
          options={{
            title: "Integrantes",
            headerStyle: {
              backgroundColor: '#377cff',
            },
            headerTintColor: '#fff',
          }}
        />
        <Text style={styles.title}>Desenvolvedores</Text>


        <Desenvolvedor
          nome="Gustavo de Aguiar"
          rm="557707"
          sala="2TDSPF"
          imgSrc={require("../assets/gu.png")}
          githubUrl="https://github.com/gudeaguiar"
          linkedinUrl="https://www.linkedin.com/in/gustavo-de-aguiar-sn160308/"
        />  

        <Desenvolvedor
          nome="Julio Cesar"
          rm="557298"
          sala="2TDSPF"
          imgSrc={require("../assets/julio.png")}
          githubUrl="https://github.com/Julio-CRodrigues"
          linkedinUrl="https://www.linkedin.com/in/julio-cesar-rodrigues29/"
        />

        <Desenvolvedor
          nome="João Vitor Broggine Lopes"
          rm="557129"
          sala="2TDSPF"
          imgSrc={require("../assets/jvb.png")}
          githubUrl="https://github.com/joaobroggine"
          linkedinUrl="https://www.linkedin.com/in/joaobroggine/"
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 24,
    marginTop: 30,
  },
  githubUrl: {
    color: "#5e17eb",
  },
});
