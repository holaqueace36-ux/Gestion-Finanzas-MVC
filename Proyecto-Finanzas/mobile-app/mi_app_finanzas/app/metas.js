import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Metas() {
    const { usuario_id } = useLocalSearchParams();
    const [nombreMeta, setNombreMeta] = useState('');
    const [monto, setMonto] = useState('');

    const guardarMeta = async () => {
        if (!nombreMeta || !monto) {
            Alert.alert("Error", "Completa todos los campos");
            return;
        }

        try {
            const res = await axios.post('http://192.168.1.2/API_FINANZAS/operaciones.php', {
                accion: 'registrar_meta',
                usuario_id: usuario_id,
                nombre: nombreMeta,        // Coincide con $data['nombre']
                monto_objetivo: monto      // Coincide con $data['monto_objetivo']
            });

            if (res.data.status === "success") {
                Alert.alert("¡Éxito!", "Meta registrada correctamente");
                setNombreMeta('');
                setMonto('');
            } else {
                Alert.alert("Error", res.data.message);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo conectar con el servidor");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre de la Meta:</Text>
            <TextInput style={styles.input} value={nombreMeta} onChangeText={setNombreMeta} placeholder="Ej. Ahorro para Viaje" />
            
            <Text style={styles.label}>Monto Objetivo:</Text>
            <TextInput style={styles.input} value={monto} onChangeText={setMonto} keyboardType="numeric" placeholder="0.00" />

            <TouchableOpacity style={styles.btn} onPress={guardarMeta}>
                <Text style={styles.btnText}>Guardar Meta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 20 },
    btn: { backgroundColor: '#9b59b6', padding: 15, borderRadius: 10, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold' }
});