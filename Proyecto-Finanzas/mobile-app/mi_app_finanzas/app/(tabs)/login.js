import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const manejarLogin = async () => {
    try {
      const url = 'http://192.168.1.2/API_FINANZAS/login.php';
      const res = await axios.post(url, { email, password });

      if (res.data.message) {
        router.replace('/home'); // Entra a la gestión de gastos
      } else {
        Alert.alert("Error de acceso", res.data.error || "Usuario o clave incorrectos");
      }
    } catch (e) {
      Alert.alert("Error", "Servidor no disponible");
    }
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.card}>
        <View style={styles.avatarCircle}><Text style={{fontSize: 40}}>👤</Text></View>
        <Text style={styles.title}>LOGIN</Text>
        <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} autoCapitalize="none" />
        <TextInput placeholder="Password" style={styles.input} onChangeText={setPassword} secureTextEntry />
        
        <TouchableOpacity style={styles.button} onPress={manejarLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#aaa', marginTop: 15, fontSize: 12 }}>Atrás</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, backgroundColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center' },
  card: { width: '85%', backgroundColor: '#fff', padding: 30, borderRadius: 20, alignItems: 'center', elevation: 10 },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, borderSize: 1, borderColor: '#eee', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 25, color: '#555' },
  input: { width: '100%', borderBottomWidth: 1, borderColor: '#eee', marginBottom: 20, padding: 10 },
  button: { width: '100%', backgroundColor: '#40c4ff', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});