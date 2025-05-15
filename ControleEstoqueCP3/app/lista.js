import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async () => {
    try {
      const dados = await AsyncStorage.getItem('produtos');
      const lista = dados ? JSON.parse(dados) : [];
      setProdutos(lista);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const excluirProduto = async (id) => {
    Alert.alert('Excluir', 'Deseja excluir este produto?', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            const novaLista = produtos.filter((item) => item.id !== id);
            await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
            setProdutos(novaLista);
          } catch (error) {
            console.error('Erro ao excluir produto:', error);
          }
        }
      }
    ]);
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarProdutos();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>Lote: {item.lote}</Text>
      <Text>Quantidade: {item.quantidade}</Text>
      <Text>Fabricação: {item.fabricacao}</Text>
      <Text>Validade: {item.validade}</Text>
      <Text>Estado: {item.estado}</Text>
      <Text>Código de Barras: {item.codigoBarras}</Text>
      <TouchableOpacity
        onPress={() => excluirProduto(item.id)}
        style={styles.botaoExcluir}
      >
        <Text style={styles.textoExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Produtos Cadastrados</Text>
      {produtos.length === 0 ? (
        <Text style={styles.vazio}>Nenhum produto cadastrado.</Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  botaoExcluir: {
    marginTop: 8,
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center'
  },
  textoExcluir: {
    color: '#fff',
    fontWeight: 'bold'
  },
  vazio: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic'
  }
});
