class Solicitacao{
    constructor(departamento, cargo, tipoVaga, localVaga, qtdVagas, requisitos, descricao, status){
        this._departamento = departamento;
        this._cargo = cargo;
        this._tipoVaga = tipoVaga;
        this._localVaga = localVaga;
        this._qtdVagas = qtdVagas;
        this._requisitos = requisitos;
        this._descricao = descricao;
        this._status = status;
    }
    get departamento(){
        return this._departamento;
    }
    get cargo(){
        return this._cargo;
    }
    get tipoVaga(){
        return this._tipoVaga;
    }
    get localVaga(){
        return this._localVaga;
    }
    get qtdVagas(){
        return this._qtdVagas;
    }
    get requisitos(){
        return this._requisitos;
    }
    get descricao(){
        return this._descricao
    }
    get status(){
        return this._status;
    }

    getNewID(){

        let solicitacoesID = parseInt(localStorage.getItem("solicitacoesID"));

        if (!solicitacoesID > 0) solicitacoesID = 0;

        solicitacoesID++;

        localStorage.setItem("solicitacoesID", solicitacoesID);

        return solicitacoesID;

    }
}
