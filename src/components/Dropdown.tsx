import { StyleSheet, View } from "react-native";

import RNPickerSelect from 'react-native-picker-select';

export const Dropdown = ({ valor, click, placeHolder, array }) => {

    return (
        <View
        >
            <RNPickerSelect
                onValueChange={click}
                items={array}
                placeholder={{
                    label: placeHolder,
                }}

                style={{
                    placeholder: { color: "#000", fontWeight: "bold" },
                    inputAndroid: {
                        alignItems: "center",
                        justifyContent: "center",


                    }
                }}
            />

        </View>
    );

};


const styles = StyleSheet.create({
    viewSelect: {


    }
})