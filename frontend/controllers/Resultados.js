//para testes

/*var processos = [
    {
        "id": 1,
        "nomeDepartamento": "Tecnologias da Informação",
        "nomeCargo": "Desenvolvedor Backend",
        "area": "TI",
        "tipoVaga": "Efetivo",
        "localVaga": "São Paulo",
        "qtdvagas": "5",
        "requisitos": "Java, Javascript, SQL",
        "teste": "teste de lógica",
        "dataInicio": "2022-05",
        "dataFinal": "2022-06",
        "status": "Iniciado"
    },
    {
        "id": 2,
        "nomeDepartamento": "Tecnologias da Informação",
        "nomeCargo": "Desenvolvedor FrontEnd",
        "area": "TI",
        "tipoVaga": "Efetivo",
        "localVaga": "São Paulo",
        "qtdvagas": "3",
        "requisitos": "HTML, CSS, BootStrap",
        "teste": "teste de lógica",
        "dataInicio": "2022-05",
        "dataFinal": "2022-06",
        "status": "Iniciado"
    },
    {
        "id": 3,
        "nomeDepartamento": "Recursos Humanos",
        "nomeCargo": "Secretária",
        "area": "Administrativo",
        "tipoVaga": "Efetivo",
        "localVaga": "Rio de Janeiro",
        "qtdvagas": "1",
        "requisitos": "boa redação",
        "teste": "teste lógico",
        "dataInicio": "2022-05",
        "dataFinal": "2022-06",
        "status": "Iniciado"
    },
    {
        "id": 4,
        "nomeDepartamento": "Jurídico",
        "nomeCargo": "Advogado",
        "area": "TI",
        "tipoVaga": "Efetivo",
        "localVaga": "Distrito Federal",
        "qtdvagas": "1",
        "requisitos": "conhecimento em contratos",
        "teste": "teste de redação jurídica",
        "dataInicio": "2022-05",
        "dataFinal": "2022-07",
        "status": "Iniciado"
    },
    {
        "id": 5,
        "nomeDepartamento": "Comercial",
        "nomeCargo": "Vendedor",
        "area": "TI",
        "tipoVaga": "Temporário",
        "localVaga": "São Paulo",
        "qtdvagas": "1",
        "requisitos": "experiência de 3 anos",
        "teste": "redação",
        "dataInicio": "2022-05",
        "dataFinal": "2022-06",
        "status": "Encerrado"
    }
]

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
        "idCandidato": 4,
        "dataInscricao": "2022-05-02",
        "situacao": "inscrito",
        "pontuacaoTeste": " "
    },
    {
        "id": 4,
        "idProcesso": 2,
        "idCandidato": 3,
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

localStorage.setItem('inscricoes', JSON.stringify(inscricoes));
localStorage.setItem('processos', JSON.stringify(processos));*/


var processos = JSON.parse(localStorage.getItem('processos') || '[]'); 
var inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '[]'); 
var candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]'); 

class ResultadosController{
    constructor( procSelId, boxTitleId, tableCandidatosID){
        this.procSelEl = document.getElementById(procSelId);
        this.boxTitleEl = document.getElementById(boxTitleId);
        this.tableCandidatosEl = document.getElementById(tableCandidatosID);
        this.onLoad();
        this.onSelect();        
    }

    onLoad(){        
          
        //filtrar processsos para pegar processos != de encerrado
        
        var processsosEmAndamento = processos.filter(processo => processo.status !== "Encerrado");
        
        if(processsosEmAndamento !== ''){
            processsosEmAndamento.forEach(processo => this.procSelEl.appendChild(montarOption(processo.nomeCargo, processo.id)))         
        }else{
            this.boxTitleEl.innerHTML = 'Não há processos seletivos em andamento'
        }
    }

    onSelect(){
        var filtrar = document.getElementById('filtrar');

        filtrar.addEventListener("click", event => {
            event.preventDefault();
            let processoSeletivo = this.procSelEl.value;
            var listaCandidatos = this.boxTitleEl;
            document.getElementById("thead").setAttribute("style", "display: ")
            this.boxTitleEl.innerHTML = 'Resultados do Processo Seletivo' 
            var tabelaCandidatos = this.tableCandidatosEl;
            tabelaCandidatos.innerHTML = '' 

            //Pelo Processo Seletivo que foi selecionado, temos que buscar no banco os candidatos inscritos. Então, preciso de um inner join entre as tabelas processo_seletivo, tb_inscricao e tb_candidatos para trazer os candidatos inscritos do processso seletivo vai substituir este filtro aqui de baixo. Tem q colocar uma condição de inscricoes !== "reprovado" conforme status que estabelecemos

            var candidatosClassificados = []; 
            var opcaoProcesso = this.procSelEl.options[this.procSelEl.selectedIndex].value;                       

            var inscricoesDoProcesso = inscricoes.filter(inscricao => {   
                
                if(inscricao.idProcesso == opcaoProcesso && inscricao.situacao !== 'reprovado'){
                     return inscricao;
                }
            })
            var maiorNota = 0;           

            inscricoesDoProcesso.forEach(inscricaoprocesso =>{
                if(maiorNota < inscricaoprocesso.pontuacaoTeste){
                    maiorNota = inscricaoprocesso.pontuacaoTeste;
                }
                candidatos.filter(candidato => {
                    if(inscricaoprocesso.idCandidato == candidato.id){
                        candidatosClassificados.push(candidato);
                    }
                })
            })
            document.getElementById('nota-teste').innerHTML = maiorNota;

            //fim filtro

            //para cada candidato classificado, temos q preencheer o html
            if(candidatosClassificados.length === 0){
                //se não houver candidato classificado no processo
                tabelaCandidatos.innerHTML = ''
                listaCandidatos.innerHTML = 'Não há candidatos classificados neste processo seletivo'
                document.getElementById("thead").setAttribute('style', 'display: none')
            }else{                
                candidatosClassificados.forEach((candidato, index) => {                  
                    var notaCandidato;
                    inscricoesDoProcesso.forEach(inscricao =>{
                        if(inscricao.idCandidato == candidato.id){
                            notaCandidato = inscricao.pontuacaoTeste;
                        }
                    })
                    
                    //estrutura para preencher o HTML
                    var candidatoTr = montaTr(candidato, index, notaCandidato);
                    tabelaCandidatos.appendChild(candidatoTr);
                })                                
            }
        })
    }
}

let resultadosController = new ResultadosController("procSel", "box-title", id="tabela-candidatos");

function montarOption(nomeCargo, id){
    var option = document.createElement("option");
    option.setAttribute('value', `${id}`);
    option.innerHTML = `${nomeCargo}`
    return option
}

function montaTr(candidato, index, nota){
    
    var candidatoTr = document.createElement("tr");
    candidatoTr.classList.add('candidato');        
    candidatoTr.appendChild(montaTd(candidato.nome, "nome", "Nome"));
    candidatoTr.appendChild(montaTd(candidato.email, "email", "Email"));    
    candidatoTr.appendChild(montaTd(candidato.celular, "celular", "Celular"));
    candidatoTr.appendChild(montaTd(nota, "notaTeste", "Nota do Teste"));
    candidatoTr.appendChild(montaTd('', "dataEntrevista", "DataEntrevista"));
    candidatoTr.appendChild(montaTd('', "horaEntrevista", "HoraEntrevista"));
    candidatoTr.appendChild(montaTdBtn("acoes", "Ações"));
    candidatoTr.appendChild(montaTd(candidato.id, "id", "Id"))
    return candidatoTr
}
function montaTd(dado, classe, dataTitle){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    td.setAttribute("data-title", dataTitle);
    if(classe === 'id'){
        td.setAttribute('style', 'display: none')
    }
    return td;
}
function montaImputNota(dado, classe, dataTitle, index){    
    var td = document.createElement("td");
    var div = document.createElement('div');
    var input = document.createElement('input');
    input.innerHTML = dado;
    input.classList.add('form-control');
    input.classList.add('nota-teste');
    input.setAttribute('type', 'number');
    input.setAttribute('min', '0');
    input.setAttribute('id', `nota${index}`)    
    div.appendChild(input);
    div.classList.add('nota');
    div.classList.add('nota-tabela');
    td.appendChild(div);    
    td.classList.add(classe); 
    td.setAttribute("data-title", dataTitle);
    return td;
}
function montaTdBtn(classe, dataTitle){
    var td = document.createElement("td");
    td.innerHTML = `
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#modal-entrevista">Agendar Entrevista</button>
        <button type="button" class="btn btn-success">Aprovar</button>
        <button type="button" class="btn btn-danger">Reprovar</button>
    </div>
`;
    td.classList.add(classe); 
    td.setAttribute("data-title", dataTitle);
    return td;
}
function updateInscricao(linha, btn, index) {
    
    const inscricaoAtualizada = {
        idCandidato: '',
        pontuacaoTeste: '',
        situacao: '',        
    }
    var dados = linha.childNodes;
    
    for (var i = 0; i < dados.length; i++){ 
        if(dados[i].className === 'id'){                
                inscricaoAtualizada.idCandidato = dados[i].textContent;
                break;
        }
    }
    if(btn.value === 'classificado'){
        inscricaoAtualizada.pontuacaoTeste = document.getElementById(`nota${index/2}`).value
        inscricaoAtualizada.situacao = 'classificado'
        console.log(inscricaoAtualizada.pontuacaoTeste)

    }else{
        inscricaoAtualizada.pontuacaoTeste = document.getElementById(`nota${(index-1)/2}`).value
        inscricaoAtualizada.situacao = 'reprovado'
        console.log(inscricaoAtualizada.pontuacaoTeste)
    }

    var inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '[]');  
    inscricoes.map(inscricao =>{
        if(inscricao.idCandidato == inscricaoAtualizada.idCandidato){
            Object.assign(inscricao, inscricaoAtualizada);
        }
    })

    localStorage.setItem("inscricoes", JSON.stringify(inscricoes));

    removeLinha(linha);    
}
function removeLinha(linha) {
    //Excluir linha da tabela
    linha.classList.add("fadeOut");
    setTimeout(function(){
        linha.remove();        
    }, 500)
    if(document.getElementById('tabela-candidatos').childElementCount === 1){        
        document.getElementById("box-title").innerHTML = 'Não há candidatos para classificar neste processo seletivo'
        document.getElementById("thead").setAttribute('style', 'display: none')
    }
}
