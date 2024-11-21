import { TouchableOpacity } from "react-native";
import ViewText from "../../components/ViewText";
import { Ionicons } from "@expo/vector-icons";

export default function ViewEsconderIcone({ viewCartela, valor, setViewCartela, cor = "#fff" }) {
    return (
        <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center' }} onPress={() => setViewCartela(!viewCartela)} >
            <ViewText value={valor} cor={cor} />
            <Ionicons name={viewCartela ? 'caret-up' : 'caret-down'} size={100} />
        </TouchableOpacity>
    )
}