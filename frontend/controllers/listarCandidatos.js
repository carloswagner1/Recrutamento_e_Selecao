var processos = JSON.parse(localStorage.getItem('db_procesos') || '[]');

class ListarCandidatosController{
    construtor(formFiltroId, dadosCandidatosId){
        this.formFiltroEl = document.getElementById(formFiltroId);
        this.dadosCandidatosEl = document.getElementById(dadosCandidatosId);
    }

    onLoad(){

    }


}

let listaCandidatosController = new ListarCandidatosController("form-filtro", "dados-candidatos");