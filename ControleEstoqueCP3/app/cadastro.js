import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
  'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO',
  'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [fabricacao, setFabricacao] = useState('');
  const [validade, setValidade] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [lote, setLote] = useState('');
  const [estado, setEstado] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [scannerAtivo, setScannerAtivo] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ data }) => {
    setScannerAtivo(false);
    setShowManualInput(false);
    setCodigoBarras(data);
    Alert.alert('Código de barras lido', `Código: ${data}`);
  };

  const salvarProduto = async () => {
    if (!nome || !fabricacao || !validade || !quantidade || !lote || !estado || !codigoBarras) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome,
      fabricacao,
      validade,
      quantidade,
      lote,
      estado,
      codigoBarras
    };

    try {
      const produtosSalvos = await AsyncStorage.getItem('produtos');
      const produtos = produtosSalvos ? JSON.parse(produtosSalvos) : [];
      produtos.push(novoProduto);
      await AsyncStorage.setItem('produtos', JSON.stringify(produtos));
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      limparCampos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
      console.error(error);
    }
  };

  const limparCampos = () => {
    setNome('');
    setFabricacao('');
    setValidade('');
    setQuantidade('');
    setLote('');
    setEstado('');
    setCodigoBarras('');
    setScannerAtivo(false);
    setShowManualInput(false);
  };

  if (!permission) {
    return <Text>Solicitando permissão da câmera...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Permissão para acessar a câmera negada.</Text>
        <Button title="Permitir" onPress={requestPermission} />
      </View>
    );
  }

  return (
<<<<<<< HEAD
    <LinearGradient
    colors={['#2951ff', '#ff5959']}
    style={StyleSheet.absoluteFill}
  >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Cadastro de Produto</Text>
=======
    <LinearGradient colors={['#94b9ff', '#cdffd8']} style={StyleSheet.absoluteFill}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Cadastro de Produto</Text>
>>>>>>> 572777a240011f26c73af5aea91eefc6588e6be9

          <TextInput
            style={styles.input}
            placeholder="Nome do Produto"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Fabricação (dd/mm/aaaa)"
            value={fabricacao}
            onChangeText={setFabricacao}
          />
          <TextInput
            style={styles.input}
            placeholder="Prazo de Validade (dd/mm/aaaa)"
            value={validade}
            onChangeText={setValidade}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />
          <TextInput
            style={styles.input}
            placeholder="Lote (letras e números)"
            value={lote}
            onChangeText={setLote}
          />

          <Text style={styles.label}>Estado de Origem</Text>
          <Picker
            selectedValue={estado}
            onValueChange={(itemValue) => setEstado(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um estado" value="" />
            {estados.map((uf) => (
              <Picker.Item key={uf} label={uf} value={uf} />
            ))}
          </Picker>

          <Text style={styles.label}>Código de Barras</Text>

          {codigoBarras !== '' && (
            <Text style={styles.codigo}>{codigoBarras}</Text>
          )}

          {showManualInput && (
            <TextInput
              style={styles.input}
              placeholder="Digite o código de barras"
              keyboardType="numeric"
              value={codigoBarras}
              onChangeText={setCodigoBarras}
            />
          )}

          <View style={styles.botoesLinha}>
            <TouchableOpacity
              onPress={() => {
                setScannerAtivo(true);
                setShowManualInput(false);
              }}
              style={styles.botaoScanner}
            >
              <Text style={styles.textoBotao}>Escanear Código</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setScannerAtivo(false);
                setShowManualInput(true);
              }}
              style={styles.botaoManual}
            >
              <Text style={styles.textoBotao}>Digitar Manualmente</Text>
            </TouchableOpacity>
          </View>

          {scannerAtivo && (
            <View style={styles.scannerContainer}>
              <CameraView
                onBarcodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                barcodeScannerSettings={{
                  barcodeTypes: ['qr', 'ean13', 'ean8', 'code128']
                }}
              />

              <TouchableOpacity
                onPress={() => setScannerAtivo(false)}
                style={styles.cancelarBotao}
              >
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}

          <Button title="SALVAR PRODUTO" onPress={salvarProduto} color="#28a745" />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 80,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    color: '',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10
  },
  picker: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    marginBottom: 12
  },
  codigo: {
    padding: 10,
    backgroundColor: '#eee',
    textAlign: 'center',
    marginBottom: 12
  },
  botoesLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12
  },
  botaoScanner: {
<<<<<<< HEAD
=======
    flex: 1,
>>>>>>> 572777a240011f26c73af5aea91eefc6588e6be9
    backgroundColor: '#2951ff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  botaoManual: {
    flex: 1,
    backgroundColor: '#2951ff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold'
  },
  scannerContainer: {
    height: 400,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 10
  },
  cancelarBotao: {
    backgroundColor: 'red',
    padding: 10,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    borderRadius: 6
  }
});
