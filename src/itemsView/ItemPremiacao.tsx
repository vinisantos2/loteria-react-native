


import { StyleSheet, Text, View } from 'react-native';
import ViewText from '../components/ViewText';
import { COR_BRANCO, COR_RESULTADOS, COR_FUNDO_CARTELA } from '../constants/Cores';
import { formatarReal, gerarKey } from '../utils/ultil';
import { premicaoDoBanco, Premio } from '../model/Premio';

export default function ItemPremiacao({ array, doBanco, limite }) {
    const arrayPremiacao: Array<Premio> = array

    return (
        <View>
            {arrayPremiacao.map((item, i) => {
                if (i > limite) return
                const premio: Premio = doBanco ? premicaoDoBanco(item) : item
                const valor = doBanco ? premio.valorPremio : formatarReal(premio.valorPremio)
                return (
                    <View key={gerarKey()} style={styles.viewItem}>
                        <ViewText cor='#FFF' value={premio.faixa + "º Prêmio "} />
                        <ViewText cor='#FFF' value={"Quantidade de acertos: " + premio.descricao} />
                        <ViewText cor='#FFF' value={"Nº de ganhadores: " + premio.ganhadores} />
                        <ViewText cor='#FFF' value={"Valor premio: " + valor} />
                    </View>
                )
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    viewItem: {
        borderWidth: 1,
        backgroundColor: COR_RESULTADOS,
        padding: 5,
        alignItems: 'center'
    },

    item: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: COR_FUNDO_CARTELA,
        margin: 1,
        padding: 5,
        elevation: 5
    }

})
