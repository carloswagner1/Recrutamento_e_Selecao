import { sendRequest } from "../utils/ApiUtils.js";

class CurriculoController {

    constructor() {        
        this.onLoad();        
    }

    onLoad() {   

        // setting the url
        const url = "/candidatos/" + localStorage.getItem('id_candidato') + "/completo";

        // enviando a request
        const responsePromise = sendRequest('GET', url, "");
        
        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            // salvando o body da resposta
            let candidato = response.body;

            if (response.status == 200) {
                document.getElementById('nome').innerHTML = candidato.nome;
                document.getElementById('celular').innerHTML = `Celular: ${candidato.celular}`;
                document.getElementById('email').innerHTML = `E-mail: ${candidato.email}`;

                localStorage.setItem('db_Experiencia', JSON.stringify(candidato.experiencias));
                localStorage.setItem('db_formacao', JSON.stringify(candidato.formacoes));

                updateTable();
                updateTableFormacoes();
            }
        });
    }
}

let curriculoController = new CurriculoController( ); 

'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
};

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('db_Experiencia'))
};

function setLocalStorage(dbExperiencia) {
    localStorage.setItem("db_Experiencia", JSON.stringify(dbExperiencia))
};

// CRUD - create read update delete
const deleteExperiencia = (index, id) => {

    if (id != null) {

        console.log("excluir experiencia");
        console.log(id);

        // setting the url
        const url = "/experiencias/" + id;

        // enviando a request e salvando a promise
        sendRequest('DELETE', url, "");
    }

    const dbExperiencia = readExperiencia()
    dbExperiencia.splice(index, 1)
    setLocalStorage(dbExperiencia)
}

const updateExperiencia = (index, experiencia) => {
    const dbExperiencia = readExperiencia()
    dbExperiencia[index] = experiencia
    setLocalStorage(dbExperiencia)
}

const readExperiencia = () => getLocalStorage();

const createExperiencia = (experiencia) => {
    const dbExperiencia = getLocalStorage()
    dbExperiencia.push(experiencia)
    setLocalStorage(dbExperiencia)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
    document.getElementById('empresa').dataset.index = 'new';
}

const saveExperiencia = () => {

    if (isValidFields()) {

        const experiencia = {
            empresa: document.getElementById('empresa').value,
            cargo: document.getElementById('cargo').value,
            dataAdmissao: document.getElementById('dataAdmissao').value,
            dataDesligamento: document.getElementById('dataDesligamento').value
        };

        const index = document.getElementById('empresa').dataset.index;
        
        if (index == 'new') {
            createExperiencia(experiencia)
            updateTable()
            closeModal()
        }
        else {
            updateExperiencia(index, experiencia)
            updateTable()
            closeModal()
        }
    }
}

const createRowExperiencias = (experiencia, index) => {

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${experiencia.empresa}</td>
        <td>${experiencia.cargo}</td>
        <td>${experiencia.dataAdmissao}</td>
        <td>${experiencia.dataDesligamento}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `;

    document.querySelector('#tableExperiencia>tbody').appendChild(newRow);
}

const editDelete = (event) => {

    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-');

        if (action == 'edit') {
            editExperiencia(index);
        }
        else {
            const experiencia = readExperiencia()[index];
            const response = confirm(`Deseja realmente excluir a Experiência? ${experiencia.empresa}`);
            
            if (response) {
                deleteExperiencia(index, experiencia.id);
                updateTable();
            }
        }
    }
}

const editExperiencia = (index) => {

    console.log("index: " + index);

    const experiencia = readExperiencia()[index];

    console.log("experiencia: " + experiencia);

    experiencia.index = index;

    console.log("experiencia: " + experiencia);

    fillFields(experiencia);
    openModal();
}

const fillFields = (experiencia) => {
    document.getElementById('empresa').value = experiencia.empresa;
    document.getElementById('cargo').value = experiencia.cargo;
    document.getElementById('dataAdmissao').value = experiencia.dataAdmissao;
    document.getElementById('dataDesligamento').value = experiencia.dataDesligamento;
    document.getElementById('empresa').dataset.index = experiencia.index;
}

const updateTable = () => {
    const dbExperiencia = readExperiencia();
    clearTable();
    dbExperiencia.forEach(createRowExperiencias);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableExperiencia>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

'use strict'

const openModalFormacoes = () => document.getElementById('modal-formacao')
    .classList.add('active');

const closeModalFormacoes = () => {
    clearFields2();
    document.getElementById('modal-formacao').classList.remove('active');
}

const getLocalStorage2 = () => JSON.parse(localStorage.getItem('db_formacao')) ?? [];
const setLocalStorage2 = (dbformacao) => localStorage.setItem("db_formacao", JSON.stringify(dbformacao));

// CRUD - create read update delete
const deleteformacao = (index, id) => {

    if (id != null) {

        console.log("excluir formação");
        console.log(id);

        // setting the url
        const url = "/formacoes/" + id;

        // enviando a request e salvando a promise
        sendRequest('DELETE', url, "");
    }

    const dbformacao = readformacao();
    dbformacao.splice(index, 1);
    setLocalStorage2(dbformacao);
}

const updateformacao = (index, formacao) => {
    const dbformacao = readformacao();
    dbformacao[index] = formacao;
    setLocalStorage2(dbformacao);
}

const readformacao = () => getLocalStorage2();

const createformacao = (formacao) => {
    const dbformacao = getLocalStorage2();
    dbformacao.push(formacao);
    setLocalStorage2(dbformacao);
}

const isValidFields2 = () => {
    return document.getElementById('form2').reportValidity();
}

//Interação com o layout

const clearFields2 = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
    document.getElementById('tipoFormacao').dataset.index = 'new';
}

const saveformacao = () => {

    if (isValidFields2()) {

        const formacao = {
            tipoFormacao: document.getElementById('tipoFormacao').value,
            curso: document.getElementById('curso').value,
            instituicao: document.getElementById('instituicao').value,
            dataIngresso: document.getElementById('dataIngresso').value,
            dataConclusao: document.getElementById('dataConclusao').value
        }

        const index = document.getElementById('tipoFormacao').dataset.index;

        if (index == 'new') {
            createformacao(formacao);
            updateTableFormacoes();
            closeModalFormacoes();
        }
        else {
            updateformacao(index, formacao);
            updateTableFormacoes();
            closeModalFormacoes();
        }
    }
}

const createRowFormacoes = (formacao, index) => {

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${formacao.tipoFormacao}</td>
        <td>${formacao.curso}</td>
        <td>${formacao.instituicao}</td>
        <td>${formacao.dataIngresso}</td>
        <td>${formacao.dataConclusao}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `;

    document.querySelector('#tableformacao>tbody').appendChild(newRow);
}

const clearTable2 = () => {
    const rows = document.querySelectorAll('#tableformacao>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTableFormacoes = () => {
    const dbformacao = readformacao();
    clearTable2();
    dbformacao.forEach(createRowFormacoes);
}

const fillFields2 = (formacao) => {
    document.getElementById('tipoFormacao').value = formacao.tipoFormacao;
    document.getElementById('curso').value = formacao.curso;
    document.getElementById('instituicao').value = formacao.instituicao;
    document.getElementById('dataIngresso').value = formacao.dataIngresso;
    document.getElementById('dataConclusao').value = formacao.dataConclusao;
    document.getElementById('tipoFormacao').dataset.index = formacao.index;
}

const editformacao = (index) => {
    const formacao = readformacao()[index];
    formacao.index = index;
    fillFields2(formacao);
    openModalFormacoes();
}

const editDeleteFormacoes = (event) => {

    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editformacao(index);
        }
        else {
            const formacao = readformacao()[index];
            const response = confirm(`Deseja realmente excluir a Formação? ${formacao.tipoFormacao}`);
            
            if (response) {
                deleteformacao(index, formacao.id);
                updateTableFormacoes();
            }
        }
    }
}

const salvarTudo = (event) => {

    const experiencias = readExperiencia();
    const formacoes = readformacao();

    let curriculo = {};
    curriculo.idCandidato = JSON.parse(localStorage.getItem("id_candidato"));
    curriculo.experiencias = experiencias;
    curriculo.formacoes = formacoes;

    // setting the url
    const url = "/candidatos/" + localStorage.getItem('id_candidato') + "/curriculo";

    // enviando a request
    sendRequest("POST", url, curriculo);
}

// Eventos

document.getElementById('salvarTudo')
    .addEventListener('click', salvarTudo);

document.getElementById('adicionarExperiencia')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);

document.getElementById('salvar')
    .addEventListener('click', saveExperiencia);

document.querySelector('#tableExperiencia>tbody')
    .addEventListener('click', editDelete);

document.getElementById('cancelar')
    .addEventListener('click', closeModal);

document.getElementById('adicionarFormacao')
    .addEventListener('click', openModalFormacoes);

document.getElementById('modalClose2')
    .addEventListener('click', closeModalFormacoes);

document.getElementById('salvar2')
    .addEventListener('click', saveformacao);

document.querySelector('#tableformacao>tbody')
    .addEventListener('click', editDeleteFormacoes);

document.getElementById('cancelar2')
    .addEventListener('click', closeModalFormacoes);