import { TouchableOpacity } from "react-native";
import TextView from "../components/TextView";
import { Ionicons } from "@expo/vector-icons";

export default function ViewEsconderIcone({ viewCartela, valor, setViewCartela }) {
    return (
        <TouchableOpacity
            accessibilityLabel="Botão para mostrar ou esconder a caixa"
            style={{ alignSelf: 'center', alignItems: 'center' }}
            onPress={() => setViewCartela(!viewCartela)} >
            <TextView value={valor} />
            <Ionicons name={viewCartela ? 'caret-up' : 'caret-down'} size={100} />
        </TouchableOpacity>
    )
}