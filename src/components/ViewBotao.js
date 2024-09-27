
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import ViewText from './ViewText';
import { COR_BRANCO } from '../constants/Cores';


export default function ViewBotao({ onPress, value }) {

    return (
        <TouchableOpacity style={styles.botao} onPress={onPress}>
            <ViewText cor={COR_BRANCO} value={value} fontSize={25} />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    botao: {
        margin: 5,
        width: "70%",
        backgroundColor: 'blue',
        borderRadius: 15,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },


})