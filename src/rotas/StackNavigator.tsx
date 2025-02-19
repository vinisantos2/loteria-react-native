
import TelaEstatistica from "../telas/Estatistica";
import { createStackNavigator } from "@react-navigation/stack";
import { textDrawer } from "./DrawerItemStyle";
import { ROTAS } from "./Rotas";
import { DrawerNav } from "./DrawerNavigator";
import TelaSobre from "../telas/Sobre";
import CompararJogos from "../telas/TelaComparacao";
import CadastroJogo from "../telas/CadastroJogo";
import { DB_DIA, DB_DUPLA, DB_LOTOFACIL, DB_LOTOMANIA, DB_MEGASENA, DB_MILIONARIA, DB_QUINA, DB_TIME } from "../constants/Nomes";
import { DEZENAS_LIMITE_DIA, DEZENAS_LIMITE_DUPLA, DEZENAS_LIMITE_LOTOFACIL, DEZENAS_LIMITE_LOTOMANIA, DEZENAS_LIMITE_MEGA, DEZENAS_LIMITE_MILIONARIA, DEZENAS_LIMITE_QUINA, DEZENAS_LIMITE_TIME, QTD_DEZENAS_DIA, QTD_DEZENAS_DUPLA, QTD_DEZENAS_LOTOFACIL, QTD_DEZENAS_LOTOMANIA, QTD_DEZENAS_MEGA, QTD_DEZENAS_MILIONARIA, QTD_DEZENAS_QUINA, QTD_DEZENAS_TIME, QTD_MIN_DEZENAS_DIA, QTD_MIN_DEZENAS_DUPLA, QTD_MIN_DEZENAS_LOTOFACIL, QTD_MIN_DEZENAS_LOTOMANIA, QTD_MIN_DEZENAS_MEGA, QTD_MIN_DEZENAS_MILIONARIA, QTD_MIN_DEZENAS_QUINA, QTD_MIN_DEZENAS_TIME } from "../constants/Constants";
import { CORES } from "../constants/Cores";


const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: textDrawer(),
                headerStyle: { backgroundColor: CORES.GERAL.RESULTADOS },
                headerTintColor: "#FFF"
            }}
            initialRouteName="nav">
            <Stack.Screen options={{ headerShown: false }} name="nav" component={DrawerNav} />
            <Stack.Screen name={ROTAS.ESTATISTICA} component={TelaEstatistica} />
            <Stack.Screen name={ROTAS.SOBRE} component={TelaSobre} />
            <Stack.Screen name={"Cadastro"} component={CadastroJogo} />
            {/* Dupla sena */}
            <Stack.Screen
                name={ROTAS.DUPLA.ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: CORES.JOGOS.DUPLA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_DUPLA,
                        cor: CORES.JOGOS.DUPLA,
                        dezenas: QTD_DEZENAS_DUPLA,
                        minimo: QTD_MIN_DEZENAS_DUPLA,
                        limite: DEZENAS_LIMITE_DUPLA,
                        dupla: true,
                        pontos: [
                            { ponto: 6, desc: "Jogos com 6 pontos", contador: 0, mostrar: true },
                            { ponto: 5, desc: "Jogos com 5 pontos", contador: 0, mostrar: true },
                            { ponto: 4, desc: "Jogos com 4 pontos", contador: 0, mostrar: true },
                        ]
                    }
                }
            />
            {/* Dia de sorte */}

            <Stack.Screen
                name={ROTAS.DIA.ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: CORES.JOGOS.DIA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_DIA,
                        cor: CORES.JOGOS.DIA,
                        dezenas: QTD_DEZENAS_DIA,
                        minimo: QTD_MIN_DEZENAS_DIA,
                        limite: DEZENAS_LIMITE_DIA,
                        pontos: [
                            { ponto: 7, desc: "Jogos com 7 pontos", contador: 0, mostrar: true },
                            { ponto: 6, desc: "Jogos com 6 pontos", contador: 0, mostrar: true },
                            { ponto: 5, desc: "Jogos com 5 pontos", contador: 0, mostrar: true },
                            { ponto: 4, desc: "Jogos com 4 pontos", contador: 0, mostrar: false },
                        ]
                    }
                }
            />
            {/* Lotofacil */}
            <Stack.Screen
                name={ROTAS.LOTOFACIL.ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: CORES.JOGOS.LOTOFACIL
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_LOTOFACIL,
                        cor: CORES.JOGOS.LOTOFACIL,
                        dezenas: QTD_DEZENAS_LOTOFACIL,
                        minimo: QTD_MIN_DEZENAS_LOTOFACIL,
                        limite: DEZENAS_LIMITE_LOTOFACIL,
                        pontos: [
                            { ponto: 15, desc: "Jogos com 15 pontos", contador: 0, mostrar: true },
                            { ponto: 14, desc: "Jogos com 14 pontos", contador: 0, mostrar: true },
                            { ponto: 13, desc: "Jogos com 13 pontos", contador: 0, mostrar: false },
                            { ponto: 12, desc: "Jogos com 12 pontos", contador: 0, mostrar: false },
                            { ponto: 11, desc: "Jogos com 11 pontos", contador: 0, mostrar: false },
                        ]
                    }
                }
            />

            {/* Lotomania */}
            <Stack.Screen
                name={ROTAS.LOTOMANIA.ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: CORES.JOGOS.LOTOMANIA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_LOTOMANIA,
                        cor: CORES.JOGOS.LOTOMANIA,
                        dezenas: QTD_DEZENAS_LOTOMANIA,
                        minimo: QTD_MIN_DEZENAS_LOTOMANIA,
                        limite: DEZENAS_LIMITE_LOTOMANIA,
                        pontos: [
                            { ponto: 20, desc: "Jogos com 20 pontos", contador: 0, mostrar: true },
                            { ponto: 19, desc: "Jogos com 19 pontos", contador: 0, mostrar: true },
                            { ponto: 18, desc: "Jogos com 18 pontos", contador: 0, mostrar: false },
                            { ponto: 17, desc: "Jogos com 17 pontos", contador: 0, mostrar: false },
                            { ponto: 0, desc: "Jogos com 00 pontos", contador: 0, mostrar: true },
                        ]
                    }
                }
            />


            {/* Mais milionaria */}

            <Stack.Screen
                name={ROTAS.MILIONARIA.ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: CORES.JOGOS.MILIONARIA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_MILIONARIA,
                        cor: CORES.JOGOS.MILIONARIA,
                        dezenas: QTD_DEZENAS_MILIONARIA,
                        minimo: QTD_MIN_DEZENAS_MILIONARIA,
                        limite: DEZENAS_LIMITE_MILIONARIA,
                        milionaria: true,
                        pontos: [
                            { ponto: 6, trevo: 2, desc: '6 pontos e 2 trevos', contador: 0, mostrar: true },
                            { ponto: 6, trevo: 0, desc: '6 pontos e 1 ou 0 trevo trevo', contador: 0, mostrar: true },
                            { ponto: 5, trevo: 2, desc: '5 pontos e 2 trevos', contador: 0, mostrar: true },
                            { ponto: 5, trevo: 0, desc: '5 pontos e 1 ou 0 trevo', contador: 0, mostrar: true },
                            { ponto: 4, trevo: 2, desc: '4 pontos e 2 trevos', contador: 0, mostrar: true },
                            { ponto: 4, trevo: 0, desc: '4 pontos e 1 ou 0 trevo', contador: 0, mostrar: true },
                            { ponto: 3, trevo: 2, desc: '3 pontos e 2 trevos', contador: 0, mostrar: true },
                            { ponto: 3, trevo: 1, desc: '3 pontos e 1 trevo', contador: 0, mostrar: false },
                            { ponto: 2, trevo: 2, desc: '2 pontos e 2 trevo', contador: 0, mostrar: false },
                            { ponto: 2, trevo: 1, desc: '2 pontos e 1 trevo', contador: 0, mostrar: false },
                        ],



                    }
                }
            />
            {/* Mega sena */}
            <Stack.Screen
                name={ROTAS.MEGA.ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: CORES.JOGOS.MEGA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_MEGASENA,
                        cor: CORES.JOGOS.MEGA,
                        dezenas: QTD_DEZENAS_MEGA,
                        minimo: QTD_MIN_DEZENAS_MEGA,
                        limite: DEZENAS_LIMITE_MEGA,
                        pontos: [
                            { ponto: 6, desc: "Jogos com 6 pontos", contador: 0, mostrar: true },
                            { ponto: 5, desc: "Jogos com 5 pontos", contador: 0, mostrar: true },
                            { ponto: 4, desc: "Jogos com 4 pontos", contador: 0, mostrar: true },

                        ]
                    }
                }
            />
            {/*Quina */}
            <Stack.Screen
                name={ROTAS.QUINA.ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: CORES.JOGOS.QUINA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_QUINA,
                        cor: CORES.JOGOS.QUINA,
                        dezenas: QTD_DEZENAS_QUINA,
                        minimo: QTD_MIN_DEZENAS_QUINA,
                        limite: DEZENAS_LIMITE_QUINA,
                        pontos: [
                            { ponto: 5, desc: "Jogos com 5 pontos", contador: 0, mostrar: true },
                            { ponto: 4, desc: "Jogos com 4 pontos", contador: 0, mostrar: true },
                            { ponto: 3, desc: "Jogos com 3 pontos", contador: 0, mostrar: false },
                            { ponto: 2, desc: "Jogos com 2 pontos", contador: 0, mostrar: false },
                        ]
                    }
                }
            />
            {/*Time mania */}
            <Stack.Screen
                name={ROTAS.TIME.ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: CORES.JOGOS.TIME
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_TIME,
                        cor: CORES.JOGOS.TIME,
                        dezenas: QTD_DEZENAS_TIME,
                        minimo: QTD_MIN_DEZENAS_TIME,
                        limite: DEZENAS_LIMITE_TIME,
                        pontos: [
                            { ponto: 7, desc: "Jogos com 7 pontos", contador: 0, mostrar: true },
                            { ponto: 6, desc: "Jogos com 6 pontos", contador: 0, mostrar: true },
                            { ponto: 5, desc: "Jogos com 5 pontos", contador: 0, mostrar: true },
                            { ponto: 4, desc: "Jogos com 4 pontos", contador: 0, mostrar: true },
                            { ponto: 3, desc: "Jogos com 3 pontos", contador: 0, mostrar: false },

                        ]
                    }
                }
            />
        </Stack.Navigator>
    )
}