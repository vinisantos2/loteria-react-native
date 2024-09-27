import { TouchableOpacity, Text, StyleSheet } from "react-native";


export default function BotaoOpcao({ navigation, nav, cor, text }) {

    return (

        <TouchableOpacity style={[style.botao, { backgroundColor:  cor  }]}
            onPress={nav}
        >
            <Text>{text}</Text>
        </TouchableOpacity>

    )

}

const style = StyleSheet.create({

    botao: {
        borderColor: 'black',
        borderWidth: 2,
        elevation: 50,
        borderRadius: 10,
        padding: 10,
        width: '45%',
        alignItems: 'center',
        marginTop: 10,

    }
})