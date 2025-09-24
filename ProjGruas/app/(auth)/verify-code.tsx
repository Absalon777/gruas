import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, TextInput, Keyboard, Alert } from 'react-native';
import { Button } from '../../src/components/common/Button';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { theme } from '../../src/theme';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function VerifyCodeScreen() {
  const { phoneNumber } = useLocalSearchParams();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [resendTime, setResendTime] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputs = Array(6).fill(0).map((_, i) => useRef<TextInput>(null));

  // Contador para reenviar código
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (resendTime > 0) {
      timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    
    return () => clearTimeout(timer);
  }, [resendTime]);

  const handleCodeChange = (text: string, index: number) => {
    // Solo permitir dígitos
    const newText = text.replace(/[^0-9]/g, '');
    
    if (newText) {
      // Actualizar el código
      const newCode = [...code];
      newCode[index] = newText;
      setCode(newCode);
      
      // Mover al siguiente campo si hay texto
      if (index < 5) {
        inputs[index + 1].current?.focus();
      } else {
        // Si es el último campo, cerrar el teclado
        Keyboard.dismiss();
      }
      
      // Verificar si el código está completo
      if (newCode.every(digit => digit !== '')) {
        verifyCode(newCode.join(''));
      }
    } else if (text === '' && index > 0) {
      // Si se borra un carácter, mover al campo anterior
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      inputs[index - 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Manejar la tecla de borrar
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  const handleResendCode = () => {
    // Reiniciar el contador
    setResendTime(30);
    setIsResendDisabled(true);
    
    // Aquí iría la lógica para reenviar el código
    Alert.alert('Código reenviado', `Se ha enviado un nuevo código a ${phoneNumber}`);
  };

  const verifyCode = (verificationCode: string) => {
    // Simular verificación del código
    console.log('Verificando código:', verificationCode);
    
    // Aquí iría la lógica para verificar el código
    // Por ahora, simulamos una verificación exitosa después de 1 segundo
    setTimeout(() => {
      // Navegar a la pantalla de perfil si es un nuevo usuario
      // o al inicio si ya tiene cuenta
      router.replace('/(auth)/profile-setup');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ 
        title: 'Verificación',
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }} />
      
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="phone-portrait-outline" size={60} color={theme.colors.primary} />
          </View>
          
          <Text style={styles.title}>Verifica tu teléfono</Text>
          <Text style={styles.subtitle}>
            Hemos enviado un código de verificación a {'\n'}
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          </Text>
          
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputs[index]}
                style={[styles.codeInput, digit && styles.codeInputFilled]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>
          
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              ¿No recibiste el código?{' '}
              <Text 
                style={[
                  styles.resendLink, 
                  isResendDisabled && styles.resendLinkDisabled
                ]}
                onPress={!isResendDisabled ? handleResendCode : undefined}
              >
                Reenviar {isResendDisabled && `(${resendTime}s)`}
              </Text>
            </Text>
          </View>
        </View>
        
        <Button 
          title="Continuar" 
          onPress={() => verifyCode(code.join(''))}
          disabled={code.some(digit => digit === '')}
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
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    fontSize: 16,
    lineHeight: 24,
  },
  phoneNumber: {
    color: theme.colors.text,
    fontWeight: '600',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  codeInput: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    textAlign: 'center',
    fontSize: 24,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  },
  codeInputFilled: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
  },
  resendContainer: {
    marginTop: theme.spacing.xl,
  },
  resendText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  resendLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  resendLinkDisabled: {
    color: theme.colors.textSecondary,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
});
