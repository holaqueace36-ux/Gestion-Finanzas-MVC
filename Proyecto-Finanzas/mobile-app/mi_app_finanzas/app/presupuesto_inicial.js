import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PresupuestoInicial() {
  const [monto, setMonto] = useState('');
  const { usuario_id } = useLocalSearchParams();
  const router = useRouter();

  const guardar = async () => {
    await axios.post('http://192.168.1.2/API_FINANZAS/operaciones.php', {
      accion: 'definir_presupuesto_inicial', usuario_id, monto
    });
    router.replace({ pathname: '/home', params: { usuario_id } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Con cuánto dinero empiezas hoy?</Text>
      <TextInput placeholder="$ 0.00" keyboardType="numeric" style={styles.input} onChangeText={setMonto} />
      <TouchableOpacity style={styles.btn} onPress={guardar}><Text style={styles.btnText}>EMPEZAR</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, justifyContent: 'center' },
  title: { fontSize: 20, textAlign: 'center', marginBottom: 30 },
  input: { borderBottomWidth: 2, fontSize: 32, textAlign: 'center', marginBottom: 40 },
  btn: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});