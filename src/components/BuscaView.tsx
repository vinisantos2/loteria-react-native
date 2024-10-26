import { StyleSheet, TextInput, Touchable, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ROTA_BUSCA } from "../rotas/Rotas";
import ViewText from "./ViewText";

export default function BuscaView({ onPress }) {


    return (
        <View style={style.content}>
            <TouchableOpacity style={style.viewInput} onPress={onPress}>
                <ViewText cor="#000" value="Buscar por concurso" />
                <Ionicons name="search" size={30} />
            </TouchableOpacity>
        </View>

    )

}

const style = StyleSheet.create({
    viewInput: {
        borderColor: 'black',
        borderWidth: 2,
        flexDirection: "row",
        borderRadius: 10,
        padding: 15,
        width: '95%',
        marginTop: 10,
        backgroundColor: "#FFF",
        justifyContent: "space-between",


    },


    content: {
        alignItems: "center"


    }
})