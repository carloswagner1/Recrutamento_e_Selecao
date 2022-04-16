class CadastroController{

    constructor(formCadastro1, formCadastro2){
        this.formEl1 = document.getElementById(formCadastro1);
        this.formEl2 = document.getElementById(formCadastro2);
        
        Utils.buscaCep();
        this.onNext();
        this.validarPreenchimento(); 
        this.onSubmit();
        
    }

    
    onSubmit(){
       
        this.formEl2.addEventListener("submit", (event) => {

            event.preventDefault();         

            let values = this.getValues();
            
            let candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');

            candidatos.push(values);

            localStorage.setItem('candidatos', JSON.stringify(candidatos));

            setTimeout(() => {
                window.location.href = 'login.html'
            }, 1000)
                    
        })

    }

    onNext(){
        this.formEl1.addEventListener("submit", e=> {
            e.preventDefault();            
            this.showCadastro2();
        })
    }
 

    getValues(){

        let isValid = true;

        [...this.formEl1.elements].forEach(function(field, index){

            if (["nome", "email", "password"].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add("has-error");
                isValid = false
            }
    
        });

        [...this.formEl2.elements].forEach(function(field, index){

            if (["cpf", "numCel", "cep", "logradouro", "bairro","cidade", "estado", "pais", "area"].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add("has-error");
                isValid = false
            }
    
        });

        if(!isValid){
            return false;
        }

        let candidato = new Candidato(nome.value, email.value, senha.value, cpf.value, numCel.value, cep.value, logradouro.value, bairro.value, cidade.value, estado.value, pais.value, area.value);

        return candidato;

    }

    /*insert(data){

        if(sessionStorage.getItem("candidatos")) {

            candidatos = JSON.parse(sessionStorage.getItem("candidatos"));

        }        

        candidatos.push(data);

        sessionStorage.setItem("candidatos", JSON.stringify(candidatos));

    }*/

    showCadastro2(){
        document.querySelector("#formCad1").style.display = "none";
        document.querySelector("#formCad2").style.display = "block";
    }

    validarPreenchimento(){
        let email = document.querySelector('#email');
        let labelEmail = document.querySelector('#labelEmail');
        
        let nome = document.querySelector('#nome');
        let labelNome = document.querySelector('#labelNome');
        
        let senha = document.querySelector('#senha');
        let labelSenha = document.querySelector('#labelSenha');  

        let confirmSenha = document.querySelector('#passconfirmation');
        let labelConfirmSenha = document.querySelector('#labelConfirmSenha') ;

        let cpf = document.querySelector('#cpf');
        let labelCPF = document.querySelector('#labelCPF');  

        let numCel = document.querySelector('#numCel');
        let labelCelular = document.querySelector('#labelCelular');

        Utils.validarCampoEmail(email, labelEmail);
        Utils.validarCampoNome(nome, labelNome);
        Utils.validarCampoSenha(senha, labelSenha);
        Utils.validarCampoConfirmSenha(confirmSenha, labelConfirmSenha);
        Utils.validarCampoCPF(cpf, labelCPF);
        Utils.validarCampoCelular(numCel, labelCelular);

    }
    
}

