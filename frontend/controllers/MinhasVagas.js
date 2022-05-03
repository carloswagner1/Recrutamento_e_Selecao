import { sendRequest } from "../utils/ApiUtils.js";

class MinhasVagas {
    
    constructor(loginContainerId) {
        this.loginContainerEl = document.getElementById(loginContainerId);
        
        this.oninit();
    }

    oninit() {        

            // setting the url
            const url = "/candidatos/" + localStorage.getItem('id_candidato') + "/inscricoes";

            // enviando a request e salvando a promise
            const responsePromise = sendRequest('GET', url, "");

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
                    const container = document.getElementById('accordion');

                    responseBody.forEach((result, idx) => {
                        // Create card element
                        const card = document.createElement('div');
                        card.classList = 'card-body';
                      
                        // Construct card content
                        const content = `
                          <div class="card">
                          <div class="card-header" id="heading-${idx}">
                            <h5 class="mb-0">
                                <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${idx}" aria-expanded="true" aria-controls="collapse-${idx}">
                      
                                </button>
                            </h5>
                          </div>

                          <div class="cards">
                          <div class="image-section"></div>
                          <div class="content">
                              <h2>${result.cargo}</h2>
                              <p><img src="../images/pasta.png" alt=""> ${result.tipoContratacao}
                              </p>
                              <p><img src="../images/local.png" alt=""> ${result.local}</p> 
                              <a href="#" class="btn">Desistir</a>
                              <a href="../view/acompanharProgresso.html" class="btn">Detalhes </a>
                              
                          </div> 
                        </div>
                        `;
                      
                        // Append newyly created card element to the container
                        container.innerHTML += content;
                    })
                }
            }).catch(error => {
                // log para debuggar
                console.log(error);
            });        
    }

}

let minhasVagas = new MinhasVagas("login-container");






