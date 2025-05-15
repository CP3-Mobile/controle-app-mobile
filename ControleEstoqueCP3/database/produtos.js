import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarProduto = async (produto) => {
  const produtos = await getProdutos();
  const index = produtos.findIndex(p => p.id === produto.id);
  if (index > -1) {
    produtos[index] = produto;
  } else {
    produtos.push(produto);
  }
  await AsyncStorage.setItem('produtos', JSON.stringify(produtos));
};

export const getProdutos = async () => {
  const json = await AsyncStorage.getItem('produtos');
  return json ? JSON.parse(json) : [];
};

export const excluirProduto = async (id) => {
  const produtos = await getProdutos();
  const atualizados = produtos.filter(p => p.id !== id);
  await AsyncStorage.setItem('produtos', JSON.stringify(atualizados));
};

export const buscarProdutoPorId = async (id) => {
  const produtos = await getProdutos();
  return produtos.find(p => p.id === id);
};
