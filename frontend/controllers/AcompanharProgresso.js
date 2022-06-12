import { sendRequest } from "../utils/ApiUtils.js";

class AcompanharProgresso {

    constructor(acompanharProgresso) {

        this.acompanharProgresso = document.getElementById(acompanharProgresso);

        this.onLoad();
    }

    onLoad() { 

        // setting the url
        const url = "/inscricoes/" + localStorage.getItem('id_inscricao') + "/status";

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            if (response.status == 200) {
                let rate = response.body / 4;

                addContentProgresso(response.body, rate)
                addContentRow(response.body);
            }

            function addContentProgresso(status, rate) {

                const containerProgresso = document.getElementById("progresso");

                // Construct content
                const contentProgresso = `
                <div class="progresso-titulo">
                    <span>Meu progresso</span>
                    <span>${status}/4</span>
                </div>

                <div class="jss958 progresso-barra root jss959 jss961" role="progressbar" aria-valuenow="67">
                    <div class="jss968 jss969 linear-progress__bar root jss972" style="transform: scaleX(${rate});">
                    </div>
                </div>
                `;
            
                // Append newyly created card element to the container
                containerProgresso.innerHTML += contentProgresso;
            }

            function addContentRow(status) {

                const containerRow = document.getElementById("row");

                let contentRow;

                switch(status) {

                    case 1:
                        contentRow = `
                        <div class="col-sm-1 col-md-6 side-content">
                            <div class="bs-vertical">
                            <ul>
                                <li class="complete">
                                <div class="texto">
                                    <h1>Candidatar à Vaga</h1>
                                </div>
                                <a href="#"><i class="ico fa fa-check ico-green"></i> </a>
                                </li>
                                <li class="locked">
                                <div class="texto">
                                    <h1>Teste</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                </li>
                                <li class="locked">
                                <div class="texto">
                                    <h1>Entrevista</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                </li>
                                <li class="locked">
                                <div class="texto">
                                    <h1>Resultado</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                </li> 
                            </ul>
                            </div>
                        </div>
                        `;
                        break;

                    case 2:
                        contentRow = `
                        <div class="col-sm-1 col-md-6 side-content">
                            <div class="bs-vertical">
                            <ul>
                                <li class="complete">
                                <div class="texto">
                                    <h1>Candidatar à Vaga</h1>
                                </div>
                                <a href="#"><i class="ico fa fa-check ico-green"></i> </a>
                                </li>
                                <li class="complete">
                                <div class="texto">
                                    <h1>Teste</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-green"></i> </a>
                                </li>
                                <li class="locked">
                                <div class="texto">
                                    <h1>Entrevista</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                </li>
                                <li class="locked">
                                <div class="texto">
                                    <h1>Resultado</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                </li> 
                            </ul>
                            </div>
                        </div>
                        `;
                        break;

                    case 3:
                        contentRow = `
                        <div class="col-sm-1 col-md-6 side-content">
                            <div class="bs-vertical">
                            <ul>
                                <li class="complete">
                                <div class="texto">
                                    <h1>Candidatar à Vaga</h1>
                                </div>
                                <a href="#"><i class="ico fa fa-check ico-green"></i> </a>
                                </li>
                                <li class="complete">
                                <div class="texto">
                                    <h1>Teste</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-green"></i> </a>
                                </li>
                                <li class="locked">
                                <div class="texto">
                                    <h1>Entrevista</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-green"></i> </a>
                                </li>
                                <li class="locked">
                                <div class="texto">
                                    <h1>Resultado</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                </li> 
                            </ul>
                            </div>
                        </div>
                        `;
                        break;

                    case 4:
                        contentRow = `
                        <div class="col-sm-1 col-md-6 side-content">
                            <div class="bs-vertical">
                            <ul>
                                <li class="complete">
                                <div class="texto">
                                    <h1>Candidatar à Vaga</h1>
                                </div>
                                <a href="#"><i class="ico fa fa-check ico-green"></i> </a>
                                </li>
                                <li class="complete">
                                <div class="texto">
                                    <h1>Teste</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-green"></i> </a>
                                </li>
                                <li class="locked">
                                <div class="texto">
                                    <h1>Entrevista</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-green"></i> </a>
                                </li>
                                <li class="locked">
                                <div class="texto">
                                    <h1>Resultado</h1>
                                </div> 
                                <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                </li> 
                            </ul>
                            </div>
                        </div>
                        `;
                        break;

                    default:
                        break;

                }
            
                // Append newyly created card element to the container
                containerRow.innerHTML += contentRow;
            }
                
        });

    }
}

let acompanharProgresso = new AcompanharProgresso("acompanhar-progresso");
