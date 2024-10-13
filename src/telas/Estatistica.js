import { View } from "react-native";
import ViewText from "../components/ViewText";
import ItemEstatistica from "../itemsView/ItemEstatistica";

export default function TelaEstatistica() {
    return (
        <View style={STYLES.estatistica}>
            {arrayEstatistica.length > 1 ? arrayEstatistica.map(item => {
                return (
                    <ItemEstatistica key={gerarKey()} obj={item} cor={cor} />
                )
            }) : null}
        </View>
    )
}