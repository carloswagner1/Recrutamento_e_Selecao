export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    /*if(input.validity.valid) {
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
        input.parentElement.querySelector('.input-mensagem-erro').setAttribute('style', "display: ");
        input.focus();
    }*/
}

/*const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
]

const mensagensDeErro = {
    email: {
        valueMissing: ' (*campo obrigatório)',
        customError: ' (email inválido)',
    },
    nome: {
        valueMissing: ' (*campo obrigatório)',
        customError: ' (nome inválido)',
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        customError: ' (email inválido)',
    },
    dataNascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.' 
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'Não foi possível buscar o CEP.'
    },
    logradouro: {
        valueMissing: 'O campo de logradouro não pode estar vazio.'
    },
    cidade: {
        valueMissing: 'O campo de cidade não pode estar vazio.'
    },
    estado: {
        valueMissing: 'O campo de estado não pode estar vazio.'
    },
    preco: {
        valueMissing: 'O campo de preço não pode estar vazio.'
    }
}*/

const validadores = {
    nome:input => validarCampoNome(input),
    email:input => validarCampoEmail(input),
    senha:input => validarCampoSenha(input),
    confirmaSenha:input => validarCampoConfirmSenha(input),    
    cpf:input => validarCampoCPF(input),
    celular:input => validarCampoCelular(input),
    cep:input => recuperarCEP(input)
}
function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })    
    return mensagem;
}
function validarCampoEmail(input){
    const email = input.value;
        if(email ==""){
            labelEmail.setAttribute('style', 'color: red');
            labelEmail.innerHTML = 'E-mail (*campo obrigatório)';
            input.focus();            
        }else if(!ValidarEmail(email)){
            labelEmail.setAttribute('style', 'color: red', 'font-weight: bolder');
            labelEmail.innerHTML = 'E-mail (email inválido)';
            input.focus();                               
        }else {
            labelEmail.setAttribute('style', 'color: var(--cinza)');
            labelEmail.innerHTML = 'E-mail'                
        }
    
}
function ValidarEmail (email) {
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email); 
}
function validarCampoNome(input) {
    const nomeRecebido = input.value;  

    var nomeLimpo = nomeRecebido.trim();
    nomeLimpo = nomeLimpo.replace("  ", " ");

    var nomeArray = nomeLimpo.split(' ');
    var novoNomeLimpo = '';

    for (const item of nomeArray) {
        if (item != '') {
            novoNomeLimpo = novoNomeLimpo + ' ' + item;
        }
    }
    novoNomeLimpo = novoNomeLimpo.trim();

    if (nomeRecebido == ''){
        labelNome.setAttribute('style', 'color: red');
        labelNome.innerHTML = 'Nome Completo (*campo obrigatório)';  
        input.focus();      ;
    } else if(novoNomeLimpo.length < 5 ||nomeArray.length < 2){
        labelNome.setAttribute('style', 'color: red', 'font-weight: bolder');     
        labelNome.innerHTML = 'Nome Completo (insira seu nome completo)';
        input.focus()  
    }else {
        labelNome.setAttribute('style', 'color: var(--cinza)');
        labelNome.innerHTML = 'Nome';                    
    }    
}
function validarCampoSenha(input){
    const senha = input.value;
   
    if(senha == ""){
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = 'Senha (*campo obrigatório)';
        input.focus();                
    }else if(senha.length <= 5){
        labelSenha.setAttribute('style', 'color: red', 'font-weight: bolder');
        labelSenha.innerHTML = 'Senha (mínimo 6 caracteres)';
        input.focus();                       
    }else {
        labelSenha.setAttribute('style', 'color: var(--cinza)');
        labelSenha.innerHTML = 'Senha';                    
    }
}
function validarCampoConfirmSenha(input){
    const confirmeSenha = input.value;
    const senha = document.querySelector('.senha').value;
    
    if(confirmeSenha == ""){
        labelConfirmSenha.setAttribute('style', 'color: red');
        labelConfirmSenha.innerHTML = 'Confirme sua Senha (*campo obrigatório)';
        input.focus();                
    }else if(senha != confirmeSenha){
        labelConfirmSenha.setAttribute('style', 'color: red', 'font-weight: bolder');     
        labelConfirmSenha.innerHTML = 'Confirme sua senha (as senhas não conferem)';                
        input.focus();
    }else {
        labelConfirmSenha.setAttribute('style', 'color: var(--cinza)');
        labelConfirmSenha.innerHTML = 'Confirme sua Senha';                    
    }
}
function validarCampoCPF(input){
    const cpf = input.value.replace(/\D/g, '');
    if(cpf == ""){
        labelCPF.setAttribute('style', 'color: red');
        labelCPF.innerHTML = 'CPF (*campo obrigatório)';
        input.focus();                
    }else if(!ValidarCPF(cpf)){
        labelCPF.setAttribute('style', 'color: red', 'font-weight: bolder');
        labelCPF.innerHTML = 'CPF (número inválido)'
        input.focus();
       }else {
        labelCPF.setAttribute('style', 'color: var(--cinza)');
        labelCPF.innerHTML = 'CPF'
        MascaraCPF(input)                    
    }
}
function ValidarCPF(cpf){
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
function MascaraCPF(cpf) {
    const elementoAlvo = cpf
    const cpfAtual = cpf.value   
    
    let cpfAtualizado;
    
    cpfAtualizado = cpfAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 
     function( regex, argumento1, argumento2, argumento3, argumento4 ) {
        return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
    })  
    elementoAlvo.value = cpfAtualizado; 
}
function validarCampoCelular(input){
    const numCel = input;

    MascaraCelular(numCel);
    if(numCel.value == ''){
        labelCelular.setAttribute('style', 'color: red');
        labelCelular.innerHTML = 'Celular (*campo obrigatório)';
        input.focus();
    }else if(numCel.value.length != 15){
        labelCelular.setAttribute('style', 'color: red');
        labelCelular.innerHTML = 'Celular (número inválido)'
        input.focus();
        input.focus();
    }else {
        labelCelular.setAttribute('style', 'color: var(--cinza)');
        labelCelular.innerHTML = 'Celular'           
    }    
}
function MascaraCelular(numCel) {
    setTimeout(function() {
        var numero = FormatarCelular(numCel.value);
        if(numero != numCel.value) {
            numCel.value = numero;
        }
    }, 1);
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
    }
    return num;
}

