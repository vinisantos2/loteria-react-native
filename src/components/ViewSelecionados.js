
import { StyleSheet, Text, View } from 'react-native';
import ViewText from './ViewText';
import { COR_FUNDO_CARTELA, COR_LOTOFACIL } from '../constants/Cores';



export default function ViewSelecionados({ qtdNum, numerosSelecionados, cor = COR_FUNDO_CARTELA }) {

    return (
        <View style={{ alignItems: 'center', }}>
            <ViewText value={"Quantidade de numeros escolhidos: " + qtdNum} />
            <ViewText value={"numeros selecionados: "} />
            <View style={styles.viewItens}>
                {numerosSelecionados.map((item, index) => (
                    <View style={[styles.item, { backgroundColor: cor }]} key={index}>
                        <ViewText fontSize={20} value={item + " "} key={index} />
                    </View>))
                }
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    viewItens: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: "90%"

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