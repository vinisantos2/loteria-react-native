
import { Text } from 'react-native';



export default function ViewText({ value, fontSize = 15 }) {

    return (
        <Text style={{ color: "#FFF", fontSize: fontSize }}>{value}</Text>
    )

}

