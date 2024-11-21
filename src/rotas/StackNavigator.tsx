import { createDrawerNavigator, DrawerHeaderProps } from "@react-navigation/drawer";

import TelaEstatistica from "../telas/Estatistica";
import { createStackNavigator } from "@react-navigation/stack";
import { textDrawer } from "./DrawerItemStyle";
import { HeaderStyleStack } from "./HeaderStyle";
import TelaBusca from "../telas/TelaBusca";
import MaisDetalhes from "../telas/MaisDetalhes";
import { ROTA_BUSCA, ROTA_DETALHES, ROTA_ESTATISTICA } from "./Rotas";
import { DrawerNav } from "./DrawerNavigator";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                header: HeaderStyleStack,
                headerTitleStyle: textDrawer(),
                headerTintColor: "#FFF"
            }}
            initialRouteName="nav">
            <Stack.Screen options={{ headerShown: false, title: '' }} name="nav" component={DrawerNav} />
            <Stack.Screen name={ROTA_ESTATISTICA} component={TelaEstatistica} />
            <Stack.Screen name={ROTA_DETALHES} component={MaisDetalhes} />
        </Stack.Navigator>
    )
}