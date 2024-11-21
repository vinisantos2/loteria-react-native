import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { DIA, DUPLA,
     FEDERAL,
     LOTECA, LOTOFACIL, 
     LOTOMANIA, MEGA, MILIONARIA, QUINA,
      SUPER, TIME } from "../constants/Nomes";
import {
    COR_DE_FUNDO,
    COR_DIA, COR_DUPLA,
    COR_FEDERAL, COR_LOTECA,
    COR_LOTOFACIL, COR_LOTOMAIA,
    COR_MEGA, COR_MILIONARIA, COR_QUINA,
    COR_RESULTADOS,
    COR_SUPER_SETE, COR_TIME
} from "../constants/Cores";
import { Alert } from 'react-native';
import { Estatistica } from '../model/Estatistica';
import { JogoSorteado } from '../model/jogoSorteado';

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

export function estatistica(arrayJogos: Array<JogoSorteado>, arrayEstatistica: Array<Estatistica>) {
    arrayJogos.map((item, i) => {
        item.dezenas.map(num => {
            arrayEstatistica.map((obj => {
                if (obj.dezena === num) {
                    obj.contador++
                }
            }))
        })
    })

    return arrayEstatistica
}

export function formatarReal(num) {
    return new Intl.NumberFormat('pt-br', { currency: "BRL", style: 'currency' }).format(num)

}



export function conexao(array: Array<Object>) {
    if (array.length < 1) {
        return true
    } else {
        return false
    }

}


// export async function axiosBusca(url) {

//     let arrayJogos = await axios(url)
//         .then(resp => resp.data)
//         .catch(e => {
//             console.log('erro: ' + e)
//             return
//         })
//     let array = []
//     if (arrayJogos) {
//         array = arrayJogos.map((item) => item.dezenas);
//     }
//     return array

// }
export async function axiosBusca(url) {

    let arrayJogos = await axios(url).then(resp => resp.data)
        .catch(e => {
            console.log('erro: ' + e)
            return []
        })

    return arrayJogos

}
export async function jogoSorteados(array: Array<JogoSorteado>) {
    if (array.length < 1) return []

    let arrayJogos: Array<JogoSorteado> = []
    array.map(item => {
        arrayJogos.push(item)
    })

    return arrayJogos

}



export function converterString(n, trevo) {
    if (trevo) {
        return (n + 1).toString()
    }

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
        let num = converterString(Math.floor(Math.random() * qtdDezenas), false);
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

export function mudaCor(jogo) {

    switch (jogo) {
        case MEGA:
            return COR_MEGA
        case QUINA:
            return COR_QUINA
        case LOTOFACIL:
            return COR_LOTOFACIL
        case LOTOMANIA:
            return COR_LOTOMAIA
        case LOTOMANIA:
            return COR_LOTOMAIA
        case DUPLA:
            return COR_DUPLA
        case TIME:
            return COR_TIME
        case MILIONARIA:
            return COR_MILIONARIA
        case LOTECA:
            return COR_LOTECA
        case FEDERAL:
            return COR_FEDERAL
        case SUPER:
            return COR_SUPER_SETE
        case DIA:
            return COR_DIA
        default:
            return COR_DE_FUNDO
    }
}
