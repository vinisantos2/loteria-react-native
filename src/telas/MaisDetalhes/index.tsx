import { ScrollView, View } from "react-native";
import { JogoSorteado } from "../../model/jogoSorteado";
import { ViewLegenda } from "../../components/ViewLegendaJogo";
import { ViewSorteados } from "../../components/ViewSorteados";
import ItemPremiacao from "../../itemsView/ItemPremiacao";
import ItemLocalGanhadores from "../../itemsView/ItemLocalGanhadores";
import RodapeBanner from "../../components/RodapeBanner";

export default function MaisDetalhes({ route }) {
    const { jogoSorteado } = route.params ? route.params : "";
    const { cor } = route.params ? route.params : "";
    const jogo: JogoSorteado = jogoSorteado
    const arrayData = jogo.data.split('/')
    const diaMes = arrayData[0] + "/" + arrayData[1]
    return (
        <>

            <ScrollView>
                <ViewLegenda jogo={jogo.loteria} numeroConcurso={jogo.concurso} cor={cor} data={diaMes} />

                <ViewSorteados
                    arrayDezenas={jogo.dezenas}
                    arrayDezenas2={jogo.dezenas2}
                    cor={cor}
                    mesSorte={jogo.mesSorte}
                    time={jogo.timeCoracao}
                    trevos={jogo.trevos}
                    arrayLoteca={jogo.loteca}
                />

                <ItemPremiacao array={jogo.premiacoes} limite={10} doBanco={true} />
                <ItemLocalGanhadores array={jogo.localGanhadores} />

            </ScrollView>
            <RodapeBanner />
        </>
    )
}