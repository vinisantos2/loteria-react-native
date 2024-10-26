import { formatarReal } from "../utils/ultil"
import { Premio } from "./Premio"

export class JogoSorteado {
    loteria: string
    concurso: string
    data: string
    dataProximoConcurso: string
    dezenas: Array<String>
    dezenas2: Array<String>
    trevos: Array<String>
    mesSorte: string
    timeCoracao: string
    premiacoes: Array<Premio>
    acumulou: boolean
    valorProximoConcurso: string
    loteca: Array<Object>
    pontos: string

}

export function jogoDoBanco(item) {
    const jogo = new JogoSorteado
    jogo.loteria = item['loteria']
    jogo.concurso = item["resultado"]["numero_concurso"]
    jogo.acumulou = item["resultado"]["acumulou"]
    jogo.valorProximoConcurso = formatarReal(item["resultado"]["valor_estimado_proximo_concurso"])
    jogo.dezenas = item["resultado"]["dezenas"]
    jogo.dezenas2 = item["resultado"]["dezenas_2"]
    jogo.loteca = item["resultado"]["resultado_equipes_esportivas"]
    jogo.data = item["resultado"]["data_concurso"]
    jogo.dataProximoConcurso = item["resultado"]["data_proximo_concurso"]
    jogo.trevos = item["resultado"]["trevos_sorteados"]
    jogo.timeCoracao =item["resultado"]["time_coracao"]
    jogo.mesSorte = item["resultado"]["mes_da_sorte"]
    jogo.premiacoes = item["resultado"]["premiacao"]
    return jogo

}

