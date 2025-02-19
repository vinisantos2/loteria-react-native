import { StyleSheet, View } from "react-native";
import ButtonView from "../components/ButtonView";


export default function View2Botoes({ onPress1, onPress2, txt1, txt2, limite = false }) {

    return (
        <View style={styles.content}>
            <ButtonView onPress={onPress1} value={txt1} />
            <ButtonView disabled={limite} onPress={onPress2} value={txt2} />
        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        borderRadius: 15,
        marginVertical: 10,
        justifyContent: "space-around"
    },


})