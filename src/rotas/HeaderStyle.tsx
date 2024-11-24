import { DrawerHeaderProps } from "@react-navigation/drawer"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import TextView from "../components/TextView"
import { Ionicons } from "@expo/vector-icons";
import { StackHeaderProps } from "@react-navigation/stack";
import { COR_RESULTADOS } from "../constants/Cores";

export function HeaderStyleDrawer(props: DrawerHeaderProps) {
    function abrirMenu() {
        return props.navigation.openDrawer()
    }
    return (
        <View
            style={[styles.content, props.options.drawerItemStyle]}
        >
            {/* VIew icone */}
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => abrirMenu()}>
                <Ionicons style={styles.icon} name="menu" size={35} color={"#fff"} />
            </TouchableOpacity>
            <View style={styles.legenda}>
                <TextView cor="#FFF" fontSize={20} fontWeight={"bold"} value={props.route.name} />
            </View>

        </View>
    )

}


export function HeaderStyleStack(props: StackHeaderProps) {
    function voltar() {
        return props.navigation.goBack()
    }
    return (
        <View
            style={[styles.content,]}
        >
            {/* VIew icone */}
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => voltar()}>
                <Ionicons style={styles.icon} name="arrow-back" size={35} color={"#fff"} />
                <View style={styles.legenda}>
                    <TextView cor="#FFF" fontSize={20} fontWeight={"bold"} value={"Voltar"} />
                </View>
            </TouchableOpacity>


        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: COR_RESULTADOS

    },
    icon: {


    },
    legenda: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10
    }
})