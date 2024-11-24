import { StyleSheet, View } from "react-native";
import TextView from "../components/TextView";
import Layout from "../components/Layout";
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
                            <TextView cor="#000" value={"UF estado: "} />
                            <TextView cor="#000" value={item.uf} />
                        </View>

                        <View style={styles.viewItems}>
                            <TextView cor="#000" value={"Municipio: "} />
                            <TextView cor="#000" value={item.municipio} />
                        </View>
                        <View style={styles.viewItems}>
                            <TextView cor="#000" value={"Posição: "} />
                            <TextView cor="#000" value={item.posicao.toString()} />

                        </View>
                        <View style={styles.viewItems}>
                            <TextView cor="#000" value={"Ganhadores: "} />
                            <TextView cor="#000" value={item.ganhadores.toString()} />
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