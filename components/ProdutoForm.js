import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { estados } from '../constants/estados';
import { salvarProduto } from '../database/produtos';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { v4 as uuidv4 } from 'uuid';

export default function ProdutoForm({ navigation }) {
  const [produto, setProduto] = useState({
    id: uuidv4(),
    nome: '',
    fabricacao: '',
    validade: '',
    quantidade: '',
    lote: '',
    codigoBarras: '',
    estado: '',
  });

  const [scannerAtivo, setScannerAtivo] = useState(false);

  const handleSalvar = async () => {
    if (!produto.nome || !produto.fabricacao || !produto.validade || !produto.quantidade || !produto.lote || !produto.codigoBarras || !produto.estado) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    await salvarProduto(produto);
    Alert.alert('Sucesso', 'Produto cadastrado!');
    navigation.goBack();
  };

  const handleBarCodeScanned = ({ data }) => {
    setProduto({ ...produto, codigoBarras: data });
    setScannerAtivo(false);
  };

  return (
    <View style={styles.container}>
      {scannerAtivo ? (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={produto.nome}
            onChangeText={text => setProduto({ ...produto, nome: text })}
          />

          <Text style={styles.label}>Data de Fabricação</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            value={produto.fabricacao}
            onChangeText={text => setProduto({ ...produto, fabricacao: text })}
          />

          <Text style={styles.label}>Validade</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            value={produto.validade}
            onChangeText={text => setProduto({ ...produto, validade: text })}
          />

          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={produto.quantidade}
            onChangeText={text => setProduto({ ...produto, quantidade: text })}
          />

          <Text style={styles.label}>Lote</Text>
          <TextInput
            style={styles.input}
            value={produto.lote}
            onChangeText={text => setProduto({ ...produto, lote: text })}
          />

          <Text style={styles.label}>Código de Barras</Text>
          <View style={styles.barcodeRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={produto.codigoBarras}
              onChangeText={text => setProduto({ ...produto, codigoBarras: text })}
            />
            <Button title="Escanear" onPress={() => setScannerAtivo(true)} />
          </View>

          <Text style={styles.label}>Estado de Origem</Text>
          <Picker
            selectedValue={produto.estado}
            onValueChange={(value) => setProduto({ ...produto, estado: value })}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um estado" value="" />
            {estados.map((estado) => (
              <Picker.Item key={estado} label={estado} value={estado} />
            ))}
          </Picker>

          <Button title="Salvar Produto" onPress={handleSalvar} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5, marginTop: 5 },
  picker: { borderWidth: 1, borderColor: '#ccc', marginTop: 5 },
  barcodeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});
