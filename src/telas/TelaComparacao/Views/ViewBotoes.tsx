import { StyleSheet, View } from "react-native";
import { COMPARAR, LIMPAR, PRENCHER } from "../../../constants/Constants";
import { CORES } from "../../../constants/Cores";
import ButtonView from "../../../components/ButtonView";

export function ViewBotoes({ compararJogo,
    preencherJogo, estatistica,
    limpar }) {
    return (
        <View style={styles.viewBotoes}>

            <View style={{ alignItems: "center", width: "100%" }}>
                <ButtonView value={COMPARAR} onPress={compararJogo} />
                <ButtonView value={PRENCHER} onPress={preencherJogo} />
                <ButtonView value={LIMPAR} onPress={limpar} />
                <ButtonView value={"Estatística"} onPress={estatistica} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBotoes:{
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

    item: {
        padding: 10,
        // borderTopRightRadius: 15,
        // borderTopLeftRadius: 15,
        width: "100%",
        alignItems: "center"
    }
})