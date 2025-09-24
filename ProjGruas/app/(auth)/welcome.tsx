import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Button } from '../../src/components/common/Button';
import { Stack, router } from 'expo-router';
import { theme } from '../../src/theme';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    // Navegar a la pantalla de inicio de sesión
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        {/* Título y subtítulo */}
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenido a ProjGruas</Text>
          <Text style={styles.subtitle}>Tu solución rápida en servicios de grúa</Text>
        </View>

        {/* Botones de acción */}
        <View style={styles.footer}>
          <Button
            title="Crear cuenta"
            onPress={() => router.push('/(auth)/register')}
            size="large"
            style={{ width: '100%', backgroundColor: theme.colors.primary }}
          />

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.secondaryButtonText}>Ya tengo cuenta</Text>
          </TouchableOpacity>
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
    paddingHorizontal: theme.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  button: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  secondaryButton: {
    padding: theme.spacing.md,
    alignItems: 'center',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
