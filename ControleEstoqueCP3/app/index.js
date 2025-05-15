import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Estoque</Text>

      <Link href="/cadastro" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar Produto</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/lista" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Listar Produtos</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/desenvolvedores" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Desenvolvedores</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
