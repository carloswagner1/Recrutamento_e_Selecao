class CadastroController{

    constructor(formCadastro1, formCadastro2){
        this.formEl1 = document.getElementById(formCadastro1);
        this.formEl2 = document.getElementById(formCadastro2);

        this.onNext();
        Utils.validarPreenchimento(); 
        this.onSubmit();
        
    }

    
    onSubmit(){
       
        this.formEl2.addEventListener("submit", (event) => {

            event.preventDefault();         

            let values = this.getValues();
            
            let listaCandidato = JSON.parse(localStorage.getItem('listaCandidato') || '[]');

            listaCandidato.push(values);

            localStorage.setItem('listaCandidato', JSON.stringify(listaCandidato));

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

            if (["pais", "cpf", "numCel"].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add("has-error");
                isValid = false
            }
    
        });

        if(!isValid){
            return false;
        }

        let candidato = new Candidato(nome.value, email.value, senha.value, pais.value, cpf.value, numCel.value);

        return candidato;

    }

    insert(data){


        if(sessionStorage.getItem("candidatos")) {

            candidatos = JSON.parse(sessionStorage.getItem("candidatos"));

        }

        

        candidatos.push(data);

        sessionStorage.setItem("candidatos", JSON.stringify(candidatos));

    }

    showCadastro2(){
        document.querySelector("#formCad1").style.display = "none";
        document.querySelector("#formCad2").style.display = "block";
    }
    
}

