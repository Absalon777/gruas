import { Stack } from 'expo-router';
import { AuthProvider } from '../../src/context/AuthContext';

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen 
          name="welcome" 
          options={{ 
            headerShown: false,
            animation: 'fade',
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            title: 'Iniciar Sesión',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
            animation: 'slide_from_right',
          }} 
        />
        <Stack.Screen 
          name="phone-login" 
          options={{ 
            title: 'Ingresa tu teléfono',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
            animation: 'slide_from_right',
          }} 
        />
        <Stack.Screen 
          name="verify-code" 
          options={{ 
            title: 'Verificación',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
            animation: 'slide_from_right',
          }} 
        />
        <Stack.Screen 
          name="profile-setup" 
          options={{ 
            title: 'Completa tu perfil',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
            animation: 'slide_from_right',
          }} 
        />
        <Stack.Screen 
          name="payment-setup" 
          options={{ 
            title: 'Método de pago',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
            animation: 'slide_from_right',
          }} 
        />
        <Stack.Screen 
          name="add-card" 
          options={{ 
            title: 'Agregar tarjeta',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
            animation: 'slide_from_right',
          }} 
        />
      </Stack>
    </AuthProvider>
  );
}
