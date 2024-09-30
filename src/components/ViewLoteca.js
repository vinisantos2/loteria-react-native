import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COR_BRANCO, COR_DE_FUNDO, COR_LOTECA } from "../constants/Cores";
import ViewText from "./ViewText";
import { gerarKey } from "../utils/ultil";
const FONT = 16

export default function ViewLoteca({ arrayLoteca }) {

    return (
        <View style={styles.content}>
            {arrayLoteca.map((item, index) => {
                const jogo = item["jogo"]
                const numero = item["numero_concurso"]
                const dia = item["dia_da_semana"]
                const time1 = item["nome_time1"]
                const time2 = item["nome_time2"]
                const gol1 = item["gol_time1"]
                const gol2 = item["gol_time2"]
                const time1v = item["coluna_um"]
                const time2v = item["coluna_dois"]
                const empate = item["coluna_meio"]
                return (
                    <View key={gerarKey()} style={[styles.item]}>
                        <ViewText fontSize={20} value={"Jogo: " + jogo} />
                        <View style={styles.viewJogo}>
                            <View style={[time1v ? { backgroundColor: "green" } : {}, styles.itemViewTime, styles.medidaTime]} >
                                <ViewText fontSize={FONT} value={time1 + " "} />
                            </View>
                            <View style={[empate ? { backgroundColor: "green" } : {}, styles.itemViewTime, styles.medidaResultado]} >
                                <ViewText fontSize={FONT} value={gol1 + " "} />
                                <ViewText fontSize={20} value={"X"} />
                                <ViewText fontSize={FONT} value={" " + gol2 + " "} />
                            </View>
                            <View style={[time2v ? { backgroundColor: "green" } : {}, styles.itemViewTime, styles.medidaTime]}>
                                <ViewText fontSize={FONT} value={time2 + " "} />
                            </View>
                        </View>
                    </View>)
            })
            }
        </View>

    )

}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        backgroundColor: "#B8B8B8",
        padding: 10

    },
    itemViewTime: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        height: "100%",
        flexDirection: "row",
        padding: 5,
        borderRadius: 5
    },
    medidaTime: {
        width: "42%",
    },
    medidaResultado: {
        width: "15%"
    },

    item: {
        alignItems: "center",

    },
    viewJogo: {
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        width: "100%",
        borderRadius: 5,

    }
})