import React, { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";
import Layout from "../../components/Layout";
import { useIsFocused } from "@react-navigation/native";
import { axiosBusca, conexao, gerarKey, mudaCor } from "../../utils/ultil";
import { jogoDoBanco2, JogoSorteado } from "../../model/jogoSorteado";
import TextView from "../../components/TextView";
import { deletar, getData } from "../../db/AsyncStorage";
import { JogoSalvo } from "../../model/JogoSalvo";
import ViewBusca from "./Views/ViewBusca";
import ViewJogo from "../../Views/ViewJogo";
import ViewItemJOgosSalvo from "../../itemsView/ViewItemJogosSalvo";
import View2Botoes from "../../Views/View2BotoesT";
import ViewCarregando from "../../Views/ViewCarregando";
import ViewMsgErro from "../../Views/ViewMsgErro";
import Carregando from "../../components/Carregando";
import { ViewLegenda } from "../../Views/ViewLegendaJogo";
import ViewProximoJogo from "./Views/ViewProximoJogo";
const LIMITE_DE_JOGOS_SALVO = 30
export default function TelaJogos({ navigation, route }) {
    const { nomeJogo } = route.params ? route.params : "";
    const { dezenas } = route.params ? route.params : "";
    const { cor } = route.params ? route.params : "";
    const { limite } = route.params ? route.params : "";
    const { minimo } = route.params ? route.params : "";
    const { navComparar } = route.params ? route.params : "";
    const { dupla } = route.params ? route.params : false;
    const { milionaria } = route.params ? route.params : false;
    const isFocused = useIsFocused()
    const [jogo, setJogo] = useState<JogoSorteado>(undefined)
    const [carregandoPag, setCarregandoPag] = useState(true)
    const [carregando, setCarregando] = useState(true)
    const [erroServer, setErroServer] = useState(false)
    const [numConcurso, setNumConcurso] = useState("")
    const [txtBtn2, setTxtBtn2] = useState("Novo jogo")
    const [arrayJogosSalvos, setArrayJogosSalvos] = useState<Array<JogoSalvo>>([])
    const [limiteDeJogos, setLimiteDeJogos] = useState(false)
    useEffect(() => {
        console.log(navComparar)
        buscarDados()
        buscarJogos()
    }, [isFocused])

    async function buscarJogos() {
        const array: Array<JogoSalvo> = await getData()
        const arrayJogos: Array<JogoSalvo> = []
        array.map(item => {
            if (item.nome == nomeJogo) {
                arrayJogos.push(item)
            }
        })

        if (arrayJogos.length >= LIMITE_DE_JOGOS_SALVO) {
            setLimiteDeJogos(true)
            setTxtBtn2("Limite de jogos")
        } else {
            setLimiteDeJogos(false)
            setTxtBtn2("Novo jogo")
        }
        setArrayJogosSalvos(arrayJogos)
    }

    async function buscarDados() {
        const url = "https://apiloterias.com.br/app/v2/resultado?loteria=" + nomeJogo + "&antecipado=true&token=GiNtwyxspInrON9&concurso=" + numConcurso
        const array = await axiosBusca(url)
        if (array) {
            const jogo = jogoDoBanco2(array)
            setJogo(jogo)
        }
        setErroServer(conexao(array))
        setCarregandoPag(false)
        setCarregando(false)

        setNumConcurso("")
    }

    function deletarItem(item) {
        const jogo: JogoSalvo = item
        Alert.alert("Deletar", "Deletar " + jogo.dezenas.toString(),
            [
                {
                    text: "Sim",
                    onPress: () => {
                        deletar(jogo.id)
                        buscarJogos()
                    }
                },

                {
                    text: "Não"
                }
            ]
        )
    }

    function editar(item) {
        const jogo = item
        navigation.navigate("Cadastro", { jogo, nomeJogo, dezenas, limite, cor, minimo, milionaria })
    }
    function novoJogo() {
        navigation.navigate("Cadastro", { nomeJogo, dezenas, limite, cor, minimo, milionaria })
    }

    async function filtro(proximo) {
        console.log(jogo.concurso)
        let numConcurso = parseInt(jogo.concurso)
        if (proximo) {
            numConcurso = numConcurso + 1
        } else {
            numConcurso = numConcurso - 1
        }

        console.log(numConcurso)

        const url = "https://apiloterias.com.br/app/v2/resultado?loteria=" + nomeJogo + "&antecipado=true&token=GiNtwyxspInrON9&concurso=" + numConcurso
        const array = await axiosBusca(url)
        if (array) {
            const jogo = jogoDoBanco2(array)
            setJogo(jogo)
        }
        setErroServer(conexao(array))
        setCarregandoPag(false)
        setCarregando(false)
        setNumConcurso("")

    }

    return (
        <>
            {jogo ?
                <Layout cor={cor}>
                    {carregandoPag ? <ViewCarregando /> : null}
                    {erroServer ? <ViewMsgErro /> : null}
                    {carregando ? <Carregando /> : null}
                    <ViewBusca
                        numConcurso={numConcurso}
                        setNumConcurso={setNumConcurso}
                        onPress={() => buscarDados()}
                    />
                    <ViewProximoJogo
                        onPressMais={() => {
                            setCarregando(true)
                            filtro(true)
                        }}
                        onPressMenos={() => {
                            setCarregando(true)
                            filtro(false)
                        }}
                    />
                    <ViewLegenda
                        jogo={jogo.loteria === "MAIS MILIONÁRIA" ? "MILIONÁRIA" : jogo.loteria}
                        numeroConcurso={jogo.concurso}
                        cor={mudaCor(jogo.loteria)}
                        data={jogo.data} />

                    <ViewJogo cor={"#123"} jogo={jogo} />

                    <View2Botoes
                        onPress1={() => navigation.navigate(navComparar)}
                        txt1={"Estatísticas"}
                        onPress2={novoJogo}
                        txt2={txtBtn2}
                        limite={limiteDeJogos}
                    />

                    <View style={{ alignItems: "center" }}>
                        <TextView value="Jogos salvos" fontWeight={"bold"} fontSize={45} />
                        {arrayJogosSalvos ?
                            arrayJogosSalvos.map(item => {
                                return (
                                    <ViewItemJOgosSalvo
                                        deletarItem={() => deletarItem(item)}
                                        editarItem={() => editar(item)}
                                        item={item}
                                        jogoComparar={jogo}
                                        dupla={dupla}
                                        milionaria={milionaria}
                                        key={gerarKey()} />
                                )
                            }) : null}

                    </View>

                </Layout>
                : null}
        </>

    )

}


