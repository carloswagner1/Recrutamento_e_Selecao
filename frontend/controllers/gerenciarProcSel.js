import { sendRequest } from "../utils/ApiUtils.js";

class GerenciarProcessoController {

    constructor(containerID, solicitacoesTableId, processosTableId) {
        this.containerEl = document.getElementById(containerID);
        this.solicitacoesTableEl = document.getElementById(solicitacoesTableId);  
        this.processosTableEl = document.getElementById(processosTableId);              
        this.onLoad();                      
    }
    
    onLoad() {    
        this.loadSolicitacoes();
        this.loadProcessos();
    }

    loadSolicitacoes() {

        var tabelaSolicitacoes = this.solicitacoesTableEl;       
        
        // setting the url
        const url = "/solicitacoes/usuarios/" + localStorage.getItem("id_usuario") + "/aprovadas";

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            if (response.status == 200) {

                var solicitacoesAprovadas = response.body;

                if (solicitacoesAprovadas.length === 0) {
                    document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há solicitações aprovadas no momento</h2>`
                }
                else {
                    solicitacoesAprovadas.forEach((solicitacao, index) => {                
                        var solicitacaoTr = montaTrSolicitacao(solicitacao, index);
                        tabelaSolicitacoes.appendChild(solicitacaoTr);
                    })            
                }
            }
            else {
                document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há solicitações aprovadas no momento</h2>`
            }
        });

    }

    loadProcessos() {

        var tabelaProcessos= this.processosTableEl;       
        
        // setting the url
        const url = "/processos/usuarios/" + localStorage.getItem("id_usuario");

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            if (response.status == 200) {

                var processos = response.body;

                if (processos.length === 0) {
                    document.getElementById('tabelaProcesso').innerHTML = `<h2 style="text-align:center">Não há processos seletivos no momento</h2>`
                }
                else {
                    processos.forEach((processo, index) => {                
                        var processoTr = montaTrProcesso(processo, index);
                        tabelaProcessos.appendChild(processoTr);
                    })            
                }
            }
            else {
                document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há processos seletivos no momento</h2>`
            }

            onClick(); 
        });

    }
}

function onClick() {

    var btn = document.querySelectorAll('.button.blue.mobile.cadastrarprocesso');

    btn.forEach((item, index) => {

        item.addEventListener('click', () => {
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
}

let gerenciarProcessoController = new GerenciarProcessoController("main-container","tabela-solicitacoes", "tabela-processos")

function montaTrSolicitacao(solicitacao, index){
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
    solicitacaoTr.appendChild(montaTdBtn(index));

    return solicitacaoTr;
}

function montaTrProcesso(processo, index){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add('processo'); 
    solicitacaoTr.appendChild(montaTdHidden(processo.id, "id"));         
    solicitacaoTr.appendChild(montaTd(processo.departamento, "departamento"));
    solicitacaoTr.appendChild(montaTd(processo.cargo, "cargo"));
    solicitacaoTr.appendChild(montaTd(processo.areaVaga, "areaVaga"));
    solicitacaoTr.appendChild(montaTd(processo.tipoVaga, "tipoVaga"));
    solicitacaoTr.appendChild(montaTd(processo.localVaga, "localVaga"));
    solicitacaoTr.appendChild(montaTd(processo.qtdVagas, "qtdVagas"));
    solicitacaoTr.appendChild(montaTd(processo.requisitosDesejaveis, "requisitos"));
    solicitacaoTr.appendChild(montaTd(processo.teste, "teste"));
    solicitacaoTr.appendChild(montaTd(new Date(processo.dataInicio).toLocaleDateString(), "dataInicio"));
    solicitacaoTr.appendChild(montaTd(new Date(processo.dataFinal).toLocaleDateString(), "dataFinal"));
    solicitacaoTr.appendChild(montaTd(processo.status, "status"));
    solicitacaoTr.appendChild(montaTdBtnProcesso(index));

    return solicitacaoTr;
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

function montaTdBtn(index){
    var td = document.createElement("td");
    td.innerHTML = `
        Cadastrar Processo Seletivo
    `;
    td.classList.add("button");
    td.classList.add("blue");
    td.classList.add("mobile");
    td.classList.add("cadastrarprocesso");
    td.setAttribute("type", "submit");

    return td;
}

function montaTdBtnProcesso(index) {

    var td = document.createElement("td");

    td.innerHTML = `
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `;

    return td;
}

function getProcessoValues(campo, btn) {

    let processoValues = {
        solicitacaoId: '',
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
        index:'',
        usuarioId:''
    }

    var dados = campo.childNodes;

    for(var i = 0; i < dados.length; i++) {

        switch(dados[i].className) {

            case 'id':
                processoValues.solicitacaoId = dados[i].innerHTML;
                break;
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
        }        
    } 

    processoValues.index = 'new';    

    return processoValues;
} 

'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

// CRUD - create read update delete
const deleteProcesso = (processoId) => {
    
    // setting the url
    const url = "/processos/" + processoId;

    console.log(processoId);

    // enviando a request e salvando a promise
    const responsePromise = sendRequest('DELETE', url, "");

    setTimeout(function() {
        clearTable();
        loadProcessos();
    }, 5000);
    
}

const updateProcesso = (processo) => {    
    
    // setting the url
    const url = "/processos";

    console.log("UPDATE");

    console.log(processo);

    // enviando a request e salvando a promise
    const responsePromise = sendRequest('PUT', url, processo);

    responsePromise.then(response => {

        // log para debuggar
        console.log(response);

        if (response.status == 200) {
            clearTable();
            loadProcessos();
        }
    })
}

const createProcesso = (processo) => {

    // setting the url
    const url = "/processos";

    console.log(processo);

    // enviando a request e salvando a promise
    const responsePromise = sendRequest('POST', url, processo);

    responsePromise.then(response => {

        // log para debuggar
        console.log(response);

        if (response.status == 201) {
            clearTable();
            loadProcessos();
        }
    })
}

function loadProcessos() {

    var tabelaProcessos= document.getElementById("tabela-processos");
    
    // setting the url
    const url = "/processos/usuarios/" + localStorage.getItem("id_usuario");

    // enviando a request e salvando a promise
    const responsePromise = sendRequest('GET', url, "");

    responsePromise.then(response => {

        // log para debuggar
        console.log(response);

        if (response.status == 200) {

            var processos = response.body;

            if (processos.length === 0) {
                document.getElementById('tabelaProcesso').innerHTML = `<h2 style="text-align:center">Não há processos seletivos no momento</h2>`
            }
            else {
                processos.forEach((processo, index) => {                
                    var processoTr = montaTrProcesso(processo, index);
                    tabelaProcessos.appendChild(processoTr);
                })            
            }
        }
        else {
            document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há processos seletivos no momento</h2>`
        }
    });
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

// Salva ou altera processo seletivo
// -> a partir de uma Solicitacao salva um novo processo
// -> a partir de um processo seletivo altera o processo seletivo
const saveProcesso = () => {
  
    if (isValidFields()) {

        let processo = {
            id: document.getElementById('processoId').value,
            nomeDepartamento: document.getElementById('nomeDepartamento').value,
            nomeCargo: document.getElementById('nomeCargo').value,
            area: document.getElementById('area').value,
            teste: document.getElementById('teste').value,
            dataInicio: new Date(document.getElementById('dataInicio').value),
            dataFinal: new Date(document.getElementById('dataFinal').value),
        }

        if (processo.dataFinal < processo.dataInicio) {
            console.log("ERROR dataFinal menor que a dataInicio");
            document.getElementById('dataFinal').classList.add('has-error');
            return;
        }

        console.log(processo.id);

        if (!processo.id) {

            processo.solicitacaoId = document.getElementById('solicitacaoId').value;

            createProcesso(processo)
            closeModal()
            removeLinha();
        }
        else {

            processo.id = document.getElementById('processoId').value;
            processo.tipoVaga = document.getElementById('tipoVaga').value;
            processo.localVaga = document.getElementById('localVaga').value;
            processo.qtdvagas = document.getElementById('qtdvagas').value;
            processo.requisitos = document.getElementById('requisitos').value;

            updateProcesso(processo)
            closeModal()
        }
    }
}

const removeLinha = () => {

    //Excluir linha da tabela
    var table = document.getElementById('tabela-solicitacoes')
    var indice = localStorage.getItem('linhaTabela');
   
    table.children[indice].classList.add("fadeOut");
                                    
    setTimeout(function(){
        table.children[indice].remove();        
    }, 500)
                             
    if (table.childElementCount === 1) {
        document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há solicitações aprovadas no momento</h2>`
    }
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tabelaProcesso>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const fillFields = (processo) => {

    document.getElementById('nomeDepartamento').value = processo.nomeDepartamento;
    document.getElementById('nomeDepartamento').disabled = true;

    document.getElementById('nomeCargo').value = processo.nomeCargo;
    document.getElementById('nomeCargo').disabled = true;

    document.getElementById('tipoVaga').value = processo.tipoVaga;
    document.getElementById('tipoVaga').disabled = true;

    document.getElementById('localVaga').value = processo.localVaga;
    document.getElementById('localVaga').disabled = true;

    document.getElementById('qtdvagas').value = processo.qtdvagas;
    document.getElementById('qtdvagas').disabled = true;

    document.getElementById('requisitos').value = processo.requisitos;
    document.getElementById('requisitos').disabled = true;

    document.getElementById('solicitacaoId').value = processo.solicitacaoId;
    document.getElementById('solicitacaoId').disabled = true;
}


const editProcesso = (processoHtml, index) => {

    const processo = readProcesso(processoHtml);
    processo.index = index;
    fillFieldsComplete(processo);
    openModal();
    document.getElementById('salvar').addEventListener('click', saveProcesso);     
}

function readProcesso(processoHtml) {

    let processo = {
        id:                 processoHtml.getElementsByTagName("td")[0].textContent,
        nomeDepartamento:   processoHtml.getElementsByTagName("td")[1].textContent,
        nomeCargo:          processoHtml.getElementsByTagName("td")[2].textContent,
        area:               processoHtml.getElementsByTagName("td")[3].textContent,
        tipoVaga:           processoHtml.getElementsByTagName("td")[4].textContent,
        localVaga:          processoHtml.getElementsByTagName("td")[5].textContent,
        qtdvagas:           processoHtml.getElementsByTagName("td")[6].textContent,
        requisitos:         processoHtml.getElementsByTagName("td")[7].textContent,
        teste:              processoHtml.getElementsByTagName("td")[8].textContent,
        dataInicio:         processoHtml.getElementsByTagName("td")[9].textContent, 
        dataFinal:          processoHtml.getElementsByTagName("td")[10].textContent,
    }

    return processo;   
}

const fillFieldsComplete = (processo) => {

    console.log(processo);

    document.getElementById('processoId').value = processo.id;
    document.getElementById('processoId').disabled = true;

    document.getElementById('nomeDepartamento').value = processo.nomeDepartamento;
    document.getElementById('nomeDepartamento').disabled = true;

    document.getElementById('nomeCargo').value = processo.nomeCargo;
    document.getElementById('nomeCargo').disabled = true;

    document.getElementById('area').value = processo.area;
    document.getElementById('tipoVaga').value = processo.tipoVaga;
    document.getElementById('localVaga').value = processo.localVaga;
    document.getElementById('qtdvagas').value = processo.qtdvagas;
    document.getElementById('requisitos').value = processo.requisitos;
    document.getElementById('teste').value = processo.teste;
    document.getElementById('dataInicio').value = formataStringData(processo.dataInicio);
    document.getElementById('dataFinal').value = formataStringData(processo.dataFinal);
}

function formataStringData(data) {
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2);
  }

const editDelete = (event) => {

    let processo = event.target.parentNode.parentNode;

    console.log(processo);

    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editProcesso(processo, index);
        }
        else {
            const response = confirm(`Deseja realmente excluir este processo seletivo?`);

            if (response) {

                let processoId = processo.getElementsByTagName("td")[0].textContent;

                deleteProcesso(processoId)
            }
        }
    }
}

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveProcesso)

document.querySelector('#tabelaProcesso>tbody').addEventListener('click', editDelete)

document.getElementById('cancelar').addEventListener('click', closeModal);
