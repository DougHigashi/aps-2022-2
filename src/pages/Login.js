import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native';
import { auth } from '../config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'

export var setUsuario;
export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function authentication() {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                navigation.navigate('Tabs');
            })
            .catch((error) => {
                console.log(error)
                Alert.alert("Ops!", error.message);
            });
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <TextInput placeholder="Email" style={styles.input} onChangeText={email => setEmail(email)} value={email} />
            <TextInput placeholder="Senha" style={styles.input} secureTextEntry={true} onChangeText={password => setPassword(password)} value={password} />

            <TouchableOpacity onPress={() => { authentication() }} style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.esqueciSenha}>Se cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Esqueci')}>
                <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 270,
        height: 115,
        resizeMode: 'stretch',
    },
    input: {
        width: '70%',
        marginBottom: 20,
        padding: 10,
        height: 50,
        backgroundColor: '#F7F7F7',
        borderRadius: 25,
        justifyContent: 'center',
    },
    esqueciSenha: {
        color: '#308C30',
    },
    loginBtn: {
        width: '70%',
        backgroundColor: '#308C30',
        height: 50,
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    loginText: {
        color: 'white'
    }
});
