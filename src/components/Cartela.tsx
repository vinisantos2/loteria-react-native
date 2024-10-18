
import { StyleSheet, View } from 'react-native';
import { COR_BOTAO, COR_BRANCO, COR_FUNDO_CARTELA } from '../constants/Cores';
import Botao from './Botao';
import { converterString } from '../utils/ultil';
import ViewText from './ViewText';

export default function Cartela({ dezenas, numerosSelecionados, salvarNumeroNaLista, cor, tervo = false }) {

    return (
        <View style={styles.cartela}>

            {Array.from({ length: dezenas }).map((_, index) => (
                <Botao
                    //verifica se o número ja esta no array
                    corJogo={numerosSelecionados.includes(converterString(index, tervo)) ? cor : COR_BOTAO}
                    salvaNumero={() => salvarNumeroNaLista(converterString(index, tervo))}
                    key={index}
                    numero={converterString(index, tervo)} />
            ))}

        </View>
    )

}

const styles = StyleSheet.create({

    cartela: {
        width: '95%',
        backgroundColor: COR_FUNDO_CARTELA,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 15,
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

})