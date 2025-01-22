import { createDrawerNavigator } from "@react-navigation/drawer";
import { ROTA_RESULTADOS, ROTA_LOTOMANIA, ROTA_MEGA, ROTA_QUINA, ROTA_LOTOFACIL, ROTA_TIME, ROTA_MILIONARIA, ROTA_DUPLA, ROTA_ESTATISTICA, ROTA_BUSCA, ROTA_DETALHES, ROTA_DIA, ROTA_LOTOFACIL_ESTATISTICA, ROTA_MEGA_ESTATISTICA, ROTA_DUPLA_ESTATISTICA, ROTA_DIA_ESTATISTICA, ROTA_LOTOMANIA_ESTATISTICA, ROTA_MILIONARIA_ESTATISTICA, ROTA_QUINA_ESTATISTICA, ROTA_TIME_ESTATISTICA } from "./Rotas";
import { COR_RESULTADOS, COR_DUPLA, COR_LOTOFACIL, COR_LOTOMANIA, COR_MEGA, COR_MILIONARIA, COR_PRETO, COR_QUINA, COR_TIME, COR_DIA } from "../constants/Cores";
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

const Drawer = createDrawerNavigator();

export function DrawerNav() {

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
            initialRouteName={ROTA_RESULTADOS}>
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_RESULTADOS),
                headerStyle: { backgroundColor: COR_RESULTADOS, },
            }} name={ROTA_RESULTADOS} component={Resultados} />

            {/* dupla sena */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_DUPLA),
                headerStyle: { backgroundColor: COR_DUPLA },
            }} name={ROTA_DUPLA} component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_DUPLA,
                    cor: COR_DUPLA,
                    dezenas: QTD_DEZENAS_DUPLA,
                    minimo: QTD_MIN_DEZENAS_DUPLA,
                    navComparar: ROTA_DUPLA_ESTATISTICA,
                    dupla: true
                }} />
            {/* dia de sorte */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_DIA),
                headerStyle: { backgroundColor: COR_DIA },
            }} name={ROTA_DIA} component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_DIA,
                    cor: COR_DIA,
                    dezenas: QTD_DEZENAS_DIA,
                    minimo: QTD_MIN_DEZENAS_DIA,
                    navComparar: ROTA_DIA_ESTATISTICA
                }}

            />
            {/* Lotofacil */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_LOTOFACIL),
                headerStyle: {
                    backgroundColor: COR_LOTOFACIL,
                },
            }} name={ROTA_LOTOFACIL} component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_LOTOFACIL,
                    cor: COR_LOTOFACIL,
                    dezenas: QTD_DEZENAS_LOTOFACIL,
                    minimo: QTD_MIN_DEZENAS_LOTOFACIL,
                    navComparar: ROTA_LOTOFACIL_ESTATISTICA
                }} />
            {/* Lotomania */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_LOTOMANIA),
                headerStyle: { backgroundColor: COR_LOTOMANIA },

            }} name={ROTA_LOTOMANIA}
                component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_LOTOMANIA,
                    cor: COR_LOTOMANIA,
                    dezenas: QTD_DEZENAS_LOTOMANIA,
                    minimo: QTD_MIN_DEZENAS_LOTOMANIA,
                    navComparar: ROTA_LOTOMANIA_ESTATISTICA
                }} />
            {/* mais milionaria */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_MILIONARIA),
                headerStyle: { backgroundColor: COR_MILIONARIA },

            }} name={ROTA_MILIONARIA} component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_MILIONARIA,
                    cor: COR_MILIONARIA,
                    dezenas: QTD_DEZENAS_MILIONARIA,
                    minimo: QTD_MIN_DEZENAS_MILIONARIA,
                    navComparar: ROTA_MILIONARIA_ESTATISTICA,
                    milionaria: true
                }} />
            {/* mega sena */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_MEGA),
                headerStyle: { backgroundColor: COR_MEGA },

            }} name={ROTA_MEGA} component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_MEGASENA,
                    cor: COR_MEGA,
                    dezenas: QTD_DEZENAS_MEGA,
                    minimo: QTD_MIN_DEZENAS_MEGA,
                    navComparar: ROTA_MEGA_ESTATISTICA
                }} />

            {/* QUina */}
            <Drawer.Screen options={{

                drawerItemStyle: styloDrwer(COR_QUINA),
                headerStyle: { backgroundColor: COR_QUINA },


            }} name={ROTA_QUINA}
                component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_QUINA,
                    cor: COR_QUINA,
                    dezenas: QTD_DEZENAS_QUINA,
                    minimo: QTD_MIN_DEZENAS_QUINA,
                    navComparar: ROTA_QUINA_ESTATISTICA
                }} />

            {/* Time mania */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_TIME),
                headerStyle: { backgroundColor: COR_TIME },

            }} name={ROTA_TIME}
                component={TelaJogos}
                initialParams={{
                    nomeJogo: DB_TIME,
                    cor: COR_TIME,
                    dezenas: QTD_DEZENAS_TIME,
                    minimo: QTD_MIN_DEZENAS_TIME,
                    navComparar: ROTA_TIME_ESTATISTICA
                }} />

        </Drawer.Navigator>

    );
}

