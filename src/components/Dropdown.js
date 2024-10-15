import { StyleSheet, View } from "react-native";

import RNPickerSelect from 'react-native-picker-select';

export const Dropdown = ({ valor, click, placeHolder, array }) => {

    return (
        <View
        >
            <RNPickerSelect
                onValueChange={click}
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