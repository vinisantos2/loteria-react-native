
import { Text } from 'react-native';



export default function TextView({ cor = "#FFF", value = "", fontSize = 20,
    fontWeight = undefined, textAlign = undefined }) {

    return (
        <Text style={{ color: cor, fontSize: fontSize, fontWeight: fontWeight, textAlign: textAlign }}>{value}</Text>
    )

}

