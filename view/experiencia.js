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