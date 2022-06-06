//para testes

var processos = JSON.parse(localStorage.getItem('db_processo') || '[]'); 

var candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');

//fim para testes


class ClassificarCandidatosController{
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
            // salvar os processosEmAndamento no localStorage.??         
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


            //Pelo Processo Seletivo que foi selecionado, temos que buscar no banco os candidatos inscritos. Então, preciso de um inner join entre as tabelas processo_seletivo, tb_inscricao e tb_candidatos para trazer os candidatos inscritos do processso seletivo vai substituir este filtro aqui de baixo. Tem q colocar uma condição de inscricoes !== "reprovado" conforme status que estabelecemos 


            //O FILTRO ABAIXO NÃO CONSIDEREI AS INSCRIÇÕES PQ OS DADOS ESTÃO MOCADOS.
            //MAS VAMOS TER Q ATUALIZAR O STATUS E A NOTA NA TABELA INSCRIÇÃO. DE REPENTE É LEGAL DEIXAR OS DADOS DAS INSCRIÇÕES DO PROCESSO NO LOCALSTORAGE
            
            var candidatosInscritos = [];
            this.boxTitleEl.innerHTML = 'Candidatos do Processo Seletivo' 
            var tabelaCandidatos = this.tableCandidatosEl;
            tabelaCandidatos.innerHTML = ''   
            if(processoSeletivo === 'Desenvolvedor Backend'){    
                
                candidatosInscritos = candidatos.filter(candidato => {
                    if(candidato.id === 1 || candidato.id === 2 || candidato.id === 4){
                        return candidato;
                    }
                })
            }
            else if(processoSeletivo === 'Desenvolvedor FrontEnd'){
                              
                candidatosInscritos = candidatos.filter(candidato => {
                    if(candidato.id === 3 || candidato.id === 5){
                        return candidato;
                    }
                })
            }

            //fim filtro

            //para cada candidato inscrito, temos q preencheer o html
            if(candidatosInscritos.length === 0){
                //se não houver candidato inscrito no processo
                tabelaCandidatos.innerHTML = ''
                listaCandidatos.innerHTML = 'Não há candidatos para classificar neste processo seletivo'
                document.getElementById("thead").setAttribute('style', 'display: none')
            }else{                
                candidatosInscritos.forEach((candidato, index) => {                  
                    
                    //estrutura para preencher o HTML
                    var candidatoTr = montaTr(candidato, index);
                    tabelaCandidatos.appendChild(candidatoTr);
                })
                this.onClick();                
            }
        })        
    }
    onClick(){
        var btn = document.querySelectorAll('.btn');
        var tabelaCandidatos = this.tableCandidatosEl;        
        btn.forEach((item, index) => {
            item.addEventListener('click', () => {                
                var linha = (item.parentNode).parentNode.parentNode;
                updateInscricao(linha, btn[index], index);          
            })            
        })
    }
}

let classificarCandidatosController = new ClassificarCandidatosController("procSel", "box-title", "tabela-candidatos");

function montarOption(nomeCargo, id){
    var option = document.createElement("option");
    option.setAttribute('value', `${nomeCargo}`);
    option.innerHTML = `${nomeCargo}`
    return option
}
function montaTr(candidato, index){
    
    var candidatoTr = document.createElement("tr");
    candidatoTr.classList.add('candidato');        
    candidatoTr.appendChild(montaTd(candidato.nome, "nome", "Nome"));
    candidatoTr.appendChild(montaTd(candidato.email, "email", "Email"));
    candidatoTr.appendChild(montaTd(candidato.cpf, "cpf", "CPF"));
    candidatoTr.appendChild(montaTd(candidato.celular, "celular", "Celular"));
    candidatoTr.appendChild(montaImputNota("notaTeste", "Nota do Teste", index));
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
function montaImputNota(classe, dataTitle, index){    
    var td = document.createElement("td");
    var div = document.createElement('div');
    var input = document.createElement('input');
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
        <button type="button" class="btn btn-success" value="classificado">Classificar</button>
        <button type="button" class="btn btn-danger" value="reprovado">Reprovar</button>
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
        dataEntrevista: '',
        horaEntrevista: '',
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
