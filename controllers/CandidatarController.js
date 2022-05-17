class CandidatarController {
    constructor(containerDescId) {
        this.containerDescEl = document.getElementById(containerDescId);

        this.onLoad();
    }
    onLoad() {
        const container = this.containerDescEl;
        let vagaSelecionada = this.getVagaSelecionadaStorage();
        const content = `
            <div class="descricao">
                <h1>${vagaSelecionada.vaga}</h1>
                <h3>Descrição da vaga</h3>
                <p>${vagaSelecionada.descricao}        
            </div>
            <div class="continuar-button">
                <button id="candidatar" onclick="onSubmit()" ><a href="#">Candidatar</a></button>
                <button id="editarcurriculo" ><a href="../view/curriculo.html">Editar Currículo</a></button>
            </div>
            <div>
                <h3 id="mensagem" class="invisivel"></h3>    
            </div
        `;
        container.innerHTML += content;
    }
    getVagaSelecionadaStorage() {
        let dadosVaga = [];
        if (localStorage.getItem("vagaSelecionada")) {
            dadosVaga = JSON.parse(localStorage.getItem("vagaSelecionada"));
        }
        return dadosVaga;
    }

}

let candidatarController = new CandidatarController("container-desc");


function onSubmit() {
    let values = this.getValues();
    if (!values) return false;
    values.save();
    mensagem.innerHTML = "Inscrição efetuada com sucesso!"
    mensagem.classList.remove("invisivel");
    setTimeout(function () {
        mensagem.classList.add("invisivel");
        window.location.href = '../view/minhasVagas.html'
    }, 1500)
}
function getValues() {
    let processo = candidatarController.getVagaSelecionadaStorage();
    let inscricao = {};
    let isValid = true;
    let idCandidato = '001';//id do candidato logado
    let idProcesso = processo.id;
    let situacao = 'inscrito';
    let pontuacaoTeste = '';

    if (!isValid) {
        return false;
    }

    inscricao.idCandidato = idCandidato;
    inscricao.idProcesso = idProcesso;
    inscricao.situacao = situacao;
    inscricao.pontuacaoTeste = pontuacaoTeste;
    return new Inscricao(
        inscricao.idInscricao,
        inscricao.idCandidato,
        inscricao.idProcesso,
        inscricao.dataInscricao,
        inscricao.situacao,
        inscricao.pontuacaoTeste,
    );
}
