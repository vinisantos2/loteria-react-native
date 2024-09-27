import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert,
    ActivityIndicator,

} from 'react-native';
import Botao from '../components/Botao';
import Jogos from '../utils/Jogos';
import style from '../assets/style';
import Layout from '../components/Layout';
import ViewBotao from '../components/ViewBotao';
import Cartela from '../components/Cartela';
import { COMPARAR, LIMPAR, PRENCHER, URL_BASE } from '../constants/Constants';
import ViewSelecionados from '../components/ViewSelecionados';
import { COR_MEGA } from '../constants/Cores';
import ViewCarregando from '../components/ViewCarregando';


let jogos = []
export default function MegaSena({ navigation }) {
    console.log(jogos)
    const [pontos6, setPontos6] = useState(0)
    const [pontos5, setPontos5] = useState(0)
    const [pontos4, setPontos4] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const [numerosSelecionados, setArray] = useState([])

 
    const jogo = new Jogos()

    const qtdDezenasMega = 60
    const qtdDezenas = 6
    const url = "megasena"
    const cor = COR_MEGA
    const limite = 12
    const dezenas = 6

    function salvarNumeroNaLista(numero) {
        setArray(jogo.salvarNumeroNaLista(numero, numerosSelecionados, limite))

        setQtdNum(numerosSelecionados.length)

    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }


    function preencher() {
        setArray(jogo.preencher(numerosSelecionados, dezenas, qtdDezenasMega))
        setQtdNum(numerosSelecionados.length)
    }


    async function compararJogo() {
        setCarregando(true)

        if (jogos.length < 1) {
            console.log("AQui")
            jogos = await jogo.buscarDados(URL_BASE + url);
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


    function preencher() {
        setArray(jogo.preencher(numerosSelecionados, dezenas, qtdDezenasMega))
        setQtdNum(numerosSelecionados.length)
    }

    return (
        <Layout >
             <ViewCarregando carregando={carregando}/>


            <ViewSelecionados numerosSelecionados={numerosSelecionados} cor={COR_MEGA} qtdNum={qtdNum} />

            <Cartela dezenas={qtdDezenasMega}
                jogo={jogo}
                numerosSelecionados={numerosSelecionados}
                salvarNumeroNaLista={salvarNumeroNaLista}
                cor={cor} />

            <View style={styles.botoes}>
                <ViewCarregando carregando={carregando}/>
                <ViewBotao value={COMPARAR} onPress={() => compararJogo()} />
                <ViewBotao value={PRENCHER} onPress={() => preencher()} />
                <ViewBotao value={LIMPAR} onPress={() => limpar()} />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Text>Jogos com 6 pontos: {pontos6} </Text>
                <Text>Jogos com 5 pontos: {pontos5} </Text>
                <Text>Jogos com 4 pontos: {pontos4} </Text>
            </View>

        </Layout>


    );
}

const styles = StyleSheet.create({









    botoes: {
        alignItems: 'center'
    }


});
