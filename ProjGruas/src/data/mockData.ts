// Datos mock para la aplicación ProjGruas
export const mockData = {
  // Datos del usuario
  user: {
    name: 'Usuario Demo',
    email: 'usuario@demo.com',
    phone: '+54 11 1234-5678',
    servicesCount: 15,
    rating: 4.8,
    totalSpent: 2450
  },

  // Servicios disponibles
  services: [
    {
      id: '1',
      name: 'Grúa Plana',
      description: 'Para vehículos que no pueden circular por su propia cuenta',
      price: 'Desde $50',
      available: true,
    },
    {
      id: '2',
      name: 'Grúa con Rampa',
      description: 'Para vehículos de carga pesada y maquinaria',
      price: 'Desde $80',
      available: true,
    },
    {
      id: '3',
      name: 'Asistencia en Carretera',
      description: 'Ayuda con fallos mecánicos menores',
      price: 'Desde $30',
      available: true,
    },
    {
      id: '4',
      name: 'Transporte Especial',
      description: 'Para vehículos clásicos y de lujo',
      price: 'Desde $100',
      available: true,
    },
  ],

  // Grúas disponibles
  towTrucks: [
    {
      id: '1',
      title: 'Grúa Express',
      description: 'Servicio rápido y confiable',
      distance: 1.2,
      driverName: 'Carlos Rodríguez',
      rating: 4.9,
      status: 'available' as const,
    },
    {
      id: '2',
      title: 'Grúa Pesada',
      description: 'Especializada en vehículos grandes',
      distance: 2.5,
      driverName: 'María González',
      rating: 4.7,
      status: 'available' as const,
    },
    {
      id: '3',
      title: 'Grúa 24/7',
      description: 'Servicio las 24 horas',
      distance: 0.8,
      driverName: 'Juan Martínez',
      rating: 4.8,
      status: 'available' as const,
    },
  ],

  // Historial de servicios
  serviceHistory: [
    {
      id: '1',
      type: 'Grúa Plana',
      date: '2024-01-15',
      time: '14:30',
      location: 'Av. Corrientes 1234, CABA',
      cost: '$75',
      status: 'completed',
    },
    {
      id: '2',
      type: 'Asistencia en Carretera',
      date: '2024-01-10',
      time: '09:15',
      location: 'Av. 9 de Julio 567, CABA',
      cost: '$45',
      status: 'completed',
    },
    {
      id: '3',
      type: 'Grúa con Rampa',
      date: '2024-01-05',
      time: '16:45',
      location: 'Av. Rivadavia 890, CABA',
      cost: '$120',
      status: 'completed',
    },
  ],

  // Métodos de pago
  paymentMethods: [
    {
      id: '1',
      type: 'card',
      name: 'Tarjeta de crédito/débito',
      description: 'Paga con tu tarjeta de forma segura',
    },
    {
      id: '2',
      type: 'cash',
      name: 'Efectivo',
      description: 'Paga en efectivo al conductor',
    },
    {
      id: '3',
      type: 'later',
      name: 'Configurar después',
      description: 'Puedes agregar un método de pago más tarde',
    },
  ],

  // Configuraciones de la app
  settings: {
    pushNotifications: true,
    locationTracking: true,
    darkMode: false,
  },

  // Ubicación actual (mock)
  currentLocation: {
    latitude: -34.6037,
    longitude: -58.3816,
    address: 'Buenos Aires, Argentina',
  },

  // Ubicaciones de grúas (mock)
  towTruckLocations: [
    {
      id: '1',
      latitude: -34.6037,
      longitude: -58.3816,
      title: 'Grúa Express',
    },
    {
      id: '2',
      latitude: -34.5987,
      longitude: -58.3866,
      title: 'Grúa Pesada',
    },
    {
      id: '3',
      latitude: -34.6087,
      longitude: -58.3766,
      title: 'Grúa 24/7',
    },
  ],
};

// Funciones helper para simular operaciones de datos
export const mockApi = {
  // Simular login
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, user: mockData.user };
  },

  // Simular registro
  register: async (userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, user: { ...mockData.user, ...userData } };
  },

  // Obtener servicios
  getServices: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.services;
  },

  // Obtener grúas disponibles
  getAvailableTowTrucks: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.towTrucks;
  },

  // Obtener historial de servicios
  getServiceHistory: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.serviceHistory;
  },

  // Solicitar servicio
  requestService: async (serviceData: any) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      requestId: 'req-' + Date.now(),
      estimatedArrival: '15-20 minutos'
    };
  },

  // Actualizar perfil
  updateProfile: async (profileData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, user: { ...mockData.user, ...profileData } };
  },
};
