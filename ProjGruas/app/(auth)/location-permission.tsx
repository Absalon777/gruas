import { View, Text, StyleSheet, Image, SafeAreaView, Platform, StatusBar, Alert, Linking } from 'react-native';
import { Button } from '../../src/components/common/Button';
import { Stack, router } from 'expo-router';
import { theme } from '../../src/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export default function LocationPermissionScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState<Location.PermissionStatus | null>(null);

  // Verificar el estado del permiso de ubicación al cargar la pantalla
  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setLocationStatus(status);
    
    // Si ya tiene permiso, redirigir a la pantalla principal
    if (status === 'granted') {
      router.replace('/(tabs)');
    }
  };

  const requestLocationPermission = async () => {
    try {
      setIsLoading(true);
      
      // Verificar si ya tiene permisos
      let { status } = await Location.getForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        // Si no tiene permisos, solicitarlos
        const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
        status = newStatus;
      }
      
      setLocationStatus(status);
      
      if (status === 'granted') {
        // Si se otorga el permiso, redirigir a la pantalla principal
        router.replace('/(tabs)');
      } else {
        // Si se deniega, mostrar instrucciones
        Alert.alert(
          'Permiso de ubicación requerido',
          'Para ofrecerte el mejor servicio, necesitamos acceder a tu ubicación. Por favor, activa los permisos de ubicación en la configuración de tu dispositivo.',
          [
            { 
              text: 'Ir a configuración', 
              onPress: () => Linking.openSettings() 
            },
            { 
              text: 'Cancelar', 
              style: 'cancel' 
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error al solicitar permiso de ubicación:', error);
      Alert.alert('Error', 'No se pudo acceder a la ubicación. Por favor, verifica los permisos.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // El usuario puede omitir, pero la funcionalidad estará limitada
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ 
        headerShown: false,
      }} />
      
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="location" size={80} color={theme.colors.primary} />
          </View>
          
          <Text style={styles.title}>Permite el acceso a tu ubicación</Text>
          <Text style={styles.subtitle}>
            Necesitamos tu ubicación para mostrarte las grúas más cercanas y brindarte un mejor servicio.
          </Text>
          
          <View style={styles.permissionInfo}>
            <View style={styles.permissionItem}>
              <View style={styles.permissionIcon}>
                <Ionicons name="navigate" size={20} color={theme.colors.primary} />
              </View>
              <Text style={styles.permissionText}>Mostrar grúas disponibles cerca de ti</Text>
            </View>
            
            <View style={styles.permissionItem}>
              <View style={styles.permissionIcon}>
                <Ionicons name="time" size={20} color={theme.colors.primary} />
              </View>
              <Text style={styles.permissionText}>Tiempos de llegada precisos</Text>
            </View>
            
            <View style={styles.permissionItem}>
              <View style={styles.permissionIcon}>
                <Ionicons name="shield-checkmark" size={20} color={theme.colors.primary} />
              </View>
              <Text style={styles.permissionText}>Solo usamos tu ubicación cuando la app está en uso</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Button 
            title="Permitir ubicación" 
            onPress={requestLocationPermission}
            loading={isLoading}
            style={styles.allowButton}
            icon={<Ionicons name="location" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />}
          />
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleSkip}
            disabled={isLoading}
          >
            <Text style={styles.skipText}>Omitir por ahora</Text>
          </TouchableOpacity>
          
          <Text style={styles.privacyText}>
            Al continuar, aceptas nuestra{' '}
            <Text style={styles.link} onPress={() => {}}>Política de Privacidad</Text>
            {' '}y nuestros{' '}
            <Text style={styles.link} onPress={() => {}}>Términos de Servicio</Text>.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: theme.spacing.md,
  },
  permissionInfo: {
    width: '100%',
    marginTop: theme.spacing.xl,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  permissionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  permissionText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  footer: {
    marginTop: theme.spacing.xl,
  },
  allowButton: {
    marginBottom: theme.spacing.md,
  },
  skipButton: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  skipText: {
    color: theme.colors.textSecondary,
    fontWeight: '500',
    fontSize: 16,
  },
  privacyText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  link: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
});
