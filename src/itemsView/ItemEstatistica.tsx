import { StyleSheet, View } from 'react-native';
import TextView from '../components/TextView';

export default function ItemEstatistica({ obj, total }) {
    return (
        <View style={styles.card}>
            <View style={styles.item}>
                <TextView fontWeight="bold" cor="#FFF" fontSize={18} value={obj.dezena} />
            </View>
            <View style={styles.item}>
                <TextView fontWeight="bold" cor="#FFF" fontSize={18} value={obj.contador} />
            </View>
            <View style={styles.item}>
                <TextView fontWeight="bold" cor="#FFF" fontSize={18} value={(obj.contador / total * 100).toFixed(2) + "%"} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: "#003366", // Azul mais suave
     
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3, // Efeito de sombra no Android
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    item: {
        width: "33.33%",
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
