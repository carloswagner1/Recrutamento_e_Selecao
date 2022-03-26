class Candidato {
    constructor(nome, email, senha, pais, cpf, celular){
        this._id;
        this._nome = nome;        
        this._email = email;
        this._senha = senha;
        this._pais = pais;
        this._cpf = cpf;
        this._celular = celular;
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

    get senha(){
        return this._senha;
    }

    get pais(){
        return this._pais;
    }

    get cpf(){
        return this._cpf;        
    }

    get celular(){
        return this._celular;
    }

}



