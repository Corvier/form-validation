// @Lord_Corvier
const formulario = document.getElementById("form"); // Obtenemos el formulario
const passwordInput = document.getElementById("id_password"); // Obtenemos el campo del password
const fechaInput = document.getElementById("id_datepicker"); // Obtenemos el campo de la fecha
const telefonoInput = document.getElementById("id_phone"); // Obtenemos el campo del numero.

// Estamos a escucha del evento submit del formulario.
formulario.addEventListener("submit", function(event) {
    const campos = formulario.elements; // obtenemos todos los elementos del formulario.
    for (let i = 0; i < campos.length; i++) { // recorremos elemento a elemento.
        if (campos[i].value.trim() === "") { // Si el elemento actual su valor es vació...
            mostrarAlerta("error", "Por favor, llene todos los campos"); // Mostramos una alerta de error.
            event.preventDefault(); // Evitamos que la pagina se actualice
            return false; // Finalizamos el proceso.
        }
    }

    const password = passwordInput.value; // Obtenemos el valor del campo password.
    if (!validarPassword(password)) { // Validamos con la funcion para validar contraseña que definimos abajo
        mostrarAlerta("warning", "La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y al menos un carácter especial");
        event.preventDefault();
    }

    const fecha = fechaInput.value;
    if (!validarFecha(fecha)) {
        mostrarAlerta("warning", "La fecha debe tener el formato mm/dd/yyyy");
        event.preventDefault();
    }

    const telefono = telefonoInput.value;
    if (!validarTelefono(telefono)) {
        mostrarAlerta("warning", "El teléfono debe tener el formato +XX XXXXXXXX");
        event.preventDefault();
    }
});

function validarTelefono(telefono) {
    // Expresión regular para validar el formato +XX XXXXXXXX
    const regex = /^\+(\d{1,3}\s)?\d{6,14}$/;
    return regex.test(telefono);
}

function validarFecha(fecha) {
    // Expresión regular para validar el formato mm/dd/yyyy
    const regex = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return regex.test(fecha);
}

function validarPassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
}

function mostrarAlerta(tipo, mensaje) {
    toastr[tipo](mensaje, "Mensaje:", {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
    });
}