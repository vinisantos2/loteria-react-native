import { StyleSheet, View } from "react-native";
import TextView from "../../../components/TextView";
import { CORES } from "../../../constants/Cores";

export default function ViewNumDeJogos({ numJogos = 0 }) {
    return (
        <View style={styles.container}>
            <TextView 
                cor="#000" 
                fontWeight="bold"
                fontSize={16}
                value={`Comparar com ${numJogos} jogos já sorteados`} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        padding: 12,
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: CORES.GERAL.FUNDO_CARTELA,
        alignItems: "center",
        alignSelf: "center",
        elevation: 4, // Sombreamento no Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});
