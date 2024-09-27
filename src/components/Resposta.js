import { ScrollView, StyleSheet, View } from "react-native";
import { COR_DE_FUNDO, COR_FUNDO_CARTELA, COR_QUINA } from "../constants/Cores";

export default function LayoutResposta({ ...outros }) {
    return (
        <View style={styles.content}    {...outros} />
    )

}

const styles = StyleSheet.create({
    content: {
        alignItems: "center",
        padding: 10,
        backgroundColor: COR_FUNDO_CARTELA,
        width: "90%",
        alignSelf: "center",
        borderRadius: 15,
        marginVertical: 10

    }
})