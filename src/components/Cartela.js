
import { StyleSheet, View } from 'react-native';
import { COR_FUNDO_CARTELA } from '../constants/Cores';
import Botao from './Botao';
import { converterString } from '../utils/ultil';

export default function Cartela({ dezenas, numerosSelecionados, salvarNumeroNaLista, cor}) {

    return (
        <View style={styles.cartela}>

            {Array.from({ length: dezenas }).map((_, index) => (
                <Botao
                    corJogo={numerosSelecionados.includes(converterString(index)) ? cor : "#fff"}
                    numeros={numerosSelecionados}
                    salvaNumero={() => salvarNumeroNaLista(converterString(index))}
                    key={index}
                    numero={converterString(index)} />
            ))}

        </View>
    )

}

const styles = StyleSheet.create({

    cartela: {
        width: '90%',
        backgroundColor: COR_FUNDO_CARTELA,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 15,
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

})