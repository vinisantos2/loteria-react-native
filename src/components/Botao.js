
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import ViewText from './ViewText';
import { COR_BRANCO, COR_DIA, COR_FUNDO_CARTELA } from '../constants/Cores';


export default function Botao({ numero, salvaNumero, corJogo }) {


    return (
        <TouchableOpacity
            onPress={salvaNumero}
            style={[styles.botao, { backgroundColor: corJogo }]}>
            <ViewText cor={COR_BRANCO} fontWeight={"bold"} value={numero} />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    botao: {
        margin: 5,
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