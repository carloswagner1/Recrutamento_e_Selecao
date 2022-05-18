//para testes
var areaCandidato = 'TI';
var processos = [
    {
        'id': '001',
        'vaga': 'Desenvolvedor Java JR',//vem de cargo
        'tipoVaga': 'Efetivo', //vem da solicitação
        'localVaga': 'São Paulo',//vem da solicitacao
        'area': 'TI', //vem do processo 
        'descricao': 'Desenvolvimento focado em manutenibilidade, performance e boas práticas de desenvolvimento de software para sistemas de utilities',//vem do cargo
        'departamento': 'Desenvolvimento'        
    },
    {
        'id': '002',
        'vaga': 'Advogado',
        'tipoVaga': 'Efetivo',
        'localVaga': 'Sorocaba',
        'area': 'Jurídico',
        'descricao': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias quasi quisquam magni reiciendis necessitatibus suscipit illum exercitationem aspernatur ipsam maxime. Ratione sequi repellendus iure aperiam corporis quam pariatur voluptatibus inventore!',
        'departamento': 'Depto Jurídico'
    },
    {
        'id': '003',
        'vaga': 'DBA Senior',
        'tipoVaga': 'Temporário',
        'localVaga': 'Rio de Janeiro',
        'area': 'TI',
        'descricao': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias quasi quisquam magni reiciendis necessitatibus suscipit illum exercitationem aspernatur ipsam maxime. Ratione sequi repellendus iure aperiam corporis quam pariatur voluptatibus inventore!',
        'departamento': 'Desenvolvimento'
    },
    {
        'id': '004',
        'vaga': 'FrontEnd Developer Jr',
        'tipoVaga': 'Efetivo',
        'localVaga': 'São Paulo',
        'area': 'TI',
        'descricao': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias quasi quisquam magni reiciendis necessitatibus suscipit illum exercitationem aspernatur ipsam maxime. Ratione sequi repellendus iure aperiam corporis quam pariatur voluptatibus inventore!',
        'departamento': 'Desenvolvimento'
    }, {
        'id': '005',
        'vaga': 'Estágio em Design',//vem de cargo
        'tipoVaga': 'Estágio', //vem da solicitação
        'localVaga': 'Sorocaba',//vem da solicitacao
        'area': 'TI', //vem do processo 
        'descricao': 'Desenvolvimento focado em manutenibilidade, performance e boas práticas de desenvolvimento de software para sistemas de utilities',//vem do cargo
        'departamento': 'Comunicação'        
    },
    {
        'id': '006',
        'vaga': 'Auxiliar Administrativo',
        'tipoVaga': 'Efetivo',
        'localVaga': 'Bauru',
        'area': 'Administrativo',
        'descricao': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias quasi quisquam magni reiciendis necessitatibus suscipit illum exercitationem aspernatur ipsam maxime. Ratione sequi repellendus iure aperiam corporis quam pariatur voluptatibus inventore!',
        'departamento': 'Recursos Humandos'
    },
    {
        'id': '007',
        'vaga': 'Técnico de Manutenção',
        'tipoVaga': 'Temporário',
        'localVaga': 'Floarianópolis',
        'area': 'TI',
        'descricao': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias quasi quisquam magni reiciendis necessitatibus suscipit illum exercitationem aspernatur ipsam maxime. Ratione sequi repellendus iure aperiam corporis quam pariatur voluptatibus inventore!',
        'departamento': 'Logística'
    },
    {
        'id': '008',
        'vaga': 'BackEnd Developer',
        'tipoVaga': 'Efetivo',
        'localVaga': 'Sorocaba',
        'area': 'TI',
        'descricao': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias quasi quisquam magni reiciendis necessitatibus suscipit illum exercitationem aspernatur ipsam maxime. Ratione sequi repellendus iure aperiam corporis quam pariatur voluptatibus inventore!',
        'departamento': 'Desenvolvimento'
    }
]
var processosPorArea = processos.filter(processo => processo.area === areaCandidato);


// fim para testes

class OportunidadesController {
    constructor(formFiltroId, oportunidadesContainerId) {
        this.formFiltroEl = document.getElementById(formFiltroId);
        this.oportunidadesContainerEl = document.getElementById(oportunidadesContainerId);

        this.onLoad();
        this.onApply();
        this.onSelect();       
    }
    onLoad() {
        var container = this.oportunidadesContainerEl;
        processosPorArea.forEach((processo, index) => {
            let content = `
                <div class="cards">
                    <div class="image-section"></div>
                    <div class="content">   
                        <p class="id" style="display: none;">${processo.id}</p>                
                        <h2 class="vaga">${processo.vaga}</h2>
                        <p class="tipoVaga">${processo.tipoVaga}</p>
                        <p class="localVaga">${processo.localVaga}</p>
                        <p class="descricao" style="display: none;">${processo.descricao}</p>  
                        <p class="departamento" style="display: none;">${processo.departamento}</p> 
                        <a class='btn' " >Candidatar</a>
                    </div>
                </div>
            `;
            container.innerHTML += content;            
            
        })
    }
    onApply() {
        var content = document.querySelectorAll('.content');
        var search = document.getElementById('form-filtro');        
        var btn = document.querySelectorAll('.btn');
        btn.forEach((item, index) => {
            item.addEventListener('click', () => {
                var campo = content[index]            
                var vaga = getValues(campo);
                localStorage.setItem('vagaSelecionada', JSON.stringify(vaga));
                window.location.href = '../view/candidatar2.html';            
            })        
        })
    }
    onSelect(){       
        var container = this.oportunidadesContainerEl;         
        var search = document.getElementById('filtrar');
        let tipoVaga = document.getElementById('filtroTipoVaga');
        let localVaga = document.getElementById('filtroLocalVaga');
        let deptoVaga = document.getElementById('filtroDeptoVaga')
        
        search.addEventListener("click", event => {
            event.preventDefault();
            var processosFiltrados = [];
            processosFiltrados = processosPorArea;
            
            if(tipoVaga.value !== ''){
                processosFiltrados = processosPorArea.filter(processo =>{
                    return filtrarVaga(processo.tipoVaga, tipoVaga.value)
                });                
            }                       
            
            if(localVaga.value !== ''){
                processosFiltrados = processosFiltrados.filter(processo =>{
                    return filtrarVaga(processo.localVaga, localVaga.value)
                });                    
            }

            if(deptoVaga.value !== ''){
                processosFiltrados = processosFiltrados.filter(processo =>{
                    return filtrarVaga(processo.departamento, deptoVaga.value)
                });                    
            }
            container.innerHTML = '';
            if(processosFiltrados.length === 0){
                container.innerHTML = `<h2 class="mensagem-filtro">Não há processos seletivos para o filtro selecionado</h2>`
            }else{ 
                processosFiltrados.forEach((processo, index) => {
                    let content = `
                        <div class="cards">
                            <div class="image-section"></div>
                            <div class="content">   
                                <p class="id" style="display: none;">${processo.id}</p>                
                                <h2 class="vaga">${processo.vaga}</h2>
                                <p class="tipoVaga">${processo.tipoVaga}</p>
                                <p class="localVaga">${processo.localVaga}</p>
                                <p class="descricao" style="display: none;">${processo.descricao}</p>  
                                <p class="departamento" style="display: none;">${processo.departamento}</p> 
                                <a class='btn' " >Candidatar</a>
                            </div>
                        </div>
                    `;
                    container.innerHTML += content;            
                    
                })
                this.onApply();
            }
            
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

    for(var i = 0; i < dados.length; i++){
        switch(dados[i].className){
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