import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';

import Layout from '../components/Layout';
import Cartela from '../components/Cartela';
import ViewBotao from '../components/ViewBotao';
import { COMPARAR, LIMPAR, PRENCHER, URL_BASE } from '../constants/Constants';
import ViewSelecionados from '../components/ViewSelecionados';
import ViewCarregando from '../components/ViewCarregando';
import { COR_LOTOMAIA } from '../constants/Cores';
import LayoutResposta from '../components/LayoutResposta';
import ViewText from '../components/ViewText';
import { useIsFocused } from '@react-navigation/native';
import { axiosBusca, preencher, retornarDezenas, salvarNumeroNaLista } from '../utils/ultil';
import { STYLES } from '../Style';
import ViewMsgErro from '../components/ViewMsgErro';
import { ViewBotoes } from '../components/ViewBotoes';

export default function Lotomania({ navigation }) {
    const [pontos00, setPontos00] = useState(0)
    const [pontos15, setPontos15] = useState(0)
    const [pontos16, setPontos16] = useState(0)
    const [pontos17, setPontos17] = useState(0)
    const [pontos18, setPontos18] = useState(0)
    const [pontos19, setPontos19] = useState(0)
    const [pontos20, setPontos20] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [erroServer, setErroServer] = useState(false)

    const [qtdNum, setQtdNum] = useState(0)

    const [numerosSelecionados, setArray] = useState([])
    const [jogos, setJogos] = useState([])
    const cor = COR_LOTOMAIA
    const url = "lotomania"
    const limite = 60
    const qtdDezenasLotomania = 100
    const dezenas = 50
    const focused = useIsFocused();
    const [corStatus, setCorStatus] = useState("#FFF")

    React.useEffect(() => {
        buscarJogos()
    }, [focused])


    async function buscarJogos() {
        let array = jogos
        setCarregando(true)
        if (jogos.length < 1) {
            array = await axiosBusca(URL_BASE + url);
            const arrayDezenas = await retornarDezenas(array)
            setJogos(arrayDezenas)
        }
        if (array.length < 1) {
            setErroServer(true)
        } else {
            setErroServer(false)
        }
        setCarregando(false)
    }

    function salvarNNaLista(numero) {

        setArray(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)

    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }


    function preencherJogo() {
        setArray(preencher(numerosSelecionados, dezenas, qtdDezenasLotomania))
        setQtdNum(numerosSelecionados.length)
    }

    async function compararJogo() {

        let contador = 0
        let pontos20 = 0
        let pontos19 = 0
        let pontos18 = 0
        let pontos17 = 0
        let pontos16 = 0
        let pontos15 = 0
        let pontos00 = 0

        // primeiro for para ver os jogos que ja foram sorteados 
        for (let i = 0; i < jogos.length; i++) {
            // segundo for para percorrer as dezenas escolhidas pelo cliente
            for (let j = 0; j < numerosSelecionados.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado

                if (jogos[i].includes(numerosSelecionados[j])) {
                    contador++
                }
            }
            // verifica se a quantidade de pontos feito pelo cliente em cada jogo 
            if (contador === 20) {
                pontos20++
            } else if (contador === 19) {
                pontos19++
            } else if (contador === 18) {
                pontos18++
            } else if (contador === 17) {
                pontos17++
            } else if (contador === 16) {
                pontos16++
            } else if (contador === 15) {
                pontos15++
            } else if (contador === 0) {
                pontos00++
            }


            contador = 0



        }

        setPontos20(pontos20)
        setPontos19(pontos19)
        setPontos18(pontos18)
        setPontos17(pontos17)
        setPontos16(pontos16)
        setPontos15(pontos15)
        setPontos00(pontos00)
        setCarregando(false)

    }

    return (
        <Layout cor={cor}>
            {/* <StatusBar backgroundColor={corStatus} /> */}
            {carregando ? <ViewCarregando /> : null}
            {erroServer ? <ViewMsgErro /> : null}
            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={COR_LOTOMAIA} qtdNum={qtdNum} />

            <Cartela dezenas={qtdDezenasLotomania}
                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNNaLista}
                cor={cor} />


            <ViewBotoes numJogos={jogos.length}
                limpar={() => limpar()}
                preencherJogo={() => preencherJogo()}
                compararJogo={() => compararJogo()}
                cor={cor}
            />

            <LayoutResposta>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={"#FFF"} value={"Jogos com 20 pontos: " + pontos20} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={"#FFF"} value={"Jogos com 00 pontos: " + pontos00} />
                </View>

                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={"#FFF"} value={"Jogos com 19 pontos: " + pontos19} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={"#FFF"} value={"Jogos com 18 pontos: " + pontos18} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={"#FFF"} value={"Jogos com 17 pontos: " + pontos17} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={"#FFF"} value={"Jogos com 16 pontos: " + pontos16} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={"#FFF"} value={"Jogos com 15 pontos: " + pontos15} />
                </View>
            </LayoutResposta>
        </Layout>


    );
}