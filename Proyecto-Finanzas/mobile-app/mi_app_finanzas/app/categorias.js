import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegistrarCategoria() {
    const { usuario_id } = useLocalSearchParams();
    const router = useRouter();
    
    const [nombre, setNombre] = useState('');
    const [presupuesto, setPresupuesto] = useState('');

    const handleGuardar = async () => {
        if (!nombre || !presupuesto) {
            Alert.alert("Error", "Por favor llena todos los campos");
            return;
        }

        try {
            const respuesta = await axios.post('http://192.168.1.2/API_FINANZAS/operaciones.php', {
                accion: 'registrar_categoria',
                usuario_id: usuario_id,
                nombre: nombre,
                presupuesto: presupuesto // Se envía el monto capturado
            });

            if (respuesta.data.status === 'success') {
                Alert.alert("Éxito", "Categoría creada con presupuesto");
                router.back(); // Regresa al Home para ver los cambios
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo conectar con el servidor");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nueva Categoría</Text>
            
            <Text style={styles.label}>Nombre de la categoría:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej. Comida, Transporte..."
                value={nombre}
                onChangeText={setNombre}
            />

            <Text style={styles.label}>Presupuesto Asignado ($):</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej. 500.00"
                keyboardType="numeric"
                value={presupuesto}
                onChangeText={setPresupuesto}
            />

            <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardar}>
                <Text style={styles.btnText}>Guardar Categoría</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: '#fff', justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#2c3e50', textAlign: 'center' },
    label: { fontSize: 14, color: '#7f8c8d', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 20, fontSize: 16 },
    btnGuardar: { backgroundColor: '#3498db', padding: 18, borderRadius: 10, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});