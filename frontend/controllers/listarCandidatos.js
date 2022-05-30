// para testes

var candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');

var processos = JSON.parse(localStorage.getItem('db_processo') || '[]'); 

var listaFormacoes = JSON.parse(localStorage.getItem('db_formacao') || []);


var listaExperiencias = JSON.parse(localStorage.getItem('db_Experiencia'))


// fim testes

class ListarCandidatosController{
    constructor(formFiltroId, procSelId, dadosCandidatoId, boxTitleId){
        this.formFiltroEl = document.getElementById(formFiltroId);
        this.procSelEl = document.getElementById(procSelId)
        this.dadosCandidatoEl = document.getElementById(dadosCandidatoId);
        this.boxTitleEl = document.getElementById(boxTitleId)
        this.onLoad();
        this.onSelect();        
    }

    onLoad(){          
        //filtrar processsos para pegar processos != de encerrado
             
        var processsosEmAndamento = processos.filter(processo => processo.status !== "Encerrado");        
        if(processsosEmAndamento !== ''){            
            processsosEmAndamento.forEach(processo => this.procSelEl.appendChild(this.montarOption(processo.nomeCargo))) 
            // salvar os processosEmAndamento no localStorage.         
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


            //Pelo Processo Seletivo que foi selecionado, temos que buscar no banco os candidatos inscritos. Então, preciso de um inner join entre as tabelas processo_seletivo, tb_inscricao e tb_candidatos para trazer os candidatos escritos do processso seletivo vai substituir este filtro aqui de baixo
            console.log(processoSeletivo)
            var candidatosInscritos = [];
            this.boxTitleEl.innerHTML = 'Candidatos do Processo Seletivo' 
            this.dadosCandidatoEl.innerHTML = ''
                    
            if(processoSeletivo === 'Desenvolvedor Backend'){     
                console.log(processoSeletivo)           
                candidatosInscritos = candidatos.filter(candidato => {
                    if(candidato.id === 1 || candidato.id === 2 || candidato.id === 4){
                        return candidato;
                    }
                })
            }
            else if(processoSeletivo === 'Desenvolvedor FrontEnd'){
                console.log(processoSeletivo)
                
                candidatosInscritos = candidatos.filter(candidato => {
                    if(candidato.id === 3 || candidato.id === 5){
                        return candidato;
                    }
                })
            }

            //para cada candidato inscrito, temos q preencheer o html
            if(candidatosInscritos.length === 0){
                //se não houver candidato inscrito no processo
                listaCandidatos.innerHTML = 'Não há candidatos para este processo seletivo'
            }else{
                candidatosInscritos.forEach((candidato, index) => {
                    //pegar formacao academica no banco de dados
                    var formacaoCandidato = listaFormacoes.filter(formacao => {
                        if(candidato.id === formacao.id){
                            return formacao;
                        }
                    })  

                    //pegar expericencia no banco de dados pelo id do candidato
                    var experienciaCandidato = listaExperiencias.filter(experiencia => {
                        if(candidato.id === experiencia.id){
                            return experiencia;
                        }
                    })

                    //estrutura para preencher o HTML
                    
                    this.dadosCandidatoEl.innerHTML += nomeCandidato(candidato, index)
                    this.dadosCandidatoEl.appendChild(montarDados(candidato, index, formacaoCandidato, experienciaCandidato)) 

                })                
            }
        })
    }
    montarOption(nomeCargo){
        var option = document.createElement("option");
        option.setAttribute('value', `${nomeCargo}`);
        option.innerHTML = `${nomeCargo}`
        return option
    }
    /*montarDados(candidato, index, formacaoCandidato, experienciaCandidato){
        var listaInscritos = this.dadosCandidatoEl;
        var collapse = `
            <p data-toggle="collapse" data-target="#dados${index}" class="nomes">${candidato.nome}</p>`
     

        var collapseDados = document.createElement("div");
        collapseDados.classList.add("collapse");
        collapseDados.classList.add("dados");
        collapseDados.setAttribute("id",`dados${index}`);        
            
        
        listaInscritos.innerHTML +=  collapse;
        listaInscritos.innerHTML += collapseDados;
    }
    
    dadosFormacao(formacaoCandidato){        
        if (formacaoCandidato.length === 0){
            return '<p class="formacaoAcademica">Não há registros de dados de formação acadêmica</p>';
        }else{            
            formacaoCandidato.forEach((formacao) => {
                return `
                <p class="formacaoAcademica">Formação Acadêmica:</p>
                <span class="tipoFormacao">${formacao.tipoFormacao}</span>
                    <br>
                    <span class="curso">Curso: ${formacao.curso}</span>
                    <br>
                    <span class="instituicao">Instituição: ${formacao.instituicao}</span>
                    <br>                    
                    <span class="dataConcusao">Data de Início: ${(formacao.dataIngresso)}</span>
                    <br>
                    <span class="dataConcusao">Data de Conclusão: ${formacao.dataConclusao}</span>
                    <br>
                    <br>
                `
            })
        }
 
    
    }
    dadosExperiencia(experiencia){
    
    }*/
}

let listaCandidatosController = new ListarCandidatosController("form-filtro",  "procSel", "dados-candidatos", "box-title");


function nomeCandidato(candidato, index){
    var dadoNome = `
    <p data-toggle="collapse" data-target="#dados${index}" class="nomes">${candidato.nome}</p>`
    console.log(dadoNome)
    return dadoNome;
}
function montarDados(candidato, index, formacaoCandidato, experienciaCandidato){    
    var collapseDados = document.createElement("div");
    collapseDados.classList.add("collapse");
    collapseDados.classList.add("dados");
    collapseDados.setAttribute("id",`dados${index}`); 
    collapseDados.innerHTML += dadosPessoais(candidato);
    collapseDados.innerHTML += dadosFormacao(formacaoCandidato);
    collapseDados.innerHTML += dadosExpericiencia(experienciaCandidato);
    
    return collapseDados;
}
function dadosPessoais(candidato){
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

function dadosFormacao(listaFormacoes){
    if (listaFormacoes.length === 0){
        var dadosFormacao = '<p>Não há registros de dados de formação acadêmica</p>';        
    }else{
        dadosFormacao = `<p class="formacaoAcademica">Formação Acadêmica:</p>`
        listaFormacoes.forEach(formacao =>{
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
function dadosExpericiencia(listaExperiencias){
    if (listaExperiencias.length === 0){
        var dadosExperiencia = '<p>Não há registros de experiências anteriores</p>';        
    }else{
        dadosExperiencia = `<p class="experiencia">Experiência Profissional:</p>`
        listaExperiencias.forEach(experiencia =>{
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