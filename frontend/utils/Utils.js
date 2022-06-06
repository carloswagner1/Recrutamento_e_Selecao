class Utils {

    static dateFormat(date) {

        return date.getdate() + '/' + date.getMonth() + '/' + date.getFullYear();

    }   
    /*Buscar endereço pelo CEP */
    static buscaCep(){
        let cep = document.querySelector('#cep');
        let logradouro = document.querySelector('#logradouro');
        let bairro = document.querySelector('#bairro');
        let cidade = document.querySelector('#cidade');
        let estado = document.querySelector('#estado');


        cep.value ='';

        cep.addEventListener('blur', function(e){
            let cep= e.target.value;
            let script = document.createElement('script');
            script.src ='https://viacep.com.br/ws/'+cep+'/json/?callback=popularForm';
            document.body.appendChild(script);
        });       

    }
     
}

function popularForm(resposta){
   
    logradouro.value =resposta.logradouro;
    bairro.value =resposta.bairro;
    cidade.value =resposta.localidade;
    estado.value =resposta.uf;
}