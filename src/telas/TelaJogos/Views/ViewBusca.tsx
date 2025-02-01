import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import TextView from "../../../components/TextView";

export default function ViewBusca({ numConcurso, setNumConcurso, onPress }) {

    return (
        <View style={styles.viewBusca}>
            <View style={styles.viewInput} >
                <TextInput keyboardType="number-pad"
                    value={numConcurso} onChangeText={setNumConcurso}
                    style={styles.input}
                    placeholder="Buscar por concurso" />
            </View>
            <TouchableOpacity onPress={onPress}
                style={styles.botao}>
                <TextView value="Buscar" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    botao: {
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
        marginLeft: 5,
        borderRadius: 15,
        marginTop: 10,
        backgroundColor: "blue",
        borderWidth: 2
    },

    input: {
        padding: 10,
        fontSize: 25,
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 15,
        borderWidth: 2,
    },
    viewBusca: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10
    },

    viewInput: {
        flexDirection: "row",
        width: '70%',
        marginTop: 10,
        justifyContent: "space-between",
    },



})