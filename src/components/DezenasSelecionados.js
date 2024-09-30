


import { StyleSheet, Text, View } from 'react-native';
import ViewText from './ViewText';
import { COR_BRANCO, COR_FUNDO_CARTELA } from '../constants/Cores';

export default function DezenasSelecionados({  numerosSelecionados, cor = COR_FUNDO_CARTELA }) {

    return (
        <View style={styles.viewItens}>
            {numerosSelecionados.map((item, index) => (
                <View style={[styles.item, { backgroundColor: cor }]} key={index}>
                    <ViewText cor={COR_BRANCO} fontSize={20} value={item + " "} key={index} />
                </View>))
            }
        </View>
    )

}

const styles = StyleSheet.create({

    viewItens: {
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
