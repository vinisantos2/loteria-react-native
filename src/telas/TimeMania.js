import React, { useState } from 'react';
import { View } from 'react-native';
import Cartela from '../components/Cartela';
import ViewBotao from '../components/ViewBotao';
import { COR_TIME } from '../constants/Cores';
import Layout from '../components/Layout';
import ViewSelecionados from '../components/ViewSelecionados';
import { COMPARAR, LIMPAR, PRENCHER, QTD_DEZENAS_TIME, URL_BASE } from '../constants/Constants';
import ViewCarregando from '../components/ViewCarregando';
import LayoutResposta from '../components/LayoutResposta';
import ViewText from '../components/ViewText';
import { useIsFocused } from '@react-navigation/native';
import { axiosBusca, preencher, retornarDezenas, salvarNumeroNaLista } from '../utils/ultil';
import { STYLES } from '../Style';
import ViewMsgErro from '../components/ViewMsgErro';
import { ViewBotoes } from '../components/ViewBotoes';


export default function TimeMania({ navigation }) {

    const [pontos3, setPontos3] = useState(0)
    const [pontos4, setPontos4] = useState(0)
    const [pontos5, setPontos5] = useState(0)
    const [pontos6, setPontos6] = useState(0)
    const [pontos7, setPontos7] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [erroServer, setErroServer] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const [jogos, setJogos] = useState([])
    const limite = 8
    const dezenas = 10
    const url = "timemania"
    const focused = useIsFocused();
    const cor = COR_TIME

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

    const [numerosSelecionados, setArray] = useState([])
    function salvarNumero(numero) {
        setArray(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)
    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }

    function preencherJogo() {
        setArray(preencher(numerosSelecionados, dezenas, QTD_DEZENAS_TIME))
        setQtdNum(numerosSelecionados.length)
    }



    async function compararJogo() {

        let contador = 0
        let pontos7 = 0
        let pontos6 = 0
        let pontos5 = 0
        let pontos4 = 0
        let pontos3 = 0

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
            if (contador === 7) {
                pontos7++

            } else if (contador === 6) {
                pontos6++
            } else if (contador === 5) {
                pontos5++

            } else if (contador === 4) {
                pontos4++

            } else if (contador === 3) {
                pontos3++

            }
            contador = 0


        }

        setPontos7(pontos7)
        setPontos6(pontos6)
        setPontos5(pontos5)
        setPontos4(pontos4)
        setPontos3(pontos3)
        setCarregando(false)

    }

    return (
        <Layout cor={cor}>
            {/* <StatusBar backgroundColor={corStatus} animated={true} /> */}
            {carregando ? <ViewCarregando /> : null}
            {erroServer ? <ViewMsgErro /> : null}
            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={COR_TIME} qtdNum={qtdNum} />
            <Cartela dezenas={QTD_DEZENAS_TIME}

                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNumero}
                cor={COR_TIME} />

            <ViewBotoes
                cor={cor}
                numJogos={jogos.length}
                limpar={() => limpar()}
                preencherJogo={() => preencherJogo()}
                compararJogo={() => compararJogo()} />



            <LayoutResposta>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText value={"Jogos com 7 pontos: " + pontos7} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText value={"Jogos com 6 pontos: " + pontos6} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText value={"Jogos com 5 pontos: " + pontos5} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText value={"Jogos com 4 pontos: " + pontos4} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText value={"Jogos com 3 pontos: " + pontos4} />
                </View>
            </LayoutResposta>

        </Layout>


    );
}

