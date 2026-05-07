import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const guardar = async () => {
        if(!nombre || !email || !password) return Alert.alert("Error", "Llena todo");
        try {
            const res = await axios.post('http://192.168.1.2/API_FINANZAS/operaciones.php', {
                accion: 'registrar_usuario', nombre, email, password
            });
            if(res.data.status === "success") {
                Alert.alert("Éxito", "Usuario creado");
                router.replace('/');
            } else { Alert.alert("Error", res.data.message); }
        } catch (e) { Alert.alert("Error", "Sin conexión"); }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro</Text>
            <TextInput style={styles.input} placeholder="Nombre" onChangeText={setNombre} />
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
            <TouchableOpacity style={styles.btn} onPress={guardar}><Text style={styles.text}>Crear Cuenta</Text></TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 40, justifyContent: 'center' },
    titulo: { fontSize: 30, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
    input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
    btn: { backgroundColor: '#3498db', padding: 15, borderRadius: 10, alignItems: 'center' },
    text: { color: '#fff', fontWeight: 'bold' }
});