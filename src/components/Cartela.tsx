
import { StyleSheet, View } from 'react-native';
import { CORES } from '../constants/Cores';
import Botao from './Botao';
import { converterString } from '../utils/ultil';

export default function Cartela({ dezenas, numerosSelecionados, salvarNumeroNaLista, cor, tervo = false }) {

    return (
        <View style={styles.cartela}>

            {Array.from({ length: dezenas }).map((_, index) => (
                <Botao
                    //verifica se o número ja esta no array
                    corJogo={numerosSelecionados.includes(converterString(index, tervo)) ? cor : CORES.GERAL.BOTAO}
                    salvaNumero={() => salvarNumeroNaLista(converterString(index, tervo))}
                    key={index}
                    numero={converterString(index, tervo)} />
            ))}

        </View>
    )

}

const styles = StyleSheet.create({

    cartela: {
        
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: "90%",
        padding: 12,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: CORES.GERAL.FUNDO_CARTELA,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'center',
        elevation: 4, // Sombreamento no Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

})