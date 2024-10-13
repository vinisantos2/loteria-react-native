


import { StyleSheet, Text, View } from 'react-native';
import ViewText from '../components/ViewText';

export default function ItemEstatistica({ obj, cor, total }) {


    return (
        <View style={styles.viewItens}>

            <View style={[styles.dezena, { backgroundColor: cor }]}>
                <ViewText fontWeight={"bold"} cor='#FFF' fontSize={10} value={obj.dezena} />
            </View>

            <ViewText value={obj.contador} />
            <ViewText value={" " + (obj.contador / total * 100).toPrecision(4) + "%"} />
        </View>

    )

}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        alignItems: 'center',
        padding: 5

    },

    viewItens: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dezena: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',

    }


})
