
import { ScrollView, StyleSheet, TouchableOpacity, View, } from 'react-native';
import TextView from '../components/TextView';
import { COR_BRANCO } from '../constants/Cores';
import ItemPremiacao from './ItemPremiacao';
import { ViewLegenda } from '../components/ViewLegendaJogo';
import { ViewSorteados } from '../components/ViewSorteados';
import { JogoSorteado } from '../model/jogoSorteado';
import ViewInfoProximoConcurso from '../components/ViewInfoProximoConcurso';
import { Ionicons } from "@expo/vector-icons";
import { ROTA_DETALHES } from '../rotas/Rotas';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import ItemLocalGanhadores from './ItemLocalGanhadores';
import ViewEsconderIcone from '../telas/Views/ViewEsconderCartela';
import { useState } from 'react';
import { mudaCor } from '../utils/ultil';

export default function ItemJogo({ item, cor = "#001122" }) {
    const jogoSorteado: JogoSorteado = item
    const arrayData = jogoSorteado.data.split('/')
    const diaMes = arrayData[0] + "/" + arrayData[1]
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const [viewResultado, setViewResultado] = useState(false)
    function nav(cor) {
        navigation.navigate(ROTA_DETALHES, { jogoSorteado, cor })
    }

    return (
        <View style={[styles.content]}>
            <ViewLegenda jogo={jogoSorteado.loteria === "MAIS MILIONÁRIA" ? "MILIONÁRIA" : jogoSorteado.loteria} numeroConcurso={jogoSorteado.concurso} cor={mudaCor(jogoSorteado.loteria)} data={jogoSorteado.data} />

            <ViewSorteados
                arrayDezenas={jogoSorteado.dezenas}
                arrayDezenas2={jogoSorteado.dezenas2}
                cor={cor}
                mesSorte={jogoSorteado.mesSorte}
                time={jogoSorteado.timeCoracao}
                trevos={jogoSorteado.trevos}
                arrayLoteca={jogoSorteado.loteca}
            />

            <ItemPremiacao array={jogoSorteado.premiacoes} limite={viewResultado ? 10 : 0} doBanco={true} />
            {viewResultado ? <ItemLocalGanhadores array={jogoSorteado.localGanhadores} /> : null}
            <ViewEsconderIcone cor='#000' valor={viewResultado ? "Menos detahlhes" : "Mais dedathes"} viewCartela={viewResultado} setViewCartela={setViewResultado} />
            <ViewInfoProximoConcurso cor={cor} jogo={jogoSorteado} />

        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        backgroundColor: COR_BRANCO
    },

    botao: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: "blue",
        justifyContent: 'center',
        borderRadius: 15,
        marginVertical: 5,
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