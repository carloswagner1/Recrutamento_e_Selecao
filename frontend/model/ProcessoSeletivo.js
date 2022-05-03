class ProcessoSeletivo{
    constructor(departamento, cargo, area, dataInicio, dataFinal, requisitos){       
        this._departamento = departamento;
        this._cargo = cargo;
        this._area = area;  
        this._dataInicio = dataInicio;
        this._dataFinal = dataFinal;
        this._requisitos = requisitos;       
    }

    get departamento(){
        return this._departamento;        
    }

    get cargo(){
        return this._cargo;
    }

    get area(){
        return this._area;
    }

    get dataInicio(){
        return this._dataInicio;
    }

    get dataFinal(){
        return this._dataFinal;
    }

    get requisitos(){
        return this._requisitos;
    }


    loadFromJSON(json){

        for (let name in json){
            this[name] = json[name];                

        }

    }

    static getProcessosStorage() {

        let processos = [];

        if (localStorage.getItem("processos")) {

            processos = JSON.parse(localStorage.getItem("processos"));

        }

        return processos;

    }

    getNewID(){

        let processosID = parseInt(localStorage.getItem("processosID"));

        if (!processosID > 0) processosID = 0;

        processosID++;

        localStorage.setItem("processosID", processosID);

        return processosID;

    }

    save(){

        let processos = ProcessoSeletivo.getProcessosStorage();

        if (this.id > 0) {
            
            processos.map(p=>{

                if (p._id == this.id) {

                    Object.assign(p, this);

                }

                return p;

            });

        } else {

            this._id = this.getNewID();

            processos.push(this);

        }

        localStorage.setItem("processos", JSON.stringify(processos));

    }

    remove(){

        let processos = ProcessoSeletivo.getProcessosStorage();

        processos.forEach((processoData, index)=>{

            if (this._id == processoData._id) {

                processos.splice(index, 1);

            }

        });

        localStorage.setItem("processos", JSON.stringify(processos));

    }

}