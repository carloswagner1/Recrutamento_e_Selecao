class LoginController {
    constructor(loginContainerId) {
        this.loginContainerEl = document.getElementById(loginContainerId);
        
        this.onSubmit();
    }

    onSubmit() {        

        let tipo = this.loginContainerEl.dataset.tipo;

        this.loginContainerEl.addEventListener("submit", event => {

            event.preventDefault();
          
            let email = document.querySelector('#email')
            let emailLabel = document.querySelector('#emailLabel')

            let senha = document.querySelector('#senha')
            let senhaLabel = document.querySelector('#senhaLabel')

            let msgError = document.querySelector('#msgError')

            if(this.loginContainerEl.dataset.tipo == 'empresa'){
                var users = JSON.parse(localStorage.getItem('users') || '[]');
            }else{
                var users = JSON.parse(localStorage.getItem('candidatos') || '[]');
            }

            let isValid = false;
            
            let loginValid = {
                email: '',
                senha: ''
            }

            users.forEach((item) => {
                if (email.value == item._email && senha.value == item._password) {
                    loginValid = {
                        login: item._email,
                        senha: item._password
                    }
                    isValid = true;
                }
            })
            
            if (isValid) {

                if(tipo == 'empresa'){
                    window.location.href = "../view/gerenciarProcessoSeletivo.html"
                }else{
                    window.location.href = '../view/minhasvagas.html'
                }
               
                let mathRandom = Math.random().toString(16).substr(2)
                let token = mathRandom + mathRandom

                localStorage.setItem('token', token)
                localStorage.setItem('userLogado', JSON.stringify(loginValid))            
            } else {
                emailLabel.setAttribute('style', 'color: red')
                email.setAttribute('style', 'border-color: red')
                senhaLabel.setAttribute('style', 'color: red')
                senha.setAttribute('style', 'border-color: red')
                msgError.setAttribute('style', 'display: block')
                msgError.setAttribute('style', 'color: red')
                msgError.innerHTML = 'Usuário ou senha incorretos'
                email.focus()
            }
        });        
    }
}






