
import { StyleSheet, View, } from 'react-native';
import ItemPremiacao from './ItemPremiacao';
import { ViewLegenda } from '../Views/ViewLegendaJogo';

import { JogoSorteado } from '../model/jogoSorteado';
import ViewInfoProximoConcurso from '../Views/ViewInfoProximoConcurso';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import ItemLocalGanhadores from './ItemLocalGanhadores';
import ViewEsconderIcone from '../Views/ViewEsconderCartela';
import { useState } from 'react';
import { mudaCor } from '../utils/ultil';
import { ViewSorteados } from '../Views/ViewSorteados';

export default function ItemJogo({ item, cor = "#001122" }) {
    const jogoSorteado: JogoSorteado = item
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const [viewResultado, setViewResultado] = useState(false)


    return (
        <View style={[styles.content, { backgroundColor: cor }]}>
            <ViewLegenda jogo={jogoSorteado.loteria === "MAIS MILIONÁRIA" ? "MILIONÁRIA" : jogoSorteado.loteria}
                numeroConcurso={jogoSorteado.concurso}
                cor={mudaCor(jogoSorteado.loteria)} data={jogoSorteado.data} />

            <ViewSorteados
                arrayDezenas={jogoSorteado.dezenas}
                arrayDezenas2={jogoSorteado.dezenas2}
                cor={"#123"}
                mesSorte={jogoSorteado.mesSorte}
                time={jogoSorteado.timeCoracao}
                trevos={jogoSorteado.trevos}
                arrayLoteca={jogoSorteado.loteca}
            />
            <ViewInfoProximoConcurso  jogo={jogoSorteado} />
            <ItemPremiacao array={jogoSorteado.premiacoes} limite={viewResultado ? 10 : 0} doBanco={true} />

            {viewResultado ? <ItemLocalGanhadores array={jogoSorteado.localGanhadores} /> : null}
            <ViewEsconderIcone valor={viewResultado ? "Menos detahlhes" : "Mais dedathes"} viewCartela={viewResultado} setViewCartela={setViewResultado} />

        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        
    },

    botao: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: "blue",
        justifyContent: 'center',
        borderRadius: 15,
        width: "50%"
    },

    view: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 5,
        backgroundColor: "#87E0E7"
    },

})