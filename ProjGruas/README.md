# ProjGruas 🚛

Una aplicación móvil completa para servicios de grúa desarrollada con React Native y Expo. Permite a los usuarios solicitar servicios de grúa de manera rápida y eficiente, con integración de mapas en tiempo real y seguimiento de conductores.

## ✨ Características

### 🚀 Fase 1 - Base y Autenticación
- ✅ Sistema de autenticación completo con Firebase
- ✅ Navegación con pestañas intuitiva
- ✅ Pantallas de bienvenida, login y registro
- ✅ Gestión de estados con Context API
- ✅ Diseño moderno y responsivo
- ✅ Configuración de permisos de ubicación

### 🗺️ Fase 2 - Mapas y Solicitudes
- ✅ Mapa interactivo con ubicación en tiempo real
- ✅ Visualización de grúas disponibles cercanas
- ✅ Sistema de solicitud de servicios paso a paso
- ✅ Selección de tipos de servicio (grúa plana, con rampa, asistencia)
- ✅ Información detallada de conductores y vehículos
- ✅ Funcionalidad de llamadas de emergencia

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework para desarrollo móvil
- **Expo** - Plataforma para desarrollo y despliegue
- **TypeScript** - Tipado estático para mayor robustez
- **Firebase** - Autenticación y base de datos
- **Expo Router** - Navegación basada en archivos
- **Expo Location** - Servicios de ubicación
- **Ionicons** - Iconografía moderna

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI
- Cuenta de Firebase (opcional para autenticación)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd ProjGruas
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase** (opcional)
   - Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilitar Authentication y Firestore
   - Copiar las credenciales al archivo `firebaseConfig.ts`

4. **Iniciar la aplicación**
   ```bash
   npx expo start
   ```

5. **Ejecutar en dispositivo**
   - Escanear el código QR con la app Expo Go
   - O presionar `a` para Android emulator
   - O presionar `i` para iOS simulator

## 📱 Pantallas Principales

### 🏠 Inicio
- Mapa interactivo con ubicación en tiempo real
- Grúas disponibles cercanas
- Acciones rápidas para solicitar servicio
- Información de servicios disponibles

### 🔧 Servicios
- Lista completa de tipos de servicio
- Precios y descripciones detalladas
- Botón de "Solicitud Rápida"
- Información de contacto de emergencia

### ➕ Solicitar
- Formulario paso a paso para solicitudes
- Selección de tipo de servicio
- Ingreso de dirección y detalles
- Opciones de servicio urgente

### 📊 Actividad
- Historial de solicitudes realizadas
- Estado de servicios activos
- Información de conductores asignados
- Estadísticas de uso

### 👤 Cuenta
- Perfil de usuario
- Configuración de notificaciones
- Métodos de pago
- Ayuda y soporte

## 🔧 Configuración

### Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### Permisos Requeridos
La aplicación solicita los siguientes permisos:
- Ubicación (para mostrar grúas cercanas)
- Notificaciones (para actualizaciones de servicio)
- Cámara (para verificación de identidad)

## 🎨 Personalización

### Temas
El sistema de temas está configurado en `src/theme/index.ts`:
- Colores primarios y secundarios
- Espaciado y tipografía
- Bordes redondeados
- Sombras y efectos

### Componentes
Los componentes reutilizables están en `src/components/`:
- `Button` - Botón estilizado
- `LoadingSpinner` - Indicador de carga
- `CustomMapView` - Mapa personalizado

## 🔄 Próximas Fases

### Fase 3 - Notificaciones Push
- Notificaciones en tiempo real
- Recordatorios de citas
- Alertas de llegada de conductor
- Promociones y ofertas

### Fase 4 - Panel de Conductores
- Aplicación separada para conductores
- Gestión de disponibilidad
- Seguimiento de rutas
- Sistema de calificaciones

### Fase 5 - Integración con Pagos
- Procesamiento de pagos en línea
- Historial de transacciones
- Facturación automática
- Integración con pasarelas de pago

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo
- Revisar la documentación

---

**¡Gracias por usar ProjGruas! 🚛✨**
