import { StatusBar, StyleSheet } from "react-native";

import Layout from "../components/Layout";
import {
    COR_DE_FUNDO,
    COR_DIA, COR_DUPLA,
    COR_FEDERAL, COR_LOTECA,
    COR_LOTOFACIL, COR_LOTOMAIA,
    COR_MEGA, COR_MILIONARIA, COR_QUINA,
    COR_RESULTADOS,
    COR_SUPER_SETE, COR_TIME
} from "../constants/Cores";

import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { axiosBusca, gerarKey } from "../utils/ultil";
import { URL_BASE, URL_BASE_ULTIMOS } from "../constants/Constants";
import ItemJogo from "../itemsView/ItemJogo"
import { DIA, DUPLA, FEDERAL, LOTECA, LOTOFACIL, LOTOMANIA, MEGA, MILIONARIA, QUINA, SUPER, TIME } from "../constants/Nomes";
import ViewCarregando from "../components/ViewCarregando";
import ViewMsgErro from "../components/ViewMsgErro";

export default function Resultados({ }) {

    const url = "ultimos"
    const isFocused = useIsFocused()
    const [jogos, setJogos] = React.useState([])
    const [carregando, setCarregando] = React.useState(true)
    const [erroServer, setErroServer] = useState(false)

    React.useEffect(() => {
        buscarDados()

    }, [isFocused])



    function compare(a, b) {
        const v1 = (a["resultado"]["valor_estimado_proximo_concurso"])
        const v2 = (b["resultado"]["valor_estimado_proximo_concurso"])
        if (v1 < v2) return -1;
        if (v1 > v2) return 1;
        return 0;
    }

    async function buscarDados() {
        let array = jogos
        if (array.length < 1) {
            array = await axiosBusca(URL_BASE_ULTIMOS)
            array.sort(compare)
            array.reverse()
            setJogos(array)
        }

        if (array.length < 1) {
            setErroServer(true)

        }

        setCarregando(false)
    }

    function mudaCor(jogo) {

        switch (jogo) {
            case MEGA:
                return COR_MEGA
            case QUINA:
                return COR_QUINA
            case LOTOFACIL:
                return COR_LOTOFACIL
            case LOTOMANIA:
                return COR_LOTOMAIA
            case LOTOMANIA:
                return COR_LOTOMAIA
            case DUPLA:
                return COR_DUPLA
            case TIME:
                return COR_TIME
            case MILIONARIA:
                return COR_MILIONARIA
            case LOTECA:
                return COR_LOTECA
            case FEDERAL:
                return COR_FEDERAL
            case SUPER:
                return COR_SUPER_SETE
            case DIA:
                return COR_DIA
            default:
                return COR_DE_FUNDO

        }
    }

    return (

        <Layout>
            <StatusBar backgroundColor={COR_RESULTADOS} />
            {carregando ? <ViewCarregando /> : null}
            {erroServer ? <ViewMsgErro /> : null}
            {/* <Button
                title="Go to Jane's loto"
                onPress={() =>
                    navigation.navigate("L")
                }
            /> */}
            {jogos ? jogos.map((item) => {
                return (
                    <ItemJogo key={gerarKey()} item={item} cor={mudaCor(item["loteria"])} />
                )
            }) :
                <ViewMsgErro />
            }
        </Layout>

    );
}


const style = StyleSheet.create({
    viewBotoes: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 5,
        flexWrap: 'wrap'
    },

})

