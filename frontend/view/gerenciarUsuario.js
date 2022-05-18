'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_usuario')) ?? []
const setLocalStorage = (dbUsuario) => localStorage.setItem("db_usuario", JSON.stringify(dbUsuario))

// CRUD - create read update delete
const deleteUsuario = (index) => {
    const dbUsuario = readUsuario()
    dbUsuario.splice(index, 1)
    setLocalStorage(dbUsuario)
}

const updateUsuario = (index, usuario) => {
    const dbUsuario = readUsuario()
    dbUsuario[index] = usuario
    setLocalStorage(dbUsuario)
}

const readUsuario = () => getLocalStorage()

const createUsuario = (usuario) => {
    const dbUsuario = getLocalStorage()
    dbUsuario.push (usuario)
    setLocalStorage(dbUsuario)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const saveUsuario = () => {
  
    if (isValidFields()) {
        const usuario = {
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,            
            tipo: document.getElementById('tipo').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createUsuario(usuario)
            updateTable()
            closeModal()
        } else {
            updateUsuario(index, usuario)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (usuario, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${usuario.nome}</td>
        <td>${usuario.cpf}</td>
        <td>${usuario.email}</td>
        <td>${usuario.celular}</td>
        <td>${usuario.tipo}</td>
        
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableUsuario>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableUsuario>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbUsuario = readUsuario()
    clearTable()
    dbUsuario.forEach(createRow)
}

const fillFields = (usuario) => {
    document.getElementById('nome').value = usuario.nome
    document.getElementById('cpf').value = usuario.cpf
    document.getElementById('email').value = usuario.email
    document.getElementById('celular').value = usuario.celular
    document.getElementById('tipo').value = usuario.tipo
    document.getElementById('nome').dataset.index = usuario.index
}

const editUsuario = (index) => {
    const usuario = readUsuario()[index]
    usuario.index = index
    fillFields(usuario)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editUsuario(index)
        } else {
            const usuario = readUsuario()[index]
            const response = confirm(`Deseja realmente excluir o usuário ${usuario.nome}`)
            if (response) {
                deleteUsuario(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarUsuario')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveUsuario)

document.querySelector('#tableUsuario>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)