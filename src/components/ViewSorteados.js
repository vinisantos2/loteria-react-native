import { StyleSheet, View, Text } from "react-native"
import DezenasSelecionados from "../itemsView/DezenasSelecionados"
import ViewText from "./ViewText"
import { gerarKey } from "../utils/ultil"
import { COR_BRANCO } from "../constants/Cores"
import ViewLoteca from "./ViewLoteca"


export function ViewSorteados({ trevos, cor, time, mesSorte,
    arrayDezenas, arrayDezenas2, arrayLoteca }) {

    return (
        <View style={styles.content}>
            {arrayDezenas.length > 1 ? <ViewText fontWeight={"bold"} value={"Dezenas"} fontSize={30} /> : null}
            {
                !arrayDezenas.length < 1 ?
                    <DezenasSelecionados key={gerarKey()} numerosSelecionados={arrayDezenas} cor={cor} />
                    : <ViewLoteca key={gerarKey()} arrayLoteca={arrayLoteca} />
            }
            {
                arrayDezenas2 ?
                    <DezenasSelecionados key={gerarKey()} numerosSelecionados={arrayDezenas2} cor={cor} />
                    : null
            }
            {
                trevos ?
                    <View style={styles.viewItem} >
                        <ViewText value={"Trevos: "} fontWeight={"bold"} />
                        <DezenasSelecionados numerosSelecionados={trevos} cor={cor} />
                    </View >
                    : null
            }
            {
                time ?
                    <View style={styles.viewItem}>
                        <ViewText value={"Time do coração"} fontWeight={"bold"} />
                        <View style={[styles.item, { backgroundColor: cor }]}>
                            <ViewText value={time} />
                        </View>
                    </View>
                    : null
            }
            {
                mesSorte ?
                    <View style={styles.viewItem}>
                        <ViewText value={"Mês da sorte: "} />
                        <View style={[styles.item, { backgroundColor: cor }]}>
                            <ViewText value={mesSorte} />
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
        padding: 5,
        borderRadius: 5
    },

    viewItem: {
        alignItems: "center",
    }

})