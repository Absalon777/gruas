import { DefaultTheme } from '@react-navigation/native';

export const colors = {
  primary: '#2563EB',      // Azul principal
  primaryLight: '#3B82F6', // Azul claro
  primaryDark: '#1D4ED8',  // Azul oscuro
  secondary: '#10B981',    // Verde
  background: '#FFFFFF',   // Fondo blanco
  surface: '#F9FAFB',      // Superficie clara
  error: '#EF4444',        // Rojo para errores
  text: '#111827',         // Texto principal
  textSecondary: '#6B7280',// Texto secundario
  border: '#E5E7EB',       // Bordes
  success: '#10B981',      // Verde de éxito
  warning: '#F59E0B',      // Amarillo advertencia
  info: '#3B82F6',        // Azul información
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  spacing,
  radius,
  typography,
};

export type Theme = typeof theme;

declare module '@react-navigation/native' {
  export function useTheme(): Theme;
}
