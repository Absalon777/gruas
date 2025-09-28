require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Servicios
  const services = [
    {
      name: 'Grúa Plana',
      description: 'Para vehículos que no pueden circular por su propia cuenta',
      price: 'Desde $50',
      available: true,
    },
    {
      name: 'Grúa con Rampa',
      description: 'Para vehículos de carga pesada y maquinaria',
      price: 'Desde $80',
      available: true,
    },
    {
      name: 'Asistencia en Carretera',
      description: 'Ayuda con fallos mecánicos menores',
      price: 'Desde $30',
      available: true,
    },
    {
      name: 'Transporte Especial',
      description: 'Para vehículos clásicos y de lujo',
      price: 'Desde $100',
      available: true,
    },
  ];

  // Limpiar y crear servicios
  await prisma.service.deleteMany();
  await prisma.service.createMany({ data: services });

  // Métodos de pago
  const methods = [
    { type: 'card', name: 'Tarjeta de crédito/débito', description: 'Paga con tu tarjeta de forma segura' },
    { type: 'cash', name: 'Efectivo', description: 'Paga en efectivo al conductor' },
    { type: 'later', name: 'Configurar después', description: 'Puedes agregar un método de pago más tarde' },
  ];

  // Limpiar y crear métodos de pago
  await prisma.paymentMethod.deleteMany();
  await prisma.paymentMethod.createMany({ data: methods });

  console.log('Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
