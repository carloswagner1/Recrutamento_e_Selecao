import { sendRequest } from "../utils/ApiUtils.js";


class GerenciarPerfilController {

    constructor(formPerfil) {
        this.formEl = document.getElementById(formPerfil);
        Utils.buscaCep();        
        this.onLoad();
        this.onSubmit();               
    }

    onLoad() {  
        
        // setting the url
        const url = "/candidatos/" + localStorage.getItem('id_candidato');

        // enviando a request
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            if (response.status == 200) {
                localStorage.setItem('candidato', JSON.stringify(response.body));
            }

            this.loadValues(localStorage.getItem('candidato')); 
        }) 
        
    }

    onSubmit() {

        console.log(this.formEl);

        document.getElementById('salvarTudo')
            .addEventListener('click', salvarTudo);

        function salvarTudo (e) {

            let element = e.currentTarget.parentNode;

            console.log(element);
            
            let values = getValues(element);
                    
            //pega os valores da tabela
            let candidatoAtualizado = JSON.stringify(values);
            console.log('candidatoAtualizado');
            console.log(candidatoAtualizado);
        
            //salvar no banco de dados
        
            // setting the url
            const url = "/candidatos/" + localStorage.getItem('id_candidato') + "/update";
            
            // enviando a request
            const responsePromise = sendRequest('POST', url, JSON.parse(candidatoAtualizado));
        
            responsePromise.then(response => {
        
                // log para debuggar
                console.log(response);
        
                if (response.status == 200) {
                    element.reset();  
                    loadValues(response.body, element); 
                }
        
            })

            function loadValues(candidato, element) {  
        
                console.log("candidato");
                console.log(candidato);
                              
                [...element.elements].forEach(function (field, index) {
                    
                    if (candidato[field.name] == undefined) {
                        return '';
                    }
                    else if (candidato[field.name] === 'dataNascimento') {
                        field.value = new Date(candidato[field.name]).getDate('yyy-MM-dd');
                    }
                    else {
                        field.value = candidato[field.name];
                    }
                });       
            }
        }

        function getValues(element) {
            /*let candidato = {};*/
            let isValid = true;
    
            [...element.elements].forEach(function (field, index) {
    
                if (["nome", "email", "senha", "cpf", "celular", "cep", "logradouro", "bairro","cidade", "estado", "pais", 'area', 'genero', 'dataNascimento' ].indexOf(field.name) > -1 && !field.value) {
                    field.parentElement.classList.add('has-error');
                    isValid = false;                
                }
                else if (field.name == 'newPassword' && field.value !=='') {                
                    senha.value = newPassword.value;
                }              
    
            });         
    
            if (!isValid) {
                return false;
            }

            console.log()
            
            let candidato = new Candidato(nome.value, email.value, senha.value, cpf.value, celular.value, cep.value, logradouro.value, bairro.value, cidade.value, estado.value, pais.value, area.value, dataNascimento.value, genero.value);
    
            return candidato;
    
        }
    }

    save() {
        let candidatos = this.getCandidatosStorage();
        candidatos.push(this);
        localStorage.setItem("candidatos", JSON.stringify(candidatos));
    }

    loadValues(candidato) {  
        
        console.log("candidato");
        candidato = JSON.parse(candidato)
        console.log(candidato);
                      
        [...this.formEl.elements].forEach(function (field, index) {
            
            if (candidato[field.name] == undefined) {
                return '';
            }
            else if (candidato[field.name] === 'dataNascimento') {
                field.value = Date(candidato[field.name]).getDate('yyy-MM-dd')
            }
            else {
                field.value = candidato[field.name];
            }
        });       
    }
}

document.getElementById('excluir')
    .addEventListener('click', excluir);

let gerenciarPerfilController = new GerenciarPerfilController( "formPerfil"); 