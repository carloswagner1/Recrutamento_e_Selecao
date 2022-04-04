class Solicitacao{
    constructor(departamento, cargo, requisitos, escolaridade, descricao, status){
        this._departamento = departamento;
        this._cargo = cargo;
        this._requisitos = requisitos;
        this._escolaridade = escolaridade;
        this._descricao = descricao;
        this._status = status;
    }

    get departamento(){
        return this._departamento;
    }

    get cargo(){
        return this._cargo;
    }

    get requisitos(){
        return this._requisitos;
    }

    get escolaridade(){
        return this._escolaridade;
    }

    get descricao(){
        return this._descricao
    }

    get status(){
        return this._status;
    }

}    