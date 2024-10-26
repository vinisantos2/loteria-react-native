
import { ScrollView, StyleSheet, View, } from 'react-native';
import ViewText from '../components/ViewText';
import { COR_BRANCO } from '../constants/Cores';
import ItemPremiacao from './ItemPremiacao';
import { ViewLegenda } from '../components/ViewLegendaJogo';
import { ViewSorteados } from '../components/ViewSorteados';
import { JogoSorteado } from '../model/jogoSorteado';


export default function ItemJogo({ item, cor = "#001122" }) {
    const jogoSorteado: JogoSorteado = item
    const arrayData = jogoSorteado.data.split('/')
    const diaMes = arrayData[0] + "/" + arrayData[1]
    const FONT = 25

    return (
        <View style={styles.content}>
            <ViewLegenda jogo={jogoSorteado.loteria} numeroConcurso={jogoSorteado.concurso} cor={cor} data={diaMes} />
            <View style={styles.view}>
                <ViewText cor='#000' fontSize={FONT} value={jogoSorteado.acumulou ? "Acumulado" : null}></ViewText>
                <ViewText cor='#000' fontSize={FONT} value={"Próximo concurso: " + jogoSorteado.dataProximoConcurso}></ViewText>
                <ViewText cor='#000' fontSize={FONT} value={"Estimativa Próximo concurso: " + jogoSorteado.valorProximoConcurso}></ViewText>
            </View>

            <ViewSorteados
                arrayDezenas={jogoSorteado.dezenas}
                arrayDezenas2={jogoSorteado.dezenas2}
                cor={cor}
                mesSorte={jogoSorteado.mesSorte}
                time={jogoSorteado.timeCoracao}
                trevos={jogoSorteado.trevos}
                arrayLoteca={jogoSorteado.loteca}
            />

            <ItemPremiacao array={jogoSorteado.premiacoes} limite={1}  doBanco={true} />
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