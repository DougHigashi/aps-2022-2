import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'
import { database, } from '../config/Firebase';
import { collection, onSnapshot } from 'firebase/firestore'

function Participantes() {

    const [nomes, setNome] = useState('');
    let isMounted;

    useEffect(() => {
        isMounted = true;
        console.log('mounting participants')
        if (isMounted) {
            const usuarios = collection(database, 'usuarios')
            
            onSnapshot(usuarios, (snapshot) => {
                const list = [];
                snapshot.forEach((doc) => {
                    list.push({ ...doc.data(), id: doc.id });
                })
                setNome(list);
            })



            // collection(database, "usuarios").onSnapshot((query) => {
            //     const list = [];
            //     query.forEach((doc) => {
            //         list.push({ ...doc.data(), id: doc.id });
            //     })
            //     setNome(list);
            // });

        }
        return () => { console.log('ummounting participants'); isMounted = false; }
    }, [])

    return (
        <View style={styles.container}>
            <Image source={require('../assets/participantes.png')} style={styles.imagem} />
            <Text style={styles.logo}>Participantes:</Text>
            <FlatList
                data={nomes}
                renderItem={({ item }) => <Text style={styles.item}>{item.nome}</Text>}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 22
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    imagem: {
        top: 70,
        width: 90,
        height: 90,
        resizeMode: 'stretch',
    },
    item: {
        padding: 10,
        fontSize: 15,
        height: 44,
    },
    logo: {
        top: 0,
        left: 85,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 40,
        color: "#228B22",
    },
})

Participantes.navigationOptions = {

    title: 'Participantes',

};

export default Participantes;