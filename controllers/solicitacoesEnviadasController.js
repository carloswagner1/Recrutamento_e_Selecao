class SolicitacoesEnviadasController{
    constructor(containerID, solicitacoesTableId){
        this.containerEl = document.getElementById(containerID)
        this.solicitacoesTableEl = document.getElementById(solicitacoesTableId);
        this.onLoad();        
    }

    onLoad(){        
        var tabelaSolicitacoes = this.solicitacoesTableEl
        var solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');        

        if (solicitacoes.length === 0){
            this.containerEl.innerHTML = `<h3>Não há solicitações enviadas por este usuário</h3>`
        }else{
            solicitacoes.forEach((solicitacao, index) => {
                var solicitacaoTr = montaTr(solicitacao);
                tabelaSolicitacoes.appendChild(solicitacaoTr);
            })   
        }         
    }
}

let solicitacoesEnviadasController = new SolicitacoesEnviadasController("main-container","tabela-solicitacoes")

function montaTr(solicitacao){

    var solicitacaoTr = document.createElement("tr");        
    solicitacaoTr.appendChild(montaTd(solicitacao._departamento, "departamento"));
    solicitacaoTr.appendChild(montaTd(solicitacao._cargo, "cargo"));
    solicitacaoTr.appendChild(montaTd(solicitacao._tipoVaga, "tipo-vaga"));
    solicitacaoTr.appendChild(montaTd(solicitacao._localVaga, "local-vaga"));
    solicitacaoTr.appendChild(montaTd(solicitacao._qtdVagas, "qtd-vagas"));
    solicitacaoTr.appendChild(montaTd(solicitacao._requisitos, "requisitos"));
    solicitacaoTr.appendChild(montaTd(solicitacao._motivo, "motivo"));
    solicitacaoTr.appendChild(montaTd(solicitacao._status, "status"));

    return solicitacaoTr
}
function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);   

    return td;
}
