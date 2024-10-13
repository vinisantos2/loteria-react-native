import { StyleSheet, View } from "react-native";
import { COR_FUNDO_CARTELA, } from "../constants/Cores";
import ViewText from "./ViewText";

export default function LayoutResposta({ ...outros }) {
    return (
        <View style={styles.content}   {...outros}  >

        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        alignItems: "center",
        width: "95%",
        marginVertical: 10,
        backgroundColor: "#FFF",
        padding: 10,
        alignSelf: "center",
        borderRadius: 15


    }
})