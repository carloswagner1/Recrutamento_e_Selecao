class GerenciarPerfilController{
    constructor(formPerfil){
        this.formEl = document.getElementById(formPerfil);
        Utils.buscaCep();        
        this.onLoad();
        this.onSubmit();               
    }
    onLoad(){     
        let listaCandidatos = this.getCandidatosStorage();
        let candidato = this.selectCandidato(listaCandidatos);
        this.loadValues(candidato);               
    }
    onSubmit(){
        this.formEl.addEventListener("submit", event => {
            event.preventDefault();
                    
            let values = this.getValues(this.formEl)            
            ;//pega os valores da tabela
            let candidatoAtualizado = JSON.stringify(values);


           //salvar no banco de dados

            this.formEl.reset();            
        });
    }
    getCandidatosStorage() {
        let listaCandidatos = [];
        if (localStorage.getItem("candidatos")) {
            listaCandidatos = JSON.parse(localStorage.getItem("candidatos"));
        }
        return listaCandidatos;
    }
    selectCandidato(listaCandidatos){
        let candidato = listaCandidatos.filter((item) => {
            return item._email =='veiodaHavan@email.com'
        });
        candidato = candidato.map(obj => {
            return {
            nome: obj._nome,
            email: obj._email, 
            password: obj._password, 
            cpf: obj._cpf, 
            celular: obj._celular, 
            cep: obj._cep, 
            logradouro: obj._logradouro, 
            bairro: obj._bairro, 
            cidade: obj._cidade, 
            estado: obj._estado, 
            pais: obj._pais, 
            area: obj._area, 
            genero: obj._genero,
            dataNasc: obj._dataNasc,
            };
        })
        return candidato;
    }
    save(){
        let candidatos = this.getCandidatosStorage();
        candidatos.push(this);
        localStorage.setItem("candidatos", JSON.stringify(candidatos));
    }
    loadValues(candidato){        
        for (let value of candidato){                        
            [...this.formEl.elements].forEach(function(field, index)
            {
                if(value[field.name] == undefined){
                    return '';
                }else{
                    field.value = value[field.name];
                }
            });      
        }
        
    }
    getValues(formEl){
        /*let candidato = {};*/
        let isValid = true;

        [...formEl.elements].forEach(function (field, index) {

            if (["nome", "email", "password", "cpf", "celular", "cep", "logradouro", "bairro","cidade", "estado", "pais", 'area', 'genero', 'dataNasc' ].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;                
            }else if(field.name == 'newPassword' && field.value !==''){                
                password.value = newPassword.value;
            }              

        });         

        if (!isValid) {
            return false;
        }
        
        let candidato = new Candidato(nome.value, email.value, password.value, cpf.value, celular.value, cep.value, logradouro.value, bairro.value, cidade.value, estado.value, pais.value, area.value, genero.value, dataNasc.value);

        return candidato;

    }
}

let gerenciarPerfilController = new GerenciarPerfilController( "formPerfil"); 