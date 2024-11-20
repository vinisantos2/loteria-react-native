import React, { useState } from 'react';
import { View } from 'react-native';
import Cartela from '../../components/Cartela';
import { COR_TIME } from '../../constants/Cores';
import Layout from '../../components/Layout';
import ViewSelecionados from '../../components/ViewSelecionados';
import { QTD_DEZENAS_TIME, URL_BASE } from '../../constants/Constants';
import ViewCarregando from '../../components/ViewCarregando';
import LayoutResposta from '../../components/LayoutResposta';
import ViewText from '../../components/ViewText';
import { useIsFocused } from '@react-navigation/native';
import { axiosBusca, conexao, preencher, jogoSorteados, salvarNumeroNaLista } from '../../utils/ultil';
import { STYLES } from '../../Style';
import ViewMsgErro from '../../components/ViewMsgErro';
import { ViewBotoes } from '../../components/ViewBotoes';
import { ROTA_BUSCA, ROTA_ESTATISTICA, ROTA_TIME } from '../../rotas/Rotas';
import ViewPremio from '../../components/ViewPremio';
import { JogoSorteado } from '../../model/jogoSorteado';
import BuscaView from '../../components/BuscaView';
import RodapeBanner from '../../components/RodapeBanner';

export default function TimeMania({ navigation }) {

    const [pontos3, setPontos3] = useState(0)
    const [pontos4, setPontos4] = useState(0)
    const [pontos5, setPontos5] = useState(0)
    const [pontos6, setPontos6] = useState(0)
    const [pontos7, setPontos7] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [erroServer, setErroServer] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const [arrayJogos, setArrayJogos] = useState([])
    const [arrayJogosSorteados, setArrayJogosSorteado] = useState(Array<JogoSorteado>)
    const [arrayPremiacao, setArrayPremiacao] = useState(Array<JogoSorteado>)
    const limite = 8
    const dezenas = 10
    const url = "timemania"
    const focused = useIsFocused();
    const cor = COR_TIME
    const nomeJogo = ROTA_TIME

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
        setPontos7(0)
        setPontos6(0)
        setPontos5(0)
        setPontos4(0)
        setPontos3(0)

    }

    function preencherJogo() {
        setArray(preencher(numerosSelecionados, dezenas, QTD_DEZENAS_TIME))
        setQtdNum(numerosSelecionados.length)
    }

    async function compararJogo() {
        setCarregando(true)
        const arrayPremiacao = new Array<JogoSorteado>
        let contador = 0
        let pontos7 = 0
        let pontos6 = 0
        let pontos5 = 0
        let pontos4 = 0
        let pontos3 = 0

        // primeiro for para ver os jogos que ja foram sorteados 
        for (let i = 0; i < arrayJogosSorteados.length; i++) {
            // segundo for para percorrer as dezenas escolhidas pelo cliente
            for (let j = 0; j < numerosSelecionados.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado
                if (arrayJogosSorteados[i].dezenas.includes(numerosSelecionados[j])) {
                    contador++
                }
            }
            // verifica se a quantidade de pontos feito pelo cliente em cada jogo 
            if (contador === 7) {
                pontos7++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[0].descricao
                arrayPremiacao.push(obj)

            } else if (contador === 6) {
                pontos6++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[1].descricao
                arrayPremiacao.push(obj)
            } else if (contador === 5) {
                pontos5++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[2].descricao
                arrayPremiacao.push(obj)

            } else if (contador === 4) {
                pontos4++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[3].descricao
                arrayPremiacao.push(obj)

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
        setArrayPremiacao(arrayPremiacao)
        setCarregando(false)


    }

    async function estatistica() {
        setCarregando(true)
        const dezenas = QTD_DEZENAS_TIME
        await navigation.navigate(ROTA_ESTATISTICA, { arrayJogosSorteados: arrayJogosSorteados, nomeJogo, cor, dezenas })
        setCarregando(false)
    }
    async function abrirBuscador() {
        await navigation.navigate(ROTA_BUSCA, { arrayJogosSorteados: arrayJogos, nomeJogo, cor })
    }

    return (
        <>

            <Layout cor={cor}>
                {/* <StatusBar backgroundColor={corStatus} animated={true} /> */}
                {carregando ? <ViewCarregando /> : null}
                {erroServer ? <ViewMsgErro /> : null}
                <BuscaView onPress={() => abrirBuscador()} />
                <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={COR_TIME} qtdNum={qtdNum} />
                <Cartela dezenas={QTD_DEZENAS_TIME}
                    numerosSelecionados={numerosSelecionados}
                    salvarNumeroNaLista={salvarNumero}
                    cor={COR_TIME} />

                <ViewBotoes
                    cor={cor}
                    numJogos={arrayJogos.length}
                    estatistica={() => estatistica()}
                    limpar={() => limpar()}
                    preencherJogo={() => preencherJogo()}
                    compararJogo={() => compararJogo()} />



                <LayoutResposta>
                    <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                        <ViewText fontWeight={'bold'} cor='#FFF' value={"Jogos com 7 pontos: " + pontos7} />
                    </View>
                    <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                        <ViewText fontWeight={'bold'} cor='#FFF' value={"Jogos com 6 pontos: " + pontos6} />
                    </View>
                    <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                        <ViewText fontWeight={'bold'} cor='#FFF' value={"Jogos com 5 pontos: " + pontos5} />
                    </View>
                    <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                        <ViewText fontWeight={'bold'} cor='#FFF' value={"Jogos com 4 pontos: " + pontos4} />
                    </View>
                    <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                        <ViewText fontWeight={'bold'} cor='#FFF' value={"Jogos com 3 pontos: " + pontos3} />
                    </View>
                </LayoutResposta>
                {arrayPremiacao.length > 0 ? <ViewPremio array={arrayPremiacao} cor={cor} /> : null}

            </Layout>
            <RodapeBanner />
        </>

    );
}
