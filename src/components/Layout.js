import { ScrollView, StyleSheet, Text } from "react-native";
import { COR_DE_FUNDO } from "../constants/Cores";
import { StatusBar } from "expo-status-bar";
import ViewCarregando from "./ViewCarregando";
import ViewMsgErro from "./ViewMsgErro";

export default function Layout({ cor = COR_DE_FUNDO, ...outros }) {
    return (

        <ScrollView style={[styles.content, { backgroundColor: cor }]} {...outros} >

        </ScrollView>

    )

}

const styles = StyleSheet.create({
    content: {
        alignContent: "center",
    }
})