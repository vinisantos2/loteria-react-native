
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextView from './TextView';
import { COR_BOTAO, COR_BRANCO } from '../constants/Cores';


export default function ButtonView({ onPress, value, disabled = false }) {

    return (

        <TouchableOpacity disabled={disabled} style={styles.botao} onPress={onPress}>
            <TextView fontWeight={"bold"} cor={COR_BRANCO} value={value} fontSize={25} />
        </TouchableOpacity>

    )

}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: COR_BOTAO,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#FFF",
        margin: 2,
        borderRadius: 10,
        width: "45%"
    },


})