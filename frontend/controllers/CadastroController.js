import { sendRequest } from "../utils/ApiUtils.js";

class CadastroController {
    constructor(formCadastro1, formCadastro2){
        this.formEl1 = document.getElementById(formCadastro1);
        this.formEl2 = document.getElementById(formCadastro2);
        
        Utils.buscaCep();
        this.onNext();
        this.onSubmit();
    }
    
    onSubmit() {
        this.formEl2.addEventListener("submit", (event) => {

            event.preventDefault();         

            let body = this.getValues();

            // setting the url
            const url = "/candidatos";
        
            // enviando a request e salvando a promise
            const responsePromise = sendRequest('POST', url, body);

            responsePromise.then(response => {

                // log para debuggar
                console.log(response);
                    
                // trocando de pagina
                setTimeout(() => {
                    window.location.href = 'login.html'
                }, 1000);

            }) 
        })
    }

    onNext() {
        this.formEl1.addEventListener("submit", e=> {
            e.preventDefault();            
            this.showCadastro2();
        })
    }
 

    getValues() {
        let isValid = true;
        [...this.formEl1.elements].forEach(function(field, index){
            if (["nome", "email", "password"].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add("has-error");
                isValid = false
            }
        });

        [...this.formEl2.elements].forEach(function(field, index){
            if (["cpf", "dataNasc", "numCel", "cep", "logradouro", "bairro", "cidade", "estado", "pais", "area", 'genero'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add("has-error");
                isValid = false
            }
        });

        if(!isValid){
            return false;
        }

        let candidato = new Candidato(nome.value, email.value, senha.value, cpf.value, numCel.value, cep.value, logradouro.value, bairro.value, cidade.value, estado.value, pais.value, area.value, dataNasc.value, genero.value);
        return candidato;
    }

    insert(data) {
        if(sessionStorage.getItem("candidatos")) {
            candidatos = JSON.parse(sessionStorage.getItem("candidatos"));
        }        

        candidatos.push(data);
        sessionStorage.setItem("candidatos", JSON.stringify(candidatos));
    }

    showCadastro2() {
        document.querySelector("#formCad1").style.display = "none";
        document.querySelector("#formCad2").style.display = "block";
        document.getElementById('cpf').focus();
    }
}

let cadastroController = new CadastroController("formCad1", "formCad2");

