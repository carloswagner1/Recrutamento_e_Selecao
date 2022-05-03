import { valida } from './utils/validacao.js'

const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
    input.addEventListener('keyup', (evento) => {
        valida(evento.target)
    })
    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
    input.addEventListener('submit', (evento) => {
        valida(evento.target)
    })
})


