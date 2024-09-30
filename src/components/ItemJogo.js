
import { StyleSheet, View, } from 'react-native';
import ViewText from './ViewText';
import DezenasSelecionados from './DezenasSelecionados';
import { COR_FUNDO_CARTELA } from '../constants/Cores';
import ViewLoteca from './ViewLoteca';
import { gerarKey } from '../utils/ultil';


export default function ItemJogo({ item, indice, cor = "#001122" }) {
    const a = []
    a.length
    const jogo = item["loteria"]
    const numeroConcurso = item["resultado"]["numero_concurso"]
    const acumulou = item["resultado"]["acumulou"]
    const valorProximoConcurso = item["resultado"]["valor_estimado_proximo_concurso"]
    const arrayDezenas = item["resultado"]["dezenas"]
    const arrayDezenas2 = item["resultado"]["dezenas_2"]
    const arrayLoteca = item["resultado"]["resultado_equipes_esportivas"]
    const data = item["resultado"]["data_concurso"]
    const trevos = item["resultado"]["trevos_sorteados"]
    const time = item["resultado"]["time_coracao"]
    const mesSorte = item["resultado"]["mes_da_sorte"]
    return (
        <View style={styles.content}>
            <View style={[styles.viewLegenda, { backgroundColor: cor }]} >
                <ViewText value={jogo} fontSize={30}></ViewText>
            </View>
            <View style={styles.view}>
                <ViewText value={"Concurso: " + numeroConcurso}></ViewText>
                <ViewText value={"Concurso data: " + data}></ViewText>
                <ViewText value={"Acumulou: " + acumulou}></ViewText>
                <ViewText value={"Valor proximo concurso: " + valorProximoConcurso}></ViewText>
                {trevos ?
                    <ViewText value={"Trevos: " + trevos} />
                    : null}
                {time ?
                    <ViewText value={"Time do coração: " + time} />
                    : null}
                {mesSorte ?
                    <ViewText value={"Mês da sorte: " + mesSorte} />
                    : null}
            </View>
            {!arrayDezenas.length < 1 ?
                <DezenasSelecionados key={gerarKey()} numerosSelecionados={arrayDezenas} cor={cor} />
                : <ViewLoteca key={gerarKey()} arrayLoteca={arrayLoteca} />}
            {arrayDezenas2 ?
                <DezenasSelecionados key={gerarKey()} numerosSelecionados={arrayDezenas2} cor={cor} />
                : null}
        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        backgroundColor: COR_FUNDO_CARTELA
    },

    view: {
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        textAlign: 'left',
        width: "100%",
        backgroundColor: COR_FUNDO_CARTELA

    },
    viewLegenda: {
        width: "100%",
        backgroundColor: "#FFF",
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row'

    }
})