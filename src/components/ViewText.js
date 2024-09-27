
import { Text } from 'react-native';
import { COR_PRETO } from '../constants/Cores';



export default function ViewText({cor = COR_PRETO, value, fontSize = 20 }) {

    return (
        <Text style={{  color: cor, fontSize: fontSize }}>{value}</Text>
    )

}

