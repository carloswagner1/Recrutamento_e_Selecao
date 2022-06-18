import { sendRequest } from "../utils/ApiUtils.js";

class MinhasVagas {
    
    constructor(minhasVagas) {

        this.minhasVagasContainer = document.getElementById(minhasVagas);
        
        this.onLoad();
    }

    onLoad() {        

            // setting the url
            const url = "/candidatos/" + localStorage.getItem('id_candidato') + "/inscricoes";

            // enviando a request e salvando a promise
            const responsePromise = sendRequest('GET', url, "");

            responsePromise.then(response => {

                // log para debuggar
                console.log(response);

                // salvando o body da resposta
                let responseBody = response.body;
                if(response.body == 0){
                    const titulo = document.getElementById('titulo');
                    titulo.setAttribute('style', 'display: none');
                    const container = document.getElementById('minhas-vagas');
                    container.classList.remove('container')
                    container.classList.add('container-mensagem')
                    container.innerHTML = `
                    <h1>Bem-vindo!</h1>
                    <p>Você ainda não se inscreveu em nenhum processo seletivo. <br>
                    Para se increver, consulte as vagas disponíveis na aba <a href="../view/oportunidades.html">Oportunidades</a> :)
                    </p>
                    `

                }else if (response.status == 200) {
                    const container = document.getElementById('minhas-vagas');

                    responseBody.forEach((result, index) => {
                        // Create card element
                        const card = document.createElement('div');
                        card.classList = 'card-body';
                      
                        // Construct card content
                        const content = `
                        <div class="card">
                            <div class="inscricao" id="${result.id}">
                                <div class="cards">
                                    <div class="image-section"></div>
                                    <div class="content">
                                        <h2>${result.cargo}</h2>
                                        <p><img src="../images/pasta.png" alt=""> ${result.tipoContratacao}
                                        </p>
                                        <p><img src="../images/local.png" alt=""> ${result.local}</p>

                                        <a href="../view/minhasVagas.html" name="desistir" class="btn">Desistir</a>
                                        <a href="../view/acompanharProgresso.html" name="detalhes" class="btn">Detalhes</a>   
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                      
                        // Append newyly created card element to the container
                        container.innerHTML += content;
                    })
                }

                // calling this after the result of promise
                this.onSubmit();

            }).catch(error => {
                // log para debuggar
                console.log(error);
            });        
    }

    onSubmit() { 

        document.getElementsByName("desistir").forEach(element => {
            element.addEventListener("click", desistir);
        });

        document.getElementsByName("detalhes").forEach(element => {
            element.addEventListener("click", detalhar);
        });

        function desistir(e) {

            let id = e.currentTarget.parentNode.parentNode.parentNode.id

            console.log("desistir");
            console.log(id);

            // setting the url
            const url = "/inscricoes/" + id;

            // enviando a request e salvando a promise
            const responsePromise = sendRequest('DELETE', url, "");
        }

        function detalhar(e) {

            let id = e.currentTarget.parentNode.parentNode.parentNode.id

            console.log("detalhar");
            console.log(id);

            // salvando id da inscrição no local storage para mandar nas proximas requests
            localStorage.setItem('id_inscricao', JSON.stringify(Math.floor(id)));
        }

    }

}

let minhasVagas = new MinhasVagas("minhas-vagas");
