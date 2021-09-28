const form = document.querySelector('.form')
const message = document.getElementById('message')

function validate (e) {
    // Valida todos los campos. Si todos son correctos muestra un mensaje.
    e.preventDefault()
    for (let i = 0; i < form.length - 1; i++) {
        checkInput(form[i])
    }
    for (let i = 0; i < form.length - 1; i++) {
        if (form[i].nextElementSibling.classList.contains('show--error')) {
            return
        }
    }
    message.classList.add('valid')
}

function checkInput (input) {
    const inputValue = input.value.trim()

    if (inputValue === '' || inputValue === null) {
        isError(input, 'Field is required')
    } else if (inputValue.length > 0 && inputValue.length < 3) {
        isError(input, 'Minimum 3 characters')
    } else if (input.classList.contains('firstname') || input.classList.contains('lastname')) {
        !/^[a-zA-Z]*$/g.test(inputValue) ? isError(input, 'Numbers in the name are not valid') : isValid(input)
    } else if (input.classList.contains('email')) {
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputValue) ? isError(input, 'Email address is not valid') : isValid(input)
    } else if (input.classList.contains('password')) {
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,8}$/.test(inputValue) ? isError(input, 'Your password must contain numbers and letters') : isValid(input)
    } else if (input.classList.contains('phone')) {
        /\D/.test(inputValue) ? isError(input, 'Letters in the phone are not valid') : isValid(input)
    } else {
        isValid(input)
    }
}

// Si un campo no és válido muestra un mensaje en rojo
function isError (input, message) {
    input.classList.add('border--error')
    input.nextElementSibling.innerText = message
    input.nextElementSibling.classList.add('show--error')
}

// Si el campo és válido pone el borde en verde
function isValid (input) {
    input.classList.remove('border--error')
    input.nextElementSibling.classList.remove('show--error')
    input.classList.add('border--valid')
}