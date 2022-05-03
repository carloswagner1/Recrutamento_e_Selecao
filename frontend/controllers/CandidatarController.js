class CandidatarController{
    constructor(containerDescId, containerFormId){
        this.containerDescEl = document.getElementById(containerDescId);
        this.containerFormEl = document.getElementById (containerFormId);              
    }
}

function showForm(){
    document.querySelector(".container-desc").style.display = "none";
    document.querySelector(".container-form").style.display = "block";
}

let candidatarController = new CandidatarController("container-desc", "container-form");

'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_Experiencia')) ?? []
const setLocalStorage = (dbExperiencia) => localStorage.setItem("db_Experiencia", JSON.stringify(dbExperiencia))

// CRUD - create read update delete
const deleteExperiencia = (index) => {
    const dbExperiencia = readExperiencia()
    dbExperiencia.splice(index, 1)
    setLocalStorage(dbExperiencia)
}

const updateExperiencia = (index, experiencia) => {
    const dbExperiencia = readExperiencia()
    dbExperiencia[index] = experiencia
    setLocalStorage(dbExperiencia)
}

const readExperiencia = () => getLocalStorage()

const createExperiencia = (experiencia) => {
    const dbExperiencia = getLocalStorage()
    dbExperiencia.push (experiencia)
    setLocalStorage(dbExperiencia)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nomeEmpresa').dataset.index = 'new'
}

const saveExperiencia = () => {
    debugger
    if (isValidFields()) {
        const experiencia = {
            nomeEmpresa: document.getElementById('nomeEmpresa').value,
            cargo: document.getElementById('cargo').value,
            dataAdmissao: document.getElementById('dataAdmissao').value,
            dataDesligamento: document.getElementById('dataDesligamento').value
        }
        const index = document.getElementById('nomeEmpresa').dataset.index
        if (index == 'new') {
            createExperiencia(experiencia)
            updateTable()
            closeModal()
        } else {
            updateExperiencia(index, experiencia)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (experiencia, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${experiencia.nomeEmpresa}</td>
        <td>${experiencia.cargo}</td>
        <td>${experiencia.dataAdmissao}</td>
        <td>${experiencia.dataDesligamento}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableExperiencia>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableExperiencia>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbExperiencia = readExperiencia()
    clearTable()
    dbExperiencia.forEach(createRow)
}

const fillFields = (experiencia) => {
    document.getElementById('nomeEmpresa').value = experiencia.nomeEmpresa
    document.getElementById('cargo').value = experiencia.cargo
    document.getElementById('dataAdmissao').value = experiencia.dataAdmissao
    document.getElementById('dataDesligamento').value = experiencia.dataDesligamento
    document.getElementById('nomeEmpresa').dataset.index = experiencia.index
}

const editExperiencia = (index) => {
    const experiencia = readExperiencia()[index]
    experiencia.index = index
    fillFields(experiencia)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editExperiencia(index)
        } else {
            const experiencia = readExperiencia()[index]
            const response = confirm(`Deseja realmente excluir a Experiência? ${experiencia.nomeEmpresa}`)
            if (response) {
                deleteExperiencia(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('adicionarExperiencia')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveExperiencia)

document.querySelector('#tableExperiencia>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

    'use strict'

const openModal2 = () => document.getElementById('modal-formacao')
    .classList.add('active')

const closeModal2 = () => {
    clearFields2()
    document.getElementById('modal-formacao').classList.remove('active')
}


const getLocalStorage2 = () => JSON.parse(localStorage.getItem('db_formacao')) ?? []
const setLocalStorage2 = (dbformacao) => localStorage.setItem("db_formacao", JSON.stringify(dbformacao))

// CRUD - create read update delete
const deleteformacao = (index) => {
    const dbformacao = readformacao()
    dbformacao.splice(index, 1)
    setLocalStorage2(dbformacao)
}

const updateformacao = (index, formacao) => {
    const dbformacao = readformacao()
    dbformacao[index] = formacao
    setLocalStorage2(dbformacao)
}

const readformacao = () => getLocalStorage2()

const createformacao = (formacao) => {
    const dbformacao = getLocalStorage2()
    dbformacao.push (formacao)
    setLocalStorage2(dbformacao)
}

const isValidFields2 = () => {
    return document.getElementById('form2').reportValidity()
}

//Interação com o layout

const clearFields2 = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('tipoformacao').dataset.index = 'new'
}

const saveformacao = () => {
    debugger
    if (isValidFields2()) {
        const formacao = {
            tipoformacao: document.getElementById('tipoformacao').value,
            curso: document.getElementById('curso').value,
            instituicao: document.getElementById('instituicao').value,
            dataInicio: document.getElementById('dataInicio').value,
            dataConclusao: document.getElementById('dataConclusao').value
        }
        const index = document.getElementById('tipoformacao').dataset.index
        if (index == 'new') {
            createformacao(formacao)
            updateTable2()
            closeModal2()
        } else {
            updateformacao(index, formacao)
            updateTable2()
            closeModal2()
        }
    }
}

const createRow2 = (formacao, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${formacao.tipoformacao}</td>
        <td>${formacao.curso}</td>
        <td>${formacao.instituicao}</td>
        <td>${formacao.dataInicio}</td>
        <td>${formacao.dataConclusao}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableformacao>tbody').appendChild(newRow)
}

const clearTable2 = () => {
    const rows = document.querySelectorAll('#tableformacao>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable2 = () => {
    const dbformacao = readformacao()
    clearTable2()
    dbformacao.forEach(createRow2)
}

const fillFields2 = (formacao) => {
    document.getElementById('tipoformacao').value = formacao.tipoformacao
    document.getElementById('curso').value = formacao.curso
    document.getElementById('instituicao').value = formacao.instituicao
    document.getElementById('dataInicio').value = formacao.dataInicio
    document.getElementById('dataConclusao').value = formacao.dataConclusao
    document.getElementById('tipoformacao').dataset.index = formacao.index
}

const editformacao = (index) => {
    const formacao = readformacao()[index]
    formacao.index = index
    fillFields2(formacao)
    openModal2()
}

const editDelete2 = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editformacao(index)
        } else {
            const formacao = readformacao()[index]
            const response = confirm(`Deseja realmente excluir a Formação? ${formacao.tipoformacao}`)
            if (response) {
                deleteformacao(index)
                updateTable2()
            }
        }
    }
}

updateTable2()

// Eventos
document.getElementById('adicionarFormacao')
    .addEventListener('click', openModal2)

document.getElementById('modalClose2')
    .addEventListener('click', closeModal2)

document.getElementById('salvar2')
    .addEventListener('click', saveformacao)

document.querySelector('#tableformacao>tbody')
    .addEventListener('click', editDelete2)

document.getElementById('cancelar2')
    .addEventListener('click', closeModal2)