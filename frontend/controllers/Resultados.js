//para testes



var processos = JSON.parse(localStorage.getItem('processos') || '[]'); 
var inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '[]'); 
var candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]'); 

class ResultadosController{
    constructor( procSelId, boxTitleId, tableCandidatosID){
        this.procSelEl = document.getElementById(procSelId);
        this.boxTitleEl = document.getElementById(boxTitleId);
        this.tableCandidatosEl = document.getElementById(tableCandidatosID);
        this.onLoad();
        this.onSelect();                        ;
    }

    onLoad(){        
          
        //filtrar processsos para pegar processos != de encerrado
        
        var processsosEmAndamento = processos.filter(processo => processo.status !== "Encerrado");
        var opcaoProcesso = localStorage.getItem('opcaoProcesso');
                       
        
        if(processsosEmAndamento !== ''){
            processsosEmAndamento.forEach(processo => this.procSelEl.appendChild(montarOption(processo.nomeCargo, processo.id)))         
        }else{
            this.boxTitleEl.innerHTML = 'Não há processos seletivos em andamento'
        }
        if(opcaoProcesso !== ''){
            this.reload(opcaoProcesso);
            localStorage.setItem('opcaoProcesso', '');
        }
    }

    onSelect(){
        var filtrar = document.getElementById('filtrar');

        filtrar.addEventListener("click", event => {
            event.preventDefault();            
            var listaCandidatos = this.boxTitleEl;
            document.getElementById("thead").setAttribute("style", "display: ")
            this.boxTitleEl.innerHTML = 'Resultados do Processo Seletivo' 
            var tabelaCandidatos = this.tableCandidatosEl;
            tabelaCandidatos.innerHTML = '' 

            //Pelo Processo Seletivo que foi selecionado, temos que buscar no banco os candidatos inscritos. Então, preciso de um inner join entre as tabelas processo_seletivo, tb_inscricao e tb_candidatos para trazer os candidatos inscritos do processso seletivo vai substituir este filtro aqui de baixo. Tem q colocar uma condição de inscricoes !== "reprovado" conforme status que estabelecemos. Lembrar de colocar o order by

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
            document.getElementById('btnConsultar').disabled=false
            document.getElementById('btnEncerrar').disabled = false

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
                    var dtEntrevistaCandidato;
                    var hrEntrevistaCandidato;
                    var situacaoCandidato;
                    inscricoesDoProcesso.forEach(inscricao =>{
                        if(inscricao.idCandidato == candidato.id){
                            notaCandidato = inscricao.pontuacaoTeste;
                            dtEntrevistaCandidato = inscricao.dataEntrevista;
                            hrEntrevistaCandidato = inscricao.horaEntrevista;
                            situacaoCandidato = inscricao.situacao;
                        }
                    })
                    
                    //estrutura para preencher o HTML
                    var candidatoTr = montaTr(candidato, notaCandidato, dtEntrevistaCandidato, hrEntrevistaCandidato, situacaoCandidato);
                    tabelaCandidatos.appendChild(candidatoTr);
                })                                
            }
            this.btnAgendarEntrevista();
            this.btnAprovar();
            this.btnReprovar();
            this.btnEncerrar(opcaoProcesso)            
        })
    }
    btnAgendarEntrevista(){  
        var opcaoProcesso = this.procSelEl.options[this.procSelEl.selectedIndex].value;
         

        var btn = document.getElementsByName
        ('btn-agendar');        
        btn.forEach((item, index) =>{
            item.addEventListener('click', () =>{
                        
                var indice = index
                console.log(indice)
                localStorage.setItem('indice', indice);
                var camposEmail = document.querySelectorAll('.email');
                document.getElementById('email').value = camposEmail[indice].textContent;
                var btnEnviar =  document.getElementById('enviar'); 

                btnEnviar.addEventListener('click', () =>{
                                
                    var camposModal = document.querySelectorAll('.modal-field');
                    var msgError = document.getElementById('msgError');    
                    var ids = document.querySelectorAll('.id');


                    camposModal.forEach(item =>{
                        //testar campos vazios
                        if(item.value == ''){                            
                            msgError.innerHTML = " *Todos os campos devem ser preenchidos"
                            setTimeout(function(){
                                msgError.innerHTML = "" 
                            }, 5000);                            
                        }else{
                            //capturando dados para mensagem                            
                            var email = document.getElementById('email');
                            var mensagem = document.getElementById('mensagem');
                            var dataEntrevista = document.getElementById('dataEntrevista');
                            var horaEntrevista = document.getElementById('horarioEntrevista');
                            var linkEntrevista = document.getElementById('linkEntrevista');


                            //preeenchendo provisoriamente a table com os dados marcado                            
                            
                   
                            
                            var body = new Object();
                            body.email = email.value;
                            body.mensagem = mensagem.value;
                            body.dataEntrevista = dataEntrevista.value;
                            body.horaEntrevista = horaEntrevista.value;
                            body.linkEntrevista = linkEntrevista.value;   
                                          

                            //acredito q aqui vc pega o body e manda mensagem para o candidato e para o email da empresa 
                            
                            var campoDataentrevista = document.querySelectorAll('.dataEntrevista');
                            var candidatoDataEntrevista = campoDataentrevista[indice];
                            var campoHoraEntrevista = document.querySelectorAll('.horaEntrevista');
                            var candidatoHoraEntrevista = campoHoraEntrevista[indice];
                           
        
                            candidatoDataEntrevista.textContent = dataEntrevista.value;                    
                            var horaEntrevista = document.getElementById('horarioEntrevista');
                            candidatoHoraEntrevista.innerHTML = horaEntrevista.value;  
                            var idCandidato = ids[indice].textContent;
                            updateEntrevista(dataEntrevista.value, horaEntrevista.value, idCandidato);
                            btn[indice].innerHTML = 'Reagendar Entrevista'
                            this.closeModal();     
                            localStorage.setItem('opcaoProcesso', opcaoProcesso);
                            
                            setTimeout(function(){
                                document.location.reload(true); 
                            }, 10); 
                        }
                       
                    })
                })
            })
        })
    }

    btnAprovar(){
        var btnAprovar = document.getElementsByName('btn-aprovar');
        var btnAgendar = document.getElementsByName('btn-agendar');
        var btnReprovar = document.getElementsByName('btn-reprovar');
        var resultado = document.getElementsByName('resultado');
        var ids = document.querySelectorAll('.id');
        btnAprovar.forEach((item, index) => {
            var idCandidato = ids[index].textContent;
            item.addEventListener('click', () =>{
                updateResultado('Aprovado na Entrevista', idCandidato);
                btnAgendar[index].setAttribute('style', 'display: none');
                btnAprovar[index].setAttribute('style', 'display: none');
                btnReprovar[index].setAttribute('style', 'display: none');
                resultado[index].textContent = 'APROVADO';
                resultado[index].setAttribute('style', 'display: block');
                resultado[index].setAttribute('style', 'color: green');
            })
        })    
        
    }
    btnReprovar(){
        var btnAprovar = document.getElementsByName('btn-aprovar');
        var btnAgendar = document.getElementsByName('btn-agendar');
        var btnReprovar = document.getElementsByName('btn-reprovar');
        var resultado = document.getElementsByName('resultado');
        var ids = document.querySelectorAll('.id');
        btnReprovar.forEach((item, index) => {
            var idCandidato = ids[index].textContent;
            item.addEventListener('click', () =>{
                updateResultado('Reprovado na Entrevista', idCandidato);
                btnAgendar[index].setAttribute('style', 'display: none');
                btnAprovar[index].setAttribute('style', 'display: none');
                btnReprovar[index].setAttribute('style', 'display: none');
                resultado[index].textContent = 'REPROVADO';
                resultado[index].setAttribute('style', 'display: block');
                resultado[index].setAttribute('style', 'color: red');
                
            })
        })    
        
    }
    btnEncerrar(opcaoProcesso){
        var btnEncerrar = document.getElementById('btnEncerrar');
        btnEncerrar.addEventListener('click', event =>{
            event.preventDefault();
            updateProcesso(opcaoProcesso);
            var mensagem = document.getElementById('mensagemProcesso');
            mensagem.innerHTML = "Encerramento registrado com sucesso"
            setTimeout(function(){
                mensagem.innerHTML = "" 
            }, 2000);  

        })
    }
    reload(opcaoProcesso){
        this.procSelEl.value = opcaoProcesso;
        
        var listaCandidatos = this.boxTitleEl;
            document.getElementById("thead").setAttribute("style", "display: ")
            this.boxTitleEl.innerHTML = 'Resultados do Processo Seletivo' 
            var tabelaCandidatos = this.tableCandidatosEl;
            tabelaCandidatos.innerHTML = '' 

            //Pelo Processo Seletivo que foi selecionado, temos que buscar no banco os candidatos inscritos. Então, preciso de um inner join entre as tabelas processo_seletivo, tb_inscricao e tb_candidatos para trazer os candidatos inscritos do processso seletivo vai substituir este filtro aqui de baixo. Tem q colocar uma condição de inscricoes !== "reprovado" conforme status que estabelecemos. Lembrar de colocar o order by

            var candidatosClassificados = [];             
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
            document.getElementById('btnConsultar').disabled=false
            document.getElementById('btnEncerrar').disabled = false

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
                    var dtEntrevistaCandidato;
                    var hrEntrevistaCandidato;
                    var situacaoCandidato;
                    inscricoesDoProcesso.forEach(inscricao =>{
                        if(inscricao.idCandidato == candidato.id){
                            notaCandidato = inscricao.pontuacaoTeste;
                            dtEntrevistaCandidato = inscricao.dataEntrevista;
                            hrEntrevistaCandidato = inscricao.horaEntrevista;
                            situacaoCandidato = inscricao.situacao;
                        }
                    })
                    
                    //estrutura para preencher o HTML
                    var candidatoTr = montaTr(candidato, notaCandidato, dtEntrevistaCandidato, hrEntrevistaCandidato, situacaoCandidato);
                    tabelaCandidatos.appendChild(candidatoTr);
                })                                
            }
            
            this.btnAgendarEntrevista();
            this.btnAprovar();
            this.btnReprovar();
            this.btnEncerrar(opcaoProcesso);
            

    }
    closeModal(){
        var bodyTag = document.querySelector('body')
        var myModal = document.getElementById('modal-entrevista');
        myModal.classList.remove('show');
        var node = document.querySelector('.modal-backdrop');
        node.parentNode.removeChild(node);           
        myModal.removeAttribute('aria-modal');
        myModal.removeAttribute('role');
        myModal.setAttribute('style', 'display:none');
        myModal.setAttribute('aria-hidden', 'true');       
        bodyTag.classList.remove('modal-open');
        bodyTag.setAttribute('style', '');
    }

  
}

let resultadosController = new ResultadosController("procSel", "box-title", id="tabela-candidatos");


//interação elementos HTML
function montarOption(nomeCargo, id){
    var option = document.createElement("option");
    option.setAttribute('value', `${id}`);
    option.innerHTML = `${nomeCargo}`
    return option
}

function montaTr(candidato, nota, data, hora, situacao){
    var candidatoTr = document.createElement("tr");
    candidatoTr.classList.add('candidato');        
    candidatoTr.appendChild(montaTd(candidato.nome, "nome", "Nome"));
    candidatoTr.appendChild(montaTd(candidato.email, "email", "Email"));    
    candidatoTr.appendChild(montaTd(candidato.celular, "celular", "Celular"));
    candidatoTr.appendChild(montaTd(nota, "notaTeste", "Nota do Teste"));
    candidatoTr.appendChild(montaTd(data, "dataEntrevista", "DataEntrevista"));
    candidatoTr.appendChild(montaTd(hora, "horaEntrevista", "HoraEntrevista"));
    candidatoTr.appendChild(montaTd(candidato.id, "id", "Id"));
    candidatoTr.appendChild(montaTdBtn("acoes", "Ações", data, situacao));    
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

function montaTdBtn(classe, dataTitle, data, situacao){
    var td = document.createElement("td");
    if(situacao === 'Aprovado na Entrevista'){
        td.innerHTML = `
            <div>
                <button type="button" class="btn btn-primary" name="btn-agendar" data-bs-toggle="modal"
                    data-bs-target="#modal-entrevista" style="display:none">Reagendar Entrevista</button>
                <button type="button" class="btn btn-success" name="btn-aprovar" style="display:none">Aprovar</button>                
                <button type="button" class="btn btn-danger" name="btn-reprovar" style="display:none">Reprovar</button>
                <h5 class="resultado" name="resultado" style="color: green; display: block; font-weight: bold">APROVADO</h5>  
            </div>
        `;
    }else if(situacao === 'Reprovado na Entrevista'){
        td.innerHTML = `
            <div>
                <button type="button" class="btn btn-primary" name="btn-agendar" data-bs-toggle="modal"
                    data-bs-target="#modal-entrevista" style="display:none">Reagendar Entrevista</button>
                <button type="button" class="btn btn-success" name="btn-aprovar" style="display:none">Aprovar</button>                
                <button type="button" class="btn btn-danger" name="btn-reprovar" style="display:none">Reprovar</button>
                <h5 class="resultado" name="resultado" style="color: red; display: block; font-weight: bold"">REPROVADO</h5>  
            </div>
        `;
    }else if(data != ''){
        td.innerHTML = `
            <div>
                <button type="button" class="btn btn-primary" name="btn-agendar" data-bs-toggle="modal"
                    data-bs-target="#modal-entrevista">Reagendar Entrevista</button>
                <button type="button" class="btn btn-success" name="btn-aprovar">Aprovar</button>                
                <button type="button" class="btn btn-danger" name="btn-reprovar">Reprovar</button>
                <h5 class="resultado" name="resultado"></h5>  
            </div>
        `;
    }else{
    td.innerHTML = `
        <div>
            <button type="button" class="btn btn-primary" name="btn-agendar" data-bs-toggle="modal"
                data-bs-target="#modal-entrevista">Agendar Entrevista</button>
            <button type="button" class="btn btn-success" name="btn-aprovar">Aprovar</button>            
            <button type="button" class="btn btn-danger" name="btn-reprovar">Reprovar</button>
            <h5 class="resultado" name="resultado"></h5>
        </div>
    `;}
    td.classList.add(classe); 
    td.setAttribute("data-title", dataTitle);
    return td;
}


//interação com os dados
function updateEntrevista(data, hora, id) {
    
    const inscricaoAtualizada = {
        idCandidato : id,
        dataEntrevista: data,
        horaEntrevista: hora,
    }
            
    inscricoes.map(inscricao =>{
        if(inscricao.idCandidato == inscricaoAtualizada.idCandidato){
            Object.assign(inscricao, inscricaoAtualizada);
        }
    })

    localStorage.setItem("inscricoes", JSON.stringify(inscricoes));     
}

function updateResultado(situacao, id) {
    
    const inscricaoAtualizada = {
        idCandidato : id,
        situacao: situacao,
    }
            
    inscricoes.map(inscricao =>{
        if(inscricao.idCandidato == inscricaoAtualizada.idCandidato){
            Object.assign(inscricao, inscricaoAtualizada);
        }
    })

    localStorage.setItem("inscricoes", JSON.stringify(inscricoes));     
}
//atualiza o status do processo seletivo
function updateProcesso(opcaoProcesso){
    const processoAtualizado = {
        status: 'Concluído',
    }
    processos.map(processo => {
        if(processo.id == opcaoProcesso){
            Object.assign(processo, processoAtualizado)
        }
    })
    localStorage.setItem("processos", JSON.stringify(processos)); 
}

