import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'produtos';

export async function salvarProdutos(produtos) {
  try {
    const jsonValue = JSON.stringify(produtos);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Erro ao salvar produtos:', e);
  }
}

export async function carregarProdutos() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Erro ao carregar produtos:', e);
    return [];
  }
}
