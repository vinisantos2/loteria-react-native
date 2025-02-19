


import { StyleSheet, View } from 'react-native';
import TextView from '../components/TextView';
import { CORES} from '../constants/Cores';
import { gerarKey } from '../utils/ultil';
import React from 'react';

export default function DezenasSelecionados({ numerosSelecionados, cor = CORES.GERAL.FUNDO_CARTELA, arrayComparar = [] }) {
    const array: Array<string> = arrayComparar
    let corView = cor
    let contador = 0
    return (
        <View style={styles.content}>

            <View style={styles.viewItens}>
                {numerosSelecionados ? numerosSelecionados.map((item) => {
                    if (array) {
                        if (array.includes(item)) {
                            contador++
                            corView = "green"
                        } else {
                            corView = cor
                        }
                    }

                    return (
                        <View key={gerarKey()} style={[styles.item, { backgroundColor: corView }]}>
                            <TextView cor={CORES.GERAL.BRANCO} fontSize={20} value={item + " "} />
                        </View>
                    )
                }) : null
                }

            </View>
            {contador > 0 ?
                <View style={styles.itemAcertos}>
                    <TextView value={"Acertos: " + contador.toString() + "/" + arrayComparar.length} />
                </View>
                : null}

        </View>

    )

}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        alignItems: 'center',
        padding: 5

    },

    itemAcertos: {
        backgroundColor: "#123",
        padding: 10,
        borderRadius: 15

    },

    viewItens: {
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    item: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: CORES.GERAL.FUNDO_CARTELA,
        margin: 1,
        padding: 5,
        elevation: 5
    }

})
