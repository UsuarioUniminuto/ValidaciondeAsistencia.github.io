function generarCodigo() {
    return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
}

function validarAsistencia(usuario, clave) {
    const codigo = generarCodigo();
    const maestro = prompt("Por favor, ingrese su nombre:");
    const materia = prompt("Profesor " + maestro +" ¿Cuál es el nombre de la materia?");

    alert("Bienvenido profesor " + maestro + ". El código para su clase de " + materia + " es: " + codigo);

    const lista = ["juan", "carlos", "juliana"];

    lista.forEach(estudiante => {
        alert("HOLA ESTUDIANTES, ES HORA DE ENTRAR A CLASES");

        let ciclo = true;
        while (ciclo) {
            const nombre = prompt("Hola estudiante, ¿Cuál es su nombre?");

            if (lista.includes(nombre)) {
                alert("Estás en clase");
                const materia2 = prompt("Hola " + nombre + ", por favor ingrese el nombre de la materia ");

                if (materia2 === materia) {
                    const digito = parseInt(prompt("Hola " + nombre + ", por favor digite el código de asistencia "));

                    if (digito === codigo && materia2 === materia) {
                        const hora = new Date().toLocaleString();
                        alert("¡Bienvenido " + nombre + "! Su asistencia a la clase de " + materia + " es exitosa.\nHora de entrada: " + hora);
                        ciclo = false;
                    } else {
                        alert("Lo lamento " + nombre + ", su asistencia a la clase de " + materia + " no se ha realizado. ");
                    }
                } else {
                    alert("Esta materia no está.");
                }
            } else {
                alert("Lo lamento, no se encuentra en la lista.");
            }
        }
    });
}

function validarCredenciales() {
    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;
    const usuarioCorrecto = "uniminuto";
    const claveCorrecta = "uniminuto123";

    if (usuario === usuarioCorrecto && clave === claveCorrecta) {
        window.location.href = "bienvenido.html";
    } else {
        alert("Usuario y/o contraseña incorrectos");
    }
}