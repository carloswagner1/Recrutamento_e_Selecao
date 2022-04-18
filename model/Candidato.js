class Candidato {
    constructor(nome, email, password, cpf, celular, cep, logradouro, bairro, cidade, estado, pais, area){
        this._id;
        this._nome = nome;        
        this._email = email;
        this._password = password;
        this._cpf = cpf;
        this._celular = celular;
        this._cep = cep;
        this._logradouro = logradouro;
        this._bairro = bairro;
        this._cidade = cidade;
        this._estado = estado;
        this._pais = pais;
        this._area = area;
    }

    get id(){
        return this._id;
    }
    
    get nome(){
        return this._nome;
    }

    get email(){
        return this._email;
    }

    get password(){
        return this._password;
    }

    get cpf(){
        return this._cpf;        
    }

    get celular(){
        return this._celular;
    }

    get cep(){
        return this._cep;
    }
    
    get logradouro(){
        return this._logradouro;
    }

    get bairro(){
        return this._bairro;
    }
     
    get cidade(){
        return this._cidade;
    }
    
    get estado(){
        return this._estado;
    }
    
    get pais(){
        return this._pais;
    }
    
    get area(){
        return this._area;
    }

}



