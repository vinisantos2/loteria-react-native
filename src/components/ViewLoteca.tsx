import { StyleSheet, View } from "react-native";

import TextView from "./TextView";
import { gerarKey } from "../utils/ultil";
import { COR_LOTECA } from "../constants/Cores";
const FONT = 20

export default function ViewLoteca({ arrayLoteca }) {

    return (
        <View style={styles.content}>
            {arrayLoteca.map((item: Array<Object>,) => {
                const jogo = item["jogo"]
                const time1 = item["nome_time1"]
                const time2 = item["nome_time2"]
                const gol1 = item["gol_time1"]
                const gol2 = item["gol_time2"]
                const time1v = item["coluna_um"]
                const time2v = item["coluna_dois"]
                const empate = item["coluna_meio"]
                return (
                    <View key={gerarKey()} style={[styles.ViewItem]}>
                        <View style={styles.viewLegenda}>
                            <TextView fontWeight={"bold"} fontSize={20} value={"Jogo: " + jogo} />
                        </View>

                        <View style={styles.viewJogo}>
                            <View style={[styles.itemViewTime, styles.medidaTime, time1v ? { backgroundColor: "green" } : {}]} >
                                <TextView fontSize={FONT} value={time1 + " "} />
                            </View>
                            <View style={[styles.itemViewTime, styles.medidaResultado, empate ? { backgroundColor: "green" } : {}]} >
                                <TextView fontSize={FONT} value={gol1 + " "} />
                                <TextView fontSize={25} value={"X"} />
                                <TextView fontSize={FONT} value={" " + gol2 + " "} />
                            </View>
                            <View style={[styles.itemViewTime, styles.medidaTime, time2v ? { backgroundColor: "green" } : {}]}>
                                <TextView fontSize={FONT} value={time2 + " "} />
                            </View>
                        </View>
                    </View>
                )
            })
            }
        </View>

    )

}

const styles = StyleSheet.create({
    content: {
        width: "98%",


    },

    ViewItem: {
        alignItems: "center",


    },
    viewLegenda: {
        padding: 10,
        backgroundColor: "#4D4B4A",
        width: "100%",
        alignItems: "center"

    },
    itemViewTime: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        height: "100%",
        flexDirection: "row",
        padding: 10,

        backgroundColor: COR_LOTECA
    },
    medidaTime: {
        width: "40%",
    },
    medidaResultado: {
        width: "20%"
    },


    viewJogo: {
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        width: "100%",



    }
})