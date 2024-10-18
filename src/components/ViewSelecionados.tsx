
import { StyleSheet, Text, View } from 'react-native';
import ViewText from './ViewText';
import { COR_BRANCO, COR_FUNDO_CARTELA } from '../constants/Cores';
import DezenasSelecionados from '../itemsView/DezenasSelecionados';


export default function ViewSelecionados({ qtdNum, numerosSelecionados, cor = COR_FUNDO_CARTELA }) {

    return (
        <View style={[styles.content, ]}>
            <ViewText cor='#000' fontWeight={"bold"} fontSize={18} value={"Quantidade de numeros escolhidos: " + qtdNum} />
            <ViewText cor='#000' fontWeight={"bold"} value={"numeros selecionados: "} />
            <DezenasSelecionados cor={"#000"} numerosSelecionados={numerosSelecionados} />
        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        marginTop: 10,
        alignItems: 'center',
        width: "95%",
        padding: 10,
        backgroundColor: COR_FUNDO_CARTELA,
        borderRadius: 15,
        alignSelf: 'center',


    },

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