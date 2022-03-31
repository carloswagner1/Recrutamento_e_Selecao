class Utils {

    static dateFormat(date) {

        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

    }

    /*validação do email*/

    static validarCampoEmail(email, labelEmail){
        email.addEventListener('keyup', () => {
            if(email.value ==""){
                labelEmail.setAttribute('style', 'color: var(--cinza)');
                labelEmail.innerHTML = 'E-mail'                   
            }else if(!Utils.ValidarEmail(email.value)){
                labelEmail.setAttribute('style', 'color: red', 'font-weight: bolder');
                labelEmail.innerHTML = 'E-mail (email inválido)';                               
            }else {
                labelEmail.setAttribute('style', 'color: var(--cinza)');
                labelEmail.innerHTML = 'E-mail'                
            }
        })
    }

    static ValidarEmail (email) {
        var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
         return emailPattern.test(email); 
    }

    /*validação do nome*/

    static validarCampoNome(nome, labelNome){
        nome.addEventListener('keyup', () => {
            if(nome.value == ""){
                labelNome.setAttribute('style', 'color: var(--cinza)');
                labelNome.innerHTML = 'Nome';                
            }else if(nome.value.length <= 4){
                labelNome.setAttribute('style', 'color: red', 'font-weight: bolder');     
                labelNome.innerHTML = 'Nome (mínimo 5 caracteres)';                       
            }else {
                labelNome.setAttribute('style', 'color: var(--cinza)');
                labelNome.innerHTML = 'Nome';                    
            }
        });

    }

    /*validação do senha*/

    static validarCampoSenha(senha, labelSenha){
        
        senha.addEventListener('keyup', () => {
            if(senha.value == ""){
                labelSenha.setAttribute('style', 'color: var(--cinza)');
                labelSenha.innerHTML = 'Senha';                
            }else if(senha.value.length <= 5){
                labelSenha.setAttribute('style', 'color: red', 'font-weight: bolder');
                labelSenha.innerHTML = 'Senha (mínimo 6 caracteres)';                       
            }else {
                labelSenha.setAttribute('style', 'color: var(--cinza)');
                labelSenha.innerHTML = 'Senha';                    
            }
        });
    }

    /*confirmação de senha*/
    static validarCampoConfirmSenha(confirmSenha, labelConfirmSenha){

        confirmSenha.addEventListener('keyup', () => {
            if(confirmSenha.value == ""){
                labelConfirmSenha.setAttribute('style', 'color: var(--cinza)');
                labelConfirmSenha.innerHTML = 'Confirme sua Senha';                
            }else if(senha.value != confirmSenha.value){
                labelConfirmSenha.setAttribute('style', 'color: red', 'font-weight: bolder');     
                labelConfirmSenha.innerHTML = 'Confirme sua senha (as senhas não conferem)';                
            }else {
                labelConfirmSenha.setAttribute('style', 'color: var(--cinza)');
                labelConfirmSenha.innerHTML = 'Confirme sua Senha';                    
            }
        });
    }

    /*validação cpf*/

    static validarCampoCPF(cpf, labelCPF){
        cpf.addEventListener('keyup', () => {
            if(cpf.value == ""){
                labelCPF.setAttribute('style', 'color: var(--cinza)');
                labelCPF.innerHTML = 'CPF';                
            }else if(!Utils.ValidarCPF(cpf.value)){
                labelCPF.setAttribute('style', 'color: red', 'font-weight: bolder');
                labelCPF.innerHTML = 'CPF (número inválido)'                   
            }else {
                labelCPF.setAttribute('style', 'color: var(--cinza)');
                labelCPF.innerHTML = 'CPF'
                Utils.MascaraCPF(cpf)                    
            }
        })

    }

    static ValidarCPF(cpf){
        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf.length < 11)
              return false;
        for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1)){
                digitos_iguais = 0;
                 break;
            }
        if (!digitos_iguais){
            numeros = cpf.substring(0,9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;
            numeros = cpf.substring(0,10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;
            return true;
            }else
                 return false;
    }

    static MascaraCPF(cpf) {
        const elementoAlvo = cpf
        const cpfAtual = cpf.value   
        
        let cpfAtualizado;
        
        cpfAtualizado = cpfAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 
         function( regex, argumento1, argumento2, argumento3, argumento4 ) {
            return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
        })  
        elementoAlvo.value = cpfAtualizado; 
    }

    /*validação celular*/

    static validarCampoCelular(numCel, labelCelular){
        numCel.addEventListener('keyup', () => {
            Utils.MascaraCelular(numCel);
            if(numCel.value.length != 15){
                labelCelular.setAttribute('style', 'color: red', 'font-weight: bolder');
                labelCelular.innerHTML = 'Celular (número inválido)'                 
            }else {
                labelCelular.setAttribute('style', 'color: var(--cinza)');
                labelCelular.innerHTML = 'Celular'           
            }
        });                    
        
    }

    static MascaraCelular(numCel) {
        setTimeout(function() {
            var numero = FormatarCelular(numCel.value);
            if(numero != numCel.value) {
                numCel.value = numero;
            }
        }, 1);
    } 
    
    /*Buscar endereço pelo CEP */
    static buscaCep(){
        let cep = document.querySelector('#cep');
        let rua = document.querySelector('#rua');
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

function FormatarCelular(numero) { 
    var num = numero.replace(/\D/g, "");
    num = num.replace(/^0/, "");
    if (num.length > 10) {
      num = num.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (num.length > 5) {
      num = num.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (num.length > 2 ) {
      num = num.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (num.length > 0 ) {
      num = num.replace(/^(\d*)/, "($1");
    }else {
        num.lentgh = -1
    }
    return num;
}

function popularForm(resposta){
   
    rua.value =resposta.logradouro;
    bairro.value =resposta.bairro;
    cidade.value =resposta.localidade;
    estado.value =resposta.uf;
}