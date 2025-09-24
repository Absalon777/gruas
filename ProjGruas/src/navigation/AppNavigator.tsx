import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';

// Tipos de navegación
export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  PhoneVerification: { phoneNumber: string };
  ProfileSetup: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Request: undefined;
  Activity: undefined;
  Account: undefined;
};

// Crear navegadores
const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();

// Importar pantallas
import WelcomeScreen from '../../app/(auth)/welcome';
import LoginScreen from '../../app/(auth)/login';
import RegisterScreen from '../../app/(auth)/register';
import PhoneVerificationScreen from '../../app/(auth)/verify-code';
import ProfileSetupScreen from '../../app/(auth)/profile-setup';
import HomeScreen from '../../app/(tabs)/home';
import ServicesScreen from '../../app/(tabs)/services';
import RequestScreen from '../../app/(tabs)/request';
import ActivityScreen from '../../app/(tabs)/activity';
import AccountScreen from '../../app/(tabs)/profile';

// Componente de pestañas principales
function MainTabsScreen() {
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Services') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Request') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Activity') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <MainTabs.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <MainTabs.Screen name="Services" component={ServicesScreen} options={{ title: 'Servicios' }} />
      <MainTabs.Screen name="Request" component={RequestScreen} options={{ title: 'Solicitar' }} />
      <MainTabs.Screen name="Activity" component={ActivityScreen} options={{ title: 'Actividad' }} />
      <MainTabs.Screen name="Account" component={AccountScreen} options={{ title: 'Cuenta' }} />
    </MainTabs.Navigator>
  );
}

// Componente de autenticación
function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen
        name="PhoneVerification"
        component={PhoneVerificationScreen}
        options={{ headerShown: true, title: 'Verificación' }}
      />
      <AuthStack.Screen
        name="ProfileSetup"
        component={ProfileSetupScreen}
        options={{ headerShown: true, title: 'Completa tu perfil' }}
      />
    </AuthStack.Navigator>
  );
}

// Navegador principal
export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // Podríamos crear una pantalla de carga aquí
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainTabsScreen} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
