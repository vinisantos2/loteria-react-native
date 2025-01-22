
import { Button, StyleSheet, View } from 'react-native';
import { COR_FUNDO_CARTELA } from '../constants/Cores';
import DezenasSelecionados from '../itemsView/DezenasSelecionados';
import TextView from '../components/TextView';


export default function ViewSelecionados({ qtdNum, numerosSelecionados, }) {

    return (
        <View style={[styles.content,]}>
            <TextView cor='#000' fontWeight={"bold"} fontSize={18} value={"Quantidade de numeros escolhidos: " + qtdNum} />
            <TextView cor='#000' fontWeight={"bold"} value={"numeros selecionados: "} />
            <DezenasSelecionados cor={"#000"} numerosSelecionados={numerosSelecionados} />
            {/* <Button title='Salvar' onPress={salvar} /> */}
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