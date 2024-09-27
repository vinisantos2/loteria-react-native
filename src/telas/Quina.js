import { useState } from 'react';

import {
    StyleSheet, View
} from 'react-native';
import Jogos from '../utils/Jogos';
import Cartela from '../components/Cartela';
import ViewBotao from '../components/ViewBotao';
import { COR_QUINA } from '../constants/Cores';
import Layout from '../components/Layout';
import ViewSelecionados from '../components/ViewSelecionados';
import { COMPARAR, LIMPAR, PRENCHER, QTD_DEZENAS_QUINA, URL_BASE } from '../constants/Constants';
import ViewCarregando from '../components/ViewCarregando';
import LayoutResposta from '../components/Resposta';
import ViewText from '../components/ViewText';

let jogos = []

export default function Quina({ navigation }) {
    console.log(jogos)
    const [pontos2, setPontos2] = useState(0)
    const [pontos3, setPontos3] = useState(0)
    const [pontos4, setPontos4] = useState(0)
    const [pontos5, setPontos5] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [ativo, setAtivo] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const limite = 8
    const dezenas = 5
    const url = "quina"

    const array =
    {
        "2": 3,
        "4": 3,
        "5": 3,
        "8": 3
    }



    const [numerosSelecionados, setArray] = useState([])
    const cor = "#2A2DA8"

    const jogo = new Jogos()

    function salvarNumeroNaLista(numero) {
        setArray(jogo.salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)

    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }


    function preencher() {
        setArray(jogo.preencher(numerosSelecionados, dezenas, QTD_DEZENAS_QUINA))
        setQtdNum(numerosSelecionados.length)
    }


    async function compararJogo() {
        setCarregando(true)

        if (jogos.length < 1) {
            jogos = await jogo.buscarDados(URL_BASE + url);
        }

        let contador = 0
        let pontos5 = 0
        let pontos4 = 0
        let pontos3 = 0
        let pontos2 = 0

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
            if (contador === 5) {
                pontos5++

            } else if (contador === 4) {
                pontos4++


            } else if (contador === 3) {

                pontos3++

            } else if (contador === 2) {

                pontos2++

            }

            contador = 0


        }
        setPontos5(pontos5)
        setPontos4(pontos4)
        setPontos3(pontos3)
        setPontos2(pontos2)
        setCarregando(false)

    }

    return (
        <Layout>

            <ViewCarregando carregando={carregando} />
            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={COR_QUINA} qtdNum={qtdNum} />


            <Cartela dezenas={QTD_DEZENAS_QUINA}
                jogo={jogo}
                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNumeroNaLista}
                cor={cor} />

            <View style={styles.botoes}>
                <ViewCarregando carregando={carregando} />

                <ViewBotao value={COMPARAR} onPress={() => compararJogo()} />
                <ViewBotao value={PRENCHER} onPress={() => preencher()} />
                <ViewBotao value={LIMPAR} onPress={() => limpar()} />

            </View>



            <LayoutResposta>
                <ViewText value={"Jogos com 5 pontos: " + pontos5} />
                <ViewText value={"Jogos com 4 pontos: " + pontos4} />
                <ViewText value={"Jogos com 3 pontos: " + pontos3} />
                <ViewText value={"Jogos com 2 pontos: " + pontos2} />


            </LayoutResposta>

        </Layout>


    );
}

const styles = StyleSheet.create({
    botoes: {
        alignItems: 'center'
    }


});
