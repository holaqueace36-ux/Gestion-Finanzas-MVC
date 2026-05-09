import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function NuevoGasto() {
  const [desc, setDesc] = useState('');
  const [monto, setMonto] = useState('');
  const router = useRouter();

  const registrarGasto = async () => {
    if (!desc || !monto) {
      Alert.alert("Error", "Completa la descripción y el monto");
      return;
    }

    try {
      const res = await axios.post('http://192.168.1.2/API_FINANZAS/operaciones.php', {
        accion: 'registrar_gasto',
        usuario_id: 1, 
        descripcion: desc,
        monto: monto
      });

      if (res.data.status === "success") {
        Alert.alert("Éxito", "Gasto registrado");
        router.replace('/(tabs)/home'); 
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Gasto</Text>
      <TextInput placeholder="Descripción (Ej: Cena)" style={styles.input} onChangeText={setDesc} />
      <TextInput placeholder="Monto $" keyboardType="numeric" style={styles.input} onChangeText={setMonto} />
      
      <TouchableOpacity style={styles.btnGasto} onPress={registrarGasto}>
        <Text style={styles.btnText}>GUARDAR GASTO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#dc3545' },
  input: { borderBottomWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 },
  btnGasto: { backgroundColor: '#dc3545', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
