const emptyFieldId = "emptyField"
const passwordMatch = "passwordMatch"

async function createAccount() {
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    const confirmPassword = document.getElementById('confirmPassword')

    if (username.value === "" || password.value === "" || confirmPassword.value === "") {
        const getAlert = document.getElementById(emptyFieldId)
        const empty = "Please fill out all fields!"
        if (getAlert?.textContent === empty) {
            return
        }
        return showError(empty, emptyFieldId)

    }
    if (confirmPassword.value !== password.value) {
        const getAlert = document.getElementById(passwordMatch)
        const noMatch = "Passwords don't match!"
        if (getAlert?.textContent === noMatch) {
            return
        }
        return showError(noMatch, passwordMatch)
    }

    const data = {
        username: username.value,
        password: password.value
    }
    const apiCall = await fetch('http://127.0.0.1:6002/users/signup', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!apiCall.ok) {
        alert('Failed to create account')
    }
    alert('Account created')
}


function clearError() {
    const pass = document.getElementById(passwordMatch)
    const emptyInput = document.getElementById(emptyFieldId)
    if (pass) {
        pass.remove()
    }
    if (emptyInput) {
        emptyInput.remove()
    }
}

function showError(error, id) {
    const inputBox = document.getElementById('inputBox')
    const alert = document.createElement('p')
    alert.textContent = error
    alert.setAttribute('id', id)
    alert.setAttribute('class', 'text-center text-red-600')
    inputBox.appendChild(alert)
    return
}

function check() {
    console.log('i work')
}