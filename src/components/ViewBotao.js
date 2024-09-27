
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import ViewText from './ViewText';


export default function ViewBotao({ onPress, value }) {


    return (
        <TouchableOpacity style={styles.botao} onPress={onPress}>
            <ViewText value={value} fontSize={25} />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    botao: {
        margin: 5,
        width: "80%",
        backgroundColor: 'blue',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },


})