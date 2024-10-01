import React, { useState } from 'react';

import {
    StyleSheet, View
} from 'react-native';
import Cartela from '../components/Cartela';
import ViewBotao from '../components/ViewBotao';
import { COR_MILIONARIA, COR_QUINA, COR_TIME } from '../constants/Cores';
import Layout from '../components/Layout';
import ViewSelecionados from '../components/ViewSelecionados';
import { COMPARAR, LIMPAR, PRENCHER, QTD_DEZENAS_MILIONARIA, QTD_DEZENAS_QUINA, URL_BASE } from '../constants/Constants';
import ViewCarregando from '../components/ViewCarregando';
import LayoutResposta from '../components/Resposta';
import ViewText from '../components/ViewText';
import { useIsFocused } from '@react-navigation/native';
import { axiosBusca, preencher, salvarNumeroNaLista } from '../utils/ultil';



export default function MaisMilionaria({ navigation }) {

    const [pontos3, setPontos3] = useState(0)
    const [pontos4, setPontos4] = useState(0)
    const [pontos5, setPontos5] = useState(0)
    const [pontos6, setPontos6] = useState(0)
    const [pontos7, setPontos7] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const [jogos, setJogos] = useState([])
    const limite = 12
    const dezenas = 6
    const url = "timeMania"
    const focused = useIsFocused();
    const [corStatus, setCorStatus] = useState("#FFF")

    React.useEffect(() => {
        buscarJogos()
    }, [focused])

    const [numerosSelecionados, setArray] = useState([])
    function salvarNumero(numero) {
        setArray(salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)

    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }


    function preencherJogo() {
        setArray(preencher(numerosSelecionados, dezenas, QTD_DEZENAS_MILIONARIA))
        setQtdNum(numerosSelecionados.length)
    }

    async function buscarJogos() {
        setCarregando(true)
        if (jogos.length < 1) {
            //const jogos = await axiosBusca(URL_BASE + url);
            setJogos(jogos)
        }

        setCarregando(false)
    }


    async function compararJogo() {

        let contador = 0
        let pontos7 = 0
        let pontos6 = 0
        let pontos5 = 0
        let pontos4 = 0
        let pontos3 = 0

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
            if (contador === 7) {
                pontos7++

            } else if (contador === 6) {
                pontos6++
            } else if (contador === 5) {
                pontos5++

            } else if (contador === 4) {
                pontos4++

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
        setCarregando(false)

    }

    return (
        <Layout>
            {/* <StatusBar backgroundColor={corStatus} animated={true} /> */}
            <ViewCarregando carregando={carregando} />
            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={COR_MILIONARIA} qtdNum={qtdNum} />
            <Cartela dezenas={QTD_DEZENAS_MILIONARIA}

                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNumero}
                cor={COR_MILIONARIA} />

            <View style={styles.botoes}>
                <ViewCarregando carregando={carregando} />

                <ViewBotao value={COMPARAR} onPress={() => compararJogo()} />
                <ViewBotao value={PRENCHER} onPress={() => preencherJogo()} />
                <ViewBotao value={LIMPAR} onPress={() => limpar()} />

            </View>



            <LayoutResposta>
                <ViewText value={"Jogos com 7 pontos: " + pontos7} />
                <ViewText value={"Jogos com 6 pontos: " + pontos6} />
                <ViewText value={"Jogos com 5 pontos: " + pontos5} />
                <ViewText value={"Jogos com 4 pontos: " + pontos4} />
                <ViewText value={"Jogos com 3 pontos: " + pontos4} />

            </LayoutResposta>

        </Layout>


    );
}

const styles = StyleSheet.create({
    botoes: {
        alignItems: 'center'
    }


});
