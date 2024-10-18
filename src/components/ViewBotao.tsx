
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import ViewText from './ViewText';
import { COR_BOTAO, COR_BRANCO } from '../constants/Cores';


export default function ViewBotao({ onPress, value }) {

    return (
        <TouchableOpacity style={styles.botao} onPress={onPress}>
            <ViewText fontWeight={"bold"} cor={COR_BRANCO}  value={value} fontSize={25} />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    botao: {
        margin: 5,
        width: "80%",
        backgroundColor: COR_BOTAO,
        borderRadius: 15,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },


})