import { StyleSheet, View } from "react-native";
import TextView from "../components/TextView";
import LocalGanhador from "../model/LocalGanhador";
import { gerarKey } from "../utils/ultil";

export default function ItemLocalGanhadores({ array }) {
    const arrayGanhadores: Array<LocalGanhador> = array
    return (
        <View>
            {arrayGanhadores.map(item => {
                return (
                    <View style={styles.content} key={gerarKey()}>
                        <View style={styles.viewItems}>
                            <TextView value={"UF estado: "} />
                            <TextView value={item.uf} />
                        </View>

                        <View style={styles.viewItems}>
                            <TextView value={"Municipio: "} />
                            <TextView value={item.municipio} />
                        </View>
                        <View style={styles.viewItems}>
                            <TextView value={"Posição: "} />
                            <TextView value={item.posicao.toString()} />
                        </View>
                        <View style={styles.viewItems}>
                            <TextView value={"Ganhadores: "} />
                            <TextView value={item.ganhadores.toString()} />
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        borderWidth: 2,
        marginVertical: 5
    },
    viewItems: {
        flexDirection: "row",
        justifyContent: "center"
    }
})