import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../src/theme';
import { Stack, router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const menuItems = [
    {
      id: '1',
      title: 'Mi Perfil',
      subtitle: 'Información personal',
      action: () => console.log('Ir a perfil'),
    },
    {
      id: '2',
      title: 'Métodos de Pago',
      subtitle: 'Tarjetas y formas de pago',
      action: () => console.log('Ir a métodos de pago'),
    },
    {
      id: '3',
      title: 'Historial de Servicios',
      subtitle: 'Ver todos tus servicios',
      action: () => console.log('Ir a historial'),
    },
    {
      id: '4',
      title: 'Notificaciones',
      subtitle: 'Configurar alertas',
      action: () => console.log('Ir a notificaciones'),
    },
    {
      id: '5',
      title: 'Ayuda y Soporte',
      subtitle: 'Contactar soporte',
      action: () => console.log('Ir a ayuda'),
    },
    {
      id: '6',
      title: 'Configuración',
      subtitle: 'Ajustes de la aplicación',
      action: () => console.log('Ir a configuración'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.displayName || 'Usuario'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'usuario@email.com'}</Text>
            <Text style={styles.profilePhone}>+54 11 1234-5678</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Servicios</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Calificación</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>$2,450</Text>
            <Text style={styles.statLabel}>Total Gastado</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.action}>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsTitle}>Configuración</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Notificaciones push: Activadas</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Ubicación en tiempo real: Activada</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Modo oscuro: Desactivado</Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>ProjGruas v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: theme.colors.surface,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  editButtonText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  statItem: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  settingsContainer: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  settingItem: {
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  logoutContainer: {
    padding: 20,
    paddingTop: 0,
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutText: {
    fontSize: 16,
    color: theme.colors.error,
    marginLeft: 8,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    padding: 20,
  },
  versionText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});
