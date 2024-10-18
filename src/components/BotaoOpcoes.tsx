import { TouchableOpacity, Text, StyleSheet } from "react-native";
import ViewText from "./ViewText";
import { COR_BRANCO } from "../constants/Cores";


export default function BotaoOpcao({ nav, cor, text }) {

    return (

        <TouchableOpacity style={[style.botao, { backgroundColor:  cor  }]}
            onPress={nav}
        >
            <ViewText cor={COR_BRANCO} value={text} />
        </TouchableOpacity>

    )

}

const style = StyleSheet.create({

    botao: {
        borderColor: 'black',
        borderWidth: 2,
        elevation: 2,
        borderRadius: 10,
        padding: 10,
        width: '45%',
        alignItems: 'center',
        marginTop: 10,

    }
})