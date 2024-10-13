
import { Text } from 'react-native';
import { COR_BRANCO, COR_PRETO } from '../constants/Cores';



export default function ViewText({ cor = COR_PRETO, value, fontSize = 20, fontWeight }) {

    return (
        <Text style={{ color: cor, fontSize: fontSize, fontWeight: fontWeight }}>{value}</Text>
    )

}

