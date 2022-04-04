class SolicitacaoController{
    constructor(formSolicitacao1, formSolicitacao2){
        this.formEl1 = document.getElementById(formSolicitacao1);
        this.formEl2 = document.getElementById(formSolicitacao2);

        this.onSubmit();

    }

    onSubmit(){

        this.formEl2.addEventListener("submit", event => {

            event.preventDefault();

            let values = this.getValues();

            var mensagem = document.querySelector("#mensagem");
            
            if(!values){

                mensagem.innerHTML = "*Todos os campos devem ser preenchidos"
                mensagem.classList.remove("invisivel");

            }else{
                let listaSolicitacoes = JSON.parse(localStorage.getItem('listaSolicitacoes') || '[]');

                listaSolicitacoes.push(values);
    
                localStorage.setItem('listaSolicitacoes', JSON.stringify(listaSolicitacoes));

                mensagem.innerHTML = "Cadastro efetuado com sucesso!"
                mensagem.classList.remove("invisivel");

                setTimeout(function(){
                    mensagem.classList.add("invisivel");
                }, 1500)
                this.formEl1.reset();
                this.formEl2.reset();

            }            

        });

    }


    getValues(){

        let isValid = true;

        let descricao = this.formEl1.descricao.value;

        if(descricao == ""){
            isValid = false;
        }

        [...this.formEl2.elements].forEach(function (field, index) {

            if (['departamento', 'cargo', 'requisitos', 'escolaridade'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error');
                isValid = false;
            }

        });

        if (!isValid) {
            return false;
        }

        let solicitacao = new Solicitacao(
            departamento.options[departamento.selectedIndex].text,
            cargo.options[cargo.selectedIndex].text,
            requisitos.value,
            escolaridade.options[escolaridade.selectedIndex].text,
            descricao
        );

        return solicitacao;

    }

}

