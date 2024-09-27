import { createDrawerNavigator } from "@react-navigation/drawer";

import Lotofacil from "../telas/Lotofacil";
import Lotomania from "../telas/Lotomania";
import MegaSena from "../telas/MegaSena";
import Quina from "../telas/Quina";
import HomeScreen from "../telas/Home";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Lotofacil" component={Lotofacil} />
            <Drawer.Screen name="Lotomania" component={Lotomania} />
            <Drawer.Screen name="Mega Sena" component={MegaSena} />
            <Drawer.Screen name="Quina" component={Quina} />
        </Drawer.Navigator>

    );
}