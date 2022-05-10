class Inscricao{
    constructor(idInscricao, idCandidato, idProcesso, dataInscricao, situacao, pontuacaoTeste){
        this._idInscricao = this.getNewID();
        this._idCandidato = idCandidato;
        this._idProcesso = idProcesso;
        this._dataInscricao = new Date();
        this._situacao = situacao;
        this._pontuacaoTeste = pontuacaoTeste;
    }
    get idCandidato(){
        return this._idCandidato;
    }
    get idProcesso(){
        return this._idProcesso;
    }
    get dataInscricao(){
        return this._dataInscricao;
    }
    get situacao(){
        return this._situacao;
    }
    get pontuacaoTeste(){
        return this._pontuacaoTeste;
    }
    loadFromJSON(json){
        for (let name in json){
            switch(name){
                case 'dataInscricao':
                    this[name] = new Date(json[name]);
                break;
                default:
                    this[name] = json[name];
            }
        }
    }
    static getInscricoesStorage() {
        let inscricoes = [];
        if (localStorage.getItem("inscricoes")) {
            inscricoes = JSON.parse(localStorage.getItem("inscricoes"));
        }
        return inscricoes;
    }
    getNewID(){
        let inscricoesID = parseInt(localStorage.getItem("inscricoesID"));
        if (!inscricoesID > 0) inscricoesID = 0;
        inscricoesID++;
        localStorage.setItem("inscricoesID", inscricoesID);
        return inscricoesID;
    }
    save(){
        let inscricoes = Inscricao.getInscricoesStorage();
        if (this.idInscricao > 0) {            
            inscricoes.map(u=>{
                if (i._idInscricao == this.idInscricao) {
                    Object.assign(i, this);
                }
                return i;
            });
        } else {
            this._idInscricao = this.getNewID();
            inscricoes.push(this);
        }
        localStorage.setItem("inscricoes", JSON.stringify(inscricoes));
    }
    remove(){
        let inscricoes = Inscricao.getInscricoesStorage();
        inscricoes.forEach((userData, index)=>{
            if (this._id == userData._id) {
                inscricoes.splice(index, 1);
            }
        });
        localStorage.setItem("inscricoes", JSON.stringify(inscricoes));
    }
}