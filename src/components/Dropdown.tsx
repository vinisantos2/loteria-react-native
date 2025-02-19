import { View, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

export const Dropdown = ({ click, placeHolder, array }) => {
    return (
        <View style={[styles.container]}>
            <RNPickerSelect

                onValueChange={click}
                items={array}
                placeholder={{ label: placeHolder, value: null }}
                style={pickerStyles}
                useNativeAndroidPickerStyle={false} // Para customizar no Android
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    }
});

const pickerStyles = {
    placeholder: {
        color: "#555",
        fontWeight: "bold",
        textAlign: "center",
    },
    inputAndroid: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 8,
    },
    inputIOS: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 8,
    }
};
