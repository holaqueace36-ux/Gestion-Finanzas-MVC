import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setCargando] = useState(false);
    const router = useRouter();

    const manejarLogin = async () => {
        if (!email || !password) {
            Alert.alert("Atención", "Por favor ingresa tu correo y contraseña.");
            return;
        }

        setCargando(true);
        try {
            const res = await axios.post('http://192.168.1.2/API_FINANZAS/operaciones.php', {
                accion: 'login',
                email: email,
                password: password
            });

            if (res.data.status === "success") {
            
                if (res.data.estado === 'inactivo') {
                    Alert.alert("Acceso Denegado", "Tu cuenta ha sido desactivada.");
                    setCargando(false);
                    return;
                }

                if (res.data.rol === 'admin') {
                    router.replace('/admin_panel');
                } else {
                    
                    router.replace({
                        pathname: '/home',
                        params: { usuario_id: res.data.user_id }
                    });
                }
            } else {
                Alert.alert("Error", res.data.message || "Credenciales incorrectas.");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error de conexión", "No se pudo conectar con el servidor XAMPP.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.titulo}>Bienvenido</Text>
                <Text style={styles.subtitulo}>Gestiona tus finanzas de forma inteligente</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Correo Electrónico</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="tu@correo.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="********"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.btnEntrar} 
                    onPress={manejarLogin}
                    disabled={cargando}
                >
                    {cargando ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.btnText}>ENTRAR</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.btnRegistro} 
                    onPress={() => router.push('/registro')}
                >
                    <Text style={styles.registroText}>
                        ¿No tienes cuenta? <Text style={styles.registroLink}>Regístrate aquí</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 30,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 50,
    },
    emoji: {
        fontSize: 60,
        marginBottom: 10,
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    subtitulo: {
        fontSize: 16,
        color: '#95a5a6',
        textAlign: 'center',
        marginTop: 5,
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e9ecef',
        fontSize: 16,
    },
    btnEntrar: {
        backgroundColor: '#3498db',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        elevation: 2,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    btnRegistro: {
        marginTop: 25,
        alignItems: 'center',
    },
    registroText: {
        color: '#7f8c8d',
        fontSize: 14,
    },
    registroLink: {
        color: '#3498db',
        fontWeight: 'bold',
    }
});
