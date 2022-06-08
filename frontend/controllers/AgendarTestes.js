import { sendRequest } from "../utils/ApiUtils.js";

class AgendarTestesController {

    constructor( procSelId, formContainerId) {
        this.procSelEl = document.getElementById(procSelId);
        this.formContainerEl = document.getElementById(formContainerId);
        this.onLoad();
        this.onSelect();
        this.onSubmit();
    }

    onLoad() {    
          
        // setting the url
        const url = "/processos/usuarios/" + localStorage.getItem("id_usuario") + "/abertos";

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            if (response.status == 200) {

                let select = this.procSelEl;
                response.body.forEach(processo => select.appendChild(montarOption(processo)));
            }
        })

        this.onSelect();
    }

    onSelect() {

        var filtrar = document.getElementById('filtrar');

        filtrar.addEventListener("click", () => {

            var teste = JSON.parse(document.getElementById('procSel').value).teste;

            //Pelo Processo Seletivo que foi selecionado, temos que setar tema teste
            let tema = document.getElementById('tema');
            tema.value = teste;
            tema.disabled = true;
        })
    }

    onSubmit() {
        
        let tipo = this.formContainerEl.dataset.tipo;

        this.formContainerEl.addEventListener("submit", event => {

            event.preventDefault();
            let tema = document.getElementById('tema');
            let assunto = document.getElementById('assunto');
            let link = document.getElementById('exampleInputLink');
            let msgError = document.getElementById('msgError');

            var body = new Object();
            body.tema = tema.value;
            body.assunto = assunto.value;
            body.link = link.value;

            console.log(body);

            var processoId = JSON.parse(document.getElementById('procSel').value).id;

            console.log(processoId);

            //Imagino que aqui vc vai fazer o envio das informações para cada candidato. Mas acho q é feito no backend, certo?

            // setting the url
            const url = "/processos/" + processoId + "/teste";

            // enviando a request e salvando a promise
            const responsePromise = sendRequest('POST', url, body);

            responsePromise.then(response => {

                // log para debuggar
                console.log(response);

                if (response.status == 200) {
                    msgError.innerHTML = '<p>Teste agendado com sucesso!</p>';

                    setTimeout(function() {
                    }, 2000);

                    tema.value = '';
                    assunto.value = '';
                    link.value = '';
                }
                else {
                    msgError = '<p>Não foi possível agendar os testes!!</p>';
                }
            })

        })
    }
}

function montarOption(processo) {
    var option = document.createElement("option");

    option.setAttribute('value', `{"id":"${processo.id}", "teste":"${processo.teste}"}`);
    option.innerHTML = `${processo.cargo}`
    return option
}

let agendarTestesController = new AgendarTestesController("procSel", "form-container");
