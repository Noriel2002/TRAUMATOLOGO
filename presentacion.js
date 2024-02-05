// Capa de presentación

function mostrarMensajeExito(mensaje) {
  console.log(`Éxito: ${mensaje}`);
}

function mostrarMensajeError(mensaje) {
  console.error(`Error: ${mensaje}`);
}

function generarHTMLCitas(citas) {
  let html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="styles.css">
          <title>Block de Notas Médico</title>
      </head>
      <body>
          <h1>Block de Notas Médico</h1>

          <h2>Citas Registradas</h2>
  `;

  citas.forEach(cita => {
      const [paciente, fecha, hora, descripcion] = cita.split(',');
      html += `
          <div>
              <strong>Paciente:</strong> ${paciente}<br>
              <strong>Fecha:</strong> ${fecha}<br>
              <strong>Hora:</strong> ${hora}<br>
              <strong>Descripción:</strong> ${descripcion}<br>
          </div>
          <hr>
      `;
  });

  html += `
          <h2>Ingresar Nueva Cita</h2>
          <form action="/nueva-cita" method="post">
              <!-- ... (resto del formulario) -->
          </form>
          
          <h2>Mostrar Contenido de citas.txt</h2>
          <a href="/mostrar-citas" target="_blank"><button>Mostrar Citas.txt</button></a>
      </body>
      </html>
  `;

  return html;
}

module.exports = { mostrarMensajeExito, mostrarMensajeError, generarHTMLCitas };
