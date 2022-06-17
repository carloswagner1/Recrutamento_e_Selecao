import { sendRequest } from "../utils/ApiUtils.js";

class GerenciarUsuarios {

    constructor(tabelaUsuariosId) {
        this.tabelaUsuarios = document.getElementById(tabelaUsuariosId);
        this.onLoad();
    }

    onLoad() {

        var tabelaUsuarios = this.tabelaUsuarios;

        // setting the url
        const url = "/usuarios";

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            if (response.status == 200) {

                var usuarios = response.body;

                if (usuarios.length === 0) {
                    document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há usuários cadastrados no momento</h2>`
                }
                else {
                    usuarios.forEach((usuario, index) => {                
                        var usuarioTr = montaTrSolicitacao(usuario, index);
                        tabelaUsuarios.appendChild(usuarioTr);
                    })    
                }
            }
            else {
                document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há usuários cadastrados no momento</h2>`
            }
        })
    }


}

let gerenciarUsuarios = new GerenciarUsuarios("tabela-usuarios");

function montaTrSolicitacao(usuario, index){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add('usuario'); 
    solicitacaoTr.appendChild(montaTdHidden(usuario.id, "usuarioId"));         
    solicitacaoTr.appendChild(montaTd(usuario.nome, "nome"));
    solicitacaoTr.appendChild(montaTd(usuario.cpf, "cpf"));
    solicitacaoTr.appendChild(montaTd(usuario.email, "email"));
    solicitacaoTr.appendChild(montaTd(usuario.celular, "celular"));
    solicitacaoTr.appendChild(montaTd(usuario.perfil, "perfil"));
    solicitacaoTr.appendChild(montaTd(usuario.departamento, "departamento"));
    solicitacaoTr.appendChild(montaTdBtn(index));

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
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `;

    return td;
}

function loadUsuarios() {

    var tabelaUsuarios = document.getElementById("tabela-usuarios");

    // setting the url
    const url = "/usuarios";

    // enviando a request e salvando a promise
    const responsePromise = sendRequest('GET', url, "");

    responsePromise.then(response => {

        // log para debuggar
        console.log(response);

        if (response.status == 200) {

            var usuarios = response.body;

            if (usuarios.length === 0) {
                document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há usuários cadastrados no momento</h2>`
            }
            else {
                usuarios.forEach((usuario, index) => {                
                    var usuarioTr = montaTrSolicitacao(usuario, index);
                    tabelaUsuarios.appendChild(usuarioTr);
                })    
            }
        }
        else {
            document.getElementById('tabela').innerHTML = `<h2 style="text-align:center">Não há usuários cadastrados no momento</h2>`
        }
    })
}

'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

// CRUD - create read update delete
const deleteUsuario = (usuarioId) => {

    // setting the url
    const url = "/usuarios/" + usuarioId;

    console.log(usuarioId);

    // enviando a request e salvando a promise
    const responsePromise = sendRequest('DELETE', url, "");

    setTimeout(function() {
        clearTable();
        loadUsuarios();
    }, 3000);
}

const updateUsuario = (usuario) => {

        // setting the url
        const url = "/usuarios/" + usuario.id;

        console.log("UPDATE");
    
        console.log(usuario);
    
        // enviando a request e salvando a promise
        const responsePromise = sendRequest('PUT', url, usuario);
    
        responsePromise.then(response => {
    
            // log para debuggar
            console.log(response);
    
            if (response.status == 200) {
                clearTable();
                loadUsuarios();
            }
        })    
}

const createUsuario = (usuario) => {

        // setting the url
        const url = "/usuarios";
    
        // enviando a request e salvando a promise
        const responsePromise = sendRequest('POST', url, usuario);
    
        responsePromise.then(response => {
    
            // log para debuggar
            console.log(response);
    
            if (response.status == 201) {
                clearTable();
                loadUsuarios();
            }
        })


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

        let usuario = {
            id: document.getElementById('usuarioId').value,
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,            
            perfil: document.getElementById('perfil').value,
            departamento: document.getElementById('departamento').value,
            senha: document.getElementById('password').value
        }
        
        console.log(usuario);

        if (!usuario.id) {
            createUsuario(usuario);
            closeModal()
        }
        else {
            updateUsuario(usuario);
            closeModal();
        }
    }
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tabela>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const fillFields = (usuario) => {
    console.log(usuario);
    document.getElementById('usuarioId').value = usuario.id
    document.getElementById('nome').value = usuario.nome
    document.getElementById('cpf').value = usuario.cpf
    document.getElementById('email').value = usuario.email
    document.getElementById('celular').value = usuario.celular
    document.getElementById('perfil').value = usuario.perfil
    document.getElementById('departamento').value = usuario.departamento
    document.getElementById('nome').dataset.index = usuario.index
}

const editUsuario = (usuarioHtml, index) => {
    const usuario = readUsuario(usuarioHtml);
    usuario.index = index;
    fillFields(usuario);
    openModal();
    document.getElementById('salvar').addEventListener('click', saveUsuario);       
}

const editDelete = (event) => {

    let usuario = event.target.parentNode.parentNode;

    console.log(usuario);

    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editUsuario(usuario, index)
        }
        else {
            const response = confirm(`Deseja realmente excluir o usuário ${usuario.nome}`)
           

            if (response) {
                let usuarioId = usuario.getElementsByTagName("td")[0].textContent;
                deleteUsuario(usuarioId);
            }
        }
    }
}

function readUsuario(usuarioHtml) {

    let usuario = {
        id:             usuarioHtml.getElementsByTagName("td")[0].textContent,
        nome:           usuarioHtml.getElementsByTagName("td")[1].textContent,
        cpf:            usuarioHtml.getElementsByTagName("td")[2].textContent,
        email:          usuarioHtml.getElementsByTagName("td")[3].textContent,
        celular:        usuarioHtml.getElementsByTagName("td")[4].textContent,
        perfil:         usuarioHtml.getElementsByTagName("td")[5].textContent,
        departamento:   usuarioHtml.getElementsByTagName("td")[6].textContent
    }

    return usuario;   
}

// Eventos
document.getElementById('cadastrarUsuario')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveUsuario)

document.querySelector('#tabela>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)