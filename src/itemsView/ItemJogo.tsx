
import { ScrollView, StyleSheet, TouchableOpacity, View, } from 'react-native';
import ViewText from '../components/ViewText';
import { COR_BRANCO } from '../constants/Cores';
import ItemPremiacao from './ItemPremiacao';
import { ViewLegenda } from '../components/ViewLegendaJogo';
import { ViewSorteados } from '../components/ViewSorteados';
import { JogoSorteado } from '../model/jogoSorteado';
import ViewInfo from '../components/ViewInfo';
import Botao from '../components/Botao';
import { Ionicons } from "@expo/vector-icons";
import { ROTA_DETALHES } from '../rotas/Rotas';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default function ItemJogo({ item, cor = "#001122" }) {
    const jogoSorteado: JogoSorteado = item
    const arrayData = jogoSorteado.data.split('/')
    const diaMes = arrayData[0] + "/" + arrayData[1]
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    function nav(cor) {
        navigation.navigate(ROTA_DETALHES, { jogoSorteado, cor})
    }

    return (
        <View style={styles.content}>
            <ViewLegenda jogo={jogoSorteado.loteria} numeroConcurso={jogoSorteado.concurso} cor={cor} data={diaMes} />
            <ViewSorteados
                arrayDezenas={jogoSorteado.dezenas}
                arrayDezenas2={jogoSorteado.dezenas2}
                cor={cor}
                mesSorte={jogoSorteado.mesSorte}
                time={jogoSorteado.timeCoracao}
                trevos={jogoSorteado.trevos}
                arrayLoteca={jogoSorteado.loteca}
            />

            <ItemPremiacao array={jogoSorteado.premiacoes} limite={1} doBanco={true} />
            <TouchableOpacity onPress={() => nav(cor)} style={styles.botao} >
                <ViewText value='Mais informações' />
            </TouchableOpacity>
            <ViewInfo jogo={jogoSorteado} />

        </View>
    )

}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        backgroundColor: COR_BRANCO
    },

    botao: {
        alignItems: 'center',
        backgroundColor: "blue",
        justifyContent: 'center',
        padding: 15
    },

    view: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 5,
        backgroundColor: "#87E0E7"
    },

})