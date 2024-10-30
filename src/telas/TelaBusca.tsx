import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import LegendaView from "../components/LegendaView";
import { useEffect, useState } from "react";
import { JogoSorteado } from "../model/jogoSorteado";
import ViewText from "../components/ViewText";
import DezenasSelecionados from "../itemsView/DezenasSelecionados";
import ItemPremiacao from "../itemsView/ItemPremiacao";
import Layout from "../components/Layout";
export default function TelaBusca({ route }) {
    const { nomeJogo } = route.params ? route.params : "";
    const { arrayJogosSorteados } = route.params ? route.params : "";
    const { cor } = route.params ? route.params : "";
    const [numConcurso, setNumConcurso] = useState("")
    const [jogo, setJogo] = useState(new JogoSorteado)

    function buscarConcurso() {
        const array: Array<JogoSorteado> = arrayJogosSorteados
        let achou: boolean = false
        array.map((item) => {
            if (item.concurso == numConcurso) {
                setJogo(item)
                achou = true
            }
        })
        if (!achou) {
            Alert.alert("Não encontrado", " concurso nº " + numConcurso + " não encontrado ")
        }
    }

    return (
        <Layout>
            <View style={styles.content}>
                <LegendaView cor={cor} nomeJogo={nomeJogo} />
                <View style={styles.viewBusca}>
                    <View style={styles.viewInput}>
                        <TextInput keyboardType="number-pad" value={numConcurso} onChangeText={setNumConcurso} style={{ fontSize: 25 }} placeholder="Buscar por concurso" />
                    </View>
                    <TouchableOpacity style={[styles.botao, {backgroundColor: cor,}]} onPress={() => buscarConcurso()} >
                        <ViewText value="Buscar" />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center", width: "100%" }}>
                    <View style={[styles.viewItem,]}>
                        <View style={styles.viewLegenda}>
                            <View style={styles.viewItemLegenda}>
                                <ViewText value={"Concurso: "} />
                                <ViewText value={jogo.concurso} />
                            </View>
                            <View style={styles.viewItemLegenda}>
                                <ViewText value={"Data: "} />
                                <ViewText value={jogo.data} />
                            </View>
                        </View>
                    </View>

                    <DezenasSelecionados cor={cor} numerosSelecionados={jogo.dezenas} />
                    {jogo.dezenas2 ? <DezenasSelecionados cor={cor} numerosSelecionados={jogo.dezenas2} /> : null}

                    <View style={{ width: "100%" }}>
                        <ItemPremiacao array={jogo.premiacoes ? jogo.premiacoes : []} limite={10} doBanco={false} />
                    </View>

                </View>
            </View>

        </Layout>
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: "center",
        width: "100%",

    },
    botao: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
        marginLeft: 5,
        borderRadius: 15,
        marginTop: 10,
    },
    viewBusca: {
        flexDirection: "row"
    },


    viewInput: {
        borderColor: 'black',
        borderWidth: 2,
        flexDirection: "row",
        borderRadius: 10,
        padding: 15,
        width: '70%',
        marginTop: 10,
        backgroundColor: "#FFF",
        justifyContent: "space-between",
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


})