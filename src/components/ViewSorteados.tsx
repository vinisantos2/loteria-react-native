import { StyleSheet, View } from "react-native"
import DezenasSelecionados from "../itemsView/DezenasSelecionados"
import TextView from "./TextView"
import { gerarKey } from "../utils/ultil"
import ViewLoteca from "./ViewLoteca"

export function ViewSorteados({ trevos, cor, time, mesSorte,
    arrayDezenas, arrayDezenas2, arrayLoteca }) {

    return (
        <View style={styles.content}>
            {arrayDezenas.length > 1 ? <TextView cor="#000" fontWeight={"bold"} value={"Dezenas"} fontSize={30} /> : null}
            {
                arrayDezenas.length > 1 ?
                    <DezenasSelecionados  key={gerarKey()} numerosSelecionados={arrayDezenas} cor={cor} />
                    : <ViewLoteca key={gerarKey()} arrayLoteca={arrayLoteca} />
            }
            {
                arrayDezenas2 ?
                    <DezenasSelecionados  key={gerarKey()} numerosSelecionados={arrayDezenas2} cor={cor} />
                    : null
            }
            {
                trevos ?
                    <View style={styles.viewItem} >
                        <TextView cor="#000" value={"Trevos: "} fontWeight={"bold"} />
                        <DezenasSelecionados numerosSelecionados={trevos} cor={cor} />
                    </View >
                    : null
            }
            {
                time ?
                    <View style={styles.viewItem}>
                        <TextView cor="#000" value={"Time do coração"} fontWeight={"bold"} />
                        <View style={[styles.item, { backgroundColor: cor }]}>
                            <TextView  value={time} />
                        </View>
                    </View>
                    : null
            }
            {
                mesSorte ?
                    <View style={styles.viewItem}>
                        <TextView cor="#000" value={"Mês da sorte: "} />
                        <View style={[styles.item, { backgroundColor: cor }]}>
                            <TextView value={mesSorte} />
                        </View>
                    </View>
                    : null
            }

        </View>
    )


}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },

    viewItem: {
        alignItems: "center",
        padding: 15
    }

})