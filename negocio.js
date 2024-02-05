// Capa de negocio (negocio.js)

function validarHorario(hora) {
  const horarioInicioManana = parsearHora("06:00");
  const horarioFinManana = parsearHora("13:00");
  const horarioInicioTarde = parsearHora("15:00");
  const horarioFinTarde = parsearHora("19:00");

  const horaCita = parsearHora(hora);

  return (
      (horaCita >= horarioInicioManana && horaCita <= horarioFinManana) ||
      (horaCita >= horarioInicioTarde && horaCita <= horarioFinTarde)
  );
}

// Función para convertir la cadena de hora a un objeto Date
function parsearHora(hora) {
  const [horaStr, minutosStr] = hora.split(":");
  const horaCita = new Date();
  horaCita.setHours(parseInt(horaStr, 10));
  horaCita.setMinutes(parseInt(minutosStr || 0, 10));
  return horaCita;
}

module.exports = { validarHorario };
