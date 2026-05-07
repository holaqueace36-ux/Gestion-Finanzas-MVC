import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Definir() {
  const [monto, setMonto] = useState('');
  const router = useRouter();

  const guardar = async () => {
    if (!monto) return;
    try {
      await axios.post('http://192.168.1.2/API_FINANZAS/operaciones.php', {
        accion: 'registrar_transaccion',
        usuario_id: 1,
        monto: monto,
        tipo: 'ingreso',
        categoria: 'Presupuesto Inicial'
      });
    } catch (e) { console.log("Error de red"); }

    // Enviamos el monto como parámetro para que el Home lo reciba
    router.replace({
      pathname: '/home',
      params: { saldoRecibido: monto }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Presupuesto Inicial</Text>
      <TextInput 
        placeholder="$ 0.00" 
        style={styles.input} 
        keyboardType="numeric" 
        onChangeText={setMonto} 
      />
      <TouchableOpacity style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>GUARDAR Y CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { fontSize: 40, borderBottomWidth: 2, borderColor: '#28a745', width: '60%', textAlign: 'center', marginBottom: 40 },
  button: { backgroundColor: '#28a745', padding: 18, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});