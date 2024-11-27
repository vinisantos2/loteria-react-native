import React, { useState } from 'react';
import {

    View,
} from 'react-native';

import Layout from '../../components/Layout';
import Cartela from '../../components/Cartela';
import { QTD_DEZENAS_DUPLA, URL_BASE } from '../../constants/Constants';
import ViewSelecionados from '../../components/ViewSelecionados';
import { COR_DUPLA, COR_MEGA } from '../../constants/Cores';
import ViewCarregando from '../../components/ViewCarregando';
import LayoutResposta from '../../components/LayoutResposta';
import TextView from '../../components/TextView';
import { useIsFocused } from '@react-navigation/native';
import { axiosBusca, conexao, preencher, jogoSorteados, salvarNumeroNaLista } from '../../utils/ultil';
import { STYLES } from '../../Style';
import { ViewBotoes } from '../../components/ViewBotoes';
import { ROTA_BUSCA, ROTA_ESTATISTICA } from '../../rotas/Rotas';
import ViewMsgErro from '../../components/ViewMsgErro';
import ViewPremio from '../../components/ViewPremio';
import { JogoSorteado } from '../../model/jogoSorteado';
import BuscaView from '../../components/BuscaView';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import ViewEsconderIcone from '../Views/ViewEsconderCartela';
import Carregando from '../../components/Carregando';
import RodapeBanner from '../../components/RodapeBanner';

export default function DuplaSena({ navigation }) {

    const [pontos6, setPontos6] = useState(0)
    const [pontos5, setPontos5] = useState(0)
    const [pontos4, setPontos4] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [erroServer, setErroServer] = useState(false)
    const [carregandoPag, setCarregandoPag] = useState(false)
    const [viewCartela, setViewCartela] = useState(true)
    const [qtdNum, setQtdNum] = useState(0)
    const [numerosSelecionados, setArray] = useState([])
    const [arrayJogos, setArrayJogos] = useState([])
    const [arrayJogosSorteados, setArrayJogosSorteado] = useState(Array<JogoSorteado>)
    const qtdDezenasDupla = QTD_DEZENAS_DUPLA
    const url = "duplasena"
    const cor = COR_DUPLA
    const nomeJogo = "Dupla sena"
    const limite = 12
    const dezenas = 6
    const focused = useIsFocused();
    const [arrayPremiacao, setArrayPremiacao] = useState(Array<JogoSorteado>)

    React.useEffect(() => {
        buscarJogos()
    }, [focused])

    async function buscarJogos() {
        let array = arrayJogos
        setCarregando(true)
        if (arrayJogos.length < 1) {
            array = await axiosBusca(URL_BASE + url);
            const arrayJogos = await jogoSorteados(array)
            setArrayJogosSorteado(arrayJogos)
            setArrayJogos(array)
            dividirDezenas(arrayJogos)
        }

        setErroServer(conexao(array))

        setCarregando(false)
    }

    function salvarNumero(numero) {
        setArray(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)
    }

    function limpar() {
        setArray([])
        setQtdNum(0)
        setPontos4(0)
        setPontos5(0)
        setPontos6(0)
        setArrayPremiacao([])
        setViewCartela(true)
    }

    function preencherJogo() {
        setArray(preencher(numerosSelecionados, dezenas, qtdDezenasDupla))
        setQtdNum(numerosSelecionados.length)
    }

    async function dividirDezenas(array: Array<JogoSorteado>) {
        const arrayJogos: Array<JogoSorteado> = []
        let dezenas1: Array<string> = []
        let dezenas2: Array<string> = []
        array.map((item) => {
            dezenas1.push(
                item.dezenas[0].toString(),
                item.dezenas[1].toString(),
                item.dezenas[2].toString(),
                item.dezenas[3].toString(),
                item.dezenas[4].toString(),
                item.dezenas[5].toString()
            )
            dezenas2.push(
                item.dezenas[6].toString(),
                item.dezenas[7].toString(),
                item.dezenas[8].toString(),
                item.dezenas[9].toString(),
                item.dezenas[10].toString(),
                item.dezenas[11].toString()
            )
            item.dezenas = dezenas1
            item.dezenas2 = dezenas2
            arrayJogos.push(item)
            dezenas1 = []
            dezenas2 = []
        })

        setArrayJogosSorteado(arrayJogos)
    }

    async function compararJogo() {
        setViewCartela(false)
        const arrayPremiacao = new Array<JogoSorteado>
        let contador1 = 0
        let contador2 = 0
        let ponto6 = 0
        let ponto5 = 0
        let ponto4 = 0
        if (arrayJogosSorteados.length < 1) return
        // primeiro for para ver os jogos que ja foram sorteados 
        for (let i = 0; i < arrayJogosSorteados.length; i++) {
            // segundo for para percorrer as dezenas escolhidas pelo cliente
            for (let j = 0; j < numerosSelecionados.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado
                if (arrayJogosSorteados[i].dezenas.includes(numerosSelecionados[j])) {
                    contador1++
                }
                if (arrayJogosSorteados[i].dezenas2.includes(numerosSelecionados[j])) {
                    contador2++
                }
            }
            // verifica se a quantidade de pontos feito pelo cliente em cada jogo 
            if (contador1 === 6 || contador2 === 6) {
                ponto6++
                const obj = arrayJogosSorteados[i]
                obj.pontos = "6 acertos"
                arrayPremiacao.push(obj)

            } else if (contador1 === 5 || contador2 === 5) {
                ponto5++
                const obj = arrayJogosSorteados[i]
                obj.pontos = "5 acertos"
                arrayPremiacao.push(obj)

            } else if (contador1 === 4 || contador2 === 4) {
                ponto4++
                const obj = arrayJogosSorteados[i]
                obj.pontos = "4 acertos"
                arrayPremiacao.push(obj)
            }
            contador1 = 0
            contador2 = 0
        }

        setPontos6(ponto6)
        setPontos5(ponto5)
        setPontos4(ponto4)
        setArrayPremiacao(arrayPremiacao)
        setCarregando(false)

    }

    function estatistica() {
        const dezenas = qtdDezenasDupla
        navigation.navigate(ROTA_ESTATISTICA, { arrayJogosSorteados: arrayJogosSorteados, nomeJogo, cor, dezenas })
    }

    return (
        <>

            <Layout cor={cor}>
                {carregandoPag ? <ViewCarregando /> : null}
                {erroServer ? <ViewMsgErro /> : null}
                {carregando ? <Carregando /> : null}
                <ViewBotoes
                    numJogos={arrayJogos.length}
                    limpar={() => limpar()}
                    estatistica={() => estatistica()}
                    preencherJogo={() => preencherJogo()}
                    compararJogo={() => compararJogo()}
                    cor={cor}
                />

                <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={cor} qtdNum={qtdNum} />

                {viewCartela ? <Cartela
                    dezenas={qtdDezenasDupla}
                    numerosSelecionados={numerosSelecionados}
                    salvarNumeroNaLista={salvarNumero}
                    cor={cor} /> : null}

                <ViewEsconderIcone valor={viewCartela ? "Esconder cartela" : "Mostrar cartela"} setViewCartela={setViewCartela} viewCartela={viewCartela} />



                <LayoutResposta>
                    <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                        <TextView cor='#FFF' value={"Jogos com 6 pontos: " + pontos6} />
                    </View>
                    <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                        <TextView cor='#FFF' value={"Jogos com 5 pontos: " + pontos5} />
                    </View>
                    <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                        <TextView cor='#FFF' value={"Jogos com 4 pontos: " + pontos4} />
                    </View>
                </LayoutResposta>

                {arrayPremiacao.length > 0 ? <ViewPremio arrayDezenas={numerosSelecionados} array={arrayPremiacao} cor={cor} /> : null}


            </Layout>
         
        </>

    );
}

