import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SetupScreen() {
  const [meta, setMeta] = useState('');
  const [monto, setMonto] = useState('');

  const guardarSetup = async () => {
    try {
      await axios.post('http://192.168.1.2/API_FINANZAS/operaciones.php', {
        accion: 'configuracion_inicial',
        usuario_id: 1,
        nombre_meta: meta,
        monto_objetivo: monto
      });
      router.replace('/home');
    } catch (e) { Alert.alert("Error", "No se pudo guardar"); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Configuración Inicial</Text>
        <TextInput placeholder="¿Cuál es tu meta?" style={styles.input} onChangeText={setMeta} />
        <TextInput placeholder="Monto objetivo $" style={styles.input} keyboardType="numeric" onChangeText={setMonto} />
        <TouchableOpacity style={styles.btn} onPress={guardarSetup}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>COMENZAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center' },
  card: { width: '35%', minWidth: 300, backgroundColor: '#fff', padding: 30, borderRadius: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 8 },
  btn: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center' }
});