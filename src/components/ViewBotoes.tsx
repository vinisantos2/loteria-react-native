import { StyleSheet, View } from "react-native";
import TextView from "./TextView";
import ViewBotao from "./ViewBotao";
import { STYLES } from "../Style";
import { COMPARAR, LIMPAR, PRENCHER } from "../constants/Constants";
import { COR_BRANCO, COR_FUNDO_CARTELA, COR_LEGENDA } from "../constants/Cores";

export function ViewBotoes({ numJogos, compararJogo,
    preencherJogo, estatistica,
    limpar, cor }) {
    return (
        <View style={styles.viewBotoes}>
            <View style={[styles.item, { backgroundColor: cor }]}>
                <TextView cor="#FFF" fontWeight={"bold"} value={"Comparar com " + numJogos + " jogos já sorteados"} />
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
                <ViewBotao value={COMPARAR} onPress={compararJogo} />
                <ViewBotao value={PRENCHER} onPress={preencherJogo} />
                <ViewBotao value={LIMPAR} onPress={limpar} />
                <ViewBotao value={"Estatistica"} onPress={estatistica} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBotoes: {
        alignItems: 'center',
        backgroundColor: COR_FUNDO_CARTELA,
        alignSelf: "center",
        width: "100%"
    },

    item: {
        padding: 10,
        // borderTopRightRadius: 15,
        // borderTopLeftRadius: 15,
        width: "100%",
        alignItems: "center"
    }
})