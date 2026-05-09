import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminPanel() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const router = useRouter();

    const API_URL = 'http://192.168.1.2/API_FINANZAS/operaciones.php';

    const cargarUsuarios = async () => {
        try {
            const res = await axios.post(API_URL, {
                accion: 'admin_listar_usuarios'
            });
            if (res.data.status === "success") {
                setUsuarios(res.data.usuarios);
            }
        } catch (e) {
            Alert.alert("Error", "No se pudo conectar con el servidor");
        } finally {
            setCargando(false);
        }
    };

    const alternarEstado = async (id, estadoActual) => {
        const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';
        try {
            const res = await axios.post(API_URL, {
                accion: 'admin_cambiar_estado',
                id_usuario_cambiar: id,
                nuevo_estado: nuevoEstado
            });
            if (res.data.status === "success") {
                cargarUsuarios(); 
            }
        } catch (e) {
            Alert.alert("Error", "Error al cambiar estado");
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    if (cargando) {
        return <ActivityIndicator size="large" color="#3498db" style={{ flex: 1 }} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Panel de Control</Text>
                <Text style={styles.subtitulo}>Gestión de Usuarios Registrados</Text>
            </View>

            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userCard}>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{item.nombre}</Text>
                            <Text style={styles.userEmail}>{item.email}</Text>
                            <View style={[styles.badge, { backgroundColor: item.estado === 'activo' ? '#dcfce7' : '#fee2e2' }]}>
                                <Text style={[styles.statusText, { color: item.estado === 'activo' ? '#166534' : '#991b1b' }]}>
                                    ● {item.estado.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        
                        <TouchableOpacity 
                            style={[styles.btnAction, { backgroundColor: item.estado === 'activo' ? '#e74c3c' : '#2ecc71' }]}
                            onPress={() => alternarEstado(item.id, item.estado)}
                        >
                            <Text style={styles.btnLabel}>
                                {item.estado === 'activo' ? 'Desactivar' : 'Activar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.btnSalir} onPress={() => router.replace('/')}>
                <Text style={styles.btnSalirText}>Cerrar Sesión Admin</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
    header: { marginTop: 40, marginBottom: 20 },
    titulo: { fontSize: 28, fontWeight: 'bold', color: '#1e293b' },
    subtitulo: { fontSize: 16, color: '#64748b' },
    userCard: { 
        backgroundColor: '#fff', 
        padding: 15, 
        borderRadius: 16, 
        marginBottom: 12, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    userInfo: { flex: 1 },
    userName: { fontSize: 17, fontWeight: 'bold', color: '#1e293b' },
    userEmail: { fontSize: 14, color: '#64748b', marginBottom: 5 },
    badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
    statusText: { fontSize: 11, fontWeight: 'bold' },
    btnAction: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 },
    btnLabel: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
    btnSalir: { marginTop: 10, padding: 15, alignItems: 'center' },
    btnSalirText: { color: '#ef4444', fontWeight: 'bold' }
});
