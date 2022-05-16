class UserController {

    constructor(formIdCreate, formIdUpdate, tableId){

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        //this.validarPreenchimento();
        this.onSubmit();
        this.onEdit();
        this.selectAll();

    }

    onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{

            this.showPanelCreate();

        });

        this.formUpdateEl.addEventListener("submit", event => {

            event.preventDefault();

            let btn = this.formUpdateEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values);

            let user = new User();

            user.loadFromJSON(result);

            user.save();

            this.getTr(user, tr);

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

            if (!values) {
                return false;
            }

            values.save();

            this.addLine(values);

            this.formEl.reset();

            btn.disabled = false;            

        });

    }


    getValues(formEl){

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function (field, index) {

            if (['name', 'cpf', 'email', 'numCel', 'country', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error');
                isValid = false;

            } else if(field.name == "admin") {

                user[field.name] = field.checked;

            } else {

                user[field.name] = field.value;

            }

        });

        if (!isValid) {
            return false;
        }

        return new User(
            user.name,
            user.cpf,
            user.email,
            user.numCel,
            user.country,
            user.password,
            user.admin
        );

    }

    selectAll() {
       
        let users = User.getUsersStorage();
        
        users.forEach(dataUser => {

            let user = new User();

            user.loadFromJSON(dataUser);
        
            this.addLine(user);

        });

    }

    getTr(dataUser, tr = null) {

        if (tr === null) tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `            
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
        `;

        this.addEventsTr(tr);

        return tr

    }

    addLine(dataUser) {

        let tr = this.getTr(dataUser);

        this.tableEl.appendChild(tr);

    }

    addEventsTr(tr) {

        tr.querySelector(".btn-delete").addEventListener("click", (e) => {

            if(confirm("Deseja relamente excluir?")) {

                let user = new User();

                user.loadFromJSON(JSON.parse(tr.dataset.user));

                user.remove();

                tr.remove();
            }

        });

        tr.querySelector(".btn-edit").addEventListener("click", e => {

            let json = JSON.parse(tr.dataset.user);

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

        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";

    }

    showPanelUpdate() {

        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";

    }

    /*validarPreenchimento(){        
        let nome = document.querySelector('#exampleInputName');
        let labelNome = document.querySelector('#labelName');

        let cpf = document.querySelector('#exampleInputCpf');
        let labelCPF = document.querySelector('#labelCPF');  

        let email = document.querySelector('#exampleInputEmail');
        let labelEmail = document.querySelector('#labelEmail');

        let numCel = document.querySelector('#exampleInputCelular');
        let labelCelular = document.querySelector('#labelCelular');

        let senha = document.querySelector('#exampleInputPassword');
        let labelSenha = document.querySelector('#password');  
        
        Utils.validarCampoNome(nome, labelNome);
        Utils.validarCampoCPF(cpf, labelCPF);
        Utils.validarCampoEmail(email, labelEmail);
        Utils.validarCampoCelular(numCel, labelCelular);
        Utils.validarCampoSenha(senha, labelSenha);

    }*/

}

let userController = new UserController("form-user-create", "form-user-update", "table-users");