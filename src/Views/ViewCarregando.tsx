
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';
import {  CORES } from '../constants/Cores';


export default function ViewCarregando({  }) {

    return (
        <Modal visible={true}>
            <View style={{ backgroundColor: CORES.GERAL.RESULTADOS, flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator color="#0000ff" size={'large'} animating={true} />
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