import axios from 'axios';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    Alert,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function Home() {
    const { usuario_id } = useLocalSearchParams();
    const router = useRouter();
    
    const URL_API = 'http://192.168.1.2/API_FINANZAS/operaciones.php';
    
    const [datos, setDatos] = useState({
        nombre: '...',
        saldo: 0,
        movimientos: [],
        categorias: [],
        metas: []
    });
    const [refreshing, setRefreshing] = useState(false);

 
    const cargarDatos = async () => {
        if (!usuario_id) return;
        try {
            const [resUser, resSaldo, resMov, resCat, resMetas] = await Promise.all([
                axios.post(URL_API, { accion: 'obtener_datos_usuario', usuario_id }),
                axios.post(URL_API, { accion: 'obtener_saldo_total', usuario_id }),
                axios.post(URL_API, { accion: 'obtener_movimientos', usuario_id }),
                axios.post(URL_API, { accion: 'listar_categorias', usuario_id }),
                axios.post(URL_API, { accion: 'listar_metas', usuario_id })
            ]);

            setDatos({
                nombre: resUser.data.nombre || 'Usuario',
                saldo: Number(resSaldo.data.saldo) || 0,
                movimientos: resMov.data.movimientos || [], 
                categorias: resCat.data.categorias || [], 
                metas: resMetas.data.metas || []
            });
        } catch (error) {
            console.error("Error al sincronizar:", error);
        } finally {
            setRefreshing(false);
        }
    };

    
    const limpiarHistorial = () => {
        Alert.alert(
            "Limpiar Historial",
            "¿Estás seguro? Se borrarán todos tus ingresos y gastos registrados.",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Borrar Todo", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const res = await axios.post(URL_API, { 
                                accion: 'limpiar_historial', 
                                usuario_id 
                            });
                            if (res.data.status === 'success') {
                                Alert.alert("Éxito", "Historial borrado correctamente");
                                cargarDatos();
                            }
                        } catch (error) {
                            console.error("Error al limpiar:", error);
                        }
                    }
                }
            ]
        );
    };

    useFocusEffect(useCallback(() => { cargarDatos(); }, [usuario_id]));

    const cerrarSesion = () => {
        Alert.alert("Cerrar Sesión", "¿Deseas salir del sistema?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Salir", onPress: () => router.replace('/') }
        ]);
    };

    const navegar = (ruta) => router.push({ pathname: ruta, params: { usuario_id } });

    return (
        <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.scrollContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={cargarDatos} />}
        >
          
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Panel de Gestión</Text>
                <Text style={styles.userName}>{datos.nombre}</Text>
            </View>


            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>SALDO TOTAL DISPONIBLE</Text>
                <Text style={styles.balanceValue}>${datos.saldo.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                <Text style={styles.balanceSubtext}>Monitoreando {datos.categorias.length} categorías</Text>
            </View>

  
            <View style={styles.actionContainer}>
                <TouchableOpacity style={[styles.actionButton, {backgroundColor: '#2ecc71'}]} onPress={() => navegar('/ingreso')}>
                    <Text style={styles.actionText}>+ Ingreso</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, {backgroundColor: '#e74c3c'}]} onPress={() => navegar('/gasto')}>
                    <Text style={styles.actionText}>- Gasto</Text>
                </TouchableOpacity>
            </View>

   
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Metas de Ahorro</Text>
                <TouchableOpacity onPress={() => navegar('/metas')}><Text style={styles.linkText}>Ver todas</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                {datos.metas.map((m, i) => (
                    <View key={i} style={styles.metaCard}>
                        <Text style={styles.metaTitle} numberOfLines={1}>{m.nombre_meta}</Text>
                        <Text style={styles.metaSubtitle}>Objetivo: ${m.monto_objetivo}</Text>
                    </View>
                ))}
            </ScrollView>


            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categorías Registradas</Text>
                <TouchableOpacity onPress={() => navegar('/categorias')}><Text style={styles.linkText}>Editar</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                {datos.categorias.map((cat, i) => (
                    <View key={i} style={styles.categoryPill}>
                        <Text style={styles.categoryTitle}>{cat.nombre}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Últimos Movimientos</Text>
            
                <TouchableOpacity onPress={limpiarHistorial}>
                    <Text style={styles.clearText}>Limpiar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.historyContainer}>
                {datos.movimientos.map((mov, i) => (
                    <View key={i} style={styles.historyItem}>
                        <View style={{flex: 1}}>
                            <Text style={styles.historyConcept}>{mov.concept || mov.concepto}</Text>
                            <Text style={styles.historyDate}>{mov.fecha}</Text>
                        </View>
                      
                        <Text style={[
                            styles.historyAmount, 
                            { color: mov.tipo === 'ingreso' ? '#2ecc71' : '#e74c3c' }
                        ]}>
                            {mov.tipo === 'ingreso' ? '+' : '-'} ${parseFloat(mov.monto).toFixed(2)}
                        </Text>
                    </View>
                ))}
            </View>

            <Pressable onPress={cerrarSesion} style={styles.btnLogout}>

            </Pressable>
            <View style={{height: 40}} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7F9' },
    scrollContent: { paddingHorizontal: 20 },
    header: { marginTop: 60, marginBottom: 20 },
    welcomeText: { color: '#95a5a6', fontSize: 12, fontWeight: 'bold' },
    userName: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50' },
    balanceCard: { backgroundColor: '#2c3e50', padding: 25, borderRadius: 20, elevation: 4 },
    balanceLabel: { color: '#bdc3c7', fontSize: 10, fontWeight: 'bold' },
    balanceValue: { color: '#fff', fontSize: 34, fontWeight: 'bold' },
    balanceSubtext: { color: '#bdc3c7', fontSize: 12, marginTop: 5 },
    actionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
    actionButton: { width: '48%', padding: 16, borderRadius: 12, alignItems: 'center' },
    actionText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
    linkText: { color: '#3498db', fontWeight: 'bold' },
    clearText: { color: '#e74c3c', fontWeight: 'bold', fontSize: 14, alignSelf: 'center' }, // Estilo para el botón limpiar
    horizontalScroll: { marginBottom: 10 },
    metaCard: { backgroundColor: '#fff', padding: 15, borderRadius: 15, marginRight: 12, width: 140, borderWidth: 1, borderColor: '#eee' },
    metaTitle: { fontWeight: 'bold', fontSize: 14 },
    metaSubtitle: { fontSize: 11, color: '#7f8c8d' },
    categoryPill: { flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 25, marginRight: 10, alignItems: 'center', borderWidth: 1, borderColor: '#eee', elevation: 2 },
    categoryEmoji: { marginRight: 6, fontSize: 14 },
    categoryTitle: { fontSize: 13, fontWeight: '600', color: '#2c3e50' },
    historyContainer: { backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden', elevation: 1 },
    historyItem: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f8f9fa', alignItems: 'center' },
    historyConcept: { fontWeight: '600', fontSize: 14, color: '#2c3e50' },
    historyDate: { fontSize: 11, color: '#bdc3c7' },
    historyAmount: { fontWeight: 'bold', fontSize: 15 },
    btnLogout: { marginTop: 40, padding: 15, alignItems: 'center' },
    btnLogoutText: { color: '#e74c3c', fontWeight: 'bold', fontSize: 16 }
});
