import React, { useEffect } from "react";
import { Alert } from "react-native";
import Layout from "../../components/Layout";
import Cartela from "../../components/Cartela";
import { useState } from "react";
import { gerarKey, preencher, salvarNumeroNaLista } from "../../utils/ultil";
import { JogoSalvo } from "../../model/JogoSalvo";
import { salvarData } from "../../db/AsyncStorage";
import { useNavigation } from "@react-navigation/native";
import ViewSelecionados from "../../Views/ViewSelecionados";
import View2Botoes from "../../Views/View2BotoesT";
import Toast from 'react-native-simple-toast';

export default function CadastroJogo({ route }) {
    const { jogo } = route.params ? route.params : "";
    const jogoSalvo: JogoSalvo = jogo
    const { dezenas } = route.params ? route.params : "";
    const { limite } = route.params ? route.params : "";
    const { cor } = route.params ? route.params : "";
    const { nomeJogo } = route.params ? route.params : "";
    const { minimo } = route.params ? route.params : 0;
    const { milionaria } = route.params ? route.params : false;
    const [qtdNum, setQtdNum] = useState(0)
    const [numerosSelecionados, setArrayNumerosSelecionados] = useState([])
    const [numerosSelecionadosTrevos, setArrayTrevos] = useState([])
    const [qtdNumTrevos, setQtdNumTrevos] = useState(0)
    const nav = useNavigation()

    useEffect(() => {
        buscarDados()

    })

    function buscarDados() {

        if (jogoSalvo) {
            setArrayNumerosSelecionados(jogoSalvo.dezenas)
            setArrayTrevos(jogoSalvo.trevos)
            setQtdNum(numerosSelecionados.length)
        }

    }

    function salvarNumero(numero) {
        setArrayNumerosSelecionados(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)
    }

    function verificaDezenasMinima() {
        if (numerosSelecionados.length < minimo) {
            return true
        } else {
            return false
        }

    }

    function salvarNumeroTrevo(numero) {

        setArrayTrevos(salvarNumeroNaLista(numero, numerosSelecionadosTrevos, 6))
        setQtdNumTrevos(numerosSelecionadosTrevos.length)
    }

    function salvar() {

        if (verificaDezenasMinima()) {
            Alert.alert("Dezenas", "Quantidade de dezenas minima é: " + minimo)
            return
        }

        const jogoSalvo = new JogoSalvo
        jogoSalvo.dezenas = numerosSelecionados
        jogoSalvo.trevos = numerosSelecionadosTrevos
        jogoSalvo.id = gerarKey()
        jogoSalvo.nome = nomeJogo
        salvarData(jogoSalvo, jogoSalvo.id)
        limpar()
        Toast.show("Jogo salvo", 3);
    }

    function limpar() {
        setArrayNumerosSelecionados([])
        setQtdNum(0)
    }

    function editar() {
        if (verificaDezenasMinima()) {
            Alert.alert("Dezenas", "Quantidade de dezenas minima é: " + minimo)
            return
        }
        jogoSalvo.dezenas = numerosSelecionados
        jogoSalvo.trevos = numerosSelecionadosTrevos
        salvarData(jogoSalvo, jogoSalvo.id)
        limpar()
        Toast.show("Jogo atualizado", 3);
        nav.goBack()
    }

    function preencherJogo() {
        setArrayNumerosSelecionados(preencher(numerosSelecionados, minimo, dezenas))
        setQtdNum(numerosSelecionados.length)
    }

    return (

        <Layout >
            <ViewSelecionados
                numerosSelecionados={numerosSelecionados}
                qtdNum={qtdNum} />

            {milionaria ? <Cartela
                dezenas={6}
                tervo={true}
                numerosSelecionados={numerosSelecionadosTrevos}
                salvarNumeroNaLista={salvarNumeroTrevo}
                cor={cor}
            /> : null}
            <Cartela
                dezenas={dezenas}
                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNumero}
                cor={cor} />

            <View2Botoes
                onPress1={preencherJogo}
                txt1={"Preencher"}
                onPress2={jogoSalvo ? editar : salvar}
                txt2={jogoSalvo ? "Editar" : "Salvar"}
            />

        </Layout>

    )
}