import { COR_BRANCO } from "../constants/Cores";
import TextView from "./TextView";
import { StyleSheet, View } from "react-native";


export function ViewLegenda({ jogo, numeroConcurso, cor, data }) {
    return (
        <View style={[styles.viewLegenda, { backgroundColor: cor }]} >
            <View>
                <TextView  value={jogo} cor={COR_BRANCO} fontWeight={"bold"} fontSize={30}></TextView>
            </View>

            <View style={styles.item}>
                <TextView value={"concurso"} cor={COR_BRANCO} fontWeight={"bold"} fontSize={15}></TextView>
                <TextView value={numeroConcurso} cor={COR_BRANCO} fontWeight={"bold"} fontSize={15}></TextView>
            </View>
            <View style={styles.item}>
                <TextView value={"Data"} cor={COR_BRANCO} fontWeight={"bold"} fontSize={15}></TextView>
                <TextView value={data} cor={COR_BRANCO} fontWeight={"bold"} fontSize={15}></TextView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    viewLegenda: {
        width: "100%",
        backgroundColor: "#FFF",
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',

    }

})