import { StyleSheet, View } from "react-native";
import DezenasSelecionados from "./DezenasSelecionados";
import { Ionicons } from "@expo/vector-icons";
import { JogoSorteado } from "../model/jogoSorteado";
import { CORES } from "../constants/Cores";

export default function ViewItemJOgosSalvo({ item,
    jogoComparar, deletarItem,
    editarItem, dupla = false, milionaria = false }) {
    const jogo: JogoSorteado = jogoComparar

    return (
        <View style={styles.content} >
            <DezenasSelecionados
                arrayComparar={jogo.dezenas}
                numerosSelecionados={item.dezenas}
                cor="#123"
            />
            {dupla ? <DezenasSelecionados
                arrayComparar={jogo.dezenas2}
                numerosSelecionados={item.dezenas}
                cor="#123"
            /> : null}
            {milionaria ? <DezenasSelecionados
                arrayComparar={jogo.trevos}
                numerosSelecionados={item.trevos}
                cor="#123"
            /> : null}
            <View style={styles.ViewIcones}>
                <Ionicons style={styles.icone} name="trash-bin-outline" size={45} onPress={deletarItem} />
                <Ionicons style={styles.icone} name="pencil-outline" size={45} onPress={editarItem} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: "center",
        marginVertical: 2,
        backgroundColor: CORES.GERAL.FUNDO_CARTELA,
        width: "95%",
        borderRadius: 15
    },
    ViewIcones: {
        flexDirection: "row", padding: 10
    },

    icone: {
        backgroundColor: CORES.GERAL.BRANCO,
        marginLeft: 5,
        padding: 10,
        borderRadius: 15

    }
})