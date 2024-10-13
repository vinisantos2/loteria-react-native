import React, { useState } from 'react';

import {
    StyleSheet, View
} from 'react-native';
import Cartela from '../components/Cartela';
import ViewBotao from '../components/ViewBotao';
import { COR_BRANCO, COR_MILIONARIA } from '../constants/Cores';
import Layout from '../components/Layout';
import ViewSelecionados from '../components/ViewSelecionados';
import { COMPARAR, LIMPAR, PRENCHER, QTD_DEZENAS_MILIONARIA, URL_BASE } from '../constants/Constants';
import ViewCarregando from '../components/ViewCarregando';
import LayoutResposta from '../components/LayoutResposta';
import ViewText from '../components/ViewText';
import { useIsFocused } from '@react-navigation/native';
import { axiosBusca, preencher, salvarNumeroNaLista } from '../utils/ultil';
import ViewMsgErro from '../components/ViewMsgErro';
import { STYLES } from '../Style';
import { ViewBotoes } from '../components/ViewBotoes';

export default function MaisMilionaria({ }) {

    const [pontos5e1trevos, setPontos5e1trevos] = useState(0)
    const [pontos5e2trevos, setPontos5e2trevos] = useState(0)
    const [pontos6e1trevo, setPontos6e1trevo] = useState(0)
    const [pontos6e2trevos, setPontos6e2trevos] = useState(0)

    const [carregando, setCarregando] = useState(false)
    const [erroServer, setErroServer] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const [qtdNumTrevos, setQtdNumTrevos] = useState(0)
    const [jogos, setJogos] = useState([])
    const limite = 12
    const dezenas = 6
    const url = "milionaria"
    const focused = useIsFocused();
    const [corStatus, setCorStatus] = useState("#FFF")
    const cor = COR_MILIONARIA
    React.useEffect(() => {
        buscarJogos()
    }, [focused])


    async function buscarJogos() {
        let array = jogos
        setCarregando(true)
        if (jogos.length < 1) {
            array = await axiosBusca(URL_BASE + url);
            let arrayDezenasTrevos = []
            if (array) {
                arrayDezenasTrevos = array.map(item => {
                    return {
                        dezenas: item.dezenas,
                        trevos: item.trevos
                    }
                })
            }

            setJogos(arrayDezenasTrevos)
        }

        if (array.length < 1) {
            setErroServer(true)
        } else {
            setErroServer(false)
        }
        setCarregando(false)
    }

    const [numerosSelecionados, setArray] = useState([])
    const [numerosSelecionadosTrevos, setArrayTrevos] = useState([])

    function salvarNumero(numero) {
        setArray(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)
    }
    function salvarNumeroTrevo(numero) {

        setArrayTrevos(salvarNumeroNaLista(numero, numerosSelecionadosTrevos, 6))
        setQtdNumTrevos(numerosSelecionadosTrevos.length)
    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }


    function preencherJogo() {
        setArray(preencher(numerosSelecionados, dezenas, QTD_DEZENAS_MILIONARIA))
        setQtdNum(numerosSelecionados.length)
    }

    async function compararJogo() {
        let contador = 0
        let trevos = 0

        let pontos6e2trevos = 0
        let pontos6e1trevos = 0
        let pontos5e2trevos = 0
        let pontos5e1trevos = 0
        let pontos4e2trevos = 0
        let pontos4e1trevos = 0
        let pontos3e2trevos = 0
        let pontos3e1trevos = 0

        console.log(numerosSelecionadosTrevos)

        // primeiro for para ver os jogos que ja foram sorteados 
        for (let i = 0; i < jogos.length; i++) {

            // segundo for para percorrer as dezenas escolhidas pelo cliente
            for (let j = 0; j < numerosSelecionados.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado
                if (jogos[i].dezenas.includes(numerosSelecionados[j])) {
                    contador++
                }
            }
            for (let j = 0; j < numerosSelecionadosTrevos.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado
                if (jogos[i].trevos.includes(numerosSelecionadosTrevos[j])) {
                    trevos++
                }
            }
            // verifica se a quantidade de pontos feito pelo cliente em cada jogo 
            if (contador === 6 && trevos === 2) {
                pontos6e2trevos++
            } else if (contador === 6 && trevos < 2) {
                pontos6e1trevos++
            } else if (contador === 5 && trevos === 2) {
                pontos5e2trevos++
            } else if (contador === 5 && trevos < 2) {
                pontos5e1trevos++
            } else if (contador === 4 && trevos === 2) {
                pontos4e2trevos++
            } else if (contador === 4 && trevos < 2) {
                pontos4e1trevos++
            } else if (contador === 3 && trevos === 2) {
                pontos3e2trevos++
            } else if (contador === 3 && trevos === 1) {
                pontos3e1trevos++
            }

            contador = 0
            trevos = 0


        }


        setPontos6e2trevos(pontos6e2trevos)
        setPontos6e1trevo(pontos6e1trevos)
        setPontos5e2trevos(pontos5e2trevos)
        setPontos5e1trevos(pontos5e1trevos)
        setCarregando(false)

    }

    return (
        <Layout cor={cor}>
            {/* <StatusBar backgroundColor={corStatus} animated={true} /> */}
            {carregando ? <ViewCarregando /> : null}
            {erroServer ? <ViewMsgErro /> : null}
            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={COR_MILIONARIA} qtdNum={qtdNum} />
            <View style={{ alignItems: 'center' }}>
                <ViewText fontSize={25} value={"Trevos"} cor='#FFF' fontWeight={"bold"} />
            </View>

            <Cartela dezenas={6}
                tervo={true}
                numerosSelecionados={numerosSelecionadosTrevos}
                salvarNumeroNaLista={salvarNumeroTrevo}
                cor={COR_MILIONARIA}
                legenda='Trevos'
            />
            <View style={{ alignItems: 'center' }}>
                <ViewText fontSize={25} value={"Dezenas"} cor='#FFF' fontWeight={"bold"} />
            </View>
            <Cartela
                dezenas={QTD_DEZENAS_MILIONARIA}
                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNumero}
                cor={COR_MILIONARIA} />

            <ViewBotoes numJogos={jogos.length}
                limpar={() => limpar()}
                preencherJogo={() => preencherJogo()}
                compararJogo={() => compararJogo()}
                cor={cor}
            />

            <LayoutResposta>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]} >
                    <ViewText cor={COR_BRANCO} value={"Jogos com 6 pontos e 2 trevos: " + pontos6e2trevos} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 6 pontos e 1 ou nenhum trevo: " + pontos6e1trevo} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 5 pontos e 2 trevos: " + pontos5e2trevos} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 5 pontos e 1 ou nenhum trevo: " + pontos5e1trevos} />
                </View>
            </LayoutResposta>

        </Layout>


    );
}
