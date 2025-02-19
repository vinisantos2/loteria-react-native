
import { Button, StyleSheet, View } from 'react-native';
import { CORES } from '../constants/Cores';
import DezenasSelecionados from '../itemsView/DezenasSelecionados';
import TextView from '../components/TextView';


export default function ViewSelecionados({ qtdNum, numerosSelecionados, }) {

    return (
        <View style={[styles.container,]}>
            <TextView
                cor='#000' fontWeight={"bold"}
                fontSize={18} value={"Quantidade de numeros escolhidos: " + qtdNum} />
            <TextView cor='#000' fontWeight={"bold"} value={"numeros selecionados: "} />
            <DezenasSelecionados cor={"#000"} numerosSelecionados={numerosSelecionados} />
            {/* <Button title='Salvar' onPress={salvar} /> */}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        padding: 12,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: CORES.GERAL.FUNDO_CARTELA,
        alignItems: "center",
        alignSelf: "center",
        elevation: 4, // Sombreamento no Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
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
        backgroundColor: CORES.GERAL.FUNDO_CARTELA,
        margin: 1,
        padding: 5,
        elevation: 5
    }

})