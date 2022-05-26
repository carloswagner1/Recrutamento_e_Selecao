class AvaliarSolicitacaoController{
    constructor(containerID, solicitacoesTableId){
        this.containerEl = document.getElementById(containerID);
        this.solicitacoesTableEl = document.getElementById(solicitacoesTableId);
        this.onLoad();
        this.onClick();        
    }
    onLoad(){        
        var tabelaSolicitacoes = this.solicitacoesTableEl;        
        var solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');//pega todas solicitacoes
        // filtrando para pegar somente as solicitações com statis "em análise"
        var solicitacoesEmAnalise = solicitacoes.filter(solicitacao => solicitacao._status === "Em Análise");
        
        
        if (solicitacoesEmAnalise.length === 0){
            this.containerEl.innerHTML = `<h3>Não há solicitações para avaliação</h3>`
        }else{
            solicitacoesEmAnalise.forEach((solicitacao, index) => {                
                var solicitacaoTr = montaTr(solicitacao);
                tabelaSolicitacoes.appendChild(solicitacaoTr);
            })            
        }         
        
    }
    onClick(){
        var btn = document.querySelectorAll('.btn');
        var table = document.getElementById('tabela-solicitacoes')
        btn.forEach((item, index) => {
            item.addEventListener('click', () => {
                var campo = (item.parentNode).parentNode
                var linhas = btn.length/2
                var solicitacaoValues = getValues(campo, btn[index]);
                //SALVAR NO BANCO DE DADOS COM O NOVO VALOR
                var solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
                solicitacoes.map(solicitacao =>{
                    if(solicitacao._cargo == solicitacaoValues._cargo){
                        Object.assign(solicitacao, solicitacaoValues);
                    }
                })

                localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));

                //Excluir linha da tabela
                (item.parentNode).parentNode.classList.add("fadeOut");
                                
                setTimeout(function(){
                    (item.parentNode).parentNode.remove();
                    //parentNode é o pai do alvo                    
                }, 500)
                console.log(table.childElementCount)
                               
                if(table.childElementCount === 1){
                    this.containerEl.innerHTML = `<h3>Não há solicitações para avaliação</h3>`
                }
                                
            })
        })
    }
}

let avaliarSolicitacaoController = new AvaliarSolicitacaoController("main-container","tabela-solicitacoes")

function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add('solicitacao');        
    solicitacaoTr.appendChild(montaTd(solicitacao._departamento, "departamento"));
    solicitacaoTr.appendChild(montaTd(solicitacao._cargo, "cargo"));
    solicitacaoTr.appendChild(montaTd(solicitacao._tipoVaga, "tipoVaga"));
    solicitacaoTr.appendChild(montaTd(solicitacao._localVaga, "localVaga"));
    solicitacaoTr.appendChild(montaTd(solicitacao._qtdVagas, "qtdVagas"));
    solicitacaoTr.appendChild(montaTd(solicitacao._requisitos, "requisitos"));
    solicitacaoTr.appendChild(montaTd(solicitacao._motivo, "motivo"));
    solicitacaoTr.appendChild(montaTdBtn("acoes"));

    return solicitacaoTr
}
function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
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
function getValues(campo, btn) {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '[]');
    let solicitacaoValues = {
        _departamento: '',
        _cargo: '',
        _tipoVaga: '',
        _localVaga: '',
        _qtdVagas: '',
        _requisitos: '',
        _motivo: '',
        _idUsuario: '',
        _status: '',        
    }
    console.log(campo)
    var dados = campo.childNodes;

    for(var i = 0; i < dados.length; i++){
        switch(dados[i].className){
            case 'departamento':
                solicitacaoValues._departamento = dados[i].innerHTML;
                break;
            case 'cargo':
                solicitacaoValues._cargo = dados[i].innerHTML;
                break;
            case 'tipoVaga':
                solicitacaoValues._tipoVaga = dados[i].innerHTML;
                break;
            case 'localVaga':
                solicitacaoValues._localVaga = dados[i].innerHTML;
                break;
            case 'qtdVagas':
                solicitacaoValues._qtdVagas = dados[i].innerHTML;
                break;     
            case 'requisitos':
                solicitacaoValues._requisitos = dados[i].innerHTML;
                break;
            case 'motivo':
                solicitacaoValues._motivo = dados[i].innerHTML;
                break;
        }        
    }
    if(btn.value === 'Aprovado'){
        solicitacaoValues._status = 'Aprovada'
    }else{
        solicitacaoValues._status = 'Reprovada'
    }
    solicitacaoValues._idUsuario = userLogado.id;
       
    return solicitacaoValues;
} 
