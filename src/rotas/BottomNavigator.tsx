
import TelaEstatistica from "../telas/Estatistica";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { textDrawer } from "./DrawerItemStyle";
import { ROTA_ESTATISTICA, ROTA_SOBRE } from "./Rotas";
import { DrawerNav } from "./DrawerNavigator";
import TelaSobre from "../telas/Sobre";
import { COR_RESULTADOS } from "../constants/Cores";
import Lotofacil from "../telas/Lotofacil";
import { Estatistica } from "../model/Estatistica";
import Lotomania from "../telas/Lotomania";
import TelaInformacoes from "../telas/InformacoesJogo";


const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={"Jogo"} component={Lotofacil}

            />
           
            <Tab.Screen options={{
            }} name={"Informações"} component={TelaInformacoes} />

        </Tab.Navigator>
    )
}