import { StyleSheet, View } from "react-native";
import ViewText from "./ViewText";
import { COR_BRANCO } from "../constants/Cores";
import { JogoSorteado } from "../model/jogoSorteado";
import { ViewLegenda } from "./ViewLegendaJogo";

const FONT = 25

export default function ViewInfoProximoConcurso({ jogo, cor }) {
    const jogoSorteado: JogoSorteado = jogo

    return (
        <View style={[styles.view, { backgroundColor: cor }]}>

            <View style={{ flexDirection: "row" }}>
                <ViewText fontSize={FONT} value={"Próximo concurso: "}></ViewText>
                <ViewText fontSize={FONT} value={jogoSorteado.dataProximoConcurso }></ViewText>
            </View>
            <View style={{ flexDirection: "row" }}>
                <ViewText fontSize={FONT} value={"Acumulado: "}></ViewText>
                <ViewText fontSize={FONT} value={jogoSorteado.acumulou ? "Sim" : "Não"}></ViewText>
            </View>
            <View style={{ flexDirection: "row" }}>
                <ViewText fontSize={FONT} value={"Valor: "}></ViewText>
                <ViewText fontSize={FONT} value={jogoSorteado.valorProximoConcurso}></ViewText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    view: {
        alignItems: "center"
    },
})