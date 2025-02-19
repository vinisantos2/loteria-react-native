import { StyleSheet, View } from "react-native";
import { CORES } from "../constants/Cores";
import { ERRO_CONEXAO } from "../constants/Constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import TextView from "../components/TextView";

export default function ViewMsgErro({ cor = CORES.GERAL.MSG_ERRO, ...outros }) {
    return (
        <View style={[styles.content, { backgroundColor: cor }]} {...outros}>
            <Ionicons name="warning" size={30} color="white" accessibilityLabel="Ícone de aviso" />
            <TextView value={ERRO_CONEXAO} />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
    },
});
