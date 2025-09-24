import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, TextInput, Alert } from 'react-native';
import { Button } from '../../src/components/common/Button';
import { Stack, router } from 'expo-router';
import { theme } from '../../src/theme';
import { useState } from 'react';

export default function PhoneLoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+56');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu número de teléfono');
      return;
    }

    // Validar formato de número de teléfono chileno
    const phoneRegex = /^9\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Error', 'Por favor ingresa un número de teléfono válido (9XXXXXXXX)');
      return;
    }

    setIsLoading(true);
    
    // Simular envío de código
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: '/(auth)/verify-code',
        params: { phoneNumber: `${countryCode}${phoneNumber}` }
      });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ 
        title: 'Ingresa tu teléfono',
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }} />
      
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Ingresa tu número de teléfono</Text>
          <Text style={styles.subtitle}>Te enviaremos un código de verificación por SMS</Text>
          
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCodeText}>{countryCode}</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="9 1234 5678"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={9}
            />
          </View>
          
          <Text style={styles.note}>
            Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad
          </Text>
        </View>
        
        <Button 
          title="Enviar código" 
          onPress={handleSendCode}
          loading={isLoading}
          disabled={isLoading}
          style={styles.button}
        />
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  countryCodeContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderTopLeftRadius: theme.radius.md,
    borderBottomLeftRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRightWidth: 0,
  },
  countryCodeText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderLeftWidth: 0,
  },
  note: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    lineHeight: 16,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
});
