import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../src/theme';
import { Stack, router } from 'expo-router';
import { mockData } from '../../src/data/mockData';
import { SafeAreaView } from 'react-native-safe-area-context';

const serviceIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Grúa Plana': 'car-outline',
  'Grúa con Rampa': 'bus-outline',
  'Asistencia en Carretera': 'construct-outline',
  'Transporte Especial': 'shield-checkmark-outline',
};

export default function ServicesScreen() {
  const { services, paymentMethods } = mockData;

  const handleRequestService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    Alert.alert(
      'Solicitar Servicio',
      `¿Deseas solicitar ${service?.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Solicitar',
          onPress: () => {
            router.push({
              pathname: '/(tabs)/request',
              params: { serviceId, serviceName: service?.name }
            });
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Servicios Disponibles' }} />

      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>Nuestros Servicios</Text>
              <Text style={styles.subtitle}>Elige el servicio que necesitas</Text>
            </View>
            <TouchableOpacity style={styles.historyButton} onPress={() => router.push('/(tabs)/activity')}>
              <Ionicons name="time-outline" size={18} color={theme.colors.primary} />
              <Text style={styles.historyButtonText}>Historial</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Ionicons name="car" size={22} color={theme.colors.primary} />
              <Text style={styles.summaryValue}>{services.length}</Text>
              <Text style={styles.summaryLabel}>Servicios</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="card" size={22} color={theme.colors.secondary} />
              <Text style={styles.summaryValue}>{paymentMethods.length}</Text>
              <Text style={styles.summaryLabel}>Pagos</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="shield-checkmark" size={22} color={theme.colors.success} />
              <Text style={styles.summaryValue}>24/7</Text>
              <Text style={styles.summaryLabel}>Cobertura</Text>
            </View>
          </View>
        </View>

        <View style={styles.servicesContainer}>
          {services.map((service) => {
            const icon = serviceIcons[service.name] ?? 'construct';
            return (
              <TouchableOpacity key={service.id} style={styles.serviceCard} activeOpacity={0.9}>
                <View style={styles.serviceIconWrapper}>
                  <Ionicons name={icon} size={24} color={theme.colors.primary} />
                </View>

                <View style={styles.serviceContent}>
                  <View style={styles.serviceHeader}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                  </View>

                  <Text style={styles.serviceDescription}>{service.description}</Text>

                  <View style={styles.serviceFooter}>
                    <View style={[styles.statusBadge, service.available ? styles.availableBadge : styles.unavailableBadge]}>
                      <Text style={[styles.statusText, service.available ? styles.availableText : styles.unavailableText]}>
                        {service.available ? 'Disponible' : 'No disponible'}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.requestButton}
                      onPress={() => handleRequestService(service.id)}
                    >
                      <Ionicons name="flash" size={16} color="white" />
                      <Text style={styles.requestButtonText}>Solicitar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.quickRequestSection}>
          <TouchableOpacity
            style={styles.quickRequestButton}
            onPress={() => router.push('/(tabs)/request')}
          >
            <View style={styles.quickRequestIcon}>
              <Ionicons name="rocket" size={24} color="white" />
            </View>
            <View style={styles.quickRequestContent}>
              <Text style={styles.quickRequestText}>Solicitud rápida</Text>
              <Text style={styles.quickRequestSubtext}>Solicitar sin especificar servicio</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Métodos de pago compatibles</Text>
          {paymentMethods.map(method => (
            <View key={method.id} style={styles.paymentCard}>
              <View style={styles.paymentIconWrapper}>
                <Ionicons
                  name={method.type === 'card' ? 'card' : method.type === 'cash' ? 'wallet' : 'time-outline'}
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.paymentContent}>
                <Text style={styles.paymentName}>{method.name}</Text>
                <Text style={styles.paymentDescription}>{method.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.emergencySection}>
          <TouchableOpacity
            style={styles.emergencyCard}
            onPress={() => Alert.alert('Llamando', 'Llamando al centro de emergencias...')}
          >
            <View style={styles.emergencyIcon}>
              <Ionicons name="alert" size={24} color="white" />
            </View>
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>¿Emergencia?</Text>
              <Text style={styles.emergencySubtitle}>Llama directamente a nuestro centro de atención 24/7</Text>
            </View>
            <Ionicons name="call" size={22} color="white" />
          </TouchableOpacity>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  historyButtonText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  servicesContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 16,
  },
  serviceIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceContent: {
    flex: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  serviceDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  unavailableBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  availableText: {
    color: theme.colors.success,
  },
  unavailableText: {
    color: theme.colors.error,
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  requestButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  quickRequestSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  quickRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    paddingVertical: 20,
    paddingHorizontal: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  quickRequestIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickRequestContent: {
    flex: 1,
  },
  quickRequestText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  quickRequestSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  paymentSection: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 16,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  paymentIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentContent: {
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  paymentDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  emergencySection: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 32,
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: theme.colors.error,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  emergencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  emergencySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
});
