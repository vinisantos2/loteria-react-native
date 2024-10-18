import { COR_BRANCO } from "../constants/Cores";
import ViewText from "./ViewText";
import { StyleSheet, View } from "react-native";


export function ViewLegenda({ jogo, numeroConcurso, cor, data }) {
    return (
        <View style={[styles.viewLegenda, { backgroundColor: cor }]} >
            <View>
                <ViewText  value={jogo} cor={COR_BRANCO} fontWeight={"bold"} fontSize={30}></ViewText>
            </View>

            <View style={styles.item}>
                <ViewText value={"concurso"} cor={COR_BRANCO} fontWeight={"bold"} fontSize={15}></ViewText>
                <ViewText value={numeroConcurso} cor={COR_BRANCO} fontWeight={"bold"} fontSize={15}></ViewText>
            </View>
            <View style={styles.item}>
                <ViewText value={"Data"} cor={COR_BRANCO} fontWeight={"bold"} fontSize={15}></ViewText>
                <ViewText value={data} cor={COR_BRANCO} fontWeight={"bold"} fontSize={15}></ViewText>
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