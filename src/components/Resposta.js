import { Text, StyleSheet, View } from "react-native";
import ViewText from "./ViewText";


export default function Resposta() {
   

    return (

        <View>
            {/* {array.map(item => (
                <View><ViewText value={item} /></View>
             ))} */}

        </View>

    )

}

const style = StyleSheet.create({

    botao: {
        borderColor: 'black',
        borderWidth: 2,
        elevation: 50,
        borderRadius: 10,
        padding: 10,
        width: '45%',
        alignItems: 'center',
        marginTop: 10,

    }
})