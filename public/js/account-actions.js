async function logout() {
    console.log('test')
}

function logoutUi() {
    console.log('test2')
}


function updatePasswordModal(head) {
    modalTemplate(head)
}

function updateUsernameModal(head) {
    modalTemplate(head, 'usernameInput')
}


async function updatePassword() {

    const response = await fetch('/api/users/changePass', {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    )
}


function modalTemplate(head, inputId) {
    const body = document.getElementById('main')
    const modalBlur = document.createElement('div')
    modalBlur.setAttribute('id', 'modalBlur')
    modalBlur.setAttribute('class', 'fixed left-0 top-0 w-full h-full bg-[rgb(0,0,0)] bg-[rgba(0,0,0,0.4)] justify-center items-center overflow-auto flex')
    const modalContent = document.createElement('div')
    modalContent.setAttribute('class', 'bg-tasktastic-box p-[20px] w-1/4 h-1/4 text-center')
    const modalHead = document.createElement('p')

    const input = document.createElement('input')
    input.setAttribute('id', inputId)

    const cancel = cancelButton()
    const submit = submitButton()

    modalHead.innerHTML = head
    body.appendChild(modalBlur)
    modalContent.append(modalHead, cancel, submit)
    modalBlur.appendChild(modalContent)
}

function cancelButton() {
    const button = document.createElement('button')
    button.innerHTML = "Cancel"
    button.setAttribute('class', 'p-3 w-1/4 rounded-2xl bg-[#8b5cf6] text-xl hover:bg-[#6445AC] active:bg-[#3B266E] text-white')
    button.setAttribute('onClick', 'clearModal()')
    return button
}

function submitButton() {
    const button = document.createElement('button')
    button.innerHTML = "Submit"
    button.setAttribute('class', 'p-3 w-1/4 rounded-2xl bg-[#8b5cf6] text-xl hover:bg-[#6445AC] active:bg-[#3B266E] text-white')
    button.setAttribute('onClick', 'clearModal()')
    return button
}

function clearModal() {
    const modalBlur = document.getElementById('modalBlur')
    modalBlur.remove()
}