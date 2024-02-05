// Capa de presentación
const presentacion = require('./presentacion');

// Capa de negocio
const negocio = require('./negocio');

// Capa de datos
const datos = require('./datos');

// Función principal para registrar una cita
async function registrarCita(paciente, fecha, hora, descripcion) {
    const cita = { paciente, fecha, hora, descripcion };

    // Validar horario
    if (!negocio.validarHorario(hora)) {
        presentacion.mostrarMensajeError("El horario no es válido para la atención.");
        return;
    }

    // Guardar cita en la capa de datos
    await datos.guardarCita(cita);

    // Mostrar mensaje de éxito en la capa de presentación
    presentacion.mostrarMensajeExito("Cita registrada exitosamente.");
}

// Obtener y mostrar todas las citas
async function mostrarCitas() {
    const citas = await datos.obtenerCitas();
    presentacion.mostrarCitas(citas);
}

// Ejemplo de registro de cita
registrarCita("Juan Perez", "2024-02-05", "10:30am", "Dolor en la pierna");

// Mostrar todas las citas
mostrarCitas();
