import { useState } from 'react';

import style from '../assets/style';

import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import Botao from './Botao';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Jogos from '../utils/Jogos';

export default function Lotomania({ navigation }) {
    const [pontos00, setPontos00] = useState(0)
    const [pontos15, setPontos15] = useState(0)
    const [pontos16, setPontos16] = useState(0)
    const [pontos17, setPontos17] = useState(0)
    const [pontos18, setPontos18] = useState(0)
    const [pontos19, setPontos19] = useState(0)
    const [pontos20, setPontos20] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const [qtdNum, setQtdNum] = useState(0)

    const [numerosSelecionados, setArray] = useState([])

    let jogos = []
    const jogo = new Jogos()
    const url = "lotomania"
    const limite = 60
    const qtdDezenasLotomania = 100

    const dezenas = 50

    function salvarNumeroNaLista(numero) {

        setArray(jogo.salvarNumeroNaLista(numero, numerosSelecionados, limite))

        setQtdNum(numerosSelecionados.length)

    }

    function limpar() {
        setArray([])
        setQtdNum(0)
    }


    function preencher() {
        setArray(jogo.preencher(numerosSelecionados, dezenas, qtdDezenasLotomania))
        setQtdNum(numerosSelecionados.length)
    }



    async function compararJogo() {
        setCarregando(true)

        jogos = await jogo.buscarDados("http://192.168.0.197:3001/"+ url);

        let contador = 0
        let pontos20 = 0
        let pontos19 = 0
        let pontos18 = 0
        let pontos17 = 0
        let pontos16 = 0
        let pontos15 = 0
        let pontos00 = 0
        let valor = 0


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
            if (contador === 20) {
                pontos20++
            } else if (contador === 19) {
                pontos19++
            } else if (contador === 18) {
                pontos18++
            } else if (contador === 17) {
                pontos17++
            } else if (contador === 16) {
                pontos16++
            } else if (contador === 15) {
                pontos15++
            } else if (contador === 0) {
                pontos00++
            }


            contador = 0



        }

        setPontos20(pontos20)
        setPontos19(pontos19)
        setPontos18(pontos18)
        setPontos17(pontos17)
        setPontos16(pontos16)
        setPontos15(pontos15)
        setPontos00(pontos00)
        setCarregando(false)

    }


    return (
        <SafeAreaView style={style.content}>
            <ActivityIndicator style={styles.carregando} color="#0000ff" size={'large'} animating={carregando} />
            <View>
                <Text>Quantidade de numeros escolhidos: {qtdNum} </Text>
                <Text>numeros selecionados: {numerosSelecionados.map((item, index) => (<View key={index}><Text key={index}>{item + ' '}</Text></View>))}</Text>
            </View>
            <ScrollView style={styles.scrollView} >


                <View style={styles.cartela}>

                    {Array.from({ length: qtdDezenasLotomania }).map((_, index) => (
                        <Botao
                            corJogo={numerosSelecionados.includes(jogo.converterString(index)) ? "#F7791A" : "#fff"}
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

                    <Text>Jogos com 20 pontos: {pontos20} </Text>
                    <Text>Jogos com 19 pontos: {pontos19} </Text>
                    <Text>Jogos com 18 pontos: {pontos18} </Text>
                    <Text>Jogos com 17 pontos: {pontos17} </Text>
                    <Text>Jogos com 16 pontos: {pontos16} </Text>
                    <Text>Jogos com 15 pontos: {pontos15} </Text>
                    <Text>Jogos com 00 pontos: {pontos00} </Text>
                </View>
            </ScrollView>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({

    carregando: {
        position: 'absolute',
        margin: 'auto',
    },
    scrollView: {






    },

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
        width: '100%',
        backgroundColor: '#DFD07B',
        justifyContent: 'center',
        padding: 5,
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
