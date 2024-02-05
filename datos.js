// Capa de datos (datos.js)
const fs = require('fs/promises');

const archivoCitas = 'citas.txt';

async function guardarCita(cita) {
    const registro = `| ${cita.paciente.padEnd(16)} | ${cita.fecha.padEnd(11)} | ${cita.hora.padEnd(6)} | ${cita.descripcion.padEnd(23)} |\n`;
    await fs.appendFile(archivoCitas, registro);
}

async function obtenerCitasTexto() {
    try {
        const contenido = await fs.readFile(archivoCitas, 'utf-8');
        return contenido;
    } catch (error) {
        console.error('Error al leer el archivo de citas:', error.message);
        throw error;
    }
}

module.exports = { guardarCita, obtenerCitasTexto };
