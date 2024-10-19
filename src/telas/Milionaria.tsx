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
import { axiosBusca, jogoSorteados, preencher, salvarNumeroNaLista } from '../utils/ultil';
import ViewMsgErro from '../components/ViewMsgErro';
import { STYLES } from '../Style';
import { ViewBotoes } from '../components/ViewBotoes';
import { ROTA_ESTATISTICA, ROTA_MILIONARIA } from '../rotas/Rotas';
import { Premio } from '../model/Premio';
import ViewPremio from '../components/ViewPremio';

export default function MaisMilionaria({ navigation }) {

    const [pontos6e2trevos, setPontos6e2trevos] = useState(0)
    const [pontos6e1trevo, setPontos6e1trevos] = useState(0)
    const [pontos5e2trevos, setPontos5e2trevos] = useState(0)
    const [pontos5e1trevos, setPontos5e1trevos] = useState(0)
    const [pontos4e2trevos, setPontos4e2trevos] = useState(0)
    const [pontos4e1trevos, setPontos4e1trevos] = useState(0)
    const [pontos3e2trevos, setPontos3e2trevos] = useState(0)
    const [pontos3e1trevos, setPontos3e1trevos] = useState(0)
    const [pontos2e2trevos, setPontos2e2trevos] = useState(0)
    const [pontos2e1trevos, setPontos2e1trevos] = useState(0)

    const [carregando, setCarregando] = useState(false)
    const [erroServer, setErroServer] = useState(false)
    const [arrayPremiacao, setArrayPremiacao] = useState(Array<Premio>)
    const [qtdNum, setQtdNum] = useState(0)
    const [qtdNumTrevos, setQtdNumTrevos] = useState(0)
    const [arrayJogos, setArrayJogos] = useState([])
    const limite = 12
    const dezenas = 6
    const url = "maismilionaria"
    const focused = useIsFocused();
    const [arrayJogosSorteados, setArrayJogosSorteado] = useState(Array<JogoSorteado>)
    const cor = COR_MILIONARIA
    const nomeJogo = ROTA_MILIONARIA
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
        setPontos6e2trevos(0)
        setPontos6e1trevos(0)
        setPontos5e2trevos(0)
        setPontos5e1trevos(0)
        setPontos4e2trevos(0)
        setPontos4e1trevos(0)
        setPontos3e2trevos(0)
        setPontos3e1trevos(0)
        setPontos2e2trevos(0)
        setPontos2e1trevos(0)
    }

    function preencherJogo() {
        setArray(preencher(numerosSelecionados, dezenas, QTD_DEZENAS_MILIONARIA))
        setQtdNum(numerosSelecionados.length)
    }

    async function compararJogo() {
        let contador = 0
        let trevos = 0
        const arrayPremiacao = new Array<Premio>

        let pontos6e2trevos = 0
        let pontos6e1trevos = 0
        let pontos5e2trevos = 0
        let pontos5e1trevos = 0
        let pontos4e2trevos = 0
        let pontos4e1trevos = 0
        let pontos3e2trevos = 0
        let pontos3e1trevos = 0
        let pontos2e2trevos = 0
        let pontos2e1trevos = 0

        // primeiro for para ver os jogos que ja foram sorteados 
        for (let i = 0; i < arrayJogos.length; i++) {

            // segundo for para percorrer as dezenas escolhidas pelo cliente
            for (let j = 0; j < numerosSelecionados.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado
                if (arrayJogosSorteados[i].dezenas.includes(numerosSelecionados[j])) {
                    contador++
                }
            }
            for (let j = 0; j < numerosSelecionadosTrevos.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado
                if (arrayJogosSorteados[i].trevos.includes(numerosSelecionadosTrevos[j])) {
                    trevos++
                }
            }
            // verifica se a quantidade de pontos feito pelo cliente em cada jogo 
            if (contador === 6 && trevos === 2) {
                pontos6e2trevos++
                const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '6 pontos e 2 trevos'
                )
                arrayPremiacao.push(obj)
            } else if (contador === 6 && trevos < 2) {
                pontos6e1trevos++
                const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '6 pontos e 1 ou 0 trevo'
                )
                arrayPremiacao.push(obj)
            } else if (contador === 5 && trevos === 2) {
                pontos5e2trevos++
                const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '5 pontos e 2 trevos'
                )
                arrayPremiacao.push(obj)
            } else if (contador === 5 && trevos < 2) {
                pontos5e1trevos++
                const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '5 pontos e 1 ou 0 trevo'
                )
                arrayPremiacao.push(obj)
            } else if (contador === 4 && trevos === 2) {
                pontos4e2trevos++
                const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '4 pontos e 2 trevos'
                )
                arrayPremiacao.push(obj)
            } else if (contador === 4 && trevos < 2) {
                pontos4e1trevos++
                const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '4 pontos e 1 ou 0 trevo'
                )
                arrayPremiacao.push(obj)
            } else if (contador === 3 && trevos === 2) {
                pontos3e2trevos++
                const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '3 pontos e 2 trevos'
                )
                arrayPremiacao.push(obj)
            } else if (contador === 3 && trevos === 1) {
                pontos3e1trevos++
                 const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '3 pontos e 1 trevo'
                )
                arrayPremiacao.push(obj)
            } else if (contador === 2 && trevos === 2) {
                pontos2e2trevos++
            } else if (contador === 2 && trevos === 1) {
                pontos2e1trevos++
            }

            contador = 0
            trevos = 0

        }


        setPontos6e2trevos(pontos6e2trevos)
        setPontos6e1trevos(pontos6e1trevos)
        setPontos5e2trevos(pontos5e2trevos)
        setPontos5e1trevos(pontos5e1trevos)
        setPontos4e2trevos(pontos4e2trevos)
        setPontos4e1trevos(pontos4e1trevos)
        setPontos3e2trevos(pontos3e2trevos)
        setPontos3e1trevos(pontos3e1trevos)
        setPontos2e2trevos(pontos2e2trevos)
        setPontos2e1trevos(pontos2e1trevos)
        setArrayPremiacao(arrayPremiacao)
        setCarregando(false)

    }

    function estatistica() {
        const dezenas = QTD_DEZENAS_MILIONARIA

        navigation.navigate(ROTA_ESTATISTICA, {  arrayJogosSorteados: arrayJogosSorteados, nomeJogo, cor, dezenas })
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

            />
            <View style={{ alignItems: 'center' }}>
                <ViewText fontSize={25} value={"Dezenas"} cor='#FFF' fontWeight={"bold"} />
            </View>
            <Cartela
                dezenas={QTD_DEZENAS_MILIONARIA}
                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNumero}
                cor={COR_MILIONARIA} />

            <ViewBotoes
                numJogos={arrayJogos.length}
                estatistica={() => estatistica()}
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
                    <ViewText cor={COR_BRANCO} value={"Jogos com 6 pontos e 1 ou 0 trevo: " + pontos6e1trevo} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 5 pontos e 2 trevos: " + pontos5e2trevos} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 5 pontos e 1 ou 0 trevo: " + pontos5e1trevos} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 4 pontos e 2 trevo: " + pontos4e2trevos} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 4 pontos e 1 ou 0 trevo: " + pontos4e1trevos} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 3 pontos e 2 trevos: " + pontos3e2trevos} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 3 pontos e 1 trevo: " + pontos3e1trevos} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 2 pontos e 2 trevos: " + pontos2e2trevos} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor={COR_BRANCO} value={"Jogos com 2 pontos e 1 trevo: " + pontos2e1trevos} />
                </View>
            </LayoutResposta>

            {arrayPremiacao.length > 0 ? <ViewPremio array={arrayPremiacao} cor={cor} /> : null}

        </Layout>


    );
}
