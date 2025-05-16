import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const produtosSalvos = await AsyncStorage.getItem('produtos');
        if (produtosSalvos !== null) {
          setProdutos(JSON.parse(produtosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
      }
    };

    carregarProdutos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Nome: {item.nome}</Text>
      <Text style={styles.itemText}>Fabricação: {item.fabricacao}</Text>
      <Text style={styles.itemText}>Validade: {item.validade}</Text>
      <Text style={styles.itemText}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.itemText}>Lote: {item.lote}</Text>
      <Text style={styles.itemText}>Estado: {item.estado}</Text>
      <Text style={styles.itemText}>Código de Barras: {item.codigoBarras}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
