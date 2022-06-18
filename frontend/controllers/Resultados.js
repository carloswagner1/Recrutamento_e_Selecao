import { sendRequest } from "../utils/ApiUtils.js";

class ResultadosController {

    constructor (procSelId, boxTitleId, tableCandidatosID) {
        this.procSelEl = document.getElementById(procSelId);
        this.boxTitleEl = document.getElementById(boxTitleId);
        this.tableCandidatosEl = document.getElementById(tableCandidatosID);
        this.onLoad();
    }

    onLoad(){        
          
        //filtrar processsos para pegar processos != de encerrado
        
        // setting the url
        const url = "/processos/usuarios/" + localStorage.getItem("id_usuario");

        // enviando a request
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            if (response.status == 200) {

                let processsosEmAndamento = response.body;

                if (processsosEmAndamento.length > 0) {
                    let select = this.procSelEl;
                    processsosEmAndamento.forEach(processo => select.appendChild(montarOption(processo)));
                }
                else {
                    this.boxTitleEl.innerHTML = 'Não há processos seletivos em andamento';
                }
            }
        })

        this.onSelect();          
    }

    onSelect() {

        var filtrar = document.getElementById('filtrar');

        filtrar.addEventListener("click", event => {

            event.preventDefault();            
            var listaCandidatos = this.boxTitleEl;
            document.getElementById("thead").setAttribute("style", "display: ")
            this.boxTitleEl.innerHTML = 'Resultados do Processo Seletivo' 
            var tabelaCandidatos = this.tableCandidatosEl;
            tabelaCandidatos.innerHTML = '';

            let select = JSON.parse(document.getElementById('procSel').value);

            var processoId = select.id;
            
            // setting the url
            const url = "/processos/" + processoId + "/candidatos/ativos";

            // enviando a request e salvando a promise
            const responsePromise = sendRequest('GET', url, "");

            responsePromise.then(response => {

                // log para debuggar
                console.log(response);

                if (response.status == 200) {
                    var candidatosClassificados = response.body.candidatosClassificados;

                    document.getElementById('nota-teste').innerHTML = response.body.maiorNota;
                    document.getElementById('btnConsultar').disabled=false;
                    document.getElementById('btnEncerrar').disabled = false;

                    if (select.status === 'Concluído') {
                        document.getElementById('btnEncerrar').disabled = true;
                    }

                    //para cada candidato classificado, temos q preencheer o html
                    if (candidatosClassificados.length === 0) {
                        //se não houver candidato classificado no processo
                        tabelaCandidatos.innerHTML = ''
                        listaCandidatos.innerHTML = 'Não há candidatos classificados neste processo seletivo'
                        document.getElementById("thead").setAttribute('style', 'display: none')
                    }
                    else {    
                        candidatosClassificados.forEach((candidato, index) => {                  
                            //estrutura para preencher o HTML
                            var candidatoTr = montaTr(candidato, select.status, index);
                            tabelaCandidatos.appendChild(candidatoTr);

                            this.btnEncerrar(processoId);
                        });  
                    }

                }
            })        
        })
    }

    btnEncerrar(processoId) {

        var btnEncerrar = document.getElementById('btnEncerrar');

        btnEncerrar.addEventListener('click', event =>{

            event.preventDefault();
            var mensagem = document.getElementById('mensagemProcesso');

            // setting the url
            const url = "/processos/" + processoId + "/encerrar";

            // enviando a request e salvando a promise
            const responsePromise = sendRequest('GET', url, "");

            responsePromise.then(response => {

                // log para debuggar
                console.log(response);

                if (response.status == 200) {
                    mensagem.innerHTML = "Encerramento registrado com sucesso";
                    setTimeout(function(){
                        mensagem.innerHTML = "";
                    }, 2000);
                                                              
                    setTimeout(function(){
                        document.location.reload(true); 
                    }, 2000); 
                
                }
            });

        })
    }
}

let resultadosController = new ResultadosController("procSel", "box-title", "tabela-candidatos");

//interação elementos HTML
function montarOption(processo) {
    var option = document.createElement("option");
    option.setAttribute('value', `{"id":"${processo.id}", "status":"${processo.status}"}`);
    option.innerHTML = `${processo.cargo}`;
    return option;
}

function montaTr(candidato, status, index) {
    var candidatoTr = document.createElement("tr");
    candidatoTr.classList.add('candidato');        
    candidatoTr.appendChild(montaTd(candidato.nome, "nome", "Nome"));
    candidatoTr.appendChild(montaTd(candidato.email, "email", "Email"));    
    candidatoTr.appendChild(montaTd(candidato.celular, "celular", "Celular"));
    candidatoTr.appendChild(montaTd(candidato.notaTeste, "notaTeste", "Nota do Teste"));
    candidatoTr.appendChild(montaTd(candidato.dataEntrevista, "dataEntrevista", "DataEntrevista"));
    candidatoTr.appendChild(montaTd(candidato.horaEntrevista, "horaEntrevista", "HoraEntrevista"));
    candidatoTr.appendChild(montaTd(candidato.id, "id", "Id"));
    candidatoTr.appendChild(montaTdBtn("acoes", "Ações", candidato.dataEntrevista, candidato.situacao, status, index));    
    return candidatoTr;
}

function montaTd(dado, classe, dataTitle) {

    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    td.setAttribute("data-title", dataTitle);

    if (classe === 'id') {
        td.setAttribute('style', 'display: none')
    }

    return td;
}

function montaTdBtn(classe, dataTitle, data, situacao, status, index) {

    console.log(data);

    var td = document.createElement("td");

    if (status === 'Concluído') {
        if (situacao === 'Aprovado') {
            td.innerHTML = `
                <div>
                    <button type="button" class="btn btn-primary" name="btn-agendar" id="agendar-${index}" data-bs-toggle="modal"
                        data-bs-target="#modal-entrevista" style="display:none">Reagendar Entrevista</button>
                    <button type="button" class="btn btn-success" name="btn-aprovar" id="aprovar-${index}" style="display:none">Aprovar</button>                
                    <button type="button" class="btn btn-danger" name="btn-reprovar" id="reprovar-${index}" style="display:none">Reprovar</button>
                    <h5 class="resultado" name="resultado" style="color: green; display: block; font-weight: bold">APROVADO</h5>  
                </div>
            `;
        }
        else {
            td.innerHTML = `
                <div>
                    <button type="button" class="btn btn-primary" name="btn-agendar" id="agendar-${index}" data-bs-toggle="modal"
                        data-bs-target="#modal-entrevista" style="display:none">Reagendar Entrevista</button>
                    <button type="button" class="btn btn-success" name="btn-aprovar" id="aprovar-${index}" style="display:none">Aprovar</button>                
                    <button type="button" class="btn btn-danger" name="btn-reprovar" id="reprovar-${index}" style="display:none">Reprovar</button>
                    <h5 class="resultado" name="resultado" style="color: red; display: block; font-weight: bold"">REPROVADO</h5>  
                </div>
            `;
        }
    }
    else if (situacao === 'Aprovado') {
        td.innerHTML = `
            <div>
                <button type="button" class="btn btn-primary" name="btn-agendar" id="agendar-${index}" data-bs-toggle="modal"
                    data-bs-target="#modal-entrevista" style="display:none">Reagendar Entrevista</button>
                <button type="button" class="btn btn-success" name="btn-aprovar" id="aprovar-${index}" style="display:none">Aprovar</button>                
                <button type="button" class="btn btn-danger" name="btn-reprovar" id="reprovar-${index}" style="display:none">Reprovar</button>
                <h5 class="resultado" name="resultado" style="color: green; display: block; font-weight: bold">APROVADO</h5>  
            </div>
        `;
    }
    else if (situacao === 'Reprovado') {
        td.innerHTML = `
            <div>
                <button type="button" class="btn btn-primary" name="btn-agendar" id="agendar-${index}" data-bs-toggle="modal"
                    data-bs-target="#modal-entrevista" style="display:none">Reagendar Entrevista</button>
                <button type="button" class="btn btn-success" name="btn-aprovar" id="aprovar-${index}" style="display:none">Aprovar</button>                
                <button type="button" class="btn btn-danger" name="btn-reprovar" id="reprovar-${index}" style="display:none">Reprovar</button>
                <h5 class="resultado" name="resultado" style="color: red; display: block; font-weight: bold"">REPROVADO</h5>  
            </div>
        `;
    }
    else if (data) {
        td.innerHTML = `
            <div>
                <button type="button" class="btn btn-primary" name="btn-agendar" id="agendar-${index}" data-bs-toggle="modal"
                    data-bs-target="#modal-entrevista">Reagendar Entrevista</button>
                <button type="button" class="btn btn-success" name="btn-aprovar" id="aprovar-${index}">Aprovar</button>                
                <button type="button" class="btn btn-danger" name="btn-reprovar" id="reprovar-${index}">Reprovar</button>
                <h5 class="resultado" name="resultado"></h5>  
            </div>
        `;
    }
    else {
        td.innerHTML = `
            <div>
                <button type="button" class="btn btn-primary" name="btn-agendar" id="agendar-${index}" data-bs-toggle="modal"
                    data-bs-target="#modal-entrevista">Agendar Entrevista</button>
                <button type="button" class="btn btn-success" name="btn-aprovar" id="aprovar-${index}">Aprovar</button>            
                <button type="button" class="btn btn-danger" name="btn-reprovar" id="reprovar-${index}">Reprovar</button>
                <h5 class="resultado" name="resultado"></h5>
            </div>
        `;
    }

    td.classList.add(classe); 
    td.setAttribute("data-title", dataTitle);

    return td;
}

const action = (event) => {

    let candidato = event.target.parentNode.parentNode.parentNode;

    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-');

        if (action == 'agendar') {
            agendarEntrevista(candidato);
        }
        else if (action == 'aprovar') {
            const response = confirm(`Deseja realmente aprovar esse candidato?`);

            if (response) {
                aprovar(candidato);
            }
        }
        else if (action == 'reprovar') {
            const response = confirm(`Deseja realmente reprovar esse candidato?`);

            if (response) {
                reprovar(candidato);
            }
        }
        else {
            console.log("Action inesperada. action: " + action);
        }
    }
}

function agendarEntrevista(candidato) {   
            
    let idCandidato = candidato.getElementsByTagName("td")[6].textContent;
    let email = candidato.getElementsByTagName("td")[1].textContent;

    document.getElementById('email').value = email;
    var btnEnviar =  document.getElementById('enviar');

    btnEnviar.addEventListener('click', () => {
                    
        var camposModal = document.querySelectorAll('.modal-field');
        var msgError = document.getElementById('msgError');    

        camposModal.forEach(item => {

            //testar campos vazios
            if (item.value == '') {  

                msgError.innerHTML = " *Todos os campos devem ser preenchidos";

                setTimeout(function() {
                    msgError.innerHTML = "" ;
                    return;
                }, 5000);                            
            }
        })
        
        //capturando dados para mensagem                            
        var email = document.getElementById('email');
        var mensagem = document.getElementById('mensagem');
        var dataEntrevista = document.getElementById('dataEntrevista');
        var horaEntrevista = document.getElementById('horarioEntrevista');
        var linkEntrevista = document.getElementById('linkEntrevista');

        var processoId = (JSON.parse(document.getElementById('procSel').value)).id;

        //preeenchendo provisoriamente a table com os dados marcado                            
        var body = new Object();
        body.email = email.value;
        body.mensagem = mensagem.value;
        body.dataEntrevista = dataEntrevista.value;
        body.horaEntrevista = horaEntrevista.value;
        body.linkEntrevista = linkEntrevista.value;   
        
        // setting the url
        const url = "/processos/" + processoId + "/candidatos/" + idCandidato;

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('POST', url, body);

        responsePromise.then(response => {

            if (response.status == 200) {

                // setting dataEntrevista, horaEntrevista e mudando nome do botão
                candidato.getElementsByTagName('td')[4].textContent = dataEntrevista.value;
                candidato.getElementsByTagName('td')[5].textContent = horaEntrevista.value;
                candidato.getElementsByTagName('td')[7].getElementsByTagName('div')[0].getElementsByTagName('button')[0].textContent = 'Reagendar Entrevista';

                setTimeout(function() {
                    closeModal();
                    location.reload(); 
                }, 2000); 
            }
            else {
                msgError.innerHTML = "Não foi possível agendar a entrevista. Tente novamente.";

                setTimeout(function() {
                    msgError.innerHTML = "" 
                }, 5000); 
            }
        })
            
            
    })

}

function closeModal() {
    var bodyTag = document.querySelector('body')
    var myModal = document.getElementById('modal-entrevista');
    myModal.classList.remove('show');
    var node = document.querySelector('.modal-backdrop');
    node.parentNode.removeChild(node);           
    myModal.removeAttribute('aria-modal');
    myModal.removeAttribute('role');
    myModal.setAttribute('style', 'display:none');
    myModal.setAttribute('aria-hidden', 'true');       
    bodyTag.classList.remove('modal-open');
    bodyTag.setAttribute('style', '');
}

function aprovar(candidato) {

    let idCandidato = candidato.getElementsByTagName("td")[6].textContent;

    var processoId = (JSON.parse(document.getElementById('procSel').value)).id;

    let btnAgendar = candidato.getElementsByTagName('td')[7].getElementsByTagName('div')[0].getElementsByTagName('button')[0];
    let btnAprovar = candidato.getElementsByTagName('td')[7].getElementsByTagName('div')[0].getElementsByTagName('button')[1];
    let btnReprovar = candidato.getElementsByTagName('td')[7].getElementsByTagName('div')[0].getElementsByTagName('button')[2];
    let resultado = candidato.getElementsByTagName('td')[7].getElementsByTagName('div')[0].getElementsByTagName('h5')[0];
    
    // setting the url
    const url = "/processos/" + processoId + "/candidatos/" + idCandidato + "/aprovar";

    // enviando a request e salvando a promise
    const responsePromise = sendRequest('GET', url, "");

    responsePromise.then(response => {

        // log para debuggar
        console.log(response);

        if (response.status == 200) {
            btnAgendar.setAttribute('style', 'display: none');
            btnAprovar.setAttribute('style', 'display: none');
            btnReprovar.setAttribute('style', 'display: none');
            resultado.textContent = 'APROVADO';
            resultado.setAttribute('style', 'display: block');
            resultado.setAttribute('style', 'color: green');   
        }
    })   
}

function reprovar(candidato) {

    let idCandidato = candidato.getElementsByTagName("td")[6].textContent;

    var processoId = (JSON.parse(document.getElementById('procSel').value)).id;

    let btnAgendar = candidato.getElementsByTagName('td')[7].getElementsByTagName('div')[0].getElementsByTagName('button')[0];
    let btnAprovar = candidato.getElementsByTagName('td')[7].getElementsByTagName('div')[0].getElementsByTagName('button')[1];
    let btnReprovar = candidato.getElementsByTagName('td')[7].getElementsByTagName('div')[0].getElementsByTagName('button')[2];
    let resultado = candidato.getElementsByTagName('td')[7].getElementsByTagName('div')[0].getElementsByTagName('h5')[0];
    
    // setting the url
    const url = "/processos/" + processoId + "/candidatos/" + idCandidato + "/reprovar";

    // enviando a request e salvando a promise
    const responsePromise = sendRequest('GET', url, "");

    responsePromise.then(response => {

        // log para debuggar
        console.log(response);

        if (response.status == 200) {
            btnAgendar.setAttribute('style', 'display: none');
            btnAprovar.setAttribute('style', 'display: none');
            btnReprovar.setAttribute('style', 'display: none');
            resultado.textContent = 'REPROVADO';
            resultado.setAttribute('style', 'display: block');
            resultado.setAttribute('style', 'color: red');
        }
    })
      
}

document.querySelector('#tabelaCandidatos>tbody').addEventListener('click', action);                
