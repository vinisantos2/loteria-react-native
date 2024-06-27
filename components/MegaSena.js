import { useState } from 'react';
import style from '../assets/style';

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
import Botao from './Botao';
import Jogos from '../utils/Jogos';

export default function MegaSena({ navigation }) {
    const [pontos6, setPontos6] = useState(0)
    const [pontos5, setPontos5] = useState(0)
    const [pontos4, setPontos4] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const [numerosSelecionados, setArray] = useState([])

    let jogos = []
    const jogo = new Jogos()

    const qtdDezenasMega = 60
    const qtdDezenas = 6
    const url = "megaSena"
    const cor = "#25B577"

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

        jogos = await jogo.buscarDados("http://192.168.0.197:3001/" + url);



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
        <SafeAreaView style={style.content}>

            <ActivityIndicator color="#0000ff" size={'large'} animating={carregando} />
            <Text>Quantidade de numeros escolhidos: {qtdNum} </Text>
            <Text>numeros selecionados: {numerosSelecionados.map((item, index) => (<View key={index}><Text key={index}>{item + ' '}</Text></View>))}</Text>
            <ScrollView style={styles.scrollView} >


                <View style={styles.cartela}>

                    {Array.from({ length: qtdDezenasMega }).map((_, index) => (
                        <Botao
                            corJogo={numerosSelecionados.includes(jogo.converterString(index)) ? cor : "#fff"}
                            numeros={numerosSelecionados}
                            salvaNumero={() => salvarNumeroNaLista(jogo.converterString(index))}
                            key={index}
                            numero={jogo.converterString(index)} />
                    ))}
                    <TouchableOpacity
                        onPress={() => compararJogo()} style={styles.botaoConfirma}>
                        <Text style={styles.textBotaoConfirma}>Comparar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => preencher()} style={styles.botaoConfirma}>
                        <Text style={styles.textBotaoConfirma}>Preencher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => limpar()} style={styles.botaoConfirma}>
                        <Text style={styles.textBotaoConfirma}>Limpar</Text>
                    </TouchableOpacity>



                </View>

                <View style={styles.viewResposta}>

                    <Text>Jogos com 6 pontos: {pontos6} </Text>
                    <Text>Jogos com 5 pontos: {pontos5} </Text>
                    <Text>Jogos com 4 pontos: {pontos4} </Text>

                </View>
            </ScrollView>

        </SafeAreaView>


    );
}

const styles = StyleSheet.create({


    botaoConfirma: {

        backgroundColor: '#0081F1',
        padding: 10,
        borderRadius: 15,
        width: '90%',
        alignItems: 'center',
        marginTop: 15,
    },

    textBotaoConfirma: {
        color: 'white',
        fontSize: 20,
    },
    botao: {
        margin: 5,
        backgroundColor: '#fff',
        width: 50,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    botaoSelecionado: {
        backgroundColor: '#123467',
        margin: 5,
        width: 50,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cartela: {
        width: '90%',
        backgroundColor: '#DFD07B',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 15,
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    textBotao: {
        color: 'black',
        fontSize: 15,
    },

    textStatusBar: {
        color: '#fff',
        fontSize: 40,
    },


});
