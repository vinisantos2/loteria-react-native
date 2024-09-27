
import { StyleSheet, Text, View, TouchableOpacity, Button, ActivityIndicator } from 'react-native';


export default function ViewCarregando({ carregando }) {


    return (
        <ActivityIndicator color="#0000ff" size={'large'} animating={carregando} />
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