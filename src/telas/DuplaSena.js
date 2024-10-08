import React, { useState } from 'react';
import {

    StyleSheet,
    View,
} from 'react-native';

import Layout from '../components/Layout';
import ViewBotao from '../components/ViewBotao';
import Cartela from '../components/Cartela';
import { COMPARAR, LIMPAR, PRENCHER, URL_BASE } from '../constants/Constants';
import ViewSelecionados from '../components/ViewSelecionados';
import { COR_DUPLA, COR_MEGA } from '../constants/Cores';
import ViewCarregando from '../components/ViewCarregando';
import LayoutResposta from '../components/Resposta';
import ViewText from '../components/ViewText';
import { useIsFocused } from '@react-navigation/native';
import { axiosBusca, preencher, salvarNumeroNaLista } from '../utils/ultil';


export default function DuplaSena({ navigation }) {

    const [pontos6, setPontos6] = useState(0)
    const [pontos5, setPontos5] = useState(0)
    const [pontos4, setPontos4] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const [numerosSelecionados, setArray] = useState([])
    const [jogos, setJogos] = useState([])

    const qtdDezenasMega = 60
    const url = "duplasena"
    const cor = COR_DUPLA
    const limite = 12
    const dezenas = 6

    const focused = useIsFocused();

    React.useEffect(() => {
        buscarJogos()
    }, [focused])

    async function buscarJogos() {
        setCarregando(true)
        if (jogos.length < 1) {
            const jogos = await axiosBusca(URL_BASE + url);
            setJogos(jogos)
        }
        setCarregando(false)
    }

    function salvarNNaLista(numero) {
        setArray(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)
    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }


    function preencherNumeros() {
        setArray(preencher(numerosSelecionados, dezenas, qtdDezenasMega))
        setQtdNum(numerosSelecionados.length)
    }

    async function compararJogo() {
        setCarregando(true)
        if (jogos.length < 1) {
            const jogos = await axiosBusca(URL_BASE + url);
            setJogos(jogos)
        }

        let contador = 0
        let pontos6 = 0
        let pontos5 = 0
        let pontos4 = 0

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
            if (contador === 6) {
                pontos6++

            } else if (contador === 5) {
                pontos5++


            } else if (contador === 4) {

                pontos4++

            }
            contador = 0

        }

        setPontos6(pontos6)
        setPontos5(pontos5)
        setPontos4(pontos4)
        setCarregando(false)

    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }


    function preencherNumeros() {
        setArray(preencher(numerosSelecionados, dezenas, qtdDezenasMega))
        setQtdNum(numerosSelecionados.length)
    }

    return (
        <Layout >
            {/* <StatusBar backgroundColor={corStatus}  /> */}
            {carregando ? <ViewCarregando /> : null}

            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={cor} qtdNum={qtdNum} />

            <Cartela dezenas={qtdDezenasMega}
                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNNaLista}
                cor={cor} />

            <View style={styles.botoes}>

                <ViewBotao value={COMPARAR} onPress={() => compararJogo()} />
                <ViewBotao value={PRENCHER} onPress={() => preencherNumeros()} />
                <ViewBotao value={LIMPAR} onPress={() => limpar()} />
            </View>

            <LayoutResposta>
                <ViewText value={"Jogos com 6 pontos: " + pontos6} />
                <ViewText value={"Jogos com 5 pontos: " + pontos5} />
                <ViewText value={"Jogos com 4 pontos: " + pontos4} />
            </LayoutResposta>

        </Layout>


    );
}

const styles = StyleSheet.create({









    botoes: {
        alignItems: 'center'
    }


});
