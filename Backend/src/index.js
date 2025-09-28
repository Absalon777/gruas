require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Servicios
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { name: 'asc' } });
    res.json(services);
  } catch (err) {
    console.error('GET /api/services error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Métodos de pago
app.get('/api/payment-methods', async (req, res) => {
  try {
    const methods = await prisma.paymentMethod.findMany({ orderBy: { name: 'asc' } });
    res.json(methods);
  } catch (err) {
    console.error('GET /api/payment-methods error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Crear solicitud de servicio
const CreateRequestSchema = z.object({
  serviceId: z.string().min(1),
  userId: z.string().optional(),
  notes: z.string().max(255).optional(),
});

app.post('/api/requests', async (req, res) => {
  try {
    const parsed = CreateRequestSchema.parse(req.body);

    // Verificar servicio
    const service = await prisma.service.findUnique({ where: { id: parsed.serviceId } });
    if (!service) return res.status(400).json({ error: 'Servicio no encontrado' });
    if (!service.available) return res.status(400).json({ error: 'Servicio no disponible' });

    const created = await prisma.serviceRequest.create({
      data: {
        serviceId: parsed.serviceId,
        userId: parsed.userId ?? null,
        notes: parsed.notes ?? null,
        status: 'pending',
      },
    });

    res.json({ success: true, requestId: created.id, estimatedArrival: '15-20 minutos' });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid payload', details: err.errors });
    }
    console.error('POST /api/requests error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Listar solicitudes con filtro opcional por userId
app.get('/api/requests', async (req, res) => {
  try {
    const { userId } = req.query;
    const where = userId ? { userId } : {};
    const requests = await prisma.serviceRequest.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        service: true,
        user: true,
      },
    });
    res.json(requests);
  } catch (err) {
    console.error('GET /api/requests error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
