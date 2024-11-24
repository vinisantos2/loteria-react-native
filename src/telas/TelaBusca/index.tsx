import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { jogoDoBanco, jogoDoBanco2, JogoSorteado } from "../../model/jogoSorteado";
import { ViewLegenda } from "../../components/ViewLegendaJogo";
import { ViewSorteados } from "../../components/ViewSorteados";
import ItemPremiacao from "../../itemsView/ItemPremiacao";
import ItemLocalGanhadores from "../../itemsView/ItemLocalGanhadores";
import RodapeBanner from "../../components/RodapeBanner";
import { DIA, DUPLA, LOTECA, LOTOFACIL, LOTOMANIA, MEGA, MILIONARIA, QUINA, SUPER, TIME } from "../../constants/Nomes";
import { Dropdown } from "../../components/Dropdown";
import axios from "axios";
import { axiosBusca, gerarKey, mudaCor } from "../../utils/ultil";
import TextView from "../../components/TextView";
import { STYLES } from "../../Style";
import { useState } from "react";
import ViewEsconderIcone from "../Views/ViewEsconderCartela";
import ViewInfoProximoConcurso from "../../components/ViewInfoProximoConcurso";

export default function TelaBusca({ route }) {
    const [numConcurso, setNumConcurso] = useState("")
    const [loteria, setLoteria] = useState("")
    const [arrayJogos, setArrayJogos] = useState<Array<object>>([])
    const [jogo, setJogo] = useState<JogoSorteado>(undefined)
    const [viewResultado, setViewResultado] = useState(false)
    console.log(arrayJogos)
    const arrayFiltro =
        [
            { label: DUPLA, value: 'duplasena' },
            { label: DIA, value: 'diadesorte' },
            { label: LOTECA, value: 'LOTECA' },
            { label: LOTOFACIL, value: 'LOTOFACIL' },
            { label: LOTOMANIA, value: 'LOTOMANIA' },
            { label: MILIONARIA, value: 'maismilionaria' },
            { label: MEGA, value: 'megasena' },
            { label: QUINA, value: 'QUINA' },
            { label: SUPER, value: 'supersete' },
            { label: TIME, value: 'timemania' },

        ]

    async function filtro(e: string) {
        if (e === undefined) return
        let concurso = "ultimos5"
        const url = "https://apiloterias.com.br/app/v2/resultado?loteria=" + e + "&token=GiNtwyxspInrON9&concurso=" + concurso
        setLoteria(e)
        const array = await axiosBusca(url)
        setArrayJogos(array)
        setNumConcurso("")

    }
    async function buscarJogo() {
        const url = "https://apiloterias.com.br/app/v2/resultado?loteria=" + loteria + "&token=GiNtwyxspInrON9&concurso=" + numConcurso
        const array = await axiosBusca(url)
        const jogo = jogoDoBanco2(array)
        setJogo(jogo)
        setArrayJogos([])
        setNumConcurso("")
    }

    function viewJogo() {
        if (jogo === undefined) return null
        return (
            <View key={gerarKey()}>
                <ViewLegenda
                    jogo={jogo.loteria === "MAIS MILIONÁRIA" ? "MILIONÁRIA" : jogo.loteria}
                    numeroConcurso={jogo.concurso}
                    cor={mudaCor(jogo.loteria)}
                    data={jogo.data} />
                <ViewSorteados
                    arrayDezenas={jogo.dezenas}
                    arrayDezenas2={jogo.dezenas2}
                    cor={mudaCor(jogo.loteria)}
                    mesSorte={jogo.mesSorte}
                    time={jogo.timeCoracao}
                    trevos={jogo.trevos}
                    arrayLoteca={jogo.loteca}
                />
            </View>
        )
    }
    return (
        <>
            <View>
                <Dropdown click={(e) => filtro(e)}
                    placeHolder={"Buscar por jogo"}
                    array={arrayFiltro.sort()} />
            </View>

            {loteria.length > 0 ?

                <View style={styles.viewBusca}>
                    <View style={styles.viewInput} >
                        <TextInput keyboardType="number-pad"
                            value={numConcurso} onChangeText={setNumConcurso}
                            style={styles.input}
                            placeholder="Buscar por concurso" />
                    </View>
                    <TouchableOpacity onPress={buscarJogo}
                        style={styles.botao}>
                        <TextView value="Buscar" />
                    </TouchableOpacity>
                </View> :
                null}

            <ScrollView style={{ marginTop: 5 }}>

                {arrayJogos.length > 0 ?
                    arrayJogos.map(item => {
                        const jogoSorteado = jogoDoBanco2(item)
                        const cor = mudaCor(jogoSorteado.loteria)
                        return (
                            <View key={gerarKey()}>
                                <ViewLegenda
                                    jogo={jogoSorteado.loteria === "MAIS MILIONÁRIA" ? "MILIONÁRIA" : jogoSorteado.loteria}
                                    numeroConcurso={jogoSorteado.concurso}
                                    cor={cor}
                                    data={jogoSorteado.data} />
                                <ViewSorteados
                                    arrayDezenas={jogoSorteado.dezenas}
                                    arrayDezenas2={jogoSorteado.dezenas2}
                                    cor={cor}
                                    mesSorte={jogoSorteado.mesSorte}
                                    time={jogoSorteado.timeCoracao}
                                    trevos={jogoSorteado.trevos}
                                    arrayLoteca={jogoSorteado.loteca}
                                />
                            </View>
                        )
                    }) : viewJogo()

                }

            </ScrollView>
            <RodapeBanner />
        </>
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
        backgroundColor: "blue"
    },

    input: {
        padding: 5,
        fontSize: 20,
        backgroundColor: "#FFF"
    },
    viewBusca: {
        flexDirection: "row",
        justifyContent: "center"
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