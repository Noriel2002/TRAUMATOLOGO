// index.js
const express = require('express');
const bodyParser = require('body-parser');
const presentacion = require('./presentacion');
const negocio = require('./negocio');
const datos = require('./datos');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para mostrar el block de notas
app.get('/', async (req, res) => {
    try {
        const contenidoCitas = await datos.obtenerCitasTexto();
        const citas = contenidoCitas.split('\n').filter(Boolean);
        const html = await presentacion.generarHTMLCitas(citas);
        res.send(html);
    } catch (error) {
        console.error('Error al obtener las citas:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para mostrar el contenido de citas.txt al presionar el botón
app.get('/mostrar-citas', async (req, res) => {
    try {
        const contenidoCitas = await datos.obtenerCitasTexto();
        res.send(`<pre>${contenidoCitas}</pre>`);
    } catch (error) {
        console.error('Error al obtener las citas:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para ingresar manualmente una cita
app.post('/nueva-cita', async (req, res) => {
    const paciente = req.body.paciente;
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const descripcion = req.body.descripcion;

    await registrarCita(paciente, fecha, hora, descripcion);

    res.redirect('/');
});

// Función para registrar una cita
async function registrarCita(paciente, fecha, hora, descripcion) {
    const cita = { paciente, fecha, hora, descripcion };

    // Validar horario
    if (!negocio.validarHorario(hora)) {
        presentacion.mostrarMensajeError("El horario no es válido para la atención.");
        return;
    }

    // Guardar cita en la capa de datos
    await datos.guardarCita(cita);
}

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
