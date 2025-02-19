import { StyleSheet, View } from "react-native";
import TextView from "../../components/TextView";
import ItemEstatistica from "../../itemsView/ItemEstatistica";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { axiosBusca, conexao, converterString, estatistica, gerarKey, jogoSorteados } from "../../utils/ultil";
import { Dropdown } from "../../components/Dropdown";
import Layout from "../../components/Layout";
import { Estatistica } from "../../model/Estatistica";
import { JogoSorteado } from '../../model/jogoSorteado';
import LegendaView from "../../components/LegendaView";
import { URL_BASE } from "../../constants/Constants";
import ViewCarregando from "../../Views/ViewCarregando";
import ViewMsgErro from "../../Views/ViewMsgErro";
import Carregando from "../../components/Carregando";
import AllScreenBanner from "../../components/AllScreenBanner";

export default function TelaEstatistica({ route }) {

    const { nomeJogo } = route.params ? route.params : "";
    const { dezenas } = route.params ? route.params : "";
    const { cor } = route.params ? route.params : "";
    const [arrayJogosSorteados, setArrayJogosSorteado] = useState(Array<JogoSorteado>)
    const [arrayViewEstatistica, setArrayViewEstatistica] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [carregandoPag, setCarregandoPag] = useState(true)
    const [erroServer, setErroServer] = useState(false)
    const [mostrouAdAllScreen, setMostrouAdAllScreen] = useState(false)
    const [total, setTotal] = useState(0)
    const focused = useIsFocused();
    const label = "Últimos "

    const arrayFiltro =
        [
            { label: 'todos', value: '*' },
            { label: label + '200', value: 200 },
            { label: label + '100', value: 100 },
            { label: label + '50', value: 50 },
            { label: label + '25', value: 25 },
            { label: label + '10', value: 10 },
            { label: label + '5', value: 5 },
        ]

    useEffect(() => {
        // Simula que o banner foi exibido e esconde na próxima renderização
        const timer = setTimeout(() => {
            setMostrouAdAllScreen(true);
        }, 3000); // Simulação de 3 segundos para esconder o banner

        return () => clearTimeout(timer); // Limpa o timeout quando o componente desmonta
    }, []);

    React.useEffect(() => {
        buscarJogos()
    }, [focused])

    function mostrarArray(arrayJogosSorteados: Array<JogoSorteado>, arrayEs: Array<Estatistica>, total) {

        const array = estatistica(arrayJogosSorteados, arrayEs)
        array.sort(compare)
        array.reverse()
        setArrayViewEstatistica(array)
        setTotal(total)

    }

    async function buscarJogos() {
        let array = arrayJogosSorteados
        setCarregando(true)
        if (arrayJogosSorteados.length < 1) {
            array = await axiosBusca(URL_BASE + nomeJogo);
            const arrayJogos: Array<JogoSorteado> = await jogoSorteados(array)
            setArrayJogosSorteado(arrayJogos)
        }
        setErroServer(conexao(array))
        setCarregandoPag(false)
        setCarregando(false)
        carregarArrayEstatisticas(array)
    }

    async function carregarArrayEstatisticas(array) {

        const arrayEs: Array<Estatistica> = Array.from({ length: dezenas }).map((_, index) => {
            return { dezena: converterString(index, false), contador: 0 }
        })

        mostrarArray(array, arrayEs, array.length)
    }

    function compare(a, b) {
        return a.contador - b.contador;
    }

    async function filtro(e) {

        let arrayFiltroJogos = []
        const arrayEs = Array.from({ length: dezenas }).map((_, index) => {
            return { dezena: converterString(index, false), contador: 0 }
        })
        if (e === "*") {
            mostrarArray(arrayJogosSorteados, arrayEs, arrayJogosSorteados.length)
            return
        }

        arrayJogosSorteados.map((item, i) => {
            if (i < e) arrayFiltroJogos.push(item)
        })

        mostrarArray(arrayFiltroJogos, arrayEs, arrayFiltroJogos.length)
    }


    return (
        <>
            <Layout>
                {carregandoPag ? <ViewCarregando /> : null}
                {erroServer ? <ViewMsgErro /> : null}
                {carregando ? <Carregando /> : null}

                <View style={styles.content}>
                    <LegendaView cor={cor} nomeJogo={nomeJogo} />
                    <View>
                        <Dropdown click={(e) => filtro(e)} placeHolder={"Selecione quantidade de jogos"} array={arrayFiltro} />
                    </View>

                    <View style={[styles.viewLegenda, { backgroundColor: cor }]}>
                        <View style={styles.legenda}>
                            <TextView cor="#FFF" fontSize={18} fontWeight="bold" value="Dezenas" />
                        </View>

                        <View style={styles.legenda}>
                            <TextView cor="#FFF" fontSize={18} fontWeight="bold" value="Vezes" />
                        </View>

                        <View style={styles.legenda}>
                            <TextView cor="#FFF" fontSize={18} fontWeight="bold" value="%" />
                        </View>
                    </View>

                    {arrayViewEstatistica.length > 0 && arrayViewEstatistica.map((item, index) => (
                        <ItemEstatistica key={index} obj={item} total={total} />
                    ))}

                </View>
            </Layout>

            {!mostrouAdAllScreen ?
                <AllScreenBanner />
                : null

            }

        </>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#FFF",

    },
    viewLegenda: {
        flexDirection: "row",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3, // Sombra para destacar
    },
    legenda: {
        flex: 1, // Distribui espaço igualmente
        alignItems: "center",
        width: "33.33%",
        borderWidth: 1,
        justifyContent: "center",
        paddingVertical: 10,

    },

})