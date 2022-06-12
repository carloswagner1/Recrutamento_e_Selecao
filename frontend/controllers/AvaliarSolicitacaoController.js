import { sendRequest } from "../utils/ApiUtils.js";

class AvaliarSolicitacaoController {

    constructor(containerID, solicitacoesTableId){
        this.containerEl = document.getElementById(containerID);
        this.solicitacoesTableEl = document.getElementById(solicitacoesTableId);
        this.onLoad();       
    }

    onLoad() { 

        var tabelaSolicitacoes = this.solicitacoesTableEl;        

        // setting the url
        const url = "/solicitacoes/usuarios/" + localStorage.getItem("id_usuario") + "/aprovacao";

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            if (response.status == 200) {

                let solicitacoes = response.body;

                if (solicitacoes.length === 0) {
                    this.containerEl.innerHTML = `<h3>Não há solicitações para avaliação</h3>`;
                }
                else {
                    solicitacoes.forEach((solicitacao, index) => {
                        var solicitacaoTr = montaTr(solicitacao);
                        tabelaSolicitacoes.appendChild(solicitacaoTr);
                    })   
                } 
            }
            else {
                this.containerEl.innerHTML = `<h3>Não há solicitações para avaliação</h3>`;
            }

            this.onClick(); 
        });  
    }

    onClick() {

        var btn = document.querySelectorAll('.btn');
        var table = document.getElementById('tabela-solicitacoes')

        btn.forEach((item, index) => {

            item.addEventListener('click', () => {

                var campo = (item.parentNode).parentNode.childNodes[0].innerHTML;

                let escolha;

                if (btn[index].value === 'Aprovado') {
                    escolha = 'aprovar';
                }
                else {
                    escolha = 'reprovar';
                }

                //SALVAR NO BANCO DE DADOS COM O NOVO VALOR

                // setting the url
                const url = "/solicitacoes/" + campo + "/" + escolha;

                console.log(url);
                
                // enviando a request e salvando a promise
                const responsePromise = sendRequest('GET', url, "");

                responsePromise.then(response => {

                    // log para debuggar
                    console.log(response);

                    if (response.status == 200) {

                        //Excluir linha da tabela
                        (item.parentNode).parentNode.classList.add("fadeOut");
                                        
                        setTimeout(function() {
                            (item.parentNode).parentNode.remove();
                            //parentNode é o pai do alvo                    
                        }, 500)
                        
                        console.log(table.childElementCount)
                                    
                        if (table.childElementCount === 1) {
                            this.containerEl.innerHTML = `<h3>Não há solicitações para avaliação</h3>`
                        }
                    }
                })                  
            })
        })
    }
}

let avaliarSolicitacaoController = new AvaliarSolicitacaoController("main-container","tabela-solicitacoes")

function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add('solicitacao');      
    solicitacaoTr.appendChild(montaTdHidden(solicitacao.id, "id"));  
    solicitacaoTr.appendChild(montaTd(solicitacao.departamento, "departamento"));
    solicitacaoTr.appendChild(montaTd(solicitacao.cargo, "cargo"));
    solicitacaoTr.appendChild(montaTd(solicitacao.tipoVaga, "tipoVaga"));
    solicitacaoTr.appendChild(montaTd(solicitacao.localVaga, "localVaga"));
    solicitacaoTr.appendChild(montaTd(solicitacao.qtdVagas, "qtdVagas"));
    solicitacaoTr.appendChild(montaTd(solicitacao.requisitos, "requisitos"));
    solicitacaoTr.appendChild(montaTd(solicitacao.motivo, "motivo"));
    solicitacaoTr.appendChild(montaTdBtn("acoes"));

    return solicitacaoTr
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);   

    return td;
}

function montaTdHidden(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.hidden = "hidden";
    td.classList.add(classe);   

    return td;
}

function montaTdBtn(classe){
    var td = document.createElement("td");
    td.innerHTML = `

        <button type="button" class="btn btn-success" value="Aprovado">Aprovar</button>
        <button type="button" class="btn btn-danger" value="Reprovado">Reprovar</button>
`;
    td.classList.add(classe); 
    return td;
}
