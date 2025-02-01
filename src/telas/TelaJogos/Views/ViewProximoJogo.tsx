import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import style from "../../../../assets/style";
import TextView from "../../../components/TextView";
import { COR_BOTAO } from "../../../constants/Cores";
const sizeIcon = 45
const fontLegenda = 20
const corIcone = "#FFF"
export default function ViewProximoJogo({ onPressMais, onPressMenos }) {

    return (
        <View style={styles.content} >
            <TouchableOpacity onPress={onPressMenos} style={styles.viewBotao}>
                <Ionicons color={corIcone} name="play-back" size={sizeIcon} />
                <TextView fontSize={fontLegenda} value="Concurso anterior" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressMais} style={styles.viewBotao}>
                <Ionicons color={corIcone} name="play-forward" size={sizeIcon} />
                <TextView fontSize={fontLegenda} value="Próximo concurso" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        justifyContent: "space-around",
        width: "100%",
        flexDirection: "row"
    },
    viewBotao: {
        alignItems: "center",
        backgroundColor: COR_BOTAO,
        padding: 5,
        borderRadius: 15

    }
})