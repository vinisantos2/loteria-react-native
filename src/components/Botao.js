
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import ViewText from './ViewText';


export default function Botao({  numero, salvaNumero, corJogo }) {


    return (
        <TouchableOpacity

            onPress={salvaNumero}
            style={[styles.botao, { backgroundColor: corJogo }]}>
            <ViewText value={numero} />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    botao: {
        margin: 5,
        backgroundColor: '#fff',
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