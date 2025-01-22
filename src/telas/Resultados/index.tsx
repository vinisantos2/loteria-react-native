import { ScrollView, StyleSheet, View } from "react-native";


import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { axiosBusca, gerarKey, mudaCor } from "../../utils/ultil";
import { URL_BASE_ULTIMOS } from "../../constants/Constants";
import ItemJogo from "../../itemsView/ItemJogo"
import {
    DIA, DUPLA, LOTECA, LOTOFACIL,
    LOTOMANIA, MEGA, MILIONARIA, QUINA,
    SUPER, TIME
} from "../../constants/Nomes";
import ViewCarregando from "../../Views/ViewCarregando";
import { jogoDoBanco, JogoSorteado } from "../../model/jogoSorteado";
import { Dropdown } from "../../components/Dropdown";
import ViewMsgErro from "../../Views/ViewMsgErro";



export default function Resultados({ }) {

    const isFocused = useIsFocused()
    const [jogosSorteados, setJogosSorteados] = React.useState(Array<JogoSorteado>)
    const [arrayViewJogosSorteados, setArrayViewJogosSorteados] = React.useState(Array<JogoSorteado>)
    const [carregando, setCarregando] = React.useState(true)
    const [erroServer, setErroServer] = useState(false)


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
    }, [isFocused])

    async function buscarDados() {

        let array = await axiosBusca(URL_BASE_ULTIMOS)
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

            <View style={{ flex: 1 }}>
                <View>
                    <Dropdown click={(e) => filtro(e)} placeHolder={"Filtrar por jogo"} array={arrayFiltro.sort()} />
                </View>
                <ScrollView>

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

