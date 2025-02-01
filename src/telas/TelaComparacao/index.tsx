import React, { useState } from 'react';
import {
    Alert,
    View,
} from 'react-native';
import { axiosBusca, conexao, preencher, jogoSorteados, salvarNumeroNaLista, gerarKey } from '../../utils/ultil';
import Layout from '../../components/Layout';
import Cartela from '../../components/Cartela';
import { URL_BASE } from '../../constants/Constants';
import ViewCarregando from '../../Views/ViewCarregando';
import LayoutResposta from '../../components/LayoutResposta';
import TextView from '../../components/TextView';
import { useIsFocused } from '@react-navigation/native';
import { STYLES } from '../../Style';
import { ViewBotoes } from './Views/ViewBotoes';
import { ROTA_ESTATISTICA, ROTA_LOTOFACIL } from '../../rotas/Rotas';
import { JogoSorteado } from '../../model/jogoSorteado';
import Carregando from '../../components/Carregando';
import ViewEsconderIcone from '../../Views/ViewEsconderCartela';
import AllSCreenBanner from '../../components/AllScreenBanner';
import { salvarData } from '../../db/AsyncStorage';
import { JogoSalvo } from '../../model/JogoSalvo';
import ViewMsgErro from '../../Views/ViewMsgErro';
import ViewSelecionados from '../../Views/ViewSelecionados';
import ViewPremio from '../CadastroJogo/View/ViewPremio';
import { Pontos } from '../../model/Pontos';
import ViewNumDeJogos from './Views/ViewNumDeJogos';

export default function CompararJogos({ navigation, route }) {

    const { nomeJogo } = route.params ? route.params : "";
    const { dezenas } = route.params ? route.params : "";
    const { cor } = route.params ? route.params : "";
    const { limite } = route.params ? route.params : "";
    const { minimo } = route.params ? route.params : "";
    const { pontos } = route.params ? route.params : [];
    const { trevos } = route.params ? route.params : [];
    const { dupla } = route.params ? route.params : false;
    const { milionaria } = route.params ? route.params : false;
    const [arrayPontos, setArrayPontos] = useState<Array<Pontos>>(pontos)
    const [arrayTrevosPontos, setArrayTrevosPontos] = useState<Array<Pontos>>(trevos)
    const [arrayJogos, setArrayJogos] = useState([])
    const [arrayJogosSorteados, setArrayJogosSorteado] = useState(Array<JogoSorteado>)
    const [carregando, setCarregando] = useState(true)
    const [carregandoPag, setCarregandoPag] = useState(true)
    const [viewCartela, setViewCartela] = useState(true)
    const [erroServer, setErroServer] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const [numerosSelecionados, setArray] = useState([])
    const [numerosSelecionadosTrevos, setArrayTrevos] = useState([])
    const isFocused = useIsFocused();
    const [arrayPremiacao, setArrayPremiacao] = useState(Array<JogoSorteado>)
    const [qtdNumTrevos, setQtdNumTrevos] = useState(0)

    React.useEffect(() => {
        buscarJogos()
        // mudaCorStatus()
        if (!isFocused) {
        }
    }, [isFocused])
    React.useEffect(() => {
        setCarregando(false)
    }, [carregando])


    async function buscarJogos() {
        let array = arrayJogos
        setCarregando(true)
        if (arrayJogos.length < 1) {
            array = await axiosBusca(URL_BASE + nomeJogo);
            const arrayJogos: Array<JogoSorteado> = await jogoSorteados(array)
            setArrayJogosSorteado(arrayJogos)
            setArrayJogos(array)
            if (dupla) {
                dividirDezenas(arrayJogos)
            }
        }
        setErroServer(conexao(array))
        setCarregandoPag(false)
        setCarregando(false)
    }

    function salvarNumero(numero) {
        setArray(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)
    }

    function preencherJogo() {
        setArray(preencher(numerosSelecionados, minimo, dezenas))
        setQtdNum(numerosSelecionados.length)
    }


    function dividirDezenas(array: Array<JogoSorteado>) {
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
        if (numerosSelecionados.length < minimo) {
            Alert.alert("Alerta", "Favor preencher no mínimo " + minimo + " dezenas")
            return
        }
        limparContador()
        setViewCartela(false)
        const arrayPontos2 = arrayPontos
        const arrayPremiacao = new Array<JogoSorteado>
        let contador = 0
        let trevos = 0
        // primeiro for para ver os jogos que ja foram sorteados 
        for (let i = 0; i < arrayJogosSorteados.length; i++) {
            // segundo for para percorrer as dezenas escolhidas pelo cliente
            for (let j = 0; j < numerosSelecionados.length; j++) {
                //verifica se a dezena escolhida pelo cliente existe no jogo ja sorteado
                if (arrayJogosSorteados[i].dezenas.includes(numerosSelecionados[j])) {
                    contador++
                }
            }


            arrayPontos2.map(item => {
                if (item.ponto === contador) {
                    item.contador++
                    if (item.mostrar) {
                        const obj = arrayJogosSorteados[i]
                        obj.pontos = item.ponto + " Acertos"
                        arrayPremiacao.push(obj)
                    }

                }
            })
            contador = 0

        }
        console.log(arrayPontos2)
        setArrayPontos(arrayPontos)
        setArrayPremiacao(arrayPremiacao)
    }

    function limparContador() {
        arrayPontos.map(item => {
            item.contador = 0
        })
    }



    async function compararMilionaria() {
        setViewCartela(false)
        let contador = 0
        let trevos = 0
        limparContador()
        const arrayPontos2 = arrayPontos

        const arrayPremiacao = new Array<JogoSorteado>

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
                arrayPontos2[0].contador++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[0].descricao
                arrayPremiacao.push(obj)
            } else if (contador === 6 && trevos < 2) {
                arrayPontos2[1].contador++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[1].descricao
                arrayPremiacao.push(obj)
            } else if (contador === 5 && trevos === 2) {
                arrayPontos2[2].contador++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[2].descricao
                arrayPremiacao.push(obj)
            } else if (contador === 5 && trevos < 2) {
                arrayPontos2[3].contador++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[3].descricao
                arrayPremiacao.push(obj)

            } else if (contador === 4 && trevos === 2) {
                arrayPontos2[4].contador++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[4].descricao
                arrayPremiacao.push(obj)
            } else if (contador === 4 && trevos < 2) {
                arrayPontos2[5].contador++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[5].descricao
                arrayPremiacao.push(obj)
            } else if (contador === 3 && trevos === 2) {
                arrayPontos2[6].contador++
                const obj = arrayJogosSorteados[i]
                obj.pontos = obj.premiacoes[6].descricao
                arrayPremiacao.push(obj)
            } else if (contador === 3 && trevos === 1) {
                arrayPontos2[7].contador++
            } else if (contador === 2 && trevos === 2) {
                arrayPontos2[8].contador++
            } else if (contador === 2 && trevos === 1) {
                arrayPontos2[9].contador++
            }
            contador = 0
            trevos = 0

            setArrayPontos(arrayPontos2)
            setArrayPremiacao(arrayPremiacao)

        }

        setArrayPremiacao(arrayPremiacao)
        setCarregando(false)

    }

    function limpar() {
        limparContador()
        setArray([])
        setQtdNum(0)
        setArrayPremiacao([])
        setViewCartela(true)
        setArrayPontos(pontos)
        console.log(pontos)
    }

    function salvarNumeroTrevo(numero) {

        setArrayTrevos(salvarNumeroNaLista(numero, numerosSelecionadosTrevos, 6))
        setQtdNumTrevos(numerosSelecionadosTrevos.length)
    }

    async function estatistica() {
        navigation.navigate(ROTA_ESTATISTICA, {
            arrayJogosSorteados: arrayJogosSorteados,
            nomeJogo, cor, dezenas
        })
    }

    function salvar() {

        const jogoSalvo = new JogoSalvo
        jogoSalvo.dezenas = numerosSelecionados
        jogoSalvo.id = gerarKey()
        jogoSalvo.nome = "Lotofacil"
        salvarData(jogoSalvo, jogoSalvo.id)
    }

    return (
        <>

            <Layout cor={cor}>
                {/* <StatusBarView cor={corStatus} /> */}

                {carregandoPag ? <ViewCarregando /> : null}
                {erroServer ? <ViewMsgErro /> : null}
                {carregando ? <Carregando /> : null}

                <ViewNumDeJogos numJogos={arrayJogos.length} cor={cor} />
                <ViewSelecionados
                    numerosSelecionados={numerosSelecionados}
                    qtdNum={qtdNum}
                />

                {milionaria ? <Cartela
                    dezenas={6}
                    tervo={true}
                    numerosSelecionados={numerosSelecionadosTrevos}
                    salvarNumeroNaLista={salvarNumeroTrevo}
                    cor={cor}
                /> : null}


                {viewCartela ? <Cartela
                    dezenas={dezenas}
                    numerosSelecionados={numerosSelecionados}
                    salvarNumeroNaLista={salvarNumero}
                    cor={cor} /> : null}

                <ViewEsconderIcone valor={viewCartela ? "Esconder cartela" : "Mostrar cartela"} setViewCartela={setViewCartela} viewCartela={viewCartela} />

                <ViewBotoes

                    limpar={() => limpar()}
                    estatistica={() => estatistica()}
                    preencherJogo={() => preencherJogo()}
                    compararJogo={() => {
                        setCarregando(true)
                        pontos[0].trevo ? compararMilionaria() : compararJogo()
                    }}
                />

                {carregando ? <Carregando /> : null}

                <LayoutResposta>

                    {arrayPontos.map(item => {
                        return (
                            <View style={[STYLES.itemPremiacao, { backgroundColor: cor }]} key={gerarKey()}>
                                <TextView value={item.desc} />
                                <TextView value={" Acertos: " + item.contador} />

                            </View>)
                    })}
                </LayoutResposta>

                {arrayPremiacao.length > 0 ? <ViewPremio
                    arrayDezenas={numerosSelecionados}
                    array={arrayPremiacao}
                    arrayTrevosSelecionados={numerosSelecionadosTrevos}
                    cor={cor}
                /> : null}

            </Layout>

            <AllSCreenBanner />

        </>

    );
}
