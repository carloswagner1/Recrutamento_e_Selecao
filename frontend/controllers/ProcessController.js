class ProcessoController {
    constructor(formIdCreate, formIdUpdate, tableId){
        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit(); 
        this.selectAll();      
    }

    onEdit(){
        document.querySelector("#box-process-update .btn-cancel").addEventListener("click", e=>{
            this.showPanelCreate();
        });

        this.formUpdateEl.addEventListener("submit", event => {
            event.preventDefault();
            let btn = this.formUpdateEl.querySelector("[type=submit]");
            btn.disabled = true;
            let values = this.getValues(this.formUpdateEl);
            let index = this.formUpdateEl.dataset.trIndex;
            let tr = this.tableEl.rows[index];
            let processoOld = JSON.parse(tr.dataset.processo);
            let result = Object.assign({}, processoOld, values);
            let processo = new ProcessoSeletivo();
            processo.loadFromJSON(result);
            processo.save();
            this.getTr(processo, tr);
            this.formUpdateEl.reset();            
            this.showPanelCreate();
            btn.disabled = false;  
        });
    }

    onSubmit(){
        this.formEl.addEventListener("submit", event => {
            event.preventDefault();
            let btn = this.formEl.querySelector("[type=submit]");
            btn.disabled = true;
            let values = this.getValues(this.formEl);
            if (!values) return false;
            values.save();
            this.addLine(values);
            this.formEl.reset();
            btn.disabled = false;            
        });
    }

    getValues(formEl){
        let processoSeletivo = {};
        let isValid = true;
        [...formEl.elements].forEach(function (field, index) {
            if (['departamento', 'cargo', 'area','dataInicio', 'dataFinal', 'requisitos'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                processoSeletivo[field.name] = field.value;
            }           
        });

        if (!isValid) {
            return false;
        }

        return new ProcessoSeletivo(
            processoSeletivo.departamento,
            processoSeletivo.cargo,
            processoSeletivo.area,
            processoSeletivo.dataInicio,
            processoSeletivo.dataFinal,
            processoSeletivo.requisitos,
        );
    }

    selectAll() {       
        let processos = Processo.getProcessosStorage();        
        processos.forEach(dataProcesso => {
            let processo = new Processo();
            processo.loadFromJSON(dataProcesso);        
            this.addLine(processo);
        });
    }

    getTr(dataProcesso, tr = null) {
        if (tr === null) tr = document.createElement('tr');
        tr.dataset.processo = JSON.stringify(dataProcesso);
        tr.innerHTML = `            
            <td>${dataProcesso.departamento}</td>
            <td>${dataProcesso.cargo}</td>
            <td>${(dataProcesso.dataInicio)}</td>
            <td>${(dataProcesso.dataFinal)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
        `;
        this.addEventsTr(tr);
        return tr
    }

    addLine(dataProcesso) {
        let tr = this.getTr(dataProcesso);
        this.tableEl.appendChild(tr);
    }


    addEventsTr(tr) {
        tr.querySelector(".btn-delete").addEventListener("click", (e) => {
            if(confirm("Deseja relamente excluir?")) {
                let processo = new ProcessoSeletivo();
                processo.loadFromJSON(JSON.parse(tr.dataset.processo));
                processo.remove();
                tr.remove();
            }
        });

        tr.querySelector(".btn-edit").addEventListener("click", e => {
            let json = JSON.parse(tr.dataset.processo);
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;
            for (let name in json) {
                let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");
                if (field) {
                    switch (field.type) {
                        case 'file':
                            continue;
                        break;                            
                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                        break;
                        case 'checkbox':
                            field.checked = json[name];
                        break;
                        default:
                            field.value = json[name];
                    }
                    field.value = json[name];
                }
            }       
            this.showPanelUpdate();
        });
    }

    showPanelCreate(){
        document.querySelector("#box-process-create").style.display = "block";
        document.querySelector("#box-process-update").style.display = "none";
    }
    showPanelUpdate() {
        document.querySelector("#box-process-create").style.display = "none";
        document.querySelector("#box-process-update").style.display = "block";
    }
}

let processoController = new ProcessoController("form-process-create", "form-process-update", "table-process");