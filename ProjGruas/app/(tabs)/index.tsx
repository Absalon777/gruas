import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { theme } from '../../src/theme';
import { CustomMapView } from '../../src/components/CustomMapView';
import { mockData } from '../../src/data/mockData';
import { SafeAreaView } from 'react-native-safe-area-context';

type MapTowTruck = Parameters<NonNullable<React.ComponentProps<typeof CustomMapView>['onTowTruckSelect']>>[0];

type EnhancedTowTruck = MapTowTruck;

const getStatusBadge = (status: 'available' | 'busy' | 'offline') => {
  switch (status) {
    case 'available':
      return { label: 'Disponible', color: theme.colors.success };
    case 'busy':
      return { label: 'Ocupada', color: theme.colors.warning };
    default:
      return { label: 'Fuera de servicio', color: theme.colors.textSecondary };
  }
};

export default function HomeScreen() {
  const { user, services, towTrucks, towTruckLocations } = mockData;

  const enhancedTowTrucks = useMemo<EnhancedTowTruck[]>(() =>
    towTrucks.map(truck => {
      const matchingLocation = towTruckLocations.find(location => location.id === truck.id);
      return {
        ...truck,
        status: truck.status as MapTowTruck['status'],
        coordinate: {
          latitude: matchingLocation?.latitude ?? mockData.currentLocation.latitude,
          longitude: matchingLocation?.longitude ?? mockData.currentLocation.longitude,
        },
      } satisfies EnhancedTowTruck;
    })
  , [towTrucks, towTruckLocations]);

  const handleRequestService = () => {
    router.push('/(tabs)/request');
  };

  const handleViewServices = () => {
    router.push('/(tabs)/services');
  };

  const handleCallSupport = () => {
    Alert.alert('Soporte 24/7', 'Llamando al centro de asistencia...');
  };

  const handleTowTruckSelect = (truck: EnhancedTowTruck) => {
    Alert.alert(
      truck.title,
      `${truck.description}\nConductor: ${truck.driverName}\nDistancia: ${truck.distance} km`,
      [
        { text: 'Cerrar', style: 'cancel' },
        {
          text: 'Solicitar',
          onPress: () => router.push({ pathname: '/(tabs)/request', params: { towTruckId: truck.id } }),
        },
      ]
    );
  };

  const quickActions = [
    {
      id: 'request',
      label: 'Solicitar Grúa',
      icon: 'car-outline' as const,
      onPress: handleRequestService,
    },
    {
      id: 'services',
      label: 'Mis Servicios',
      icon: 'construct-outline' as const,
      onPress: handleViewServices,
    },
    {
      id: 'support',
      label: 'Contactar Soporte',
      icon: 'call-outline' as const,
      onPress: handleCallSupport,
    },
  ];

  const highlightServices = services.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerCard}>
          <View style={styles.headerTopRow}>
            <View style={styles.greetingContainer}>
              <Text style={styles.welcomeText}>Hola, {user.name.split(' ')[0]} 👋</Text>
              <Text style={styles.subtitle}>¿Necesitas asistencia para tu vehículo?</Text>
            </View>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person-circle" size={52} color={theme.colors.primary} />
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="briefcase-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.statValue}>{user.servicesCount}</Text>
              <Text style={styles.statLabel}>Servicios</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="star" size={20} color={theme.colors.warning} />
              <Text style={styles.statValue}>{user.rating}</Text>
              <Text style={styles.statLabel}>Calificación</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="cash-outline" size={20} color={theme.colors.success} />
              <Text style={styles.statValue}>${user.totalSpent}</Text>
              <Text style={styles.statLabel}>Invertido</Text>
            </View>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <CustomMapView
            towTrucks={enhancedTowTrucks}
            onTowTruckSelect={handleTowTruckSelect}
            showRequestButton
            onRequestService={handleRequestService}
            style={styles.map}
          />
        </View>

        <View style={styles.quickActions}>
          {quickActions.map(action => (
            <TouchableOpacity key={action.id} style={styles.quickActionButton} onPress={action.onPress}>
              <View style={styles.quickActionIcon}>
                <Ionicons name={action.icon} size={20} color={theme.colors.primary} />
              </View>
              <Text style={styles.quickActionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Grúas cercanas</Text>
            <TouchableOpacity onPress={() => Alert.alert('Próximamente', 'Ver mapa completo disponible pronto.') }>
              <Text style={styles.sectionAction}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          {enhancedTowTrucks.map(truck => {
            const statusBadge = getStatusBadge(truck.status);
            return (
              <TouchableOpacity
                key={truck.id}
                style={styles.towTruckCard}
                onPress={() => handleTowTruckSelect(truck)}
              >
                <View style={styles.towTruckIconContainer}>
                  <Ionicons name="car" size={24} color={statusBadge.color} />
                </View>

                <View style={styles.towTruckContent}>
                  <View style={styles.towTruckHeader}>
                    <Text style={styles.towTruckName}>{truck.title}</Text>
                    <Text style={styles.towTruckDistance}>{truck.distance} km</Text>
                  </View>
                  <Text style={styles.towTruckDescription}>{truck.description}</Text>
                  <View style={styles.towTruckFooter}>
                    <View style={styles.driverRow}>
                      <Ionicons name="person-outline" size={14} color={theme.colors.textSecondary} />
                      <Text style={styles.towTruckDriver}>{truck.driverName}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color={theme.colors.warning} />
                      <Text style={styles.ratingText}>{truck.rating}</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.statusBadge, { backgroundColor: `${statusBadge.color}20` }] }>
                  <Text style={[styles.statusText, { color: statusBadge.color }]}>{statusBadge.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios disponibles</Text>
            <TouchableOpacity onPress={handleViewServices}>
              <Text style={styles.sectionAction}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.servicesList}>
            {highlightServices.map(service => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => router.push({ pathname: '/(tabs)/request', params: { serviceId: service.id, serviceName: service.name } })}
              >
                <View style={styles.serviceIconContainer}>
                  <Ionicons name="construct" size={22} color={theme.colors.primary} />
                </View>
                <Text style={styles.serviceTitle}>{service.name}</Text>
                <Text style={styles.serviceDescription} numberOfLines={2}>{service.description}</Text>
                <View style={styles.serviceFooter}>
                  <Text style={styles.servicePrice}>{service.price}</Text>
                  <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.emergencyBanner} onPress={handleCallSupport}>
          <View style={styles.emergencyIcon}>
            <Ionicons name="alert" size={24} color="white" />
          </View>
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>Emergencia inmediata</Text>
            <Text style={styles.emergencySubtitle}>Llámanos y enviaremos una grúa al instante.</Text>
          </View>
          <Ionicons name="call" size={24} color="white" />
        </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 32,
  },
  headerCard: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingContainer: {
    flex: 1,
    paddingRight: 12,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginRight: 12,
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  mapContainer: {
    height: 280,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 24,
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: theme.colors.text,
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  towTruckCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  towTruckIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  towTruckContent: {
    flex: 1,
  },
  towTruckHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  towTruckName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  towTruckDistance: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  towTruckDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  towTruckFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  towTruckDriver: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  servicesList: {
    paddingRight: 20,
  },
  serviceCard: {
    width: 190,
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 18,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  emergencyBanner: {
    marginTop: 32,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    backgroundColor: theme.colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
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
