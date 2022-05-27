var processos = JSON.parse(localStorage.getItem('db_processo') || '[]'); 

class RankingController{
    constructor( procSelId){
        this.procSelEl = document.getElementById(procSelId)
        this.onLoad();
    }

    onLoad(){        
          
        //filtrar processsos para pegar processos != de encerrado
        console.log(processos);
        var processsosEmAndamento = processos.filter(processo => processo.status !== "Encerrado");
        console.log(processsosEmAndamento);
        if(processsosEmAndamento !== ''){
            processsosEmAndamento.forEach(processo => this.procSelEl.appendChild(montarOption(processo.nomeCargo)))          
        }
    }
}

let rankingController = new RankingController("procSel");

function montarOption(nomeCargo){
    var option = document.createElement("option");
    option.setAttribute('value', `${nomeCargo}`);
    option.innerHTML = `${nomeCargo}`
    return option
}