
import TelaEstatistica from "../telas/Estatistica";
import { createStackNavigator } from "@react-navigation/stack";
import { textDrawer } from "./DrawerItemStyle";
import { ROTA_ESTATISTICA, ROTA_SOBRE } from "./Rotas";
import { DrawerNav } from "./DrawerNavigator";
import TelaSobre from "../telas/Sobre";
import { COR_RESULTADOS } from "../constants/Cores";


const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: textDrawer(),
                headerStyle:{backgroundColor: COR_RESULTADOS},
                headerTintColor: "#FFF"

            }}
            initialRouteName="nav">
            <Stack.Screen options={{ headerShown: false }} name="nav" component={DrawerNav} />
            <Stack.Screen name={ROTA_ESTATISTICA} component={TelaEstatistica} />
            <Stack.Screen name={ROTA_SOBRE} component={TelaSobre} />
        </Stack.Navigator>
    )
}