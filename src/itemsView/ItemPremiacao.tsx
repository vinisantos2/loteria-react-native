


import { StyleSheet, Text, View } from 'react-native';
import ViewText from '../components/ViewText';
import { COR_BRANCO, COR_RESULTADOS, COR_DUPLA, COR_FUNDO_CARTELA, COR_LOTOFACIL } from '../constants/Cores';
import { formatarReal } from '../utils/ultil';

export default function ItemPremiacao({ arrayPremiacao }) {
    const faixa = arrayPremiacao[0]['faixa']
    const numeroGanhadores = arrayPremiacao[0]["numero_ganhadores"]
    const valorPremio = formatarReal(arrayPremiacao[0]["valor_premio"])
    const qtdAcertos = arrayPremiacao[0]["quantidade_acertos"]
    const faixa2 = arrayPremiacao[1]['faixa']
    const numeroGanhadores2 = arrayPremiacao[1]["numero_ganhadores"]
    const valorPremio2 = formatarReal(arrayPremiacao[1]["valor_premio"])
    const qtdAcertos2 = arrayPremiacao[1]["quantidade_acertos"]
    return (
        <View>
            <View style={styles.viewItem}>
                <ViewText cor='#FFF' value={faixa + "º Prêmio "} />
                <ViewText cor='#FFF' value={"Quantidade de acertos: " + qtdAcertos} />
                <ViewText cor='#FFF' value={"Nº de ganhadores: " + numeroGanhadores} />
                <ViewText cor='#FFF' value={"Valor premio: " + valorPremio} />
            </View>
            <View style={styles.viewItem}>
                <ViewText cor='#FFF' value={faixa2 + "º Prêmio "} />
                <ViewText cor='#FFF' value={"Quantidade de acertos: " + qtdAcertos2} />
                <ViewText cor='#FFF' value={"Nº de ganhadores: " + numeroGanhadores2} />
                <ViewText cor='#FFF' value={"Valor premio: " + valorPremio2} />

            </View>



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
