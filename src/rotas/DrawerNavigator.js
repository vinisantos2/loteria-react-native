import { createDrawerNavigator } from "@react-navigation/drawer";

import Lotofacil from "../telas/Lotofacil";
import Lotomania from "../telas/Lotomania";
import MegaSena from "../telas/MegaSena";
import Quina from "../telas/Quina";
import { ROTA_RESULTADOS, ROTA_LOTOMANIA, ROTA_MEGA, ROTA_QUINA, ROTA_LOTOFACIL } from "./Rotas";
import { COR_DE_FUNDO, COR_LOTOFACIL, COR_LOTOMAIA, COR_MEGA, COR_QUINA } from "../constants/Cores";
import Resultados from "../telas/Resultados";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (

        <Drawer.Navigator initialRouteName={ROTA_RESULTADOS}>
            <Drawer.Screen options={{ drawerItemStyle: { backgroundColor: COR_DE_FUNDO }, headerStyle: { backgroundColor: COR_DE_FUNDO } }} name={ROTA_RESULTADOS} component={Resultados} />
            <Drawer.Screen options={{ drawerItemStyle: { backgroundColor: COR_LOTOFACIL }, headerStyle: { backgroundColor: COR_LOTOFACIL } }} name={ROTA_LOTOFACIL} component={Lotofacil} />
            <Drawer.Screen options={{ drawerItemStyle: { backgroundColor: COR_LOTOMAIA }, headerStyle: { backgroundColor: COR_LOTOMAIA } }} name={ROTA_LOTOMANIA} component={Lotomania} />
            <Drawer.Screen options={{ drawerItemStyle: { backgroundColor: COR_MEGA }, headerStyle: { backgroundColor: COR_MEGA } }} name={ROTA_MEGA} component={MegaSena} />
            <Drawer.Screen options={{ drawerItemStyle: { backgroundColor: COR_QUINA }, headerStyle: { backgroundColor: COR_QUINA } }} name={ROTA_QUINA} component={Quina} />
        </Drawer.Navigator>

    );
}