import { StyleSheet, View } from "react-native"
import { ViewLegenda } from "./ViewLegendaJogo"
import { mudaCor } from "../utils/ultil"
import { ViewSorteados } from "./ViewSorteados"
import { CORES } from "../constants/Cores"

export default function ViewJogo({ jogo, cor }) {

    if (!jogo) return null

    return (
        <View style={styles.content}>

            <ViewSorteados
                arrayDezenas={jogo.dezenas}
                arrayDezenas2={jogo.dezenas2}
                cor={cor}
                mesSorte={jogo.mesSorte}
                time={jogo.timeCoracao}
                trevos={jogo.trevos}
                arrayLoteca={jogo.loteca}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: CORES.GERAL.FUNDO_CARTELA,
        width: "95%",
        alignSelf: "center",
        borderRadius: 15,
        marginVertical: 10

    }
})