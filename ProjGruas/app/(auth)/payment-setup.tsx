import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Button } from '../../src/components/common/Button';
import { Stack, router } from 'expo-router';
import { theme } from '../../src/theme';
import { useState } from 'react';

type PaymentMethod = 'card' | 'cash' | 'later' | null;

export default function PaymentSetupScreen() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (!selectedMethod) {
      Alert.alert('Selección requerida', 'Por favor selecciona un método de pago');
      return;
    }
    
    setIsLoading(true);
    
    // Simular guardado del método de pago
    setTimeout(() => {
      setIsLoading(false);
      
      if (selectedMethod === 'card') {
        // Por ahora, navegar directamente a la pantalla principal
        // TODO: Implementar pantalla de agregar tarjeta
        router.replace('/(tabs)');
      } else {
        // Navegar a la pantalla principal
        router.replace('/(tabs)');
      }
    }, 1000);
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ 
        title: 'Método de pago',
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }} />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Configura tu forma de pago</Text>
          <Text style={styles.subtitle}>Elige cómo deseas pagar por los servicios de grúa</Text>
          
          <View style={styles.paymentMethods}>
            <TouchableOpacity 
              style={[
                styles.paymentMethod, 
                selectedMethod === 'card' && styles.paymentMethodSelected
              ]}
              onPress={() => handleSelectMethod('card')}
            >
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodTitle}>Tarjeta de crédito/débito</Text>
                <Text style={styles.paymentMethodDescription}>Paga con tu tarjeta de forma segura</Text>
              </View>
              <Text style={styles.radioButton}>
                {selectedMethod === 'card' ? '●' : '○'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentMethod, 
                selectedMethod === 'cash' && styles.paymentMethodSelected
              ]}
              onPress={() => handleSelectMethod('cash')}
            >
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodTitle}>Efectivo</Text>
                <Text style={styles.paymentMethodDescription}>Paga en efectivo al conductor</Text>
              </View>
              <Text style={styles.radioButton}>
                {selectedMethod === 'cash' ? '●' : '○'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentMethod, 
                selectedMethod === 'later' && styles.paymentMethodSelected
              ]}
              onPress={() => handleSelectMethod('later')}
            >
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodTitle}>Configurar después</Text>
                <Text style={styles.paymentMethodDescription}>Puedes agregar un método de pago más tarde</Text>
              </View>
              <Text style={styles.radioButton}>
                {selectedMethod === 'later' ? '●' : '○'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.note}>
            Tus métodos de pago están protegidos con cifrado de extremo a extremo.
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Continuar" 
          onPress={handleContinue}
          loading={isLoading}
          disabled={isLoading || selectedMethod === null}
          style={styles.continueButton}
        />
        
        {selectedMethod !== 'card' && (
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleSkip}
            disabled={isLoading}
          >
            <Text style={styles.skipText}>Omitir por ahora</Text>
          </TouchableOpacity>
        )}
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
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  paymentMethods: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  paymentMethodSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '600' as const,
    marginBottom: 2,
  },
  paymentMethodDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  radioButton: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    lineHeight: 16,
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  continueButton: {
    marginBottom: theme.spacing.md,
  },
  skipButton: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  skipText: {
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
});
