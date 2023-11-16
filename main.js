// main.js

// Declarar la variable informacionPersonal en el alcance global
let informacionPersonal = [];

// Función para cargar la información almacenada en localStorage al arreglo
function cargarInformacion() {
    const informacionGuardada = localStorage.getItem('informacionPersonal');
    if (informacionGuardada) {
        informacionPersonal = JSON.parse(informacionGuardada);
    }
}

// Función para guardar la información en localStorage
function guardarInformacion() {
    localStorage.setItem('informacionPersonal', JSON.stringify(informacionPersonal));
}

// Función para agregar información al arreglo y actualizar el DOM
function agregarInformacion() {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;

    // Validar que los campos no estén vacíos
    if (nombre && apellidos && dni && telefono) {
        // Agregar la información al arreglo
        informacionPersonal.push({ nombre, apellidos, dni, telefono });

        // Guardar la información en localStorage
        guardarInformacion();

        // Limpiar los campos del formulario
        document.getElementById("nombre").value = "";
        document.getElementById("apellidos").value = "";
        document.getElementById("dni").value = "";
        document.getElementById("telefono").value = "";

        // Actualizar la lista de información ingresada en el DOM
        actualizarLista();

        // Mostrar SweetAlert de éxito
        Swal.fire({
            title: "Información Agregada",
            text: "La información ha sido agregada correctamente.",
            icon: "success",
            confirmButtonText: "OK"
        });
    } else {
        // Mostrar SweetAlert de error para informar sobre campos vacíos
        Swal.fire({
            title: "Error",
            text: "Por favor, complete todos los campos.",
            icon: "error",
            confirmButtonText: "OK"
        });
    }
}

// Función para actualizar la lista en el DOM
function actualizarLista() {
    const lista = document.getElementById("informacionLista");
    lista.innerHTML = ""; // Limpiar la lista

    informacionPersonal.forEach((info, index) => {
        const item = document.createElement("li");
        item.textContent = `Persona ${index + 1}: ${info.nombre} ${info.apellidos}, DNI: ${info.dni}, Teléfono: ${info.telefono}`;
        lista.appendChild(item);
    });
}

// Cargar información al iniciar la página
cargarInformacion();

// Agregar un event listener al botón para capturar el evento de clic
const agregarButton = document.getElementById("agregarButton");
agregarButton.addEventListener("click", agregarInformacion);
