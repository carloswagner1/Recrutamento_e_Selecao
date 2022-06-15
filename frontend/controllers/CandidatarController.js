import { sendRequest } from "../utils/ApiUtils.js";

class CandidatarController {

    constructor(containerDescId) {
        this.containerDescEl = document.getElementById(containerDescId);

        this.onLoad();
    }

    onLoad() {

        const container = this.containerDescEl;
        let vagaSelecionada = this.getVagaSelecionadaStorage();
        
        const content = `
            <div class="descricao">
                <h1>${vagaSelecionada.vaga}</h1>
                <h3>Descrição da vaga</h3>
                <p>${vagaSelecionada.descricao}        
            </div>
            <div class="continuar-button">
                <button id="candidatar" name="candidatar" class="btn"><a href="#">Candidatar</a></button>
                <button id="editarcurriculo" ><a href="../view/curriculo.html">Editar Currículo</a></button>
            </div>
            <div>
                <h3 id="mensagem" class="invisivel"></h3>    
            </div
        `;

        container.innerHTML += content;

        this.onSubmit();
    }

    onSubmit() {

        console.log("candidatar");

        document.getElementsByName("candidatar").forEach(element => {
            element.addEventListener("click", candidatar);
        });

        function candidatar() {

            let values = getValues();
    
            if (!values) {
                return false;
            }

            console.log("candidatar");
            console.log(values);

            // setting the url
            const url = "/inscricoes/";

            // enviando a request
            const responsePromise = sendRequest('POST', url, values);

            responsePromise.then(response => {
    
                // log para debuggar
                console.log(response);
        
                // salvando o body da resposta
                let responseBody = response.body;
                console.log(responseBody);
        
                if (response.status == 200) {
        
                    mensagem.innerHTML = "Inscrição efetuada com sucesso!"
                    mensagem.classList.remove("invisivel");
                
                    setTimeout(function () {
                        mensagem.classList.add("invisivel");
                        window.location.href = '../view/minhasVagas.html'
                    }, 1500)
        
                }
                else if (response.status == 403) {
                    mensagem.innerHTML = "Candidato já inscrito no processo seletivo."
                    mensagem.classList.remove("invisivel");
                }
                else {
                    // mensagem de erro
                    mensagem.innerHTML = "Inscrição não pode ser efetuada."
                    mensagem.classList.remove("invisivel");
                }
        
            })
        }

        function getValues() {
    
            let processo = candidatarController.getVagaSelecionadaStorage();
            let inscricao = {};
            let idCandidato = JSON.parse(localStorage.getItem("id_candidato"));
            let idProcesso = processo.id;
        
            inscricao.idCandidato = idCandidato;
            inscricao.idProcesso = idProcesso;
        
            return new Inscricao(
                inscricao.idCandidato,
                inscricao.idProcesso,
            );
        }
    
    }

    getVagaSelecionadaStorage() {

        let dadosVaga = [];

        if (localStorage.getItem("vaga_selecionada")) {
            dadosVaga = JSON.parse(localStorage.getItem("vaga_selecionada"));
        }

        return dadosVaga;
    }

}

let candidatarController = new CandidatarController("container-desc");
