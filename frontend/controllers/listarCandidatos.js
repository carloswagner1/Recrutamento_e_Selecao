var processos = JSON.parse(localStorage.getItem('db_processo') || '[]'); 

class ListarCandidatosController{
    constructor(formFiltroId, dadosCandidatosId, procSelId){
        this.formFiltroEl = document.getElementById(formFiltroId);
        this.dadosCandidatosEl = document.getElementById(dadosCandidatosId);
        this.procSelEl = document.getElementById(procSelId)
        this.onLoad();
        this.onSelect();
    }

    onLoad(){          
        //filtrar processsos para pegar processos != de encerrado
             
        var processsosEmAndamento = processos.filter(processo => processo.status !== "Encerrado");
        console.log(processsosEmAndamento);
        if(processsosEmAndamento !== ''){
            processsosEmAndamento.forEach(processo => this.procSelEl.appendChild(montarOption(processo.nomeCargo))) 
            // salvar os processosEmAndamento no localStorage.         
        }else{
            document.getElementById('box-title').innerHTML = 'Não há processos seletivos em andamento'
        }
    }
    onSelect(){
        var filtrar = document.getElementById('filtrar');
        let processoSeletivo = document.getElementById('procSel');
        console.log(processoSeletivo);
        console.log(filtrar);
        filtrar.addEventListener("click", event => {
            event.preventDefault();

            //enviar id processo para fazer o innerjoin com as inscrições e candidatos

            candidatosFiltrados.forEach(candidato)


        })

        




    }
}

let listaCandidatosController = new ListarCandidatosController("form-filtro", "dados-candidatos", "procSel");

function montarOption(nomeCargo){
    var option = document.createElement("option");
    option.setAttribute('value', `${nomeCargo}`);
    option.innerHTML = `${nomeCargo}`
    return option
}