import { sendRequest } from "../utils/ApiUtils.js";

class SolicitacoesEnviadasController {

    constructor(containerID, solicitacoesTableId) {
        this.containerEl = document.getElementById(containerID)
        this.solicitacoesTableEl = document.getElementById(solicitacoesTableId);
        this.onLoad();        
    }

    onLoad() {   

        // setting the url
        const url = "/solicitacoes/usuarios/" + localStorage.getItem("id_usuario");

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            if (response.status == 200) {

                let solicitacoes = response.body;

                if (solicitacoes.length === 0) {
                    this.containerEl.innerHTML = `<h3>Não há solicitações enviadas por este usuário</h3>`;
                }
                else {
                    solicitacoes.forEach((solicitacao, index) => {
                        var solicitacaoTr = montaTr(solicitacao);
                        tabelaSolicitacoes.appendChild(solicitacaoTr);
                    })   
                } 
            }
            else {
                this.containerEl.innerHTML = `<h3>Não há solicitações enviadas por este usuário</h3>`;
            }
        })

        var tabelaSolicitacoes = this.solicitacoesTableEl
    }
}

let solicitacoesEnviadasController = new SolicitacoesEnviadasController("main-container","tabela-solicitacoes")

function montaTr(solicitacao){

    var solicitacaoTr = document.createElement("tr");        
    solicitacaoTr.appendChild(montaTd(solicitacao.departamento, "departamento"));
    solicitacaoTr.appendChild(montaTd(solicitacao.cargo, "cargo"));
    solicitacaoTr.appendChild(montaTd(solicitacao.tipoVaga, "tipo-vaga"));
    solicitacaoTr.appendChild(montaTd(solicitacao.localVaga, "local-vaga"));
    solicitacaoTr.appendChild(montaTd(solicitacao.qtdVagas, "qtd-vagas"));
    solicitacaoTr.appendChild(montaTd(solicitacao.requisitos, "requisitos"));
    solicitacaoTr.appendChild(montaTd(solicitacao.motivo, "motivo"));
    solicitacaoTr.appendChild(montaTd(solicitacao.status, "status"));

    return solicitacaoTr
}
function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);   

    return td;
}
