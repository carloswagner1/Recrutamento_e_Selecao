// para testes

var processos = JSON.parse(localStorage.getItem('db_processo') || '[]'); 

var candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');


//fim para testes


class AgendarTestesController{
    constructor( procSelId, formContainerId){
        this.procSelEl = document.getElementById(procSelId);
        this.formContainerEl = document.getElementById(formContainerId);
        this.onLoad();
        this.onSelect();
        this.onSubmit();
    }

    onLoad(){    
          
        //filtrar processsos para pegar processos != de encerrado
        var processsosEmAndamento = processos.filter(processo => processo.status !== "Encerrado");
        if(processsosEmAndamento !== ''){
            processsosEmAndamento.forEach(processo => this.procSelEl.appendChild(this.montarOption(processo.nomeCargo)))          
        }
    }
    onSelect(){
        var filtrar = document.getElementById('filtrar');

        filtrar.addEventListener("click", event => {
            event.preventDefault();
            let processoSeletivo = this.procSelEl.value; 

            //Pelo Processo Seletivo que foi selecionado, temos que buscar no banco os candidatos inscritos. Então, preciso de um inner join entre as tabelas processo_seletivo, tb_inscricao e tb_candidatos para trazer os candidatos inscritos do processso seletivo vai substituir este filtro aqui de baixo
            
            var candidatosInscritos = [];
                    
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
            //para debbugar
            console.log(candidatosInscritos);
        })
    }
    onSubmit(){
        let tipo = this.formContainerEl.dataset.tipo;

        this.formContainerEl.addEventListener("submit", event => {
            event.preventDefault();
            let tema = document.getElementById('tema');
            let assunto = document.getElementById('assunto');
            let linkTeste = document.getElementById('exampleInputLink');
            let msgError = document.querySelector('#msgError');

            var body = new Object();
            body.tema = tema.value;
            body.assunto = assunto.value;
            body.link = linkTeste.value;

            console.log(body)

            //Imagino que aqui vc vai fazer o envio das informações para cada candidato. Mas acho q é feito no backend, certo?

            //setting the url

            // enviando request e salvando a promise

        })

    }
    montarOption(nomeCargo){
        var option = document.createElement("option");
        option.setAttribute('value', `${nomeCargo}`);
        option.innerHTML = `${nomeCargo}`
        return option
    }

}

let agendarTestesController = new AgendarTestesController("procSel", "form-container");
