const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

  for (const reserva of data) {
    await prisma.reservas.create({
      data: {
        nombre: reserva.nombre,
        telefono: reserva.telefono,
        direccion: reserva.direccion,
        cantidad: reserva.cantidad,
        fecha: new Date(reserva.fecha),
        hora: new Date(reserva.hora),
        estado: reserva.estado,
      },
    });
  }

  console.log('Datos importados correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });