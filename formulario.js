// Obtener datos guardados en sessionStorage
const maestro = sessionStorage.getItem("maestro");
const materia = sessionStorage.getItem("materia");
const codigo = sessionStorage.getItem("codigo");

// Lista de estudiantes
let listaEstudiantes = ["juan", "carlos", "juliana"];

// Variable para almacenar los mensajes de confirmación
let mensajesConfirmacion = [];

// Función para verificar las respuestas y mostrar mensaje de confirmación
function verificarRespuestas() {
    const nombreEstudiante = document.getElementById("nombreEstudiante").value.toLowerCase();
    const nombreMateria = document.getElementById("nombreMateria").value.toLowerCase();
    const codigoIngresado = document.getElementById("codigo").value;

    let mensajeError = "";

    // Verificar si el nombre del estudiante está en la lista
    if (!listaEstudiantes.includes(nombreEstudiante)) {
        mensajeError += "El nombre del estudiante no está en la lista.<br>";
    }

    // Verificar si la materia coincide con la del profesor
    if (nombreMateria !== materia.toLowerCase()) {
        mensajeError += "La materia ingresada no coincide con la asignada al profesor.<br>";
    }

    // Verificar si el código de asistencia es correcto
    if (codigoIngresado !== codigo) {
        mensajeError += "El código de asistencia es incorrecto.<br>";
    }

    // Mostrar mensaje de error o confirmación
    if (mensajeError) {
        document.getElementById("mensajeError").innerHTML = mensajeError;
    } else {
        // Mostrar mensaje de confirmación
        const hora = new Date().toLocaleString();
        const mensajeConfirmacion = `¡Bienvenido ${nombreEstudiante}! Su asistencia a la clase de ${materia} ha sido registrada correctamente.<br>Hora de entrada: ${hora}`;
        mensajesConfirmacion.push(mensajeConfirmacion);

        // Mostrar mensaje de confirmación en el contenedor
        mostrarMensajesConfirmacion();

        // Eliminar estudiante de la lista
        const index = listaEstudiantes.indexOf(nombreEstudiante);
        if (index !== -1) {
            listaEstudiantes.splice(index, 1);
        }

        // Reiniciar el formulario
        document.getElementById("estudianteForm").reset();
        document.getElementById("materiaForm").reset();
        document.getElementById("codigoForm").reset();
        document.getElementById("mensajeError").innerHTML = "";

        // Verificar si hay más estudiantes en la lista
        if (listaEstudiantes.length === 0) {
            // Desactivar el formulario si no hay más estudiantes
            document.getElementById("containerFormulario").style.display = "none";
            document.getElementById("mensajeError").innerHTML = "Todos los estudiantes han registrado su asistencia.";

            // Mostrar solo la lista de estudiantes
            document.getElementById("containerListaEstudiantes").style.display = "block";
            mostrarListaEstudiantes();

            // Descargar los mensajes de confirmación como archivo de texto
            descargarMensajesConfirmacion();
        } else {
            // Mostrar el formulario para el siguiente estudiante
            document.getElementById("nombreEstudiante").value = listaEstudiantes[0];
        }
    }
}

// Función para mostrar la lista de estudiantes registrados
function mostrarListaEstudiantes() {
    const listaEstudiantesElement = document.getElementById("listaEstudiantes");
    listaEstudiantes.forEach(estudiante => {
        const listItem = document.createElement("li");
        listItem.textContent = estudiante;
        listaEstudiantesElement.appendChild(listItem);
    });
}

// Función para mostrar los mensajes de confirmación en el contenedor
function mostrarMensajesConfirmacion() {
    const asistenciasGuardadas = document.getElementById("asistenciasGuardadas");
    asistenciasGuardadas.innerHTML = ""; // Limpiar el contenedor

    mensajesConfirmacion.forEach(mensaje => {
        const asistenciaGuardada = document.createElement("div");
        asistenciaGuardada.className = "asistencia-item"; // Agregar la clase "asistencia-item"
        asistenciaGuardada.innerHTML = mensaje;
        asistenciasGuardadas.appendChild(asistenciaGuardada);
    });
}

// Función para descargar los mensajes de confirmación como archivo de texto
function descargarMensajesConfirmacion() {
    // Convertir los mensajes de confirmación a una cadena
    const mensajesString = mensajesConfirmacion.join('\n');

    // Crear un objeto Blob con los mensajes de confirmación
    const blob = new Blob([mensajesString], { type: 'text/plain' });

    // Crear un enlace de descarga para el archivo de texto
    const link = document.createElement('a');
    link.download = 'mensajes_confirmacion.txt';
    link.href = window.URL.createObjectURL(blob);
    link.click();
}
// Mostrar el código generado en la página
document.getElementById("codigoGenerado").innerText = `Bienvenido profesor ${maestro}. El código para su clase de ${materia} es: ${codigo}`;