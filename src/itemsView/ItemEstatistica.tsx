


import { StyleSheet, View } from 'react-native';
import TextView from '../components/TextView';

export default function ItemEstatistica({ obj, total }) {


    return (
        <View style={styles.viewItens}>

            <View style={styles.item}>
                <TextView fontWeight={"bold"} cor='#FFF' fontSize={20} value={obj.dezena} />
            </View>
            <View style={styles.item}>
                <TextView fontWeight={"bold"} cor='#FFF' fontSize={20} value={obj.contador} />
            </View>
            <View style={styles.item}>
                <TextView fontWeight={"bold"} cor='#FFF' fontSize={20} value={(obj.contador / total * 100).toFixed(2) + "%"} />
            </View>

            <TextView value={obj.contador} />
            <TextView value={" Porcentagem " + (obj.contador / total * 100).toPrecision(4) + "%"} />
        </View>

    )

}

const styles = StyleSheet.create({

    item: {
        width: "33.33%",
        backgroundColor: "#002233",
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },

    viewItens: {

        flexDirection: 'row',

    },



})
