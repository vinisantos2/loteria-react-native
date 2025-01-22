


import { StyleSheet, View } from 'react-native';
import TextView from '../components/TextView';
import { COR_RESULTADOS, COR_FUNDO_CARTELA } from '../constants/Cores';
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
                        <TextView cor='#FFF' value={premio.faixa + "º Prêmio "} />
                        <TextView cor='#FFF' value={"Quantidade de acertos: " + premio.descricao} />
                        <TextView cor='#FFF' value={"Nº de ganhadores: " + premio.ganhadores} />
                        <TextView cor='#FFF' value={"Valor premio: " + valor} />
                    </View>
                )
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    viewItem: {
        padding: 5,
        alignItems: 'center',
        borderWidth:2
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
