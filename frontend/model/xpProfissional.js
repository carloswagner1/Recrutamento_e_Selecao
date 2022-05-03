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

    loadFromJSON(json){
        for (let name in json){
            this[name] = json[name];
        }   
    }

    static getUsersStorage() {

        let xps = [];

        if (localStorage.getItem("xps")) {

            xps = JSON.parse(localStorage.getItem("xps"));

        }

        return xps;

    }

    getNewID(){

        let xpsID = parseInt(localStorage.getItem("xpsID"));

        if (!xpsID > 0) xpsID = 0;

        xpsID++;

        localStorage.setItem("xpsID", xpsID);

        return xpsID;

    }

    save(){

        let xps = User.getXpsStorage();

        if (this.id > 0) {
            
            xps.map(u=>{

                if (u._id == this.id) {

                    Object.assign(u, this);

                }

                return u;

            });

        } else {

            this._id = this.getNewID();

            xps.push(this);

        }

        localStorage.setItem("xps", JSON.stringify(xps));

    }

}