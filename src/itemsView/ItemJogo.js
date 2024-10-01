
import { StyleSheet, View, } from 'react-native';
import ViewText from '../components/ViewText';
import DezenasSelecionados from './DezenasSelecionados';
import { COR_BRANCO, COR_FUNDO_CARTELA } from '../constants/Cores';
import ViewLoteca from '../components/ViewLoteca';
import { gerarKey } from '../utils/ultil';
import ItemPremiacao from './ItemPremiacao';


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
    const arrayPremiacao = item["resultado"]["premiacao"]
    return (
        <View style={styles.content}>
            <View style={[styles.viewLegenda, { backgroundColor: cor }]} >
                <ViewText value={jogo} fontSize={30}></ViewText>
            </View>
            <View style={styles.view}>
                <ViewText value={"Concurso: " + numeroConcurso}></ViewText>
                <ViewText value={"Concurso data: " + data}></ViewText>
                <ViewText value={acumulou ? "Acumulou: Sim" : " Acumulou: Não"}></ViewText>
                <ViewText value={"Valor proximo concurso: " + valorProximoConcurso}></ViewText>
                {trevos ?
                    <View style={{ flexDirection: 'row' }}>
                        <ViewText value={"Trevos: "} />
                        <DezenasSelecionados numerosSelecionados={trevos} cor={cor} />
                    </View>
                    : null}
                {time ?
                    <View style={{ flexDirection: 'row' }}>
                        <ViewText value={"Time do coração: "} />
                        <View  style={[styles.item, { backgroundColor: cor }]}>
                            <ViewText value={time} />
                        </View>
                    </View>
                    : null}
                {mesSorte ?

                    <View style={{ flexDirection: 'row' }}>
                        <ViewText value={"Mês da sorte: "} />
                        <View style={[styles.item, { backgroundColor: cor }]}>
                            <ViewText value={mesSorte} />
                        </View>
                    </View>

                    : null}
            </View>
            {!arrayDezenas.length < 1 ?
                <DezenasSelecionados key={gerarKey()} numerosSelecionados={arrayDezenas} cor={cor} />
                : <ViewLoteca key={gerarKey()} arrayLoteca={arrayLoteca} />}
            {arrayDezenas2 ?
                <DezenasSelecionados key={gerarKey()} numerosSelecionados={arrayDezenas2} cor={cor} />
                : null}
            <ItemPremiacao arrayPremiacao={arrayPremiacao} />
        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        backgroundColor: COR_FUNDO_CARTELA
    },
    item: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 5
    },

    view: {
        alignItems: 'flex-start',
        alignContent: 'center',
        textAlign: 'left',
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#808080"

    },
    viewLegenda: {
        width: "100%",
        backgroundColor: "#FFF",
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row'

    }
})