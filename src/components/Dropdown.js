import { StyleSheet, View } from "react-native";

import RNPickerSelect from 'react-native-picker-select';
import { gerarKey } from "../utils/ultil";
export const Dropdown = ({ valor, click, placeHolder, array }) => {

    return (
        <View
      
        >
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={array}
                placeholder={placeHolder}
            />

        </View>
    );

};


const styles = StyleSheet.create({
    viewSelect: {


    }
})