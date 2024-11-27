
import { StyleSheet, View, } from 'react-native';
import TextView from './TextView';
import {COR_LEGENDA } from '../constants/Cores';


export default function LegendaView({ nomeJogo, cor }) {

    return (
        <View style={[styles.titulo, { backgroundColor: cor }]}>
            <TextView fontWeight={"bold"} fontSize={25} cor="#FFF" value={nomeJogo} />
        </View>
    )

}

const styles = StyleSheet.create({

    legenda: {
        backgroundColor: COR_LEGENDA,
        padding: 5,
        width: "33.33%",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"

    },
    titulo: {
        width: "100%",
        padding: 15,
        alignItems: "center"

    },


})