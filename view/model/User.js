class User{
    constructor(name, cpf, email, celular, pais, senha, photo, admin){
        this._name = name;
        this._cpf =cpf;
        this._email = email;
        this._celular = celular;
        this._pais = pais;
        this._senha =senha;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }


    get register(){
        return this._register;
    }

    get name(){
        return this._name;
    }

    get cpf() {
        return this._cpf;
    }

    get celular() {
        return this._celular;
    }

    get pais() {
        return this._pais;
    }

    get email() {
        return this._email;
    }

    get photo() {
        return this._photo
    }

    get password() {
        return this._password;
    }

    get admin() {
        return this._admin;
    }

    set photo(value){
        this._photo = value;
    }

    loadFromJSON(json){

        for (let name in json){
            switch(name){
                case '_register':
                    this[name] = new Date(json[name]);
                break;
                default:
                    this[name] = json[name];
            }
            

        }

    }

    static getUsersStorage() {

        let users = [];

        if (localStorage.getItem("users")) {

            users = JSON.parse(localStorage.getItem("users"));

        }

        return users;

    }

    getNewID(){

        let usersID = parseInt(localStorage.getItem("usersID"));

        if (!usersID > 0) usersID = 0;

        usersID++;

        localStorage.setItem("usersID", usersID);

        return usersID;

    }

    save(){

        let users = User.getUsersStorage();

        if (this.id > 0) {
            
            users.map(u=>{

                if (u._id == this.id) {

                    Object.assign(u, this);

                }

                return u;

            });

        } else {

            this._id = this.getNewID();

            users.push(this);

        }

        localStorage.setItem("users", JSON.stringify(users));

    }

    remove(){

        let users = User.getUsersStorage();

        users.forEach((userData, index)=>{

            if (this._id == userData._id) {

                users.splice(index, 1);

            }

        });

        localStorage.setItem("users", JSON.stringify(users));

    }

}

