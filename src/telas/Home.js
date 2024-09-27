import { StyleSheet, View } from "react-native";
import BotaoOpcao from "../components/BotaoOpcoes";
import Layout from "../components/Layout";
import { COR_LOTOFACIL, COR_LOTOMAIA, COR_MEGA, COR_QUINA } from "../constants/Cores";
import { LOTOFACIL, LOTOMANIA, MEGA, QUINA } from "../rotas/Rotas";

export default function HomeScreen({ navigation }) {
    return (
        <Layout>
            <View style={style.viewBotoes}>
                <BotaoOpcao text={LOTOFACIL} cor={COR_LOTOFACIL} nav={() => navigation.navigate(LOTOFACIL)} />
                <BotaoOpcao text={LOTOMANIA} cor={COR_LOTOMAIA} nav={() => navigation.navigate(LOTOMANIA)} />
                <BotaoOpcao text={MEGA} cor={COR_MEGA} nav={() => navigation.navigate(MEGA)} />
                <BotaoOpcao text={QUINA} cor={COR_QUINA} nav={() => navigation.navigate(QUINA)} />
            </View>

        </Layout>

    );
}


const style = StyleSheet.create({
    viewBotoes: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 5,
        flexWrap: 'wrap'
    },

})

