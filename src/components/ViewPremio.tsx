import { StyleSheet, View } from "react-native";

import ViewText from "./ViewText";

import { gerarKey } from "../utils/ultil";
import { Premio } from "../model/Premio";

export default function ViewPremio({ array, cor }) {
    const arrayPremiacao: Array<Premio> = array
    arrayPremiacao.sort(compare)
    arrayPremiacao.reverse()

    function compare(a, b) {
        const v1 = a.pontos
        const v2 = (b.pontos)
        if (v1 < v2) return -1;
        if (v1 > v2) return 1;
        return 0;
    }
    return (

        <View style={styles.content} >

            <View style={styles.legenda}>
                <ViewText fontSize={35} value="Premiações" />
            </View>


            {arrayPremiacao.map(item => {

                return (
                    <View key={gerarKey()} style={[styles.viewItem,]}>
                        <View style={styles.viewLegenda}>
                            <View style={styles.viewItemLegenda}>
                                <ViewText value={"Concurso: "} />
                                <ViewText value={item.concurso} />
                            </View>
                            <View style={styles.viewItemLegenda}>
                                <ViewText value={"Data: "} />
                                <ViewText value={item.data} />
                            </View>
                            <View style={styles.viewItemLegenda}>
                                <ViewText value={"Pontos: "} />
                                <ViewText value={item.pontos.toString()} />
                            </View>

                        </View>

                        <View style={styles.viewResposta}>


                        </View>

                    </View>

                )
            })}
        </View>
    )

}

const styles = StyleSheet.create({

    content: {
        alignItems: "center"
    },
    legenda: {
        padding: 15
    },
    viewItem: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        backgroundColor: "#123",
        borderWidth: 1,
        marginVertical: 5,

    },
    viewLegenda: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        flexWrap: "wrap",
        width: "100%"
    },
    viewItemLegenda: {
        alignItems: "center",
        justifyContent: "center",

    },
    viewResposta: {
        justifyContent: "space-around",
        flexDirection: "row"

    }

})