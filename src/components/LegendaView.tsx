
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import ViewText from './ViewText';
import { COR_BRANCO, COR_DIA, COR_FUNDO_CARTELA, COR_LEGENDA } from '../constants/Cores';


export default function LegendaView({ nomeJogo, cor }) {

    return (
        <View style={[styles.titulo, { backgroundColor: cor }]}>
            <ViewText fontWeight={"bold"} fontSize={25} cor="#FFF" value={nomeJogo} />
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