
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import ViewText from './ViewText';
import { COR_BOTAO, COR_BRANCO } from '../constants/Cores';


export default function ViewBotao({ onPress, value }) {

    return (
        <TouchableOpacity style={styles.botao} onPress={onPress}>
            <ViewText fontWeight={"bold"} cor={COR_BRANCO} value={value} fontSize={17} />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: COR_BOTAO,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },


})