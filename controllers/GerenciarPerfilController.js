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
        this.loadValues(candidato)          
    }
    onSubmit(){
        this.formEl.addEventListener("submit", event => {
            event.preventDefault();
            let listaCandidatos = this.getCandidatosStorage();
            let candidato = this.selectCandidato(listaCandidatos);

            let values = this.getValues(this.formEl);                        
            let result = Object.assign({}, candidato, values);
            candidato = new Candidato();
            candidato.loadFromJSON(result);
            console.log(candidato)
            candidato.save();
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
            return item._email =='veiodahavan@email.com'
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
            genero: obj._genero
            };
        });
        return candidato;
    }
    save(){
        let candidatos = getCandidatosStorage();
        candidatos.push(this);
        localStorage.setItem("candidatos", JSON.stringify(candidatos));
    }    

    loadValues(candidato){        
        for (let value of candidato){                        
            [...this.formEl.elements].forEach(function(field, index)
            {
                if(value[field.name] == undefined){
                    return '';
                }
                if(field.id == value.genero || field.id == value.area){                    
                    field.checked = true;
                }else{
                    field.value = value[field.name];                   
                }
            });      
        }
    }
    getValues(formEl){
        let candidato = {};
        let isValid = true;

        [...formEl.elements].forEach(function (field, index) {

            if (["nome", "email", "password", "cpf", "celular", "cep", "logradouro", "bairro","cidade", "estado", "pais", 'area', 'genero' ].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            }
        });

        if (!isValid) {
            return false;
        }
        
        /*let candidato = new Candidato(nome.value, email.value, senha.value, cpf.value, celular.value, cep.value, logradouro.value, bairro.value, cidade.value, estado.value, pais.value, area.value, genero.value);

        return candidato;*/

        return new Candidato(
            candidato.nome,
            candidato.email,
            candidato.password,
            candidato.cpf,
            candidato.celular,
            candidato.cep,
            candidato.logradouro,
            candidato.bairro,
            candidato.cidade,
            candidato.estado,
            candidato.pais,
            candidato.area,
            candidato.genero
        );

    }
}

let gerenciarPerfilController = new GerenciarPerfilController( "formPerfil"); 