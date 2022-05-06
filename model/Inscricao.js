class Inscricao{
    constructor(idInscricao, idCandidato, idProcesso, dataInscricao, situacao, pontuacaoTeste){
        this.idInscricao = idInscricao;
        this.idCandidato = idCandidato;
        this.idProcesso = idProcesso;
        this.dataInscricao = dataInscricao;
        this. situacao = situacao;
        this.pontuacaoTeste = pontuacaoTeste;
    }
    get idInscricao(){
        return this.idInscricao;
    }
    get idCandidato(){
        return this.idCandidato;
    }
    get idProcesso(){
        return this.idProcesso;
    }
    get dataInscricao(){
        return this.dataInscricao;
    }
    get situacao(){
        return this.situacao;
    }
    get pontuacaoTeste(){
        return this.pontuacaoTeste;
    }
}