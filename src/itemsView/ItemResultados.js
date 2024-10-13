
import { StyleSheet, View, } from 'react-native';
import ViewText from '../components/ViewText';
import DezenasSelecionados from './DezenasSelecionados';
import { COR_BRANCO, COR_FUNDO_CARTELA } from '../constants/Cores';
import ViewLoteca from '../components/ViewLoteca';
import { gerarKey } from '../utils/ultil';
import ItemPremiacao from './ItemPremiacao';
import { ViewLegenda } from '../components/ViewLegendaJogo';
import { ViewSorteados } from '../components/ViewSorteados';


export default function ItemResultados({ item, indice, cor = "#001122" }) {

    const jogo = item["loteria"]
    const numeroConcurso = item["concurso"]
    const acumulou = item["acumulou"]
    const arrayDezenas = item["dezenas"]
   // const arrayDezenas2 = item["resultado"]["dezenas_2"]
    //const arrayLoteca = item["resultado"]["resultado_equipes_esportivas"]
    const data = item["data"]
    // const trevos = item["resultado"]["trevos_sorteados"]
    // const time = item["resultado"]["time_coracao"]
    // const mesSorte = item["resultado"]["mes_da_sorte"]
    // const arrayPremiacao = item["resultado"]["premiacao"]
    return (
        <View style={styles.content}>
            <ViewLegenda jogo={jogo} numeroConcurso={numeroConcurso} cor={cor} data={data} />
            <View style={styles.view}>
                <ViewText value={acumulou ? "Acumulado" : null}></ViewText>
            </View>

            <ViewSorteados arrayDezenas={arrayDezenas}
                // arrayDezenas2={arrayDezenas2}
                cor={cor}
               // mesSorte={mesSorte}
                // time={time}
                // trevos={trevos}
                //arrayLoteca={arrayLoteca}
            />


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