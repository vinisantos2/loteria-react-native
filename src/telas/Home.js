import { StyleSheet, View } from "react-native";
import BotaoOpcao from "../components/BotaoOpcoes";
import Layout from "../components/Layout";

export default function HomeScreen({ navigation }) {
    return (
        <Layout>
            <View style={style.viewBotoes}>

                <BotaoOpcao text={"Lotofácil"} cor={"#9A368F"} nav={() => navigation.navigate("Lotofacil")} />
                <BotaoOpcao text={"Lotomania"} cor={"#F7791A"} nav={() => navigation.navigate("Lotomania")} />
                <BotaoOpcao text={"Mega sena"} cor={'#25B577'} nav={() => navigation.navigate("Mega Sena")} />
                <BotaoOpcao text={"Quina"} cor={'#2A2DA8'} nav={() => navigation.navigate('Quina')} />
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

