import { StyleSheet, View } from "react-native";
import { COMPARAR, LIMPAR, PRENCHER } from "../../../constants/Constants";
import { COR_FUNDO_CARTELA } from "../../../constants/Cores";
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
    viewBotoes: {
        alignItems: 'center',
        backgroundColor: COR_FUNDO_CARTELA,
        alignSelf: "center",
        width: "95%",
        borderRadius: 15,
        padding: 15

    },

    item: {
        padding: 10,
        // borderTopRightRadius: 15,
        // borderTopLeftRadius: 15,
        width: "100%",
        alignItems: "center"
    }
})