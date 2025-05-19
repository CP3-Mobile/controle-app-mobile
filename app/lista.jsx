import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const router = useRouter();

  useFocusEffect(
  useCallback(() => {
    const carregarProdutos = async () => {
      const produtosSalvos = await AsyncStorage.getItem('produtos');
      const produtos = produtosSalvos ? JSON.parse(produtosSalvos) : [];
      setProdutos(produtos);
    };

    carregarProdutos();
  }, [])
);


  const excluirProduto = async (id) => {
    Alert.alert('Confirmar exclusão', 'Deseja excluir este produto?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: async () => {
          const novaLista = produtos.filter((item) => item.id !== id);
          setProdutos(novaLista);
          await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
        },
        style: 'destructive',
      },
    ]);
  };

  const editarProduto = (produto) => {
    router.push({
      pathname: '/cadastro',
      params: { produto: JSON.stringify(produto) }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Nome: {item.nome}</Text>
      <Text style={styles.itemText}>Fabricação: {item.fabricacao}</Text>
      <Text style={styles.itemText}>Validade: {item.validade}</Text>
      <Text style={styles.itemText}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.itemText}>Lote: {item.lote}</Text>
      <Text style={styles.itemText}>Estado: {item.estado}</Text>
      <Text style={styles.itemText}>Código de Barras: {item.codigoBarras}</Text>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoEditar} onPress={() => editarProduto(item)}>
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluirProduto(item.id)}>
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#2951ff', '#ff5959']} style={styles.container}>
      <Text style={styles.title}>Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  itemContainer: {
    backgroundColor: '#ffffffcc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#000',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botaoEditar: {
    backgroundColor: '#2951ff',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
  },
  botaoExcluir: {
    backgroundColor: '#ff0a0a',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginLeft: 8,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#fff',
  },
});
