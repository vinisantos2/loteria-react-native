import { StyleSheet, View } from "react-native";
import TextView from "./TextView";
import { JogoSorteado } from "../model/jogoSorteado";

const FONT = 25

export default function ViewInfoProximoConcurso({ jogo, cor }) {
    const jogoSorteado: JogoSorteado = jogo

    return (
        <View style={[styles.view, { backgroundColor: cor }]}>

            <View style={{ flexDirection: "row" }}>
                <TextView fontSize={FONT} value={"Próximo concurso: "}></TextView>
                <TextView fontSize={FONT} value={jogoSorteado.dataProximoConcurso }></TextView>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TextView fontSize={FONT} value={"Acumulado: "}></TextView>
                <TextView fontSize={FONT} value={jogoSorteado.acumulou ? "Sim" : "Não"}></TextView>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TextView fontSize={FONT} value={"Valor: "}></TextView>
                <TextView fontSize={FONT} value={jogoSorteado.valorProximoConcurso}></TextView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    view: {
        alignItems: "center"
    },
})