class CandidatarController{
    constructor(containerDescId, containerFormId){
        this.containerDescEl = document.getElementById(containerDescId);
        this.containerFormEl = document.getElementById (containerFormId);              
    }
}

function addExp(){
    const expProf = document.querySelector('.expProf');
    const exp = document.createElement('div');
    exp.classList.add('input-group-exp');

    exp.innerHTML = `
        <div class="input-box">
            <label id="labelempresa" for="empresa">Empresa</label>
            <input type="text" name="empresa" id="empresa">
        </div>
        <div class="input-box">
            <label id="labelcargo" for="cargo">Cargo</label>
                <input type="text" name="cargo" id="cargo">
        </div>
        <div class="input-box">
            <label id="dataAdimissao" for="dataAdimissao">Data de Admissão</label>
            <input id="dataAdimissao" type="date" name="dataAdimissao">
        </div>
        <div class="input-box">
            <label id="dataDesligamento" for="dataDesligamento">Data de Desligamento</label>
            <input id="dataDesligamento" type="date" name="dataDesligamento">
        </div>
        <div class="input-box-textarea">
            <label for="descricao">Descreva sua função dentro da empresa</label>
            <textarea name="descricao" id="descricao" rows="10"></textarea>
        </div>
        <div class="semExperiencia-inputs">
            <div class="semExperiencia-group">
                <div class="semExperiencia-input">
                    <input id="semExperiencia" type="radio" name="semExperiencia">
                    <label for="semExperiencia">Não possuo experiência profissional</label>
                </div>
            </div>
        </div>       
    `;
    expProf.appendChild(exp);
}

function addFormacao(){
    const formAcad = document.querySelector('.formacao');
    const formacao = document.createElement('div');
    formacao.classList.add('input-group-formacao');

    formacao.innerHTML = `
        <div class="input-box-formacao">
            <label id="labelformacao" for="formacao"> Tipo de Formação</label>
            <select name="formacao" id="formacao">
                <option selected disabled value="">Selecione</option>
                <option value="fundamental">Ensino Fundamental</option>
                <option value="medio">Ensino Médio</option>
                <option value="graduacao">Graduação</option>
                <option value="pos-graduacao">Pós-Graduação</option>
                <option value="doutorado">Doutorado</option>
                <option value="mestrado">Mestrado</option>
                <option value="tecnico">Técnico</option>
                <option value="tecnologo">Tecnólogo</option>
            </select>
        </div>
        <div class="input-box">
            <label id="labelcurso" for="curso">Curso</label>
            <input type="text" name="curso" id="curso">
        </div>
        <div class="input-box">
            <label id="labelInstituicao" for="instituicao">Nome da Instituição</label>
            <input type="text" name="instituicao" id="instituicao">
        </div>
        <div class="input-box">
            <label id="datainicio" for="datainicio">Data de Início</label>
            <input id="datainicio" type="date" name="datainicio">
        </div>
        <div class="input-box">
            <label id="dataconclusao" for="dataconclusao">Data de Conclusão</label>
            <input id="dataconclusao" type="date" name="dataconclusao">
        </div>
    `;
    formAcad.appendChild(formacao);
}

function showForm(){
    document.querySelector(".container-desc").style.display = "none";
    document.querySelector(".container-form").style.display = "block";
}