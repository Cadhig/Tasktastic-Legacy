function toggleShowPassword() {
    const password = document.getElementById('password')
    const openEye = document.getElementById('openEye')
    if (password.type === "password") {
        password.type = "text"
        openEye.setAttribute('class', 'fa-regular fa-eye-slash absolute top-[72px] left-[275px] text-xl')
    } else {
        password.type = "password"
        openEye.setAttribute('class', 'fa-regular fa-eye absolute top-[72px] left-[275px] text-xl')
    }
}

function toggleShowPasswordConfirm() {
    const password = document.getElementById('confirmPassword')
    const openEye = document.getElementById('openEyeConfirm')
    if (password.type === "password") {
        password.type = "text"
        openEye.setAttribute('class', 'fa-regular fa-eye-slash absolute top-[130px] left-[275px] text-xl')
    } else {
        password.type = "password"
        openEye.setAttribute('class', 'fa-regular fa-eye absolute top-[130px] left-[275px] text-xl')
    }
}

function check() {
    console.log('this works')
}