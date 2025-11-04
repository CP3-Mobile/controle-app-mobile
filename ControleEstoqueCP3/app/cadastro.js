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
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView, MotiText } from 'moti';

const estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

function formatarData(text) {
  let digits = text.replace(/\D/g, '');
  if (digits.length > 8) digits = digits.substring(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return digits.substring(0, 2) + '/' + digits.substring(2);
  return digits.substring(0, 2) + '/' + digits.substring(2, 4) + '/' + digits.substring(4);
}

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

  const [editando, setEditando] = useState(false);
  const [produtoEditandoId, setProdutoEditandoId] = useState(null);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  const handleBarCodeScanned = ({ data }) => {
    setScannerAtivo(false);
    setShowManualInput(false);
    setCodigoBarras(data);
    Alert.alert('Código de barras lido', `Código: ${data}`);
  };

  const carregarProdutoParaEditar = async (id) => {
    try {
      const produtosSalvos = await AsyncStorage.getItem('produtos');
      const produtos = produtosSalvos ? JSON.parse(produtosSalvos) : [];
      const produto = produtos.find((p) => p.id === id);
      if (produto) {
        setNome(produto.nome);
        setFabricacao(produto.fabricacao);
        setValidade(produto.validade);
        setQuantidade(produto.quantidade);
        setLote(produto.lote);
        setEstado(produto.estado);
        setCodigoBarras(produto.codigoBarras);
        setEditando(true);
        setProdutoEditandoId(id);
      } else {
        Alert.alert('Erro', 'Produto não encontrado para edição.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const salvarProduto = async () => {
    if (!nome || !fabricacao || !validade || !quantidade || !lote || !estado || !codigoBarras) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    try {
      const produtosSalvos = await AsyncStorage.getItem('produtos');
      const produtos = produtosSalvos ? JSON.parse(produtosSalvos) : [];
      if (editando) {
        const index = produtos.findIndex((p) => p.id === produtoEditandoId);
        if (index !== -1) {
          produtos[index] = { id: produtoEditandoId, nome, fabricacao, validade, quantidade, lote, estado, codigoBarras };
          await AsyncStorage.setItem('produtos', JSON.stringify(produtos));
          Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
        } else {
          Alert.alert('Erro', 'Produto para edição não encontrado.');
        }
      } else {
        const novoProduto = { id: Date.now(), nome, fabricacao, validade, quantidade, lote, estado, codigoBarras };
        produtos.push(novoProduto);
        await AsyncStorage.setItem('produtos', JSON.stringify(produtos));
        Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      }
      limparCampos();
      setEditando(false);
      setProdutoEditandoId(null);
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

  if (!permission) return <Text>Solicitando permissão da câmera...</Text>;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Permissão para acessar a câmera negada.</Text>
        <Button title="Permitir" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#2951ff', '#ff5959']} style={StyleSheet.absoluteFill}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
          <MotiText
            style={styles.title}
            from={{ opacity: 0, translateY: -8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 350 }}
          >
            Cadastro de Produto
          </MotiText>

          {[
            { ph: 'Nome do Produto', v: nome, s: setNome, k: 'nome' },
            { ph: 'Data de Fabricação (dd/mm/aaaa)', v: fabricacao, s: (t)=>setFabricacao(formatarData(t)), k: 'fab', keyboardType: 'numeric' },
            { ph: 'Prazo de Validade (dd/mm/aaaa)', v: validade, s: (t)=>setValidade(formatarData(t)), k: 'val', keyboardType: 'numeric' },
            { ph: 'Quantidade', v: quantidade, s: setQuantidade, k: 'qtd', keyboardType: 'numeric' },
            { ph: 'Lote (letras e números)', v: lote, s: setLote, k: 'lote' },
          ].map((f, i) => (
            <MotiView
              key={f.k}
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 300, delay: 80 + i * 60 }}
            >
              <TextInput
                style={styles.input}
                placeholder={f.ph}
                value={f.v}
                onChangeText={f.s}
                keyboardType={f.keyboardType}
              />
            </MotiView>
          ))}

          <MotiText
            style={styles.label}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 250, delay: 420 }}
          >
            Estado de Origem
          </MotiText>
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 280, delay: 460 }}
          >
            <Picker selectedValue={estado} onValueChange={(v) => setEstado(v)} style={styles.picker}>
              <Picker.Item label="Selecione um estado" value="" />
              {estados.map((uf) => (
                <Picker.Item key={uf} label={uf} value={uf} />
              ))}
            </Picker>
          </MotiView>

          <MotiText
            style={styles.label}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 250, delay: 520 }}
          >
            Código de Barras
          </MotiText>

          {codigoBarras !== '' && (
            <MotiText
              style={styles.codigo}
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 250, delay: 560 }}
            >
              {codigoBarras}
            </MotiText>
          )}

          {showManualInput && (
            <MotiView
              from={{ opacity: 0, translateY: 8 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 280, delay: 580 }}
            >
              <TextInput
                style={styles.input}
                placeholder="Digite o código de barras"
                keyboardType="numeric"
                value={codigoBarras}
                onChangeText={setCodigoBarras}
              />
            </MotiView>
          )}

          <View style={styles.botoesLinha}>
            <MotiView
              from={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 280, delay: 620 }}
              style={{ flex: 1 }}
            >
              <TouchableOpacity
                onPress={() => { setScannerAtivo(true); setShowManualInput(false); }}
                style={styles.botaoScanner}
                activeOpacity={0.9}
              >
                <Text style={styles.textoBotao}>Escanear Código</Text>
              </TouchableOpacity>
            </MotiView>

            <MotiView
              from={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 280, delay: 660 }}
              style={{ flex: 1 }}
            >
              <TouchableOpacity
                onPress={() => { setScannerAtivo(false); setShowManualInput(true); }}
                style={styles.botaoManual}
                activeOpacity={0.9}
              >
                <Text style={styles.textoBotao}>Digitar Manualmente</Text>
              </TouchableOpacity>
            </MotiView>
          </View>

          {scannerAtivo && (
            <MotiView
              style={styles.scannerContainer}
              from={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 280 }}
            >
              <CameraView
                onBarcodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13', 'ean8', 'code128'] }}
              />
              <TouchableOpacity onPress={() => setScannerAtivo(false)} style={styles.cancelarBotao}>
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>
            </MotiView>
          )}

          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 300, delay: 700 }}
          >
            <Button
              title={editando ? 'ATUALIZAR PRODUTO' : 'SALVAR PRODUTO'}
              onPress={salvarProduto}
              color="#28a745"
            />
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, marginTop: 40, flex: 1 },
  title: { fontSize: 22, color: 'white', fontWeight: 'bold', marginTop: 10, marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, backgroundColor: 'white', borderColor: 'black', padding: 10, marginBottom: 12, borderRadius: 6 },
  label: { fontWeight: 'bold', marginBottom: 6, marginTop: 10, color: 'white' },
  picker: { borderWidth: 1, borderColor: 'black', backgroundColor: 'white', marginBottom: 12 },
  codigo: { padding: 10, backgroundColor: '#eee', textAlign: 'center', marginBottom: 12, borderRadius: 6 },
  botoesLinha: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginBottom: 12 },
  botaoScanner: { flex: 1, backgroundColor: '#2951ff', padding: 12, borderRadius: 6, alignItems: 'center' },
  botaoManual: { flex: 1, backgroundColor: '#2951ff', padding: 12, borderRadius: 6, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
  scannerContainer: { height: 400, marginBottom: 20, position: 'relative', overflow: 'hidden', borderRadius: 10 },
  cancelarBotao: { backgroundColor: 'red', padding: 10, position: 'absolute', bottom: 10, alignSelf: 'center', borderRadius: 6 },
});
