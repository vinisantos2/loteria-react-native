import { formatarReal } from "../utils/ultil"

export class Premio {
    descricao: string
    faixa: number
    ganhadores: string
    valorPremio: string
}

export function premicaoDoBanco(item) {
    const premio = new Premio
    premio.faixa = item['faixa']
    premio.ganhadores = item["numero_ganhadores"]
    premio.valorPremio = formatarReal(item["valor_premio"])
    premio.descricao = item["quantidade_acertos"]
    return premio
}
