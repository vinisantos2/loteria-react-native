
import { StyleSheet, View, } from 'react-native';
import ViewText from '../components/ViewText';
import DezenasSelecionados from './DezenasSelecionados';
import { COR_BRANCO, COR_FUNDO_CARTELA } from '../constants/Cores';
import ViewLoteca from '../components/ViewLoteca';
import { formatarReal, gerarKey } from '../utils/ultil';
import ItemPremiacao from './ItemPremiacao';
import { ViewLegenda } from '../components/ViewLegendaJogo';
import { ViewSorteados } from '../components/ViewSorteados';


export default function ItemJogo({ item, indice, cor = "#001122" }) {
    const a = []
    a.length
    const jogo = item["loteria"]
    const numeroConcurso = item["resultado"]["numero_concurso"]
    const acumulou = item["resultado"]["acumulou"]
    const valorProximoConcurso = formatarReal(item["resultado"]["valor_estimado_proximo_concurso"])
    const arrayDezenas = item["resultado"]["dezenas"]
    const arrayDezenas2 = item["resultado"]["dezenas_2"]
    const arrayLoteca = item["resultado"]["resultado_equipes_esportivas"]
    const data = item["resultado"]["data_concurso"]
    const dataProximo = item["resultado"]["data_proximo_concurso"]
    const trevos = item["resultado"]["trevos_sorteados"]
    const time = item["resultado"]["time_coracao"]
    const mesSorte = item["resultado"]["mes_da_sorte"]
    const arrayPremiacao = item["resultado"]["premiacao"]
    const arrayData = data.split('/')
    const diaMes = arrayData[0] + "/" + arrayData[1]

    return (
        <View style={styles.content}>
            <ViewLegenda jogo={jogo} numeroConcurso={numeroConcurso} cor={cor} data={diaMes} />
            <View style={styles.view}>
                <ViewText value={acumulou ? "Acumulado" : null}></ViewText>
                <ViewText value={"Próximo concurso: " + dataProximo}></ViewText>
                <ViewText value={"Estimativa Próximo concurso: " + valorProximoConcurso + ""}></ViewText>
            </View>

            <ViewSorteados arrayDezenas={arrayDezenas}
                arrayDezenas2={arrayDezenas2}
                cor={cor}
                mesSorte={mesSorte}
                time={time}
                trevos={trevos}
                arrayLoteca={arrayLoteca}
            />

            <ItemPremiacao arrayPremiacao={arrayPremiacao} />

        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        backgroundColor: COR_BRANCO
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 5
    },

})