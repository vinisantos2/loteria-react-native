import React, { useState } from 'react';

import {
    StyleSheet, View
} from 'react-native';
import Cartela from '../components/Cartela';
import ViewBotao from '../components/ViewBotao';
import { COR_QUINA } from '../constants/Cores';
import Layout from '../components/Layout';
import ViewSelecionados from '../components/ViewSelecionados';
import { COMPARAR, LIMPAR, PRENCHER, QTD_DEZENAS_QUINA, URL_BASE } from '../constants/Constants';
import ViewCarregando from '../components/ViewCarregando';
import LayoutResposta from '../components/LayoutResposta';
import ViewText from '../components/ViewText';
import { useIsFocused } from '@react-navigation/native';
import { axiosBusca, conexao, preencher, retornarDezenas, salvarNumeroNaLista } from '../utils/ultil';
import { STYLES } from '../Style';
import ViewMsgErro from '../components/ViewMsgErro';
import { ViewBotoes } from '../components/ViewBotoes';
import { ROTA_ESTATISTICA, ROTA_QUINA } from '../rotas/Rotas';


let jogos = []

export default function Quina({ navigation }) {

    const [pontos2, setPontos2] = useState(0)
    const [pontos3, setPontos3] = useState(0)
    const [pontos4, setPontos4] = useState(0)
    const [pontos5, setPontos5] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [erroServer, setErroServer] = useState(false)
    const [arrayDezenas, setArrayDezenas] = useState([])
    const [qtdNum, setQtdNum] = useState(0)
    const [arrayJogos, setArrayJogos] = useState([])
    const limite = 8
    const dezenas = 5
    const url = "quina"
    const cor = COR_QUINA
    const nomeJogo = ROTA_QUINA

    const focused = useIsFocused();
    const [corStatus, setCorStatus] = useState("#FFF")

    React.useEffect(() => {
        buscarJogos()
    }, [focused])

    async function buscarJogos() {
        let array = arrayJogos
        setCarregando(true)
        if (arrayJogos.length < 1) {
            array = await axiosBusca(URL_BASE + url);
            const arrayDezenas = await retornarDezenas(array)
            setArrayDezenas(arrayDezenas)
            setArrayJogos(array)
        }

        setErroServer(conexao(array))
        setCarregando(false)
    }

    const [numerosSelecionados, setArray] = useState([])

    function salvarNumero(numero) {
        setArray(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)

    }

    function limpar() {
        setArray([])
        setQtdNum(0)
        setPontos2(0)
        setPontos3(0)
        setPontos4(0)
        setPontos5(0)

    }


    function preencherJogo() {
        setArray(preencher(numerosSelecionados, dezenas, QTD_DEZENAS_QUINA))
        setQtdNum(numerosSelecionados.length)
    }


    async function compararJogo() {

        let contador = 0
        let pontos5 = 0
        let pontos4 = 0
        let pontos3 = 0
        let pontos2 = 0

        // primeiro for para ver os jogos que ja foram sorteados 
        for (let i = 0; i < arrayDezenas.length; i++) {
            // segundo for para percorrer as dezenas escolhidas pelo cliente
            for (let j = 0; j < numerosSelecionados.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado

                if (arrayDezenas[i].includes(numerosSelecionados[j])) {
                    contador++
                }
            }
            // verifica se a quantidade de pontos feito pelo cliente em cada jogo 
            if (contador === 5) {
                pontos5++
            } else if (contador === 4) {
                pontos4++
            } else if (contador === 3) {
                pontos3++
            } else if (contador === 2) {
                pontos2++

            }

            contador = 0


        }
        setPontos5(pontos5)
        setPontos4(pontos4)
        setPontos3(pontos3)
        setPontos2(pontos2)
        setCarregando(false)

    }

    function estatistica() {
        const dezenas = QTD_DEZENAS_QUINA
        navigation.navigate(ROTA_ESTATISTICA, { arrayDezenas, nomeJogo, cor, dezenas })
    }

    return (
        <Layout>
            {/* <StatusBar backgroundColor={corStatus} animated={true} /> */}
            {carregando ? <ViewCarregando /> : null}
            {erroServer ? <ViewMsgErro /> : null}
            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={cor} qtdNum={qtdNum} />
            <Cartela dezenas={QTD_DEZENAS_QUINA}
                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNumero}
                cor={cor} />

            <ViewBotoes
                cor={cor}
                numJogos={arrayJogos.length}
                limpar={() => limpar()}
                estatistica={() => estatistica()}
                preencherJogo={() => preencherJogo()}
                compararJogo={() => compararJogo()} />

            <LayoutResposta>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor='#FFF' value={"Jogos com 5 pontos: " + pontos5} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor='#FFF' value={"Jogos com 4 pontos: " + pontos4} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor='#FFF' value={"Jogos com 3 pontos: " + pontos3} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor='#FFF' value={"Jogos com 2 pontos: " + pontos2} />
                </View>

            </LayoutResposta>

        </Layout>


    );
}
