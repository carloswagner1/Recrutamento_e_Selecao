class Utils {

    static dateFormat(date) {

        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

    }

    static validarPreenchimento(){
    
        /*Validação do formulário*/
        let email = document.querySelector('#email');
        let labelEmail = document.querySelector('#labelEmail')        
    
        let nome = document.querySelector('#nome');
        let labelNome = document.querySelector('#labelNome')        

        let senha = document.querySelector('#senha');
        let labelSenha = document.querySelector('#labelSenha')        

        let confirmSenha = document.querySelector('#passconfirmation');
        let labelConfirmSenha = document.querySelector('#labelConfirmSenha')        

        let cpf = document.querySelector('#cpf');
        let labelCPF = document.querySelector('#labelCPF')        

        let numCel = document.querySelector('#numCel');
        let labelCelular = document.querySelector('#labelCelular')

        let pais = document.querySelector('#pais')
        

        /*validação do email*/

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


        /*validação do nome*/
        nome.addEventListener('keyup', () => {
            if(nome.value == ""){
                labelNome.setAttribute('style', 'color: var(--cinza)');
                labelNome.innerHTML = 'Nome';                
            }else if(nome.value.length <= 4){
                labelNome.setAttribute('style', 'color: red', 'font-weight: bolder');     labelNome.innerHTML = 'Nome (mínimo 5 caracteres)';                       
            }else {
                labelNome.setAttribute('style', 'color: var(--cinza)');
                labelNome.innerHTML = 'Nome'                    
            }
        })

        /*validação do senha*/
        senha.addEventListener('keyup', () => {
            if(senha.value == ""){
                labelSenha.setAttribute('style', 'color: var(--cinza)');
                labelSenha.innerHTML = 'Senha';                
            }else if(senha.value.length <= 5){
                labelSenha.setAttribute('style', 'color: red', 'font-weight: bolder');
                labelSenha.innerHTML = 'Senha (mínimo 6 caracteres)';                       
            }else {
                labelSenha.setAttribute('style', 'color: var(--cinza)');
                labelSenha.innerHTML = 'Senha'                    
            }
        })

        /*confirmação de senha*/
        confirmSenha.addEventListener('keyup', () => {
            if(confirmSenha.value == ""){
                labelConfirmSenha.setAttribute('style', 'color: var(--cinza)');
                labelConfirmSenha.innerHTML = 'Confirme sua Senha';                
            }else if(senha.value != confirmSenha.value){
                labelConfirmSenha.setAttribute('style', 'color: red', 'font-weight: bolder');     
                labelConfirmSenha.innerHTML = 'Confirme sua senha (as senhas não conferem)';                
            }else {
                labelConfirmSenha.setAttribute('style', 'color: var(--cinza)');
                labelConfirmSenha.innerHTML = 'Confirme sua Senha'                    
            }
        })

        /*validação cpf*/
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
        
        /*validação celular*/
        numCel.addEventListener('keyup', () => {
        
            Utils.MascaraCelular(numCel);
            if(numCel.value.length != 15){
                labelCelular.setAttribute('style', 'color: red', 'font-weight: bolder');
                labelCelular.innerHTML = 'Celular (número inválido)'                 
            }else {
                labelCelular.setAttribute('style', 'color: var(--cinza)');
                labelCelular.innerHTML = 'Celular'           
            }
        })
        
    }

    static ValidarEmail (email) {
        var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
         return emailPattern.test(email); 
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

    static MascaraCelular(numCel) {
        setTimeout(function() {
            var numero = FormatarCelular(numCel.value);
            if(numero != numCel.value) {
                numCel.value = numero;
            }
        }, 1);
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
