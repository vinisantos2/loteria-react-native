import { ScrollView, StyleSheet } from "react-native";
import { COR_DE_FUNDO } from "../constants/Cores";

export default function Layout({...outros}) {
    return (
        <ScrollView style={styles.content}    {...outros} />
    )

}

const styles = StyleSheet.create({
    content: {
        backgroundColor: COR_DE_FUNDO,
        alignContent: "center",
        
        
    }
})