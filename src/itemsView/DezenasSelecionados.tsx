


import { StyleSheet, Text, View } from 'react-native';
import ViewText from '../components/ViewText';
import { COR_BRANCO, COR_FUNDO_CARTELA } from '../constants/Cores';
import { gerarKey } from '../utils/ultil';

export default function DezenasSelecionados({ numerosSelecionados, cor = COR_FUNDO_CARTELA }) {

    return (
        <View style={styles.viewItens}>
            {numerosSelecionados? numerosSelecionados.map((item) => (
                <View key={gerarKey()} style={[styles.item, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} fontSize={20} value={item + " "} />
                </View>)): null
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
