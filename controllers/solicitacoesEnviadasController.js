class SolicitacoesEnviadasController{
    constructor(solicitacoesTableId){
        this.solicitacoesTableEl = document.getElementById(solicitacoesTableId);
        this.onLoad();        
    }

    onLoad(){        
        var tabelaSolicitacoes = this.solicitacoesTableEl
        var solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
        console.log(solicitacoes);
        
        solicitacoes.forEach((solicitacao, index) => {
            console.log(solicitacao)
            var solicitacaoTr = montaTr(solicitacao);
            tabelaSolicitacoes.appendChild(solicitacaoTr);
        })            
    }



}

let solicitacoesEnviadasController = new SolicitacoesEnviadasController("tabela-solicitacoes")

function montaTr(solicitacao){

    var solicitacaoTr = document.createElement("tr");        
    solicitacaoTr.appendChild(montaTd(solicitacao._departamento));
    solicitacaoTr.appendChild(montaTd(solicitacao._cargo));
    solicitacaoTr.appendChild(montaTd(solicitacao._tipoVaga));
    solicitacaoTr.appendChild(montaTd(solicitacao._localVaga));
    solicitacaoTr.appendChild(montaTd(solicitacao._qtdVagas));
    solicitacaoTr.appendChild(montaTd(solicitacao._requisitos));
    solicitacaoTr.appendChild(montaTd(solicitacao._motivo));
    solicitacaoTr.appendChild(montaTd(solicitacao._status));

    return solicitacaoTr
}
function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);   

    return td;
}
