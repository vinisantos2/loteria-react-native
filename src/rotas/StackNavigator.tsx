
import TelaEstatistica from "../telas/Estatistica";
import { createStackNavigator } from "@react-navigation/stack";
import { textDrawer } from "./DrawerItemStyle";
import { HeaderStyleStack } from "./HeaderStyle";
import {  ROTA_ESTATISTICA, ROTA_SOBRE } from "./Rotas";
import { DrawerNav } from "./DrawerNavigator";
import TelaSobre from "../telas/Sobre";


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
            <Stack.Screen name={ROTA_SOBRE} component={TelaSobre} />
        </Stack.Navigator>
    )
}