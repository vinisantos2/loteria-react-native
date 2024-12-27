import { Animated, StyleProp, TextStyle, View, ViewStyle } from "react-native";


export function styloDrwer(cor: string): StyleProp<ViewStyle> {
    return { backgroundColor: cor, }
}

export function textDrawer(): StyleProp<TextStyle> {
    return { textAlign: "center", fontSize: 23,
         fontWeight: "bold", color: "#FFF", }
}
export function headerTitleStyle(): Animated.WithAnimatedValue<StyleProp<TextStyle>> {
    return { textAlign: "center", fontSize: 30, fontWeight: "bold", color: "#FFF" }
}

