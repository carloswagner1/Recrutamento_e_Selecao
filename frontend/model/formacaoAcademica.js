class FormacaoAcademica{
    constructor(tipoFormacao, curso, instituicao, dataIngresso, dataConclusao){
        this._id;
        this._tipoFormacao = tipoFormacao;
        this._curso = curso;
        this._instituicao = instituicao;
        this._dataIngresso = dataIngresso;
        this._dataConclusao = dataConclusao;
    }

    get id(){
        return this._id;
    }

    get tipoFormacao(){
        return this._tipoFormacao;
    }

}

