import { StyleSheet, View } from "react-native";
import { CORES } from "../constants/Cores";

export default function LayoutResposta({ ...outros }) {
    return (
        <View style={styles.content}   {...outros}  />

    )

}

const styles = StyleSheet.create({
    content: {
        width: "90%",
        padding: 12,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: CORES.GERAL.FUNDO_CARTELA,
        alignItems: "center",
        alignSelf: "center",
        elevation: 4, // Sombreamento no Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
})