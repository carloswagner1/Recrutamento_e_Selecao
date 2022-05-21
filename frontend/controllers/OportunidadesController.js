import { sendRequest } from "../utils/ApiUtils.js";

// fim para testes
class OportunidadesController {

    constructor(formFiltroId, oportunidadesContainerId) {

        this.formFiltroEl = document.getElementById(formFiltroId);
        this.oportunidadesContainerEl = document.getElementById(oportunidadesContainerId);

        this.onLoad();      
    }

    onLoad() {

        var container = this.oportunidadesContainerEl;

        // setting the url
        const url = "/processos/candidatos/" + localStorage.getItem('id_candidato');

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            // salvando o body da resposta
            let responseBody = response.body;

            if (response.status == 200) {

                responseBody.forEach((processo, index) => {

                    let content = `
                        <div class="cards">
                            <div class="image-section"></div>
                            <div class="content">   
                                <p class="id" style="display: none;">${processo.id}</p>                
                                <h2 class="vaga">${processo.cargo}</h2>
                                <p class="tipoVaga">${processo.tipoVaga}</p>
                                <p class="localVaga">${processo.local}</p>
                                <p class="descricao" style="display: none;">${processo.descricao}</p>  
                                <p class="departamento" style="display: none;">${processo.departamento}</p> 
                                <a class='btn' name="candidatar" >Candidatar</a>
                            </div>
                        </div>
                    `;

                    container.innerHTML += content;            
                    
                });
            }

            // calling this after the result of promise
            this.onSelect(); 
            this.onApply();
        });
    }

    onApply() {
        
        var content = document.querySelectorAll('.content');
        var btn = document.querySelectorAll('.btn');

        btn.forEach((item, index) => {
            item.addEventListener('click', () => {
                var campo = content[index];            
                var vaga = getValues(campo);
                localStorage.setItem('vaga_selecionada', JSON.stringify(vaga));
                window.location.href = '../view/candidatar2.html';            
            })        
        })
    }

    onSelect() {     

        var container = this.oportunidadesContainerEl;         
        var search = document.getElementById('filtrar');
        let tipoVaga = document.getElementById('filtroTipoVaga');
        let localVaga = document.getElementById('filtroLocalVaga');
        let deptoVaga = document.getElementById('filtroDeptoVaga')
      
        // setting the url
        const url = "/processos/candidatos/" + localStorage.getItem('id_candidato');

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, "");
        
        search.addEventListener("click", event => {

            event.preventDefault();

            responsePromise.then(response => {

                if (response.status == 200) {

                    // salvando o body da resposta
                    let processosPorArea = response.body;
                    var processosFiltrados = [];
                    processosFiltrados = processosPorArea;  

                    if (tipoVaga.value !== '') {
                        processosFiltrados = processosPorArea.filter(processo =>{
                            return filtrarVaga(processo.tipoVaga, tipoVaga.value)
                        });                
                    }                       
                    
                    if (localVaga.value !== '') {
                        processosFiltrados = processosFiltrados.filter(processo =>{
                            return filtrarVaga(processo.local, localVaga.value)
                        });                    
                    }

                    if (deptoVaga.value !== '') {
                        processosFiltrados = processosFiltrados.filter(processo =>{
                            return filtrarVaga(processo.departamento, deptoVaga.value)
                        });                    
                    }

                    container.innerHTML = '';

                    if (processosFiltrados.length === 0) {
                        container.innerHTML = `<h2 class="mensagem-filtro">Não há processos seletivos para o filtro selecionado</h2>`
                    }
                    else { 

                        processosFiltrados.forEach((processo, index) => {

                            let content = `
                                <div class="cards">
                                    <div class="image-section"></div>
                                    <div class="content">   
                                        <p class="id" style="display: none;">${processo.id}</p>                
                                        <h2 class="vaga">${processo.cargo}</h2>
                                        <p class="tipoVaga">${processo.tipoVaga}</p>
                                        <p class="localVaga">${processo.local}</p>
                                        <p class="descricao" style="display: none;">${processo.descricao}</p>  
                                        <p class="departamento" style="display: none;">${processo.departamento}</p> 
                                        <a class='btn' name="candidatar" >Candidatar</a>
                                    </div>
                                </div>
                            `;

                            container.innerHTML += content;            
                            
                        });

                        this.onApply();
                    }
                }
                else {
                    container.innerHTML = `<h2 class="mensagem-filtro">Não há processos seletivos para o filtro selecionado</h2>`;
                }

            })
            
        })
    }
}

function filtrarVaga(valor, filtro) {
      
    if (valor == filtro) {
      return true;
    }
}

function getValues(content) {

    let vagaValues = {
        id: '',
        vaga: '',
        tipoVaga: '',
        localVaga: '',
        descricao: '',
        departamento: ''
    }

    var dados = content.childNodes;    

    for (var i = 0; i < dados.length; i++) {

        switch (dados[i].className) {

            case 'id':
                vagaValues.id = dados[i].innerHTML;
                break;

            case 'vaga':
                vagaValues.vaga = dados[i].innerHTML;
                break;

            case 'tipoVaga':
                vagaValues.tipoVaga = dados[i].innerHTML;
                break;

            case 'localVaga':
                vagaValues.localVaga = dados[i].innerHTML;
                break;

            case 'descricao':
                vagaValues.descricao = dados[i].innerHTML;
                break;

            case 'departamento':
                vagaValues.departamento = dados[i].innerHTML;
                break;      
        }
    } 

    return vagaValues;
} 
let oportunidadesController = new OportunidadesController("form-filtro", "oportunidadesContainer");