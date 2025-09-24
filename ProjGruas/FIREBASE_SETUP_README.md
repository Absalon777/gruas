# 🚛 ProjGruas - Aplicación de Servicios de Grúa

Una aplicación móvil para solicitar servicios de grúa de manera rápida y eficiente.

## 🔧 Configuración de Firebase

Para que la aplicación funcione correctamente, necesitas configurar tus credenciales de Firebase:

### 1. Crear un proyecto en Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **Configuración del proyecto** > **Cuentas de servicio**
4. Genera una nueva clave privada (formato JSON)

### 2. Configurar credenciales en el archivo .env
Edita el archivo `.env` en la raíz del proyecto con tus credenciales reales:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 3. Obtener las credenciales
En Firebase Console, ve a:
- **Configuración del proyecto** > **Apps** > **Web** (</>) > **Configuración**
- Copia los valores de `firebaseConfig` y pégalos en el archivo `.env`

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npx expo start
```

## 📱 Características

- ✅ **Autenticación completa** con Firebase Auth
- ✅ **Interfaz simplificada** sin imágenes ni íconos
- ✅ **Navegación por pestañas** funcional
- ✅ **Formularios de registro y login**
- ✅ **Gestión de perfil de usuario**
- ✅ **Configuración de métodos de pago**
- ✅ **Historial de servicios**
- ✅ **Solicitud de servicios de grúa**

## 🏗️ Estructura del Proyecto

```
app/
├── (auth)/           # Pantallas de autenticación
├── (tabs)/           # Pantallas principales
├── _layout.tsx       # Layout principal
└── modal/            # Pantallas modales

src/
├── components/       # Componentes reutilizables
├── context/          # Context providers
└── theme/            # Configuración de tema
```

## 📋 Notas Importantes

- La aplicación está configurada para usar credenciales de Firebase
- Todas las imágenes e íconos han sido removidos para una interfaz minimalista
- El mapa está simplificado para mostrar solo ubicación sin elementos visuales complejos
- La aplicación funciona completamente offline después del primer inicio

## 🐛 Solución de Problemas

Si encuentras errores:

1. **Verifica las credenciales de Firebase** en el archivo `.env`
2. **Reinicia el servidor** de Expo: `Ctrl+C` y `npx expo start`
3. **Limpia el caché**: `npx expo start --clear`
4. **Verifica las dependencias**: `npm install`

## 📞 Soporte

Para soporte técnico o preguntas, revisa la documentación de:
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [React Native](https://reactnative.dev/docs/getting-started)
