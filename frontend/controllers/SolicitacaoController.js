import { sendRequest } from "../utils/ApiUtils.js";

class SolicitacaoController {

    constructor(formSolicitacao1, formSolicitacao2) {
        this.formEl1 = document.getElementById(formSolicitacao1);
        this.formEl2 = document.getElementById(formSolicitacao2);

        this.onLoad();
        this.onSubmit();
    }

    onLoad() {

        // setting the url
        const url = "/usuarios/" + localStorage.getItem('id_usuario') + "/departamento";

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, '');

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            document.getElementById('departamento').value = response.body.departamento;
            document.getElementById('departamento').disabled = true;

            let select = document.getElementById('cargo');

            response.body.cargos.forEach((cargo) => {
                let option = document.createElement('option');
                option.value = cargo;
                option.innerHTML = cargo;
                select.appendChild(option);
            })
        })

    }

    onSubmit() {

        this.formEl2.addEventListener("submit", event => {
            
            event.preventDefault();
            let solicitacao = this.getValues();
            var mensagem = document.querySelector("#mensagem");            
            
            if (!solicitacao) {
                mensagem.innerHTML = "*Todos os campos devem ser preenchidos"
                mensagem.classList.remove("invisivel");
                return;
            }

            // setting the url
            const url = "/solicitacoes";

            // enviando a request e salvando a promise
            const responsePromise = sendRequest('POST', url, solicitacao);

            responsePromise.then(response => {

                // log para debuggar
                console.log(response);

                if (response.status == 201) {

                    mensagem.innerHTML = "Cadastro efetuado com sucesso!"
                    mensagem.classList.remove("invisivel");

                    setTimeout(function() {
                        mensagem.classList.add("invisivel");
                                            
                        window.location.href = '../view/solicitacoesEnviadas.html'  
                    }, 1500)

                }
                else {
                    mensagem.innerHTML = "Tivemos um problema ao salvar. Tente novamente em instantes!"
                    mensagem.classList.remove("invisivel");
                }

                this.formEl1.reset();
                this.formEl2.reset();
            })
           
        });
    }

    getValues() {

        let isValid = true;
        let motivo = this.formEl1.motivo.value;
        
        if (motivo == "") {
            isValid = false;
        }

        [...this.formEl2.elements].forEach(function (field, index) {
            if (['departamento', 'cargo', 'tipoVaga', 'localVaga', 'qtdVagas', 'requisitos', 'motivo'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            }
        });

        if (!isValid) {
            return false;
        }

        let solicitacao = new Solicitacao(
            departamento.options[departamento.selectedIndex].text, 
            cargo.options[cargo.selectedIndex].text,
            tipoVaga.options[tipoVaga.selectedIndex].text,
            localVaga.options[localVaga.selectedIndex].text,
            qtdVagas.value,
            requisitos.value,
            motivo
        );

        console.log(solicitacao);

        return solicitacao;
    }
}

let solicitacaoController = new SolicitacaoController("form-solicitacao1", "form-solicitacao2")
