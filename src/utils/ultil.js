import axios from 'axios'

import { Alert } from 'react-native';



export function gerarKey() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]";
    var passwordLength = 16;
    var password = "";

    for (var i = 0; i < passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}


export async function axiosBusca(url) {

    let arrayJogos = await axios(url).then(resp => resp.data)
        .catch(e => console.log('erro: ' + e))

    let array = arrayJogos.map((item) => item.dezenas);

    return array

}
export async function axiosUltimos(url) {

    let arrayJogos = await axios(url).then(resp => resp.data)
        .catch(e => console.log('erro: ' + e))



    return arrayJogos

}

export function converterString(n) {

    if (n + 1 < 10) {
        return '0' + (n + 1)
    } else if ((n + 1) >= 10 && (n + 1) < 100) {
        return (n + 1).toString()
    } else if ((n + 1) > 99) {
        return '00'
    }

}


export function preencher(array, dezenas, qtdDezenas) {
    while (array.length < dezenas) {
        let num = converterString(Math.floor(Math.random() * qtdDezenas));

        if (!array.includes(num))
            array.push(num)

    }

    array.sort();

    return array
}

export function salvarNumeroNaLista(numero, array, limite) {

    const arrayTemp = array

    console.log("valor de n: " + numero)
    // verifica se usuario ja escolheu a dezena
    if (arrayTemp.includes(numero)) {
        const index = arrayTemp.indexOf(numero)
        if (index > -1) {
            array.splice(index, 1);
            array.sort()
            return arrayTemp
        }
    }

    if (array.length == limite) {
        Alert.alert("Alerta: ", "Quantidade de números selecionados no máximo")
        return arrayTemp
    }

    arrayTemp.push(numero)

    arrayTemp.sort()

    return arrayTemp

}
