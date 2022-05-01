import { sendRequest } from "../utils/ApiUtils.js";

class RedefinirSenhaController {
    
    constructor(loginContainerId) {
        this.loginContainerEl = document.getElementById(loginContainerId);
        
        this.onSubmit();
    }

    onSubmit() {        

        let tipo = this.loginContainerEl.dataset.tipo;

        this.loginContainerEl.addEventListener("submit", event => {

            event.preventDefault();
          
            let email = document.querySelector('#email');
            let emailLabel = document.querySelector('#emailLabel');

            let msgError = document.querySelector('#msgError');

            console.log(email.value);

            var body = new Object();
            body.email = email.value;
            body.tipo = tipo;

            // setting the url
            const url = "/usuarios/senhas";

            // enviando a request e salvando a promise
            const responsePromise = sendRequest('POST', url, body);

            responsePromise.then(response => {

                // log para debuggar
                console.log(response);

                // salvando o body da resposta
                let responseBody = response.body;

                if (response.status != 200) {
                    emailLabel.setAttribute('style', 'color: red');
                    email.setAttribute('style', 'border-color: red');
                    msgError.setAttribute('style', 'display: block');
                    msgError.setAttribute('style', 'color: red');
                    msgError.innerHTML = responseBody.message;
                    email.focus();
                }
                else {
                    window.location.href = "../view/login.html"
                }
            }).catch(error => {
                // log para debuggar
                console.log(error);
            });
        });        
    }

}

let redefinirSenhaController = new RedefinirSenhaController("login-container");






