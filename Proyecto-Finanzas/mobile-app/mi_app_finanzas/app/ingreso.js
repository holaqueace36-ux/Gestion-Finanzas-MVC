import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Ingreso() {
    const { usuario_id } = useLocalSearchParams(); // Recibe el ID desde el Home
    const [monto, setMonto] = useState('');
    const [categoria, setCategoria] = useState('');
    const router = useRouter();

    const guardarIngreso = async () => {
        if (!monto || !categoria) {
            Alert.alert("Error", "Por favor llena todos los campos");
            return;
        }

        try {
            const res = await axios.post('http://192.168.1.2/API_FINANZAS/operaciones.php', {
                accion: 'registrar_ingreso',
                usuario_id: usuario_id,
                monto: monto,
                categoria: categoria
            });

            if (res.data.status === "success") {
                Alert.alert("Éxito", "Ingreso registrado");
                router.back(); // Regresa al Home automáticamente
            }
        } catch (e) {
            Alert.alert("Error", "No se pudo conectar con el servidor");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevo Ingreso</Text>
            <TextInput 
                placeholder="Monto $" 
                keyboardType="numeric" 
                style={styles.input} 
                onChangeText={setMonto} 
            />
            <TextInput 
                placeholder="Categoría (Ej: Sueldo)" 
                style={styles.input} 
                onChangeText={setCategoria} 
            />
            <TouchableOpacity style={styles.btn} onPress={guardarIngreso}>
                <Text style={styles.btnText}>GUARDAR INGRESO</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
    btn: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 10, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold' }
});