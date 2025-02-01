import { StyleSheet, View } from "react-native";

import { gerarKey } from "../../../utils/ultil";
import { JogoSorteado } from "../../../model/jogoSorteado";
import DezenasSelecionados from "../../../itemsView/DezenasSelecionados";
import TextView from "../../../components/TextView";

export default function ViewPremio({ array, cor, arrayDezenas, arrayTrevosSelecionados = [] }) {
    const arrayPremiacao: Array<JogoSorteado> = array
    const arraySelecionadas: Array<string> = arrayDezenas
    const arrayTrevos: Array<string> = arrayTrevosSelecionados
    arrayPremiacao.sort(compare)
    arrayPremiacao.reverse()

    function compare(a: JogoSorteado, b: JogoSorteado) {
        const v1 = a.pontos
        const v2 = b.pontos
        if (v1 < v2) return -1;
        if (v1 > v2) return 1;
        return 0;
    }
    return (

        <View style={styles.content} >

            <View style={styles.legenda}>
                <TextView fontSize={35} value="Premiações" />
            </View>
            {arrayPremiacao.map(item => {
                return (
                    <View key={gerarKey()} style={[styles.viewItem,]}>
                        <View style={styles.viewLegenda}>
                            <View style={styles.viewItemLegenda}>
                                <TextView value={"Concurso: "} />
                                <TextView value={item.concurso} />
                            </View>
                            <View style={styles.viewItemLegenda}>
                                <TextView value={"Data: "} />
                                <TextView value={item.data} />
                            </View>
                            <View style={styles.viewItemLegenda}>
                                <TextView value={"Pontos: "} />
                                <TextView value={item.pontos} />
                            </View>
                        </View>

                        {item.trevos.length > 0 ?
                            <View style={{ alignItems: "center" }}>
                                <TextView value="Trevos" />
                                <DezenasSelecionados
                                    arrayComparar={arrayTrevos}
                                    numerosSelecionados={item.trevos} cor={cor} />
                            </View>
                            : null}

                        <View style={{ alignItems: "center" }}>
                            <TextView value="Dezenas" />
                            <DezenasSelecionados
                                arrayComparar={arraySelecionadas}
                                numerosSelecionados={item.dezenas} cor={cor} />
                        </View>

                        { }

                        {item.dezenas2 ?
                            <View style={{ alignItems: "center" }}>
                                <TextView value="Dezenas 2" />
                                <DezenasSelecionados
                                    arrayComparar={arraySelecionadas}
                                    numerosSelecionados={item.dezenas2}
                                    cor={cor} />
                            </View>
                            : null}

                    </View>

                )
            })}
        </View>
    )

}

const styles = StyleSheet.create({

    content: {
        width: "100%",

    },
    legenda: {
        padding: 15
    },
    viewItem: {
        flexDirection: "column",
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