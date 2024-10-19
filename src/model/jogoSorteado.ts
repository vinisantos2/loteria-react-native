export class JogoSorteado {
    dezenas: Array<String>
    concurso: string
    data: string
    trevos: Array<String>

    constructor(
        dezenas: Array<String>,
        concurso: string,
        data: string,
        trevos: Array<String>
    ) {
        this.dezenas = dezenas
        this.concurso = concurso
        this.data = data
        this.trevos = trevos
    }
}

