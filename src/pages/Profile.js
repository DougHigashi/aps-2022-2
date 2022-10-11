import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { auth } from '../config/Firebase';

function Profile({ navigation }) {

    const email = auth?.currentUser?.email;
    const nome = auth?.currentUser?.displayName;



    const logOut = () => {
        Alert.alert('Logout', 'Deseja realizar logout da sua conta?', [
            {
                text: 'Cancelar',
            },
            {
                text: 'Ok',
                onPress: () => { auth.signOut().then(() => { navigation.navigate('Login'); }); }
            }
        ])
    }

    const deletar = () => {
        Alert.alert(
            "Deletar",
            "Tem certeza que deseja deletar o usuario?",
            [
                {
                    text: "Não",
                },
                {
                    text: "Sim",
                    onPress: () => {
                        let user = auth?.currentUser;
                        user.delete()
                            .then(() => {
                                Alert.alert('Deletado com sucesso')
                                navigation.replace('Login')
                            })
                            .catch((error) => {
                                Alert.alert('Ops!', error)
                            });
                    },
                },
            ]
        )
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/usuario.png')} style={styles.usuario} />
            <Text style={styles.texto}>Nome: {nome}</Text>
            <Text style={styles.texto}>Email: {email}</Text>

            <TouchableOpacity onPress={() => { logOut() }} style={styles.botao}>
                <Text style={styles.textobtn}>Sair</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { deletar() }} style={styles.botao}>
                <Text style={styles.textobtn}>Deletar Conta</Text>
            </TouchableOpacity>

        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    usuario: {
        width: 300,
        height: 300,
        resizeMode: 'stretch',
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    textobtn: {
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
})
Profile.navigationOptions = {

    title: 'Profile',

};
export default Profile;