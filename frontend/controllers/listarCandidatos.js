import { sendRequest } from "../utils/ApiUtils.js";

class ListarCandidatosController {

    constructor(formFiltroId, procSelId, dadosCandidatoId, boxTitleId) {
        this.formFiltroEl = document.getElementById(formFiltroId);
        this.procSelEl = document.getElementById(procSelId)
        this.dadosCandidatoEl = document.getElementById(dadosCandidatoId);
        this.boxTitleEl = document.getElementById(boxTitleId)
        this.onLoad();       
    }

    onLoad() { 
        
        // setting the url
        const url = "/processos/usuarios/" + localStorage.getItem("id_usuario");

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

        this.onSelect();
    }

    onSelect() {

        var filtrar = document.getElementById('filtrar');

        filtrar.addEventListener("click", () => {

            var listaCandidatos = this.boxTitleEl;

            var processoId = document.getElementById('procSel').value

            //Pelo Processo Seletivo que foi selecionado, temos que buscar no banco os candidatos inscritos. Então, preciso de um inner join entre as tabelas processo_seletivo, tb_inscricao e tb_candidatos para trazer os candidatos inscritos do processso seletivo vai substituir este filtro aqui de baixo
            
            const url = "/processos/" + processoId + "/candidatos";

            // enviando a request e salvando a promise
            const responsePromise = sendRequest('GET', url, "");
    
            responsePromise.then(response => {
    
                // log para debuggar
                console.log(response);
    
                if (response.status == 200) {
 
                    var candidatosInscritos = response.body;

                    this.boxTitleEl.innerHTML = 'Candidatos do Processo Seletivo';
                    this.dadosCandidatoEl.innerHTML = '';

                    //para cada candidato inscrito, temos q preencheer o html
                    if (candidatosInscritos.length === 0) {
                        //se não houver candidato inscrito no processo
                        listaCandidatos.innerHTML = 'Não há candidatos para este processo seletivo'
                    }
                    else {
                        candidatosInscritos.forEach((candidato, index) => {

                            //estrutura para preencher o HTML
                            
                            this.dadosCandidatoEl.innerHTML += nomeCandidato(candidato, index);
                            this.dadosCandidatoEl.appendChild(montarDados(candidato, index));
                        })                
                    }
                }
            })        
        })
    }
    
}

function montarOption(processo) {
    var option = document.createElement("option");
    option.setAttribute('value', `${processo.id}`);
    option.innerHTML = `${processo.cargo}`
    return option
}

let listaCandidatosController = new ListarCandidatosController("form-filtro",  "procSel", "dados-candidatos", "box-title");


function nomeCandidato(candidato, index) {
    var dadoNome = `
    <p data-toggle="collapse" data-target="#dados${index}" class="nomes">${candidato.nome}</p>`
    console.log(dadoNome)
    return dadoNome;
}

function montarDados(candidato, index) {    
    var collapseDados = document.createElement("div");
    collapseDados.classList.add("collapse");
    collapseDados.classList.add("dados");
    collapseDados.setAttribute("id",`dados${index}`); 
    collapseDados.innerHTML += dadosPessoais(candidato);
    collapseDados.innerHTML += dadosFormacao(candidato.formacoes);
    collapseDados.innerHTML += dadosExperiencia(candidato.experiencias);
    
    return collapseDados;
}

function dadosPessoais(candidato) {

    var dados = `
    <br>
    <span class="cpf">CPF: ${candidato.cpf}</span>
    <br>
    <span class="email">E-mail: ${candidato.email}</span>
    <br>                    
    <span class="celular">Celular: ${candidato.celular}</span>
    `

    return dados;
}

function dadosFormacao(formacoes) {

    if (formacoes.length === 0) {
        var dadosFormacao = '<p>Não há registros de dados de formação acadêmica</p>';        
    }
    else {

        dadosFormacao = `<p class="formacaoAcademica">Formação Acadêmica:</p>`
        formacoes.forEach(formacao =>{
             var curso = `
                                 
                <span class="tipoFormacao"> ${formacao.tipoFormacao}</span>
                <br>
                <span class="curso">Curso: ${formacao.curso}</span>
                <br>
                <span class="instituicao">Instituição: ${formacao.instituicao}</span>
                <br>
                <span class="dataIngresso">Data de Ingresso: ${formacao.dataIngresso}</span>
                <br>
                <span class="dataConclusao">Data da Conclusão: ${formacao.dataConclusao}</span>
                <br>
                <br>
            `
            dadosFormacao += curso;
        })        
    }

    return dadosFormacao;
}

function dadosExperiencia(experiencias) {
    if (experiencias.length === 0){
        var dadosExperiencia = '<p>Não há registros de experiências anteriores</p>';        
    }
    else {
        dadosExperiencia = `<p class="experiencia">Experiência Profissional:</p>`
        experiencias.forEach(experiencia =>{
             var experienciaProfisisonal = `
                                 
             <span class="empresa">Empresa: ${experiencia.empresa}</span>
             <br>
             <span class="cargo">Cargo: ${experiencia.cargo}</span>
             <br>
             <span class="periodo"> Período: ${experiencia.dataAdmissao} a ${experiencia.dataDesligamento}</span>
             <br>
             <br>   
            `
            dadosExperiencia += experienciaProfisisonal;
        })        
    }

    return dadosExperiencia;
}
