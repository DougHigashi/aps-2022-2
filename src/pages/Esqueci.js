import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { auth } from '../config/Firebase';
import { sendPasswordResetEmail } from 'firebase/auth'

export default function Esqueci({ navigation }) {

    const [email, setEmail] = useState('');

    const confirma = () => {

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert(`Email enviado!`, `Email de redefinição de senha enviado com sucesso!`);
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        Alert.alert("Ops!", `O email digitado não é válido`);
                        break;
                    case 'auth/user-not-found':
                        Alert.alert("Ops!", `O email digitado não está cadastrado`);
                        break
                    default:
                        Alert.alert("Ops!", `Não foi possível enviar o email de redefinição.\nVerifique o email digitado e tente novamente.`);
                }

            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Redefinir senha</Text>
            <TextInput placeholder="Email" style={styles.input} onChangeText={email => setEmail(email)} value={email} />

            <TouchableOpacity onPress={() => { confirma() }} style={styles.botao}>
                <Text style={styles.loginText}>Enviar email de redefinição</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.voltar}>Voltar</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    voltar: {
        color: '#308C30',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 40,
        color: "#308C30",
    },
    loginText: {
        color: 'white'
    },
    botao: {
        color: 'white',
        width: '70%',
        backgroundColor: '#308C30',
        height: 50,
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    input: {
        width: '70%',
        marginBottom: 20,
        padding: 10,
        height: 50,
        backgroundColor: '#F7F7F7',
        borderRadius: 25,
        justifyContent: 'center',
    }
});