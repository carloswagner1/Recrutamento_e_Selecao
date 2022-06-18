import { sendRequest } from "../utils/ApiUtils.js";

class LoginController {
    
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

            let senha = document.querySelector('#senha');
            let senhaLabel = document.querySelector('#senhaLabel');

            let msgError = document.querySelector('#msgError');

            console.log(email.value);
            console.log(senha.value);

            var body = new Object();
            body.email = email.value;
            body.senha = senha.value;
            body.tipo = tipo;

            // setting the url
            const url = "/usuarios/login";

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
                    senhaLabel.setAttribute('style', 'color: red');
                    senha.setAttribute('style', 'border-color: red');
                    msgError.setAttribute('style', 'display: block');
                    msgError.setAttribute('style', 'color: red');
                    msgError.innerHTML = responseBody.message;
                    email.focus();
                }
                else {

                    if (tipo == 'empresa') {
                        // salvando id do usuario no local storage para mandar nas proximas requests
                        localStorage.setItem('id_usuario', JSON.stringify(responseBody.id));
                        localStorage.setItem('perfil', JSON.stringify(responseBody.perfil));
                        window.location.href = "../view/gerenciarProcessoSeletivo.html"
                    }
                    else {
                        // salvando id do candidato no local storage para mandar nas proximas requests
                        localStorage.setItem('id_candidato', JSON.stringify(responseBody.id));
                        localStorage.setItem('perfil', JSON.stringify(responseBody.perfil));
                        window.location.href = '../view/minhasVagas.html'
                    }
                }
            }).catch(error => {
                // log para debuggar
                console.log(error);
            });
        });        
    }

}

let loginController = new LoginController("login-container");
