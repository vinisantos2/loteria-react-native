import { StyleSheet, View } from "react-native";
import BotaoOpcao from "../components/BotaoOpcoes";
import Layout from "../components/Layout";
import { COR_BRANCO, COR_DE_FUNDO, COR_DIA, COR_DUPLA, COR_FEDERAL, COR_FUNDO_CARTELA, COR_LOTECA, COR_LOTOFACIL, COR_LOTOMAIA, COR_MEGA, COR_MILIONARIA, COR_PRETO, COR_QUINA, COR_SUPER_SETE, COR_TIME } from "../constants/Cores";
import { ROTA_LOTOFACIL, ROTA_LOTOMANIA, ROTA_MEGA, ROTA_QUINA } from "../rotas/Rotas";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import Jogos, { axiosUltimos, gerarKey } from "../utils/ultil";
import { URL_BASE } from "../constants/Constants";
import ViewText from "../components/ViewText";
import ItemJogo from "../components/ItemJogo";
import { DIA, DUPLA, FEDERAL, LOTECA, LOTOFACIL, LOTOMANIA, MEGA, MILIONARIA, QUINA, SUPER, TIME } from "../constants/Nomes";

export default function Resultados({ navigation }) {

    const url = "ultimos"
    const isFocused = useIsFocused()
    const [array, setArray] = React.useState([])

    React.useEffect(() => {
        buscarDados()
    }, [isFocused])

    async function buscarDados() {
        if (array > 1) return
        let array2 = await axiosUltimos(URL_BASE + url)
        setArray(array2)
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
            {array ? array.map((item) => {
                return (
                    <ItemJogo key={gerarKey()} item={item} cor={mudaCor(item["loteria"])} />
                )
            }) :
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: COR_BRANCO }}>
                    <ViewText value={"Erro servidor"} />
                </View>
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

