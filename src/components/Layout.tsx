import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COR_DE_FUNDO } from "../constants/Cores";


export default function Layout({ cor = COR_DE_FUNDO, ...outros }) {
    return (
        <ScrollView style={[styles.content, { backgroundColor: cor }]} {...outros} />
    )

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignContent: "center",
    }
})