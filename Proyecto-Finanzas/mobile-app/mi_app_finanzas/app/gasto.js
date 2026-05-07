import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Gasto() {
    const { usuario_id } = useLocalSearchParams();
    const [monto, setMonto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const router = useRouter();

    const guardarGasto = async () => {
        if (!monto || !descripcion) {
            Alert.alert("Error", "Completa los datos");
            return;
        }

        try {
            const res = await axios.post('http://192.168.1.2/API_FINANZAS/operaciones.php', {
                accion: 'registrar_gasto',
                usuario_id: usuario_id,
                monto: monto,
                descripcion: descripcion
            });

            if (res.data.status === "success") {
                Alert.alert("Hecho", "Gasto registrado");
                router.back();
            }
        } catch (e) {
            Alert.alert("Error", "Error de conexión");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: '#e74c3c'}]}>Nuevo Gasto</Text>
            <TextInput 
                placeholder="Monto $" 
                keyboardType="numeric" 
                style={styles.input} 
                onChangeText={setMonto} 
            />
            <TextInput 
                placeholder="Descripción (Ej: Comida)" 
                style={styles.input} 
                onChangeText={setDescripcion} 
            />
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#e74c3c'}]} onPress={guardarGasto}>
                <Text style={styles.btnText}>REGISTRAR GASTO</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
    btn: { padding: 15, borderRadius: 10, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold' }
});