import { sendRequest } from "../utils/ApiUtils.js";

class ProgressoEmpresaController {

    constructor(procSelId, acompanharProgresso) {
        this.procSelEl = document.getElementById(procSelId);
        this.acompanharProgresso = document.getElementById(acompanharProgresso);

        this.onLoad();
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

        this.onChange(); 
    }

    onChange() {

        var btn = document.getElementById('filtrar');

        btn.addEventListener('click', () => {

            var processoId = document.getElementById('procSel').value
            console.log(processoId);

            // setting the url
            const url = "/processos/" + processoId + "/status";

            console.log(url);
            
            // enviando a request e salvando a promise
            const responsePromise = sendRequest('GET', url, "");

            responsePromise.then(response => {

                // log para debuggar
                console.log(response);

                if (response.status == 200) {
                
                    let rate = response.body / 4;

                    addContentProgresso(response.body, rate);
                    addContentRow(response.body, processoId);
                }

                function addContentProgresso(status, rate) {

                    const containerProgresso = document.getElementById("progresso");

                    console.log(containerProgresso);
    
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
                    containerProgresso.innerHTML = contentProgresso;
                }

                function addContentRow(status, processoId) {

                    const containerRow = document.getElementById("row");
    
                    let contentRow;
    
                    switch(status) {

                        case 1:
                            contentRow = `
                            <div class="bs-vertical" id="${processoId}">
                                <ul>
                                    <li class="complete">
                                        <div class="texto">
                                            <h1>Candidatar à Vaga</h1>
                                            <button id="concluir1" class="button">Concluir</button>
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
                            `;
                            break;

                        case 2:
                            contentRow = `
                            <div class="bs-vertical" id="${processoId}">
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
                                            <button id="concluir" class="button">Concluir</button>
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
                            `;
                            break;

                        case 3:
                            contentRow = `
                            <div class="bs-vertical" id="${processoId}">
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
                                        <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                    </li>
                                    <li class="complete">
                                        <div class="texto">
                                            <h1>Entrevista</h1>
                                            <button id="concluir" class="button">Concluir</button>
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
                            `;
                            break;

                        case 4:
                            contentRow = `
                            <div class="bs-vertical" id="${processoId}">
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
                                        <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                    </li>
                                    <li class="complete">
                                        <div class="texto">
                                            <h1>Entrevista</h1>
                                        </div>
                                        <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                    </li>
                                    <li class="complete">
                                        <div class="texto">
                                            <h1>Resultado</h1>
                                        </div>
                                        <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                                    </li>
                                </ul>
                            </div>
                            `;
                            break;
                    }

                    containerRow.innerHTML = contentRow;
                }

            });
        });
    }
}

let progressoEmpresaController = new ProgressoEmpresaController("procSel", "acompanhar-progresso");

function montarOption(processo) {
    var option = document.createElement("option");
    option.setAttribute('value', `${processo.id}`);
    option.innerHTML = `${processo.cargo}`
    return option
}

const concluir = (event) => {

    let btn = event.target.id;
    let processoId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    console.log(btn);
    console.log(processoId)

    const url = "/processos/" + processoId + "/status";

    let status;

    switch(btn) {
        
        case 'concluir1':
            status = "Teste";
            break;

        case 'concluir2':
            status = "Entrevista";
            break;

        case 'concluir3':
            status = "Concluido";
            break;

    }

    let body = {
        status: status
    }

    const responsePromise = sendRequest('PUT', url, body);

    responsePromise.then(response => {

        // log para debuggar
        console.log(response);

        if (response.status == 200) {
            refresh();
        }

    })
}

function refresh() {

    var processoId = document.getElementById('procSel').value
    console.log(processoId);

    // setting the url
    const url = "/processos/" + processoId + "/status";

    console.log(url);
    
    // enviando a request e salvando a promise
    const responsePromise = sendRequest('GET', url, "");

    responsePromise.then(response => {

        // log para debuggar
        console.log(response);

        if (response.status == 200) {
        
            let rate = response.body / 4;

            addContentProgresso(response.body, rate);
            addContentRow(response.body, processoId);
        }

        function addContentProgresso(status, rate) {

            const containerProgresso = document.getElementById("progresso");

            console.log(containerProgresso);

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
            containerProgresso.innerHTML = contentProgresso;
        }

        function addContentRow(status, processoId) {

            const containerRow = document.getElementById("row");

            let contentRow;

            switch(status) {

                case 1:
                    contentRow = `
                    <div class="bs-vertical" id="${processoId}">
                        <ul>
                            <li class="complete">
                                <div class="texto">
                                    <h1>Candidatar à Vaga</h1>
                                    <button id="concluir1" class="button">Concluir</button>
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
                    `;
                    break;

                case 2:
                    contentRow = `
                    <div class="bs-vertical" id="${processoId}">
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
                                    <button id="concluir2" class="button">Concluir</button>
                                </div>
                                <a href="#"><i class="ico fa fa-check ico-green"></i> </a>
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
                    `;
                    break;

                case 3:
                    contentRow = `
                    <div class="bs-vertical" id="${processoId}">
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
                                <a href="#"><i class="ico fa fa-check ico-green"></i> </a>
                            </li>
                            <li class="complete">
                                <div class="texto">
                                    <h1>Entrevista</h1>
                                    <button id="concluir3" class="button">Concluir</button>
                                </div>
                                <a href="#"><i class="ico fa fa-check ico-green"></i> </a>
                            </li>
                            <li class="locked">
                                <div class="texto">
                                    <h1>Resultado</h1>
                                </div>
                                <a href="#"><i class="ico fa fa-lock ico-muted"></i> </a>
                            </li>
                        </ul>
                    </div>
                    `;
                    break;

                case 4:
                    contentRow = `
                    <div class="bs-vertical" id="${processoId}">
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
                                <a href="#"><i class="ico fa fa-check ico-green"></i> </a>
                            </li>
                            <li class="complete">
                                <div class="texto">
                                    <h1>Entrevista</h1>
                                </div>
                                <a href="#"><i class="ico fa fa-check ico-green"></i> </a>
                            </li>
                            <li class="complete">
                                <div class="texto">
                                    <h1>Resultado</h1>
                                </div>
                                <a href="#"><i class="ico fa fa-check ico-green"></i> </a>
                            </li>
                        </ul>
                    </div>
                    `;
                    break;
            }

            containerRow.innerHTML = contentRow;
        }

    });

}

document.querySelector('#row').addEventListener('click', concluir)
