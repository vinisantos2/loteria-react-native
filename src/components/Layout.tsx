import { ScrollView, StyleSheet, Text } from "react-native";
import { COR_DE_FUNDO } from "../constants/Cores";


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