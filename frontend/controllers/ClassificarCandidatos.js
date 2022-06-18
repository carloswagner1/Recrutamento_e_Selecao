import { sendRequest } from "../utils/ApiUtils.js";

class ClassificarCandidatosController {

    constructor( procSelId, boxTitleId, tableCandidatosID) {
        this.procSelEl = document.getElementById(procSelId);
        this.boxTitleEl = document.getElementById(boxTitleId);
        this.tableCandidatosEl = document.getElementById(tableCandidatosID);
        this.onLoad();
        this.onSelect();        
    }
    
    onLoad() {    
        
        // setting the url
        const url = "/processos/usuarios/" + localStorage.getItem("id_usuario") + "/abertos";

        // enviando a request e salvando a promise
        const responsePromise = sendRequest('GET', url, "");

        responsePromise.then(response => {

            // log para debuggar
            console.log(response);

            if (response.status == 200) {

                if (response.body.length > 0) {
                    let select = this.procSelEl;
                    response.body.forEach(processo => select.appendChild(montarOption(processo)));
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
            let processoSeletivo = this.procSelEl.value;
            var listaCandidatos = this.boxTitleEl;
            document.getElementById("thead").setAttribute("style", "display: ")

            //Pelo Processo Seletivo que foi selecionado, temos que buscar no banco os candidatos inscritos. Então, preciso de um inner join entre as tabelas processo_seletivo, tb_inscricao e tb_candidatos para trazer os candidatos inscritos do processso seletivo vai substituir este filtro aqui de baixo. Tem q colocar uma condição de inscricoes !== "reprovado" conforme status que estabelecemos 


            var processoId = document.getElementById('procSel').value;

            // setting the url
            const url = "/processos/" + processoId + "/candidatos/teste";

            // enviando a request e salvando a promise
            const responsePromise = sendRequest('GET', url, "");

            responsePromise.then(response => {

                // log para debuggar
                console.log(response);

                if (response.status == 200) {

                    var candidatosInscritos = response.body;
                    this.boxTitleEl.innerHTML = 'Candidatos do Processo Seletivo' 
                    var tabelaCandidatos = this.tableCandidatosEl;
                    tabelaCandidatos.innerHTML = '';
                    
                    if (candidatosInscritos.length === 0) {
                        //se não houver candidato inscrito no processo
                        tabelaCandidatos.innerHTML = ''
                        listaCandidatos.innerHTML = 'Não há candidatos para classificar neste processo seletivo'
                        document.getElementById("thead").setAttribute('style', 'display: none')
                    }
                    else {          

                        candidatosInscritos.forEach((candidato, index) => {                  
                            
                            //estrutura para preencher o HTML
                            var candidatoTr = montaTr(candidato);
                            tabelaCandidatos.appendChild(candidatoTr);
                        })

                        this.onClick();                
                    }
                }
            })
        })        
    }

    onClick() {

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

function montarOption(processo) {
    var option = document.createElement("option");
    option.setAttribute('value', `${processo.id}`);
    option.innerHTML = `${processo.cargo}`
    return option
}

function montaTr(candidato){
    
    var candidatoTr = document.createElement("tr");
    candidatoTr.classList.add('candidato');        
    candidatoTr.appendChild(montaTd(candidato.nome, "nome", "Nome"));
    candidatoTr.appendChild(montaTd(candidato.email, "email", "Email"));
    candidatoTr.appendChild(montaTd(candidato.cpf, "cpf", "CPF"));
    candidatoTr.appendChild(montaTd(candidato.celular, "celular", "Celular"));
    candidatoTr.appendChild(montaInputNota("notaTeste", "Nota do Teste", candidato.id));
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

function montaInputNota(classe, dataTitle, id) {    
    var td = document.createElement("td");
    var div = document.createElement('div');
    var input = document.createElement('input');
    input.classList.add('form-control');
    input.classList.add('nota-teste');
    input.setAttribute('type', 'number');
    input.setAttribute('min', '0');
    input.setAttribute('id', `nota${id}`)
    div.appendChild(input);
    div.classList.add('nota');
    div.classList.add('nota-tabela');
    td.appendChild(div);    
    td.classList.add(classe); 
    td.setAttribute("data-title", dataTitle);
    return td;
}

function montaTdBtn(classe, dataTitle) {
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

    let processoId = document.getElementById('procSel').value;

    let inscricaoAtualizada = {
        processoId: processoId,
        pontuacaoTeste: '',
        situacao: ''
    }

    var candidatoId = linha.childNodes[6].textContent;

    // setting the url
    const url = "/candidatos/" + candidatoId + "/classificar";

    let nota = document.getElementById(`nota${candidatoId}`).value;

    if (!nota) {

        msgError.innerHTML = " *Nota deve ser preenchida";

        setTimeout(function() {
            msgError.innerHTML = "" ;
            return;
        }, 5000); 

        return;
    }

    if (btn.value === 'classificado') {
        inscricaoAtualizada.pontuacaoTeste = nota;
        inscricaoAtualizada.situacao = 'classificado'

    }
    else {
        inscricaoAtualizada.pontuacaoTeste = nota;
        inscricaoAtualizada.situacao = 'reprovado'
    }

    // enviando a request e salvando a promise
    const responsePromise = sendRequest('POST', url, inscricaoAtualizada);

    responsePromise.then(response => {

        // log para debuggar
        console.log(response);

        if (response.status == 200) {
            removeLinha(linha);  
        }
    })
}

function removeLinha(linha) {

    //Excluir linha da tabela
    linha.classList.add("fadeOut");
    setTimeout(function(){
        linha.remove();        
    }, 500)

    if (document.getElementById('tabela-candidatos').childElementCount === 1) {        
        document.getElementById("box-title").innerHTML = 'Não há candidatos para classificar neste processo seletivo'
        document.getElementById("thead").setAttribute('style', 'display: none')
    }
}
