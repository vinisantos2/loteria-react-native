


import { StyleSheet, Text, View } from 'react-native';
import ViewText from '../components/ViewText';
import { COR_BRANCO, COR_DUPLA, COR_FUNDO_CARTELA, COR_LOTOFACIL } from '../constants/Cores';

export default function ItemPremiacao({ arrayPremiacao }) {
    const faixa = arrayPremiacao[0]['faixa']
    const numeroGanhadores = arrayPremiacao[0]["numero_ganhadores"]
    const valorPremio = arrayPremiacao[0]["valor_premio"]
    const qtdAcertos = arrayPremiacao[0]["quantidade_acertos"]
    const faixa2 = arrayPremiacao[1]['faixa']
    const numeroGanhadores2 = arrayPremiacao[1]["numero_ganhadores"]
    const valorPremio2 = arrayPremiacao[1]["valor_premio"]
    const qtdAcertos2 = arrayPremiacao[1]["quantidade_acertos"]
    return (
        <View>
            <View style={styles.viewItem}>
                <ViewText value={"Faixa: " + faixa} />
                <ViewText value={"Quantidade de acertos: " + qtdAcertos} />
                <ViewText value={"Nº de ganhadores: " + numeroGanhadores} />
                <ViewText value={"Valor premio: " + valorPremio} />

            </View>
            <View style={styles.viewItem}>
                <ViewText value={"Faixa: " + faixa2} />
                <ViewText value={"Quantidade de acertos: " + qtdAcertos2} />
                <ViewText value={"Nº de ganhadores: " + numeroGanhadores2} />
                <ViewText value={"Valor premio: " + valorPremio2} />

            </View>



        </View>
    )

}

const styles = StyleSheet.create({

    viewItem: {
        borderWidth: 1,
        backgroundColor: "#808080",
        padding: 5
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
