import { StyleSheet, View } from "react-native";
import ViewText from "./ViewText";
import { COR_BRANCO } from "../constants/Cores";
import { JogoSorteado } from "../model/jogoSorteado";

const FONT = 25

export default function ViewInfo({ jogo }) {
    const jogoSorteado: JogoSorteado = jogo
    return (
        <View style={styles.view}>
            <ViewText cor='#000' fontSize={FONT} value={jogoSorteado.acumulou ? "Acumulado" : null}></ViewText>
            <ViewText cor='#000' fontSize={FONT} value={"Próximo concurso: " + jogoSorteado.dataProximoConcurso}></ViewText>
            <ViewText cor='#000' fontSize={FONT} value={"Estimativa Próximo concurso: " + jogoSorteado.valorProximoConcurso}></ViewText>
        </View>
    )
}

const styles = StyleSheet.create({

    view: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 5,
        backgroundColor: "#87E0E7"
    },

})