class LoginController {
    constructor(loginContainerId) {
        this.loginContainerEl = document.getElementById(loginContainerId);

        this.onSubmit();
    }

    onSubmit() {
        this.loginContainerEl.addEventListener("submit", event => {
            event.preventDefault();
            let email = document.querySelector('#email')
            let emailLabel = document.querySelector('#emailLabel')

            let senha = document.querySelector('#senha')
            let senhaLabel = document.querySelector('#senhaLabel')

            let msgError = document.querySelector('#msgError')

            let candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');

            let isValid = false;

            console.log(candidatos)

            let userValid = {
                email: '',
                senha: ''
            }



            candidatos.forEach((item) => {
                if (email.value == item._email && senha.value == item._senha) {
                    userValid = {
                        user: item._email,
                        senha: item._senha
                    }
                    isValid = true;
                }

                console.log(userValid)
            })
            

            if (isValid) {
               window.location.href = '../view/minhasvagas.html'

                let mathRandom = Math.random().toString(16).substr(2)
                let token = mathRandom + mathRandom

                localStorage.setItem('token', token)
                localStorage.setItem('userLogado', JSON.stringify(userValid))
            } else {
                emailLabel.setAttribute('style', 'color: red')
                email.setAttribute('style', 'border-color: red')
                senhaLabel.setAttribute('style', 'color: red')
                senha.setAttribute('style', 'border-color: red')
                msgError.setAttribute('style', 'display: block')
                msgError.setAttribute('style', 'color: red')
                msgError.innerHTML = 'Usuário ou senha incorretos'
                _email.focus()
            }

        });
    }

}






