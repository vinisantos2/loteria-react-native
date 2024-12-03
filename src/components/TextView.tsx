
import { Text } from 'react-native';



export default function TextView({ cor = "#FFF", value = "", fontSize = 20, fontWeight = undefined }) {

    return (
        <Text style={{ color: cor, fontSize: fontSize, fontWeight: 'bold' }}>{value}</Text>
    )

}

