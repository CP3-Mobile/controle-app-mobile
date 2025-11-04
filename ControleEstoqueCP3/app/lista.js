import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MotiView, MotiText } from 'moti';

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const produtosSalvos = await AsyncStorage.getItem('produtos');
      if (produtosSalvos !== null) setProdutos(JSON.parse(produtosSalvos));
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error);
    }
  };

  const excluirProduto = async (id) => {
    Alert.alert('Confirmar exclusão', 'Deseja excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
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
    router.push({ pathname: '/cadastro', params: { produto: JSON.stringify(produto) } });
  };

  const renderItem = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, translateY: 12, scale: 0.98 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'timing', duration: 300, delay: 80 + index * 60 }}
      style={styles.itemContainer}
    >
      <MotiText style={styles.itemText} from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 100 + index * 60 }}>
        Nome: {item.nome}
      </MotiText>
      <Text style={styles.itemText}>Fabricação: {item.fabricacao}</Text>
      <Text style={styles.itemText}>Validade: {item.validade}</Text>
      <Text style={styles.itemText}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.itemText}>Lote: {item.lote}</Text>
      <Text style={styles.itemText}>Estado: {item.estado}</Text>
      <Text style={styles.itemText}>Código de Barras: {item.codigoBarras}</Text>

      <View style={styles.botoesContainer}>
        <MotiView from={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 200 }} style={{ flex: 1, marginRight: 8 }}>
          <TouchableOpacity style={styles.botaoEditar} onPress={() => editarProduto(item)} activeOpacity={0.9}>
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>
        </MotiView>

        <MotiView from={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 200 }} style={{ flex: 1, marginLeft: 8 }}>
          <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluirProduto(item.id)} activeOpacity={0.9}>
            <Text style={styles.textoBotao}>Excluir</Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </MotiView>
  );

  return (
    <LinearGradient colors={['#2951ff', '#ff5959']} style={styles.container}>
      <MotiText
        style={styles.title}
        from={{ opacity: 0, translateY: -8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 320 }}
      >
        Lista de Produtos
      </MotiText>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <MotiText
            style={styles.emptyText}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 300 }}
          >
            Nenhum produto cadastrado.
          </MotiText>
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 40, marginBottom: 16, textAlign: 'center', color: '#fff' },
  itemContainer: { backgroundColor: '#ffffffcc', borderRadius: 8, padding: 12, marginBottom: 12 },
  itemText: { fontSize: 14, marginBottom: 4, color: '#000' },
  botoesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  botaoEditar: { backgroundColor: '#2951ff', padding: 8, borderRadius: 5, flex: 1 },
  botaoExcluir: { backgroundColor: '#ff0a0a', padding: 8, borderRadius: 5, flex: 1 },
  textoBotao: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#fff' },
});
