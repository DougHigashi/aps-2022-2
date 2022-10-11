import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore'
import { auth, database } from '../config/Firebase';

export default function Cadastro({ navigation }) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const cadastrar = () => {
        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(userCredential)
                Alert.alert('Cadastrado com sucesso!', 'Sua conta foi criada com sucesso!', [{
                    text: "Ok",
                    onPress: () => {
                        navigation.navigate('Login')
                        addDoc(collection(database, 'usuarios'), { email: email, nome: nome })
                    }
                },]);
            }).catch((e) => {
                Alert.alert("Ops!", e.message);
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Cadastre-se</Text>
            <TextInput placeholder="Nome" style={styles.input} onChangeText={nome => setNome(nome)} value={nome} />
            <TextInput placeholder="Email" style={styles.input} onChangeText={email => setEmail(email)} value={email} />
            <TextInput placeholder="Senha" style={styles.input} secureTextEntry={true} onChangeText={senha => setSenha(senha)} value={senha} />

            <TouchableOpacity onPress={() => { cadastrar() }} style={styles.botao}>
                <Text style={styles.loginText}>Salvar</Text>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        color: 'white'
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