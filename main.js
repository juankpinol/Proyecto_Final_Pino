// main.js

let informacionPersonal = [];

function cargarInformacion() {
    const informacionGuardada = localStorage.getItem('informacionPersonal');
    if (informacionGuardada) {
        informacionPersonal = JSON.parse(informacionGuardada);
    }
}

function guardarInformacion() {
    localStorage.setItem('informacionPersonal', JSON.stringify(informacionPersonal));
}

function agregarInformacion() {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;

    if (nombre && apellidos && dni && telefono) {
        informacionPersonal.push({ nombre, apellidos, dni, telefono });
        guardarInformacion();

        document.getElementById("nombre").value = "";
        document.getElementById("apellidos").value = "";
        document.getElementById("dni").value = "";
        document.getElementById("telefono").value = "";

        actualizarLista();

        // Simulación de operación asíncrona con setTimeout
        setTimeout(function () {
            Swal.fire({
                title: "Información Agregada",
                text: "La información ha sido agregada correctamente.",
                icon: "success",
                confirmButtonText: "OK"
            });
        }, 2000); // Espera 2 segundos antes de mostrar la alerta
    } else {
        Swal.fire({
            title: "Error",
            text: "Por favor, complete todos los campos.",
            icon: "error",
            confirmButtonText: "OK"
        });
    }
}

function actualizarLista() {
    const lista = document.getElementById("informacionLista");
    lista.innerHTML = "";

    informacionPersonal.forEach((info, index) => {
        const item = document.createElement("li");
        item.textContent = `Persona ${index + 1}: ${info.nombre} ${info.apellidos}, DNI: ${info.dni}, Teléfono: ${info.telefono}`;
        lista.appendChild(item);
    });
}

cargarInformacion();

const agregarButton = document.getElementById("agregarButton");
agregarButton.addEventListener("click", agregarInformacion);
