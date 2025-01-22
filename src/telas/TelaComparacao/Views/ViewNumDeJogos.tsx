import { StyleSheet, View } from "react-native";
import TextView from "../../../components/TextView";
import { COR_FUNDO_CARTELA } from "../../../constants/Cores";

export default function ViewNumDeJogos({ cor, numJogos }) {

    return (
        <View style={[styles.item]}>
            <TextView cor="#000" fontWeight={"bold"}
                value={"Comparar com " + numJogos + " jogos já sorteados"} />
        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        // borderTopRightRadius: 15,
        // borderTopLeftRadius: 15,
        width: "95%",
        borderRadius: 15,
        alignItems: "center",
        backgroundColor: COR_FUNDO_CARTELA,
        alignSelf: "center"

    }
})