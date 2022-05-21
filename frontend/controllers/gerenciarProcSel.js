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
    return document.getElementById('form').reportValidity()
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
            closeModal()
        } else {
            updateProcesso(index, processo)
            updateTable()
            closeModal()
        }
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
    fillFields(processo)
    openModal()
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
document.getElementById('cadastrarProcesso')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveProcesso)

document.querySelector('#tableProcesso>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)