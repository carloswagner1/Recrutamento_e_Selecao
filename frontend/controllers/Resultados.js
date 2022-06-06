//para testes

var processos = [
	{
		"id" : 1,
		"area" : "TI",
		"data_final" : "2022-09-09 00:00:00.000000",
		"data_inicio" : "2022-08-09 00:00:00.000000",
		"descricao" : "Nova vaga",
        "nomeCargo": "Desenvolvedor BackEnd",
		"id_cargo" : 1,
		"id_departamento" : 1,
		"id_solicitacao_vaga" : 1,
		"id_status" : 1
	},
	{
		"id" : 2,
		"area" : "TI",
		"data_final" : "2022-09-09 00:00:00.000000",
		"data_inicio" : "2022-08-09 00:00:00.000000",
		"descricao" : "Vaga massa",
        "nomeCargo": "Desenvolvedor FrontEnd",
		"id_cargo" : 3,
		"id_departamento" : 2,
		"id_solicitacao_vaga" : 2,
		"id_status" : 1
	}
]
/*
var inscricoes = [    
    {
        "id": 1,
        "idProcesso": 1,
        "idCandidato": 1,
        "dataInscricao": "2022-05-02",
        "situacao": "inscrito",
        "pontuacaoTeste": " "
    },
    {
        "id": 2,
        "idProcesso": 1,
        "idCandidato": 2,
        "dataInscricao": "2022-05-02",
        "situacao": "inscrito",
        "pontuacaoTeste": " "
    },
    {
        "id": 3,
        "idProcesso": 1,
        "idCandidato": 3,
        "dataInscricao": "2022-05-02",
        "situacao": "inscrito",
        "pontuacaoTeste": " "
    },
    {
        "id": 4,
        "idProcesso": 2,
        "idCandidato": 4,
        "dataInscricao": "2022-05-02",
        "situacao": "inscrito",
        "pontuacaoTeste": " "
    },
        {
        "id": 5,
        "idProcesso": 2,
        "idCandidato": 2,
        "dataInscricao": "2022-05-02",
        "situacao": "inscrito",
        "pontuacaoTeste": " "
    },
    {
        "id": 6,
        "idProcesso": 2,
        "idCandidato": 5,
        "dataInscricao": "2022-05-02",
        "situacao": "inscrito",
        "pontuacaoTeste": " "
    },
]

localStorage.setItem('inscricoes', JSON.stringify(inscricoes));*/
localStorage.setItem('processos', JSON.stringify(processos));

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