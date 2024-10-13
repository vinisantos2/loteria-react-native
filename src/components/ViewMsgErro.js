import { StyleSheet, View } from "react-native";
import { COR_DE_FUNDO, COR_MSG_ERRO } from "../constants/Cores";
import ViewText from "./ViewText";
import { ERRO_CONEXAO } from "../constants/Constants";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ViewMsgErro({ cor = COR_DE_FUNDO, ...outros }) {
    return (
        <View style={styles.content}>
            <ViewText value={ERRO_CONEXAO} />
            <Ionicons name="warning" size={30} />
        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        backgroundColor: COR_MSG_ERRO,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row"
    }
})