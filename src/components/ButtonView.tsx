import { StyleSheet, TouchableOpacity } from 'react-native';
import TextView from './TextView';
import { CORES } from '../constants/Cores';

export default function ButtonView({ onPress, value, disabled = false }) {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.botao, disabled && styles.botaoDesabilitado]}
            onPress={onPress}
            activeOpacity={0.7} // Efeito ao pressionar
        >
            <TextView
                fontWeight="bold"
                cor={disabled ? CORES.GERAL.BRANCO : CORES.GERAL.BRANCO}
                value={value}
                fontSize={23}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: CORES.GERAL.BOTAO,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: "33%", // Mais espaçamento para melhor toque
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 5, // Efeito de sombra no Android
    },
    botaoDesabilitado: {
        backgroundColor: CORES.GERAL.BOTAO, // Cor diferente para botão desabilitado
        borderColor: "#AAA",
    }
});
