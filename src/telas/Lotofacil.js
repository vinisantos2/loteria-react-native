import { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,

} from 'react-native';
import Botao from '../components/Botao';
import Jogos from '../utils/Jogos';
import Layout from '../components/Layout';
import { COR_FUNDO_CARTELA, COR_LOTOFACIL } from '../constants/Cores';
import Cartela from '../components/Cartela';
import ViewBotao from '../components/ViewBotao';
import { COMPARAR, LIMPAR, PRENCHER, URL_BASE } from '../constants/Constants';
import ViewSelecionados from '../components/ViewSelecionados';
import ViewCarregando from '../components/ViewCarregando';




export default function Lotofacil({ navigation }) {

    const [arrayResposta] = useState([])
    const [pontos15, setPontos15] = useState(0)
    const [pontos14, setPontos14] = useState(0)
    const [pontos13, setPontos13] = useState(0)
    const [pontos12, setPontos12] = useState(0)
    const [pontos11, setPontos11] = useState(0)
    const [jogos, setJogos] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const url = "lotofacil"
    const cor = "#A8358E"
    const [numerosSelecionados, setArray] = useState([])


    const jogo = new Jogos()

    const qtdDezenasLotofacil = 25


    const limite = 18
    const dezenas = 15

    function salvarNumeroNaLista(numero) {
        setArray(jogo.salvarNumeroNaLista(numero, numerosSelecionados, limite))
        setQtdNum(numerosSelecionados.length)

    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }


    function preencher() {
        setArray(jogo.preencher(numerosSelecionados, dezenas, qtdDezenasLotofacil))
        setQtdNum(numerosSelecionados.length)
    }


    async function compararJogo() {
        setCarregando(true)
        if (jogos.length < 1) {
            console.log("Aqui")
            const jogos = await jogo.buscarDados(URL_BASE + url);
            setJogos(jogos)
        }

        let contador = 0
        let pontos15 = 0
        let pontos14 = 0
        let pontos13 = 0
        let pontos12 = 0
        let pontos11 = 0

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
    }

    function preencher() {
        setArray(jogo.preencher(numerosSelecionados, dezenas, qtdDezenasLotofacil))
        setQtdNum(numerosSelecionados.length)
    }

    return (
        <Layout>
            <ViewCarregando carregando={carregando} />
            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={COR_LOTOFACIL} qtdNum={qtdNum} />
            <Cartela dezenas={qtdDezenasLotofacil}
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

            <View style={{ alignItems: 'center' }}>
                <Text>Jogos com 15 pontos: {pontos15} </Text>
                <Text>Jogos com 14 pontos: {pontos14} </Text>
                <Text>Jogos com 13 pontos: {pontos13} </Text>
                <Text>Jogos com 12 pontos: {pontos12} </Text>
                <Text>Jogos com 11 pontos: {pontos11} </Text>
            </View>
        </Layout>

    );
}

const styles = StyleSheet.create({
    botoes: {
        alignItems: 'center'
    }



});
