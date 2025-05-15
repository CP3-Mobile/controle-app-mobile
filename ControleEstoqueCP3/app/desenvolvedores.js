import { View, Text, StyleSheet } from 'react-native';

export default function Desenvolvedores() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desenvolvedores</Text>

      <Text style={styles.item}>👤 Nome: Gustavo de Aguiar Lima Silva</Text>
      <Text style={styles.item}>📧 E-mail: joao.silva@email.com</Text>

      <Text style={styles.item}>👤 Nome: Julio Cesar Conceição</Text>
      <Text style={styles.item}>📧 E-mail: maria.oliveira@email.com</Text>

      {/* Adicione mais integrantes se necessário */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  item: {
    fontSize: 16,
    marginBottom: 10
  }
});
