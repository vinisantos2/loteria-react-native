
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import TextView from './TextView';
import { CORES } from '../constants/Cores';


export default function Botao({ numero, salvaNumero, corJogo }) {

    return (
        <TouchableOpacity
            onPress={salvaNumero}
            style={[styles.botao, { backgroundColor: corJogo }]}>
            <TextView cor={CORES.GERAL.BRANCO} fontWeight={"bold"} value={numero} />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    botao: {
        margin: 5,
        width: 55,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textBotao: {
        color: 'black',
        fontSize: 15,
    },
})