import React, { useRef, useState } from 'react';

import {
    Animated,
    StatusBar,
    View,

} from 'react-native';
import { axiosBusca, conexao, converterString, estatistica, gerarKey, preencher, retornarDezenas, salvarNumeroNaLista } from '../utils/ultil';
import Layout from '../components/Layout';
import { COR_LOTOFACIL } from '../constants/Cores';
import Cartela from '../components/Cartela';
import { COMPARAR, DEZENAS_LOTOFACIL, LIMPAR, PRENCHER, URL_BASE } from '../constants/Constants';
import ViewSelecionados from '../components/ViewSelecionados';
import ViewCarregando from '../components/ViewCarregando';
import LayoutResposta from '../components/LayoutResposta';
import ViewText from '../components/ViewText';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { STYLES } from '../Style';
import ViewMsgErro from '../components/ViewMsgErro';
import { ViewBotoes } from '../components/ViewBotoes';

import ItemEstatistica from '../itemsView/ItemEstatistica';
import { ROTA_ESTATISTICA, ROTA_LOTOFACIL } from '../rotas/Rotas';
const isChildVisible = true;

export default function Lotofacil({ navigation }) {
    const [pontos15, setPontos15] = useState(0)
    const [pontos14, setPontos14] = useState(0)
    const [pontos13, setPontos13] = useState(0)
    const [pontos12, setPontos12] = useState(0)
    const [pontos11, setPontos11] = useState(0)
    const [arrayJogos, setArrayJogos] = useState(Array<Object>)
    const [arrayDezenas, setArrayDezenas] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erroServer, setErroServer] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const url = "lotofacil"
    const cor = COR_LOTOFACIL
    const nomeJogo = ROTA_LOTOFACIL
    const [numerosSelecionados, setArray] = useState([])
    const focused = useIsFocused();
    const [altura, setAltura] = useState(new Animated.Value(50))

    // function animar() {
    //     Animated.timing(
    //         altura,
    //         {
    //             useNativeDriver: false,
    //             toValue: 800,
    //             duration: 2000

    //         }
    //     ).start()

    // }

    // function recolher() {
    //     Animated.timing(
    //         altura,
    //         {
    //             useNativeDriver: false,
    //             toValue: 0,
    //             duration: 2000

    //         }
    //     ).start()

    // }


    React.useEffect(() => {
        buscarJogos()

    }, [focused])

    async function buscarJogos() {
        let array: Array<Object> = arrayJogos
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


    const qtdDezenasLotofacil = 25
    const limite = 18
    const dezenas = 15

    function salvarNumero(numero) {
        setArray(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)
    }





    function preencherJogo() {
        setArray(preencher(numerosSelecionados, dezenas, qtdDezenasLotofacil,))
        setQtdNum(numerosSelecionados.length)
    }

    async function compararJogo() {
        let contador = 0
        let pontos15 = 0
        let pontos14 = 0
        let pontos13 = 0
        let pontos12 = 0
        let pontos11 = 0

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
            if (contador === 15) {
                pontos15++

            } else if (contador === 14) {
                pontos14++

            } else if (contador === 13) {
                pontos13++

            } else if (contador === 12) {
                pontos12++

            } else if (contador === 11) {
                pontos11++

            }
            contador = 0
        }

        setPontos15(pontos15)
        setPontos14(pontos14)
        setPontos13(pontos13)
        setPontos12(pontos12)
        setPontos11(pontos11)
        setPontos11(pontos11)
        setPontos11(pontos11)
        setCarregando(false)

    }

    function limpar() {
        setArray([])
        setQtdNum(0)
        setPontos15(0)
        setPontos14(0)
        setPontos13(0)
        setPontos12(0)
        setPontos11(0)
    }

    async function estatistica() {
        const dezenas = qtdDezenasLotofacil
        await navigation.navigate(ROTA_ESTATISTICA, { arrayDezenas, nomeJogo, cor, dezenas })
    }

    return (
        <Layout>
            {/* <StatusBar backgroundColor={corStatus} /> */}
            {carregando ? <ViewCarregando /> : null}
            {erroServer ? <ViewMsgErro /> : null}

            {/* <Animated.View
                style={{ height: altura }}
            >
                {arrayJogos.length > 0? arrayJogos.map((item, i) => {
                    if (i >= 3) return
                    return (
                        <ItemResultados key={gerarKey()} item={item} cor={cor} />
                    )
                }) : null}
            </Animated.View>

            <Button title='animar' onPress={animar} />
            <Button title='recoclher' onPress={recolher} /> */}

            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={COR_LOTOFACIL} qtdNum={qtdNum} />
            <Cartela
                dezenas={qtdDezenasLotofacil}
                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNumero}
                cor={cor} />
            <ViewBotoes
                numJogos={arrayJogos.length}
                limpar={() => limpar()}
                estatistica={() => estatistica()}
                preencherJogo={() => preencherJogo()}
                compararJogo={() => compararJogo()}
                cor={cor}
            />

            <LayoutResposta>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor="#FFF" value={"Jogos com 15 pontos: " + pontos15} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor="#FFF" value={"Jogos com 14 pontos: " + pontos14} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor="#FFF" value={"Jogos com 13 pontos: " + pontos13} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor="#FFF" value={"Jogos com 12 pontos: " + pontos12} />
                </View>
                <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]}>
                    <ViewText cor="#FFF" value={"Jogos com 11 pontos: " + pontos11} />
                </View>
            </LayoutResposta>

        </Layout>

    );
}
