import { createDrawerNavigator } from "@react-navigation/drawer";

import Lotofacil from "../telas/Lotofacil";
import Lotomania from "../telas/Lotomania";
import MegaSena from "../telas/MegaSena";
import Quina from "../telas/Quina";
import HomeScreen from "../telas/Home";
import { HOME, LOTOFACIL, LOTOMANIA, MEGA, QUINA } from "./Rotas";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator initialRouteName={HOME}>
            <Drawer.Screen name={HOME} component={HomeScreen} />
            <Drawer.Screen name={LOTOFACIL} component={Lotofacil} />
            <Drawer.Screen name={LOTOMANIA} component={Lotomania} />
            <Drawer.Screen name={MEGA} component={MegaSena} />
            <Drawer.Screen name={QUINA} component={Quina} />
        </Drawer.Navigator>

    );
}