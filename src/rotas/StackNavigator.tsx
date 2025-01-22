
import TelaEstatistica from "../telas/Estatistica";
import { createStackNavigator } from "@react-navigation/stack";
import { textDrawer } from "./DrawerItemStyle";
import { ROTA_DIA_ESTATISTICA, ROTA_DUPLA_ESTATISTICA, ROTA_ESTATISTICA, ROTA_LOTOFACIL_ESTATISTICA, ROTA_LOTOMANIA_ESTATISTICA, ROTA_MEGA_ESTATISTICA, ROTA_MILIONARIA_ESTATISTICA, ROTA_QUINA_ESTATISTICA, ROTA_SOBRE, ROTA_TIME_ESTATISTICA } from "./Rotas";
import { DrawerNav } from "./DrawerNavigator";
import TelaSobre from "../telas/Sobre";
import { COR_DIA, COR_DUPLA, COR_LOTOFACIL, COR_LOTOMANIA, COR_MEGA, COR_MILIONARIA, COR_QUINA, COR_RESULTADOS, COR_TIME } from "../constants/Cores";
import CompararJogos from "../telas/TelaComparacao";
import CadastroJogo from "../telas/CadastroJogo";
import { DB_DIA, DB_DUPLA, DB_LOTOFACIL, DB_LOTOMANIA, DB_MEGASENA, DB_MILIONARIA, DB_QUINA, DB_TIME } from "../constants/Nomes";
import { DEZENAS_LIMITE_DIA, DEZENAS_LIMITE_DUPLA, DEZENAS_LIMITE_LOTOFACIL, DEZENAS_LIMITE_LOTOMANIA, DEZENAS_LIMITE_MEGA, DEZENAS_LIMITE_MILIONARIA, DEZENAS_LIMITE_QUINA, DEZENAS_LIMITE_TIME, QTD_DEZENAS_DIA, QTD_DEZENAS_DUPLA, QTD_DEZENAS_LOTOFACIL, QTD_DEZENAS_LOTOMANIA, QTD_DEZENAS_MEGA, QTD_DEZENAS_MILIONARIA, QTD_DEZENAS_QUINA, QTD_DEZENAS_TIME, QTD_MIN_DEZENAS_DIA, QTD_MIN_DEZENAS_DUPLA, QTD_MIN_DEZENAS_LOTOFACIL, QTD_MIN_DEZENAS_LOTOMANIA, QTD_MIN_DEZENAS_MEGA, QTD_MIN_DEZENAS_MILIONARIA, QTD_MIN_DEZENAS_QUINA, QTD_MIN_DEZENAS_TIME } from "../constants/Constants";
import { Pontos } from "../model/Pontos";


const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: textDrawer(),
                headerStyle: { backgroundColor: COR_RESULTADOS },
                headerTintColor: "#FFF"
            }}
            initialRouteName="nav">
            <Stack.Screen options={{ headerShown: false }} name="nav" component={DrawerNav} />
            <Stack.Screen name={ROTA_ESTATISTICA} component={TelaEstatistica} />
            <Stack.Screen name={ROTA_SOBRE} component={TelaSobre} />
            <Stack.Screen name={"Cadastro"} component={CadastroJogo} />
            {/* Dupla sena */}
            <Stack.Screen
                name={ROTA_DUPLA_ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: COR_DUPLA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_DUPLA,
                        cor: COR_DUPLA,
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
                name={ROTA_DIA_ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: COR_DIA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_DIA,
                        cor: COR_DIA,
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
                name={ROTA_LOTOFACIL_ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: COR_LOTOFACIL
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_LOTOFACIL,
                        cor: COR_LOTOFACIL,
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
                name={ROTA_LOTOMANIA_ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: COR_LOTOMANIA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_LOTOMANIA,
                        cor: COR_LOTOMANIA,
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
                name={ROTA_MILIONARIA_ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: COR_MILIONARIA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_MILIONARIA,
                        cor: COR_MILIONARIA,
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
                name={ROTA_MEGA_ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: COR_MEGA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_MEGASENA,
                        cor: COR_MEGA,
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
                name={ROTA_QUINA_ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: COR_QUINA
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_QUINA,
                        cor: COR_QUINA,
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
                name={ROTA_TIME_ESTATISTICA}
                component={CompararJogos}
                options={{
                    headerStyle: {
                        backgroundColor: COR_TIME
                    },
                }}
                initialParams={
                    {
                        nomeJogo: DB_TIME,
                        cor: COR_TIME,
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