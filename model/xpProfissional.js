class xpProfissional {
    constructor(empresa, cargo, descricao, dataAdmissao, dataDemissao){
        this._id;
        this._empresa = empresa;
        this._cargo = cargo;
        this._descricao = descricao;
        this._dataAdmissao = dataAdmissao;
        this._dataDemissao = dataDemissao;
    }

    get id(){
        return this._id;
    }

    get empresa(){
        return this._empresa;
    }

    get cargo(){
        return this._cargo;
    }

    get descricao(){
        return this._descricao;
    }

    get dataAdmissao(){
        return this._dataAdmissao;
    }

    get dataDemissao(){
        return this._dataDemissao
    }

}