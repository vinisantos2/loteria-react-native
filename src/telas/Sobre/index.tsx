import { ScrollView, StyleSheet, View } from "react-native";
import TextView from "../../components/TextView";
import { TXT_ARMAZENAMENTO, TXT_MAIS, TXT_SOBRE_APP } from "../../constants/Constants";

export default function TelaSobre() {
    return (
        <ScrollView style={{ padding: 10, backgroundColor: "#E3F5F8"}}>
            <View style={styles.viewItems}>
                <TextView cor="#000" textAlign={'justify'} value={TXT_SOBRE_APP} />
            </View>
            <View style={styles.viewItems}>
                <TextView cor="#000" textAlign={'justify'} value={TXT_MAIS} />
            </View>
            <View style={styles.viewItems}>
                <TextView cor="#000" textAlign={'justify'} value={TXT_ARMAZENAMENTO} />
            </View>
            <View style={styles.viewItems}>
                <TextView cor="#000" textAlign={'center'} value={"Desenvolvido por: "} />
                <TextView cor="#000" fontWeight={"bold"} textAlign={'center'} value={"Marcus Vinicius"} />
            </View>
            <View style={styles.viewItems}>
                <TextView cor="#000" textAlign={'center'} value={"Contato: "} />
                <TextView cor="blue" fontWeight={"bold"} textAlign={'center'} value={"vinicius11santos1992@gmail.com"} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewItems: {
        flexDirection: "row",
        marginTop: 20,
        flexWrap: "wrap",
        justifyContent: "center"

    }
})