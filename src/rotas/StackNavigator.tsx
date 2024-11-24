
import TelaEstatistica from "../telas/Estatistica";
import { createStackNavigator } from "@react-navigation/stack";
import { textDrawer } from "./DrawerItemStyle";
import { HeaderStyleStack } from "./HeaderStyle";
import { ROTA_ESTATISTICA } from "./Rotas";
import { DrawerNav } from "./DrawerNavigator";


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
        </Stack.Navigator>
    )
}