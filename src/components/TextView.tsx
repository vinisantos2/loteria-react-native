
import { Text } from 'react-native';
import { COR_BRANCO, COR_PRETO } from '../constants/Cores';



export default function TextView({ cor = "#FFF", value = "", fontSize = 20, fontWeight = undefined }) {

    return (
        <Text style={{ color: cor, fontSize: fontSize, fontWeight: 'bold' }}>{value}</Text>
    )

}

