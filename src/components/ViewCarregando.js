
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';
import { COR_BRANCO, COR_RESULTADOS } from '../constants/Cores';


export default function ViewCarregando({ carregando }) {


    return (
        <Modal>
            <View style={{ backgroundColor: COR_RESULTADOS, flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator color="#0000ff" size={'large'} animating={carregando} />
            </View>
        </Modal>



    )

}

const styles = StyleSheet.create({
    botao: {
        margin: 5,
        backgroundColor: '#fff',
        width: 50,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },

    textBotao: {
        color: 'black',
        fontSize: 15,
    },
})