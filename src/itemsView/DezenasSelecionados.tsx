


import { StyleSheet, Text, View } from 'react-native';
import TextView from '../components/TextView';
import { COR_BRANCO, COR_FUNDO_CARTELA } from '../constants/Cores';
import { gerarKey } from '../utils/ultil';

export default function DezenasSelecionados({ numerosSelecionados, cor = COR_FUNDO_CARTELA, arrarComparar = undefined }) {
    const array: Array<string> = arrarComparar
    let corView = cor
    return (
        <View style={styles.viewItens}>
            {numerosSelecionados ? numerosSelecionados.map((item) => {
                if (array) {
                    if (array.includes(item)) {
                        corView = "green"
                    } else {
                        corView = cor
                    }
                }

                return (
                    <View key={gerarKey()} style={[styles.item, { backgroundColor: corView }]}>
                        <TextView cor={COR_BRANCO} fontSize={20} value={item + " "} />
                    </View>)
            }) : null
            }
        </View>

    )

}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        alignItems: 'center',
        padding: 5

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
        backgroundColor: COR_FUNDO_CARTELA,
        margin: 1,
        padding: 5,
        elevation: 5
    }

})
