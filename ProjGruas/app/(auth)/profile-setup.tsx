import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, TextInput, ScrollView, Alert } from 'react-native';
import { Button } from '../../src/components/common/Button';
import { Stack, router } from 'expo-router';
import { theme } from '../../src/theme';
import { useState, useRef } from 'react';

export default function ProfileSetupScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const handleContinue = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa tu nombre y apellido');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{
        title: 'Completa tu perfil',
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu nombre"
              placeholderTextColor={theme.colors.textSecondary}
              value={firstName}
              onChangeText={setFirstName}
              returnKeyType="next"
              onSubmitEditing={() => lastNameRef.current?.focus()}
              blurOnSubmit={false}
            />

            <Text style={styles.label}>Apellido</Text>
            <TextInput
              ref={lastNameRef}
              style={styles.input}
              placeholder="Ingresa tu apellido"
              placeholderTextColor={theme.colors.textSecondary}
              value={lastName}
              onChangeText={setLastName}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              blurOnSubmit={false}
            />

            <Text style={styles.label}>Correo electrónico (opcional)</Text>
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder="tucorreo@ejemplo.com"
              placeholderTextColor={theme.colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="done"
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continuar"
            onPress={handleContinue}
            loading={isLoading}
            disabled={isLoading}
            style={styles.continueButton}
          />

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            disabled={isLoading}
          >
            <Text style={styles.skipText}>Omitir por ahora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  form: {
    marginTop: theme.spacing.xl,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: 16,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  footer: {
    marginTop: theme.spacing.xl,
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
