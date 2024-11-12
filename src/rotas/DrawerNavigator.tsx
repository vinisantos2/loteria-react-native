import { createDrawerNavigator } from "@react-navigation/drawer";
import Lotofacil from "../telas/Lotofacil";
import Lotomania from "../telas/Lotomania";
import MegaSena from "../telas/MegaSena";
import Quina from "../telas/Quina";
import { ROTA_RESULTADOS, ROTA_LOTOMANIA, ROTA_MEGA, ROTA_QUINA, ROTA_LOTOFACIL, ROTA_TIME, ROTA_MILIONARIA, ROTA_DUPLA, ROTA_ESTATISTICA, ROTA_BUSCA, ROTA_DETALHES } from "./Rotas";
import { COR_RESULTADOS, COR_DUPLA, COR_LOTOFACIL, COR_LOTOMAIA, COR_MEGA, COR_MILIONARIA, COR_PRETO, COR_QUINA, COR_TIME } from "../constants/Cores";
import Resultados from "../telas/Resultados";
import TimeMania from "../telas/TimeMania";
import MaisMilionaria from "../telas/Milionaria";
import DuplaSena from "../telas/DuplaSena";
import { headerTitleStyle, styloDrwer, textDrawer } from "./DrawerItemStyle";
import { HeaderStyleDrawer } from "./HeaderStyle";

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
                header: HeaderStyleDrawer,
                drawerLabelStyle: textDrawer(),
                headerTitleAlign: "center",
                headerTitleStyle: headerTitleStyle(),

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
            }} name={ROTA_DUPLA} component={DuplaSena} />

            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_LOTOFACIL),
                headerStyle: {
                    backgroundColor: COR_LOTOFACIL,
                },
            }} name={ROTA_LOTOFACIL} component={Lotofacil} />
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_LOTOMAIA),
                headerStyle: { backgroundColor: COR_LOTOMAIA },

            }} name={ROTA_LOTOMANIA} component={Lotomania} />
            {/* mais milionaria */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_MILIONARIA),
                headerStyle: { backgroundColor: COR_MILIONARIA },

            }} name={ROTA_MILIONARIA} component={MaisMilionaria} />
            {/* mega sena */}
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_MEGA),
                headerStyle: { backgroundColor: COR_MEGA },

            }} name={ROTA_MEGA} component={MegaSena} />
            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_QUINA),
                headerStyle: { backgroundColor: COR_QUINA },

            }} name={ROTA_QUINA} component={Quina} />


            <Drawer.Screen options={{
                drawerItemStyle: styloDrwer(COR_TIME),
                headerStyle: { backgroundColor: COR_TIME },

            }} name={ROTA_TIME} component={TimeMania} />


        </Drawer.Navigator>

    );
}

