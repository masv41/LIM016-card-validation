import validator from './validator.js';
console.log(validator);
export function onlyNumbers(e) {
    let key = e.key.Code || e.which;
    let keyboard = String.fromCharCode(key);
    //let allowedNumbers= "0123456789";
    let unicode = "8-37-38-46";
    let keyboard_Unicode = false;
    for (var i in unicode) {
        if (key == unicode[i]) {
            keyboard_Unicode = true;
        }
    }
    if (key.indexOf(keyboard) == -1 && !keyboard_Unicode) {
        return false;
    }
}
const inputs = document.querySelectorAll('#formulario input');
const expresiones = {
    username: /^[a-zA-Z]{0,12}$/, // Letras, numeros
    cardNumber: /^\d{0,16}$/ // 7 a 14 numeros.
}
const buttonValidation = document.getElementById('buttonValidation');
const overlay = document.getElementById("overlay");
const overlay2 = document.getElementById("overlay2");
const close = document.getElementById('close');
const closeTwo = document.getElementById('closeTwo');

const validarFrom = (e) => {
    switch (e.target.name) {
        case "username":
            validationInputs(expresiones.username, e.target, "username");
            break;
        case "cardNUmber":
            validationInputs(expresiones.cardNumber, e.target, "cardNumber");
            break;
    }
}
const validationInputs = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo_${campo}`).classList.add("formulario_grupo_correcto");
        document.getElementById(`grupo_${campo}`).classList.remove("formulario_grupo_incorrecto");
        document.querySelector(`#grupo__${campo}`).classList.remove("formulario_input-error-activo");
    } else {
        document.getElementById(`grupo_${campo}`).classList.add("formulario_grupo_incorrecto");
        document.getElementById(`grupo_${campo}`).classList.remove("formulario_grupo_correcto");
        document.querySelector(`#grupo__${campo}`).classList.add("formulario_input-error-activo");
    }

}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFrom);
    input.addEventListener("blur", validarFrom);
})

// ----------------------VALIDACION DE TARJETA AL DAR CLICK-------------------------
buttonValidation.addEventListener("click", e => {
    e.preventDefault

    // -----Validando tarjeta ----------
    let nombre_usuario = document.getElementById("username");
    let creditCardNumber = document.getElementById("cardNumber");
    let resultado = validator.isValid(creditCardNumber.value);
    let dataHidden = validator.maskify(creditCardNumber.value);

    // ------no permite espacios vacios-------
    if (creditCardNumber.value == "" || nombre_usuario.value == "") {
        alert("Ups!,algo salió mal. Completa el formulario para continuar");
    } else {

        if (resultado === true) {

            document.getElementById("validacion").innerHTML = "Gracias por tu compra " + nombre_usuario.value + "!";
            document.getElementById("description").innerHTML = "Tu tarjeta N°: " + dataHidden + " a sido validada con éxito!"
            overlay.classList.add("active");

        } else {

            document.getElementById("validacion2").innerHTML = "Ups! " + nombre_usuario.value + " tu compra no pudo ser completada ";
            document.getElementById("description2").innerHTML = "Tu tarjeta N°: " + dataHidden + " es inválida. "
            document.getElementById("grupo_numero_tarjeta").classList.add("formulario_grupo_incorrecto");
            overlay2.classList.add("active");

        }
    }
})

close.addEventListener("click", e => {
    e.preventDefault
    overlay.classList.remove("active");

})
closeTwo.addEventListener("click", e => {
    e.preventDefault
    overlay2.classList.remove("active");
});
