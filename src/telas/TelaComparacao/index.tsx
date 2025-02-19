import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    View,
} from 'react-native';
import {
    axiosBusca, conexao, preencher, jogoSorteados,
    salvarNumeroNaLista, gerarKey
} from '../../utils/ultil';
import Layout from '../../components/Layout';
import Cartela from '../../components/Cartela';
import { URL_BASE } from '../../constants/Constants';
import ViewCarregando from '../../Views/ViewCarregando';
import LayoutResposta from '../../components/LayoutResposta';
import TextView from '../../components/TextView';
import { useIsFocused } from '@react-navigation/native';
import { STYLES } from '../../Style';
import { ROTAS } from '../../rotas/Rotas';
import { JogoSorteado } from '../../model/jogoSorteado';
import Carregando from '../../components/Carregando';
import ViewEsconderIcone from '../../Views/ViewEsconderCartela';
import ViewMsgErro from '../../Views/ViewMsgErro';
import ViewSelecionados from '../../Views/ViewSelecionados';
import ViewPremio from '../CadastroJogo/View/ViewPremio';
import { Pontos } from '../../model/Pontos';
import ViewNumDeJogos from './Views/ViewNumDeJogos';
import ButtonView from '../../components/ButtonView';
import AllScreenBanner from '../../components/AllScreenBanner';

export default function CompararJogos({ navigation, route }) {

    const { nomeJogo } = route.params ? route.params : "";
    const { dezenas } = route.params ? route.params : "";
    const { cor } = route.params ? route.params : "";
    const { limite } = route.params ? route.params : "";
    const { minimo } = route.params ? route.params : "";
    const { pontos } = route.params ? route.params : [];
    const { dupla } = route.params ? route.params : false;
    const { milionaria } = route.params ? route.params : false;
    const [arrayPontos, setArrayPontos] = useState<Array<Pontos>>(pontos)
    const [arrayJogos, setArrayJogos] = useState([])
    const [arrayJogosSorteados, setArrayJogosSorteado] = useState(Array<JogoSorteado>)
    const [carregando, setCarregando] = useState(true)
    const [carregandoPag, setCarregandoPag] = useState(true)
    const [viewCartela, setViewCartela] = useState(true)
    const [erroServer, setErroServer] = useState(false)
    const [mostrouAdAllScreen, setMostrouAddAllScreen] = useState(false)
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

    useEffect(() => {
        // Simula que o banner foi exibido e esconde na próxima renderização
        const timer = setTimeout(() => {
            setMostrouAddAllScreen(true);
        }, 3000); // Simulação de 3 segundos para esconder o banner

        return () => clearTimeout(timer); // Limpa o timeout quando o componente desmonta
    }, []);


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

    function limparContador() {
        arrayPontos.map(item => {
            item.contador = 0
        })
    }

    function compararJogo() {
        if (numerosSelecionados.length < minimo) {
            Alert.alert("Alerta", `Favor preencher no mínimo ${minimo} dezenas`);
            return;
        }

        limparContador();
        setViewCartela(false);

        const arrayPontos2 = arrayPontos.map(item => ({ ...item })); // Criando cópia profunda
        const arrayPremiacao = [];

        arrayJogosSorteados.forEach(jogo => {
            const dezenasSorteadas = new Set(jogo.dezenas); // Transformando em Set para busca rápida
            let contador = numerosSelecionados.filter(num => dezenasSorteadas.has(num)).length;

            arrayPontos2.forEach(item => {
                if (item.ponto === contador) {
                    item.contador++;
                    if (item.mostrar) {
                        arrayPremiacao.push({ ...jogo, pontos: `${item.ponto} Acertos` });
                    }
                }
            });
        });

        setArrayPontos(arrayPontos2);
        setArrayPremiacao(arrayPremiacao);
    }



    function compararMilionaria() {
        setViewCartela(false);
        limparContador();

        let arrayPontos2 = arrayPontos.map(item => ({ ...item })); // Cópia profunda do array de pontos
        let arrayPremiacao = [];

        arrayJogosSorteados.forEach(jogo => {
            let contador = numerosSelecionados.filter(num => jogo.dezenas.includes(num)).length;
            let trevos = numerosSelecionadosTrevos.filter(num => jogo.trevos.includes(num)).length;

            let premiacaoIndex = -1;
            if (contador === 6 && trevos === 2) premiacaoIndex = 0;
            else if (contador === 6 && trevos < 2) premiacaoIndex = 1;
            else if (contador === 5 && trevos === 2) premiacaoIndex = 2;
            else if (contador === 5 && trevos < 2) premiacaoIndex = 3;
            else if (contador === 4 && trevos === 2) premiacaoIndex = 4;
            else if (contador === 4 && trevos < 2) premiacaoIndex = 5;
            else if (contador === 3 && trevos === 2) premiacaoIndex = 6;
            else if (contador === 3 && trevos === 1) premiacaoIndex = 7;
            else if (contador === 2 && trevos === 2) premiacaoIndex = 8;
            else if (contador === 2 && trevos === 1) premiacaoIndex = 9;

            if (premiacaoIndex >= 0) {
                arrayPontos2[premiacaoIndex].contador++;
                let obj = { ...jogo, pontos: jogo.premiacoes[premiacaoIndex]?.descricao };
                arrayPremiacao.push(obj);
            }
        });

        setArrayPontos(arrayPontos2);
        setArrayPremiacao(arrayPremiacao);
        setCarregando(false);
    }

    function limpar() {
        limparContador()
        setArray([])
        setQtdNum(0)
        setArrayPremiacao([])
        setViewCartela(true)
        setArrayPontos(pontos)

    }

    function salvarNumeroTrevo(numero) {

        setArrayTrevos(salvarNumeroNaLista(numero, numerosSelecionadosTrevos, 6))
        setQtdNumTrevos(numerosSelecionadosTrevos.length)
    }

    async function estatistica() {
        navigation.navigate(ROTAS.ESTATISTICA, {
            arrayJogosSorteados: arrayJogosSorteados,
            nomeJogo, cor, dezenas
        })
    }

    return (
        <>
            <Layout cor={cor}>
                {/* <StatusBarView cor={corStatus} /> */}

                {carregandoPag ? <ViewCarregando /> : null}
                {erroServer ? <ViewMsgErro /> : null}
                {carregando ? <Carregando /> : null}

                <ViewNumDeJogos numJogos={arrayJogos.length} />
                <View style={styles.content}>
                    <ButtonView onPress={() => {
                        setCarregando(true)
                        milionaria ?
                            compararMilionaria() :
                            compararJogo()
                    }} value={"Comparar"} />
                    <ButtonView onPress={preencherJogo} value={"Preencher"} />
                    <ButtonView onPress={limpar} value={"Limpar"} />

                </View>

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

            {!mostrouAdAllScreen ?
                <AllScreenBanner />
                : null

            }

        </>

    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        borderRadius: 15,
        marginVertical: 10,
        justifyContent: "space-around"
    },


})