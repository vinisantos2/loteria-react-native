import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

import Layout from "../../components/Layout";
import {
    COR_RESULTADOS,

} from "../../constants/Cores";

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'

import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { axiosBusca, gerarKey, mudaCor } from "../../utils/ultil";
import { URL_BASE_ULTIMOS } from "../../constants/Constants";
import ItemJogo from "../../itemsView/ItemJogo"
import {
    DIA, DUPLA, FEDERAL, LOTECA, LOTOFACIL,
    LOTOMANIA, MEGA, MILIONARIA, QUINA,
    SUPER, TIME
} from "../../constants/Nomes";
import ViewCarregando from "../../components/ViewCarregando";
import ViewMsgErro from "../../components/ViewMsgErro";
import StatusBarView from "../../components/StatusBarView";
import { jogoDoBanco, JogoSorteado } from "../../model/jogoSorteado";
import { Dropdown } from "../../components/Dropdown";
import RodapeBanner from "../../components/RodapeBanner";

export default function Resultados({ }) {

    const url = "ultimos"
    const isFocused = useIsFocused()
    const [jogosSorteados, setJogosSorteados] = React.useState(Array<JogoSorteado>)
    const [arrayViewJogosSorteados, setArrayViewJogosSorteados] = React.useState(Array<JogoSorteado>)
    const [carregando, setCarregando] = React.useState(true)
    const [erroServer, setErroServer] = useState(false)
    const [corStatus, setCorStatus] = useState(COR_RESULTADOS)

    const arrayFiltro =
        [
            { label: DUPLA, value: DUPLA },
            { label: DIA, value: DIA },
            { label: LOTECA, value: LOTECA },
            { label: LOTOFACIL, value: LOTOFACIL },
            { label: LOTOMANIA, value: LOTOMANIA },
            { label: MILIONARIA, value: MILIONARIA },
            { label: MEGA, value: MEGA },
            { label: QUINA, value: QUINA },
            { label: SUPER, value: SUPER },
            { label: TIME, value: TIME },

        ]

    React.useEffect(() => {
        buscarDados()
        // mudaCorStatus()
    }, [isFocused])

    function mudaCorStatus() {
        setCorStatus(COR_RESULTADOS)
    }



    function compare(a, b) {
        const v1 = (a["resultado"]["valor_estimado_proximo_concurso"])
        const v2 = (b["resultado"]["valor_estimado_proximo_concurso"])
        if (v1 < v2) return -1;
        if (v1 > v2) return 1;
        return 0;
    }

    async function buscarDados() {


        let array = await axiosBusca(URL_BASE_ULTIMOS)
        array.sort(compare)
        array.reverse()
        setJogosSorteados(array)
        setArrayViewJogosSorteados(array)



        if (array.length < 1) {
            setErroServer(true)
        } else {
            setErroServer(false)
        }

        setCarregando(false)
    }



    async function filtro(e) {

        const arrayFiltro: Array<JogoSorteado> = []

        jogosSorteados.map(item => {
            if (item.loteria == e) {
                arrayFiltro.push(item)
            }
        })

        if (arrayFiltro.length < 1) {
            setArrayViewJogosSorteados(jogosSorteados)
            return
        }

        setArrayViewJogosSorteados(arrayFiltro)

    }


    return (
        <>
            <View style={{flex: 1}}>
                <View>
                    <Dropdown click={(e) => filtro(e)} placeHolder={"Filtrar por jogo"} array={arrayFiltro.sort()} />
                </View>
                <ScrollView>


                    <StatusBarView cor={corStatus} />
                    {carregando ? <ViewCarregando /> : null}
                    {erroServer ? <ViewMsgErro /> : null}
                    {/* <Button
                title="Go to Jane's loto"
                onPress={() =>
                    navigation.navigate("L")
                }
            /> */}
                    {arrayViewJogosSorteados ? arrayViewJogosSorteados.map((item) => {
                        const jogo = jogoDoBanco(item)
                        return (
                            <ItemJogo key={gerarKey()} item={jogo} cor={mudaCor(item.loteria)} />

                        )
                    }) :
                        <ViewMsgErro />
                    }

                </ScrollView>
            </View>
            <RodapeBanner />
        </>

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

