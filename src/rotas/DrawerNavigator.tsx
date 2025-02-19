import { createDrawerNavigator } from "@react-navigation/drawer";
import { ROTAS } from "./Rotas";
import Resultados from "../telas/Resultados";
import { headerTitleStyle, styloDrwer, textDrawer } from "./DrawerItemStyle";
import MenuComponent from "../components/Menu";
import TelaJogos from "../telas/TelaJogos";
import {
    QTD_DEZENAS_DIA, QTD_DEZENAS_DUPLA, QTD_DEZENAS_LOTOFACIL,
    QTD_DEZENAS_LOTOMANIA, QTD_DEZENAS_MEGA, QTD_DEZENAS_MILIONARIA,
    QTD_DEZENAS_QUINA, QTD_DEZENAS_TIME, QTD_MIN_DEZENAS_DIA,
    QTD_MIN_DEZENAS_DUPLA, QTD_MIN_DEZENAS_LOTOFACIL,
    QTD_MIN_DEZENAS_LOTOMANIA, QTD_MIN_DEZENAS_MEGA,
    QTD_MIN_DEZENAS_MILIONARIA, QTD_MIN_DEZENAS_QUINA, QTD_MIN_DEZENAS_TIME
} from "../constants/Constants";
import { DB_DIA, DB_DUPLA, DB_LOTOFACIL, DB_LOTOMANIA, DB_MEGASENA, DB_MILIONARIA, DB_QUINA, DB_TIME } from "../constants/Nomes";
import { CORES } from "../constants/Cores";
const Drawer = createDrawerNavigator();

export function DrawerNav() {

    const getScreenOptions = (color) => ({
        drawerItemStyle: styloDrwer(color),
        headerStyle: { backgroundColor: color },
    });

    return (
        <Drawer.Navigator
            screenOptions={{
                // drawerIcon: ({ color, focused, size }) => {
                //     return (
                //         <Ionicons size={30} name="accessibility-outline" color={color} />
                //     )

                // },

                drawerLabelStyle: textDrawer(),
                headerTitleAlign: "center",
                headerTitleStyle: headerTitleStyle(),
                headerRight: MenuComponent,
                headerTintColor: "#FFF"

            }}
            initialRouteName={ROTAS.RESULTADOS}>
            <Drawer.Screen options={getScreenOptions(CORES.GERAL.RESULTADOS)}
                name={ROTAS.RESULTADOS} component={Resultados} />

            {/* dupla sena */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(CORES.JOGOS.DUPLA),
                headerStyle: { backgroundColor: CORES.JOGOS.DUPLA },
            }} name={ROTAS.DUPLA.PRINCIPAL} component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_DUPLA,
                    cor: CORES.JOGOS.DUPLA,
                    dezenas: QTD_DEZENAS_DUPLA,
                    minimo: QTD_MIN_DEZENAS_DUPLA,
                    navComparar: ROTAS.DUPLA.ESTATISTICA,
                    dupla: true
                }} />
            {/* dia de sorte */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(CORES.JOGOS.DIA),
                headerStyle: { backgroundColor: CORES.JOGOS.DIA },
            }} name={ROTAS.DIA.PRINCIPAL} component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_DIA,
                    cor: CORES.JOGOS.DIA,
                    dezenas: QTD_DEZENAS_DIA,
                    minimo: QTD_MIN_DEZENAS_DIA,
                    navComparar: ROTAS.DIA.ESTATISTICA
                }}

            />
            {/* Lotofacil */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(CORES.JOGOS.LOTOFACIL),
                headerStyle: {
                    backgroundColor: CORES.JOGOS.LOTOFACIL,
                },
            }} name={ROTAS.LOTOFACIL.PRINCIPAL} component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_LOTOFACIL,
                    cor: CORES.JOGOS.LOTOFACIL,
                    dezenas: QTD_DEZENAS_LOTOFACIL,
                    minimo: QTD_MIN_DEZENAS_LOTOFACIL,
                    navComparar: ROTAS.LOTOFACIL.ESTATISTICA
                }} />
            {/* Lotomania */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(CORES.JOGOS.LOTOMANIA),
                headerStyle: { backgroundColor: CORES.JOGOS.LOTOMANIA },

            }} name={ROTAS.LOTOMANIA.PRINCIPAL}
                component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_LOTOMANIA,
                    cor: CORES.JOGOS.LOTOMANIA,
                    dezenas: QTD_DEZENAS_LOTOMANIA,
                    minimo: QTD_MIN_DEZENAS_LOTOMANIA,
                    navComparar: ROTAS.LOTOMANIA.ESTATISTICA
                }} />
            {/* mais milionaria */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(CORES.JOGOS.MILIONARIA),
                headerStyle: { backgroundColor: CORES.JOGOS.MILIONARIA },

            }} name={ROTAS.MILIONARIA.PRINCIPAL} component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_MILIONARIA,
                    cor: CORES.JOGOS.MILIONARIA,
                    dezenas: QTD_DEZENAS_MILIONARIA,
                    minimo: QTD_MIN_DEZENAS_MILIONARIA,
                    navComparar: ROTAS.MILIONARIA.ESTATISTICA,
                    milionaria: true
                }} />
            {/* mega sena */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(CORES.JOGOS.MEGA),
                headerStyle: { backgroundColor: CORES.JOGOS.MEGA },

            }} name={ROTAS.MEGA.PRINCIPAL} component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_MEGASENA,
                    cor: CORES.JOGOS.MEGA,
                    dezenas: QTD_DEZENAS_MEGA,
                    minimo: QTD_MIN_DEZENAS_MEGA,
                    navComparar: ROTAS.MEGA.ESTATISTICA
                }} />

            {/* QUina */}
            <Drawer.Screen options={{

                drawerItemStyle: styloDrwer(CORES.JOGOS.QUINA),
                headerStyle: { backgroundColor: CORES.JOGOS.QUINA },


            }} name={ROTAS.QUINA.PRINCIPAL}
                component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_QUINA,
                    cor: CORES.JOGOS.QUINA,
                    dezenas: QTD_DEZENAS_QUINA,
                    minimo: QTD_MIN_DEZENAS_QUINA,
                    navComparar: ROTAS.QUINA.ESTATISTICA
                }} />

            {/* Time mania */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(CORES.JOGOS.TIME),
                headerStyle: { backgroundColor: CORES.JOGOS.TIME },

            }} name={ROTAS.TIME.PRINCIPAL}
                component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_TIME,
                    cor: CORES.JOGOS.TIME,
                    dezenas: QTD_DEZENAS_TIME,
                    minimo: QTD_MIN_DEZENAS_TIME,
                    navComparar: ROTAS.TIME.ESTATISTICA
                }} />

        </Drawer.Navigator>

    );
}

