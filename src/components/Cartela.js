import { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { COR_FUNDO_CARTELA } from '../constants/Cores';
import Botao from './Botao';


export default function Cartela({ dezenas, jogo, numerosSelecionados, salvarNumeroNaLista, cor}) {

    return (
        <View style={styles.cartela}>

            {Array.from({ length: dezenas }).map((_, index) => (
                <Botao
                    corJogo={numerosSelecionados.includes(jogo.converterString(index)) ? cor : "#fff"}
                    numeros={numerosSelecionados}
                    salvaNumero={() => salvarNumeroNaLista(jogo.converterString(index))}
                    key={index}
                    numero={jogo.converterString(index)} />
            ))}

        </View>
    )

}

const styles = StyleSheet.create({

    cartela: {
        width: '90%',
        backgroundColor: COR_FUNDO_CARTELA,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 15,
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

})