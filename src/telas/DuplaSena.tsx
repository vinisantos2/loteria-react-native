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
import { axiosBusca, conexao, preencher, jogoSorteados, salvarNumeroNaLista } from '../utils/ultil';
import { STYLES } from '../Style';
import { ViewBotoes } from '../components/ViewBotoes';
import { ROTA_ESTATISTICA } from '../rotas/Rotas';
import ViewMsgErro from '../components/ViewMsgErro';
import { Premio } from '../model/Premio';
import ViewPremio from '../components/ViewPremio';
import { JogoSorteado } from '../model/jogoSorteado';

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
    const [arrayJogosSorteados, setArrayJogosSorteado] = useState(Array<JogoSorteado>)
    const [arraYdezenas1, setArrayDezenas1] = useState(Array<JogoSorteado>)
    const [arraYdezenas2, setArrayDezenas2] = useState(Array<JogoSorteado>)
    const qtdDezenasDupla = QTD_DEZENAS_DUPLA
    const url = "duplasena"
    const cor = COR_DUPLA
    const nomeJogo = "Dupla sena"
    const limite = 12
    const dezenas = 6
    const focused = useIsFocused();
    const [arrayPremiacao, setArrayPremiacao] = useState(Array<Premio>)

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
        setArrayPremiacao([])
    }

    function preencherNumeros() {
        setArray(preencher(numerosSelecionados, dezenas, qtdDezenasDupla))
        setQtdNum(numerosSelecionados.length)
    }

    function teste(array: Array<JogoSorteado>, dezenas1: boolean) {

        const arrayJogos: Array<JogoSorteado> = []
        array.map(item => {
            const data = item.data
            const concurso = item.concurso
            const dezenas: Array<String> = []
            item.dezenas.map((numero, i = 0) => {
                if (dezenas1) {
                    if (i < 6) {
                        dezenas.push(numero)
                    }

                } else {
                    if (i > 5 && i < 12)
                        dezenas.push(numero)
                }

            })

            const obj = new JogoSorteado(dezenas, concurso, data, [])
            arrayJogos.push(obj)


        })

        return arrayJogos
    }

    async function dividirDezenas(array: Array<JogoSorteado>) {
        const array1: Array<JogoSorteado> = await teste(array, true)
        const array2: Array<JogoSorteado> = await teste(array, false)
        setArrayDezenas1(array1)
        setArrayDezenas2(array2)

    }

    async function compararDuplaSena() {
        contador = 0
        p6 = 0
        p5 = 0
        p4 = 0

        compararJogo(arraYdezenas1)
        compararJogo(arraYdezenas2)
    }

    async function compararJogo(arrayJogo: Array<JogoSorteado>) {

        if (arrayJogo.length < 1) return

        // primeiro for para ver os jogos que ja foram sorteados 
        for (let i = 0; i < arrayJogo.length; i++) {
            // segundo for para percorrer as dezenas escolhidas pelo cliente
            for (let j = 0; j < numerosSelecionados.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado
                if (arrayJogo[i].dezenas.includes(numerosSelecionados[j])) {
                    contador++
                }
            }
            // verifica se a quantidade de pontos feito pelo cliente em cada jogo 
            if (contador === 6) {
                p6++
                const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '6'
                )
                arrayPremiacao.push(obj)

            } else if (contador === 5) {
                p5++
                const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '5'
                )
                arrayPremiacao.push(obj)

            } else if (contador === 4) {
                p4++
                const obj = new Premio(arrayJogosSorteados[i].data,
                    arrayJogosSorteados[i].concurso,
                    '4'
                )
                arrayPremiacao.push(obj)
            }
            contador = 0

        }

        setPontos6(p6)
        setPontos5(p5)
        setPontos4(p4)
        setArrayPremiacao(arrayPremiacao)
        setCarregando(false)

    }

    function estatistica() {
        const dezenas = qtdDezenasDupla
        navigation.navigate(ROTA_ESTATISTICA, { arrayJogosSorteados: arrayJogosSorteados, nomeJogo, cor, dezenas })
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

            {arrayPremiacao.length > 0 ? <ViewPremio array={arrayPremiacao} cor={cor} /> : null}


        </Layout>

    );
}

