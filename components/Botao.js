import { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';


export default function Botao({ numeros, numero, salvaNumero, corJogo }) {


    return (
        <TouchableOpacity

            onPress={salvaNumero}
          

            style={[styles.botao, { backgroundColor: corJogo }]}>
            <Text style={styles.textBotao}>{numero}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    botao: {
        margin: 5,
        backgroundColor: '#fff',
        width: 50,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },

    textBotao: {
        color: 'black',
        fontSize: 15,
    },
})