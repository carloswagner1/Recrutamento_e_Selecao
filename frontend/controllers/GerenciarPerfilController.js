class GerenciarPerfilController{
    constructor(formPerfil){
        this.formEl = document.getElementById(formPerfil);        
        this.onLoad();        
    }
    onLoad(){
     
            let candidatos = this.getUsersStorage();
            let candidato = candidatos.filter((item) => {
                return item._email =='wagner@email.com'
            })             
            this.setValues(candidato); 
           
    }
    onSubmit(){
        console.log("ok")
    }
    getUsersStorage() {
        let candidatos = [];
        if (localStorage.getItem("candidatos")) {
            candidatos = JSON.parse(localStorage.getItem("candidatos"));
        }
        return candidatos;
    }
    setValues(candidato){
        [...this.formEl.elements].forEach(function(field, index){
            if(["cpf", "numCel", "cep", "logradouro", "bairro","cidade", "estado", "pais", "area", 'genero'].indexOf(field.name)){
                var data = field.name;
                field.value = candidato.filter((item) => {
                    return item._data;
                })
            }
        })
    }
}
let gerenciarPerfilController = new GerenciarPerfilController( "formPerfil"); 

/*candidato.map(function(obj) {
    return Object.keys(obj).map(function(nome) {
        return obj[nome];
    });
});


for (let value of candidatoValues) { console.log(value._nome)}
*/