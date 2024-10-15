import React, { useState } from 'react';
import {

    View,
} from 'react-native';

import Layout from '../components/Layout';
import Cartela from '../components/Cartela';
import { COMPARAR, LIMPAR, PRENCHER, QTD_DEZENAS_DUPLA, URL_BASE } from '../constants/Constants';
import ViewSelecionados from '../components/ViewSelecionados';
import { COR_DUPLA, COR_MEGA } from '../constants/Cores';
import ViewCarregando from '../components/ViewCarregando';
import LayoutResposta from '../components/LayoutResposta';
import ViewText from '../components/ViewText';
import { useIsFocused } from '@react-navigation/native';
import { axiosBusca, preencher, retornarDezenas, salvarNumeroNaLista } from '../utils/ultil';
import { STYLES } from '../Style';
import { ViewBotoes } from '../components/ViewBotoes';
import { ROTA_ESTATISTICA } from '../rotas/Rotas';

let contador = 0
let p6 = 0
let p5 = 0
let p4 = 0
export default function DuplaSena({ navigation }) {

    const [pontos6, setPontos6] = useState(0)
    const [pontos5, setPontos5] = useState(0)
    const [pontos4, setPontos4] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [erroServer, setErroServer] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const [numerosSelecionados, setArray] = useState([])
    const [arrayJogos, setArrayJogos] = useState([])
    const [arrayDezenas, setArrayDezenas] = useState([])
    const [arraYdezenas1, setArrayDezenas1] = useState([])
    const [arraYdezenas2, setArrayDezenas2] = useState([])

    const qtdDezenasDupla = QTD_DEZENAS_DUPLA
    const url = "duplasena"
    const cor = COR_DUPLA
    const nomeJogo = "Dupla sena"
    const limite = 12
    const dezenas = 6

    const focused = useIsFocused();

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

        if (array.length < 1) {
            setErroServer(true)
        } else {
            setErroServer(false)
        }
        dividirDezenas()
        setCarregando(false)
    }

    function salvarNNaLista(numero) {
        setArray(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)
    }

    function limpar() {
        setArray([])
        setQtdNum(0)
        setPontos4(0)
        setPontos5(0)
        setPontos6(0)
    }

    function preencherNumeros() {
        setArray(preencher(numerosSelecionados, dezenas, qtdDezenasDupla))
        setQtdNum(numerosSelecionados.length)
    }

    function dividirDezenas() {
        const array1 = []
        const array2 = []
        for (let i = 0; i < arrayDezenas.length; i++) {
            array1.push([
                arrayDezenas[i][0],
                arrayDezenas[i][1],
                arrayDezenas[i][2],
                arrayDezenas[i][3],
                arrayDezenas[i][4],
                arrayDezenas[i][5],

            ])
            array2.push([
                arrayDezenas[i][6],
                arrayDezenas[i][7],
                arrayDezenas[i][8],
                arrayDezenas[i][9],
                arrayDezenas[i][10],
                arrayDezenas[i][11],

            ])

        }

        setArrayDezenas1(array1)
        setArrayDezenas2(array2)

    }

    async function compararDuplaSena() {
        contador = 0
        p6 = 0
        p5 = 0
        p4 = 0
        await compararJogo(arraYdezenas1)
        await compararJogo(arraYdezenas2)
    }

    async function compararJogo(arrayJogo) {
        if (!arrayJogo) return
        // primeiro for para ver os jogos que ja foram sorteados 
        for (let i = 0; i < arrayJogo.length; i++) {
            // segundo for para percorrer as dezenas escolhidas pelo cliente
            for (let j = 0; j < numerosSelecionados.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado
                if (arrayJogo[i].includes(numerosSelecionados[j])) {
                    contador++
                }
            }
            // verifica se a quantidade de pontos feito pelo cliente em cada jogo 
            if (contador === 6) {
                p6++

            } else if (contador === 5) {
                p5++

            } else if (contador === 4) {
                p4++
            }
            contador = 0

        }

        setPontos6(p6)
        setPontos5(p5)
        setPontos4(p4)
        setCarregando(false)

    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }


    function preencherNumeros() {
        setArray(preencher(numerosSelecionados, dezenas, qtdDezenasDupla))
        setQtdNum(numerosSelecionados.length)
    }

    function estatistica() {
        const dezenas = qtdDezenasDupla
        navigation.navigate(ROTA_ESTATISTICA, { arrayDezenas, nomeJogo, cor, dezenas })
    }

    return (
        <Layout cor={cor}>
            {/* <StatusBar backgroundColor={corStatus}  /> */}
            {carregando ? <ViewCarregando /> : null}
            {erroServer ? <ViewMsgErro /> : null}
            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={cor} qtdNum={qtdNum} />

            <Cartela dezenas={qtdDezenasDupla}
                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNNaLista}
                cor={cor} />

            <ViewBotoes
                numJogos={arrayJogos.length}
                limpar={() => limpar()}
                estatistica={() => estatistica()}
                preencherJogo={() => preencherNumeros()}
                compararJogo={() => compararDuplaSena()}
                cor={cor}
            />

            <LayoutResposta>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor='#FFF' value={"Jogos com 6 pontos: " + pontos6} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor='#FFF' value={"Jogos com 5 pontos: " + pontos5} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor='#FFF' value={"Jogos com 4 pontos: " + pontos4} />
                </View>
            </LayoutResposta>

        </Layout>

    );
}

