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
    const [pontos15, setPontos15] = useState(0)
    const [pontos14, setPontos14] = useState(0)
    const [pontos13, setPontos13] = useState(0)
    const [pontos12, setPontos12] = useState(0)
    const [pontos11, setPontos11] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)
    const url = "lotofacil"
    const cor = "#A8358E"
    const [numerosSelecionados, setArray] = useState([])

    let jogos = []
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

        jogos = await jogo.buscarDados("http://192.168.0.197:3001/" + url);



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
        <SafeAreaView style={style.content}>

            <ActivityIndicator color="#0000ff" size={'large'} animating={carregando} />
            <Text>Quantidade de numeros escolhidos: {qtdNum} </Text>
            <Text>numeros selecionados: {numerosSelecionados.map((item, index) => (<View key={index}><Text key={index}>{item + ' '}</Text></View>))}</Text>
            <ScrollView style={styles.scrollView} >


                <View style={styles.cartela}>

                    {Array.from({ length: qtdDezenasLotofacil }).map((_, index) => (
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

                    <Text>Jogos com 15 pontos: {pontos15} </Text>
                    <Text>Jogos com 14 pontos: {pontos14} </Text>
                    <Text>Jogos com 13 pontos: {pontos13} </Text>
                    <Text>Jogos com 12 pontos: {pontos12} </Text>
                    <Text>Jogos com 11 pontos: {pontos11} </Text>

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
