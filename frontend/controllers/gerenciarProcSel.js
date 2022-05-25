class GerenciarProcessoController{
    constructor(containerID, solicitacoesTableId){
        this.containerEl = document.getElementById(containerID);
        this.solicitacoesTableEl = document.getElementById(solicitacoesTableId);        
        this.onLoad();                      
    }
    
    onLoad(){        
        var tabelaSolicitacoes = this.solicitacoesTableEl;        
        var solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');//pega todas solicitacoes
        // filtrando para pegar somente as solicitações com statis "em análise"
        var solicitacoesAprovadas = solicitacoes.filter(solicitacao => solicitacao._status === "Aprovada");
        console.log(solicitacoesAprovadas)        
        
        if (solicitacoesAprovadas.length === 0){
            document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há solicitações aprovadas no momento</h2>`
        }else{
            solicitacoesAprovadas.forEach((solicitacao, index) => {                
                var solicitacaoTr = montaTr(solicitacao, index);
                tabelaSolicitacoes.appendChild(solicitacaoTr);
            })            
        }       
    }    
}
let gerenciarProcessoController = new GerenciarProcessoController("main-container","tabela-solicitacoes")

function montaTr(solicitacao, index){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add('solicitacao');        
    solicitacaoTr.appendChild(montaTd(solicitacao._departamento, "departamento"));
    solicitacaoTr.appendChild(montaTd(solicitacao._cargo, "cargo"));
    solicitacaoTr.appendChild(montaTd(solicitacao._tipoVaga, "tipoVaga"));
    solicitacaoTr.appendChild(montaTd(solicitacao._localVaga, "localVaga"));
    solicitacaoTr.appendChild(montaTd(solicitacao._qtdVagas, "qtdVagas"));
    solicitacaoTr.appendChild(montaTd(solicitacao._requisitos, "requisitos"));
    solicitacaoTr.appendChild(montaTd(solicitacao._motivo, "motivo"));
    solicitacaoTr.appendChild(montaTdBtn(index));

    return solicitacaoTr
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);   

    return td;
}
function montaTdBtn(index){
    var td = document.createElement("td");
    td.innerHTML = `
        Cadastrar Processo Seletivo
    `;
    td.classList.add("button");
    td.classList.add("blue");
    td.classList.add("mobile");
    td.classList.add("cadastrarprocesso");
    td.setAttribute("type", "submit")    
    return td;
}
function getProcessoValues(campo, btn) {
    let processoValues = {
        nomeDepartamento: '',
        nomeCargo: '',
        area:'',
        tipoVaga: '',
        localVaga: '',
        qtdvagas: '',
        requisitos: '',
        teste: '',
        dataInicio: '', 
        dataFinal:'',
        status: '',
        index: '',                
    }
    var dados = campo.childNodes;

    for(var i = 0; i < dados.length; i++){
        switch(dados[i].className){
            case 'departamento':
                processoValues.nomeDepartamento = dados[i].innerHTML;
                break;
            case 'cargo':
                processoValues.nomeCargo = dados[i].innerHTML;
                break;
            case 'tipoVaga':
                processoValues.tipoVaga = dados[i].innerHTML;
                break;
            case 'localVaga':
                processoValues.localVaga = dados[i].innerHTML;
                break;
            case 'qtdVagas':
                processoValues.qtdvagas = dados[i].innerHTML;
                break;     
            case 'requisitos':
                processoValues.requisitos = dados[i].innerHTML;
                break;
            case 'motivo':
                processoValues.motivo = dados[i].innerHTML;
                break;
        }        
    }   
    processoValues.status = "Iniciado";
    processoValues.index = 'new'        
    return processoValues;
} 
'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_processo')) ?? []
const setLocalStorage = (dbProcesso) => localStorage.setItem("db_processo", JSON.stringify(dbProcesso))

// CRUD - create read update delete
const deleteProcesso = (index) => {
    const dbProcesso = readProcesso()
    dbProcesso.splice(index, 1)
    setLocalStorage(dbProcesso)
}

const updateProcesso = (index, processo) => {
    const dbProcesso = readProcesso()
    dbProcesso[index] = processo
    setLocalStorage(dbProcesso)
}

const readProcesso = () => getLocalStorage()

const createProcesso = (processo) => {
    const dbProcesso = getLocalStorage()
    dbProcesso.push (processo)
    setLocalStorage(dbProcesso)
}

const isValidFields = () => {
    return document.getElementById('modal-form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nomeDepartamento').dataset.index = 'new'
}

const saveProcesso = () => {
  
    if (isValidFields()) {
        const processo = {
            nomeDepartamento: document.getElementById('nomeDepartamento').value,
            nomeCargo: document.getElementById('nomeCargo').value,
            area: document.getElementById('area').value,
            tipoVaga: document.getElementById('tipoVaga').value,
            localVaga: document.getElementById('localVaga').value,            
            qtdvagas: document.getElementById('qtdvagas').value,
            requisitos: document.getElementById('requisitos').value,
            teste: document.getElementById('teste').value,
            dataInicio: document.getElementById('dataInicio').value,
            dataFinal: document.getElementById('dataFinal').value,
            status: document.getElementById('status').value
        }
        const index = document.getElementById('nomeDepartamento').dataset.index
        if (index == 'new') {
            createProcesso(processo)
            updateTable()
            updateSolicitacao()
            closeModal()
            removeLinha();
        } else {
            updateProcesso(index, processo)
            updateTable()
            closeModal()
        }
    }
}
const updateSolicitacao = () => {
    const solicitacaoAtualizada = {
        _cargo: document.getElementById('nomeCargo').value,
        _status: 'Processo Iniciado',        
    }
    var solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
    solicitacoes.map(solicitacao =>{
        if(solicitacao._cargo == solicitacaoAtualizada._cargo){
            Object.assign(solicitacao, solicitacaoAtualizada);
        }
    })

    localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));
}
const removeLinha = () => {
    //Excluir linha da tabela
    var table = document.getElementById('tabela-solicitacoes')
    var indice = localStorage.getItem('linhaTabela');
   
    table.children[indice].classList.add("fadeOut");
                                    
    setTimeout(function(){
        table.children[indice].remove();        
    }, 500)
                             
    if(table.childElementCount === 1){
        document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há solicitações aprovadas no momento</h2>`
    }
}
const createRow = (processo, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${processo.nomeDepartamento}</td>
        <td>${processo.nomeCargo}</td>
        <td>${processo.area}</td>
        <td>${processo.tipoVaga}</td>
        <td>${processo.localVaga}</td>
        <td>${processo.qtdvagas}</td>
        <td>${processo.requisitos}</td>
        <td>${processo.teste}</td>
        <td>${processo.dataInicio}</td>
        <td>${processo.dataFinal}</td>
        <td>${processo.status}</td>
        
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableProcesso>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableProcesso>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbProcesso = readProcesso()
    clearTable()
    dbProcesso.forEach(createRow)
}

const fillFields = (processo) => {
    document.getElementById('nomeDepartamento').value = processo.nomeDepartamento
    document.getElementById('nomeCargo').value = processo.nomeCargo
    document.getElementById('area').value = processo.area
    document.getElementById('tipoVaga').value = processo.tipoVaga
    document.getElementById('localVaga').value = processo.localVaga
    document.getElementById('qtdvagas').value = processo.qtdvagas
    document.getElementById('requisitos').value = processo.requisitos
    document.getElementById('teste').value = processo.teste
    document.getElementById('dataInicio').value = processo.dataInicio
    document.getElementById('dataFinal').value = processo.dataFinal
    document.getElementById('status').value = processo.status
    document.getElementById('nomeDepartamento').dataset.index = processo.index
}


const editProcesso = (index) => {
    const processo = readProcesso()[index]
    processo.index = index
    fillFields(processo);
    openModal();
    document.getElementById('salvar')
    .addEventListener('click', saveProcesso)       
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editProcesso(index)
        } else {
            const processo = readProcesso()[index]
            const response = confirm(`Deseja realmente excluir este processo seletivo?`)
            if (response) {
                deleteProcesso(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
var btn = document.querySelectorAll('.button.blue.mobile.cadastrarprocesso');

btn.forEach((item, index) =>{
    item.addEventListener('click', () =>{                              
        var campo = item.parentNode;
        let linhaTabela = index;
        let numLinhas = btn.length;
        localStorage.setItem('linhaTabela', JSON.stringify(linhaTabela));
        localStorage.setItem('numLinhas', JSON.stringify(numLinhas));
        var processo = getProcessoValues(campo, btn[index]);
        fillFields(processo);
        openModal();
    }) 
}) 



document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveProcesso)

document.querySelector('#tableProcesso>tbody').addEventListener('click', editDelete)

document.getElementById('cancelar').addEventListener('click', closeModal);


