import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { theme } from '../../src/theme';
import { servicesApi } from '../../src/services/servicesApi';
import { CustomMapView } from '../../src/components/CustomMapView';
import { mockData } from '../../src/data/mockData';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ServiceRequest {
  serviceType: string;
  description: string;
  address: string;
  urgent: boolean;
  towTruckId?: string;
}

const serviceIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Grúa Plana': 'car-outline',
  'Grúa con Rampa': 'bus-outline',
  'Asistencia en Carretera': 'construct-outline',
  'Transporte Especial': 'shield-checkmark-outline',
};

export default function ServiceRequestScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest>({
    serviceType: '',
    description: '',
    address: '',
    urgent: false,
  });

  const serviceOptions = useMemo(() => (
    mockData.services.map(service => ({
      ...service,
      icon: serviceIcons[service.name] ?? 'construct-outline',
    }))
  ), []);

  const selectedService = serviceOptions.find(option => option.id === serviceRequest.serviceType);

  const enhancedTowTrucks = useMemo(() =>
    mockData.towTrucks.map(truck => {
      const matchingLocation = mockData.towTruckLocations.find(location => location.id === truck.id);
      return {
        ...truck,
        coordinate: {
          latitude: matchingLocation?.latitude ?? mockData.currentLocation.latitude,
          longitude: matchingLocation?.longitude ?? mockData.currentLocation.longitude,
        },
      };
    })
  , []);

  const recommendedTowTrucks = enhancedTowTrucks.slice(0, 3);

  const handleServiceTypeSelect = (serviceType: string) => {
    setServiceRequest({ ...serviceRequest, serviceType });
    setCurrentStep(2);
  };

  const handleSubmitRequest = async () => {
    if (!serviceRequest.serviceType) {
      Alert.alert('Error', 'Por favor selecciona un tipo de servicio');
      return;
    }

    if (!serviceRequest.address) {
      Alert.alert('Error', 'Por favor ingresa la dirección');
      return;
    }

    try {
      const resp = await servicesApi.createServiceRequest({
        serviceId: serviceRequest.serviceType,
        notes: serviceRequest.description || undefined,
      });

      Alert.alert(
        'Solicitud enviada',
        `Tu solicitud fue creada. ETA: ${resp.estimatedArrival}`,
        [
          {
            text: 'Aceptar',
            onPress: () => {
              setServiceRequest({
                serviceType: '',
                description: '',
                address: '',
                urgent: false,
                towTruckId: undefined,
              });
              setCurrentStep(1);
              router.push('/(tabs)/activity');
            },
          },
        ]
      );
    } catch (e: any) {
      console.warn('Fallo al crear solicitud', e?.message || e);
      Alert.alert('Error', 'No se pudo crear la solicitud. Intenta nuevamente.');
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>¿Qué tipo de servicio necesitas?</Text>
      <Text style={styles.stepSubtitle}>Selecciona el servicio que mejor se adapte a tu situación</Text>

      <View style={styles.servicesGrid}>
        {serviceOptions.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[styles.serviceCard, !service.available && styles.serviceCardDisabled]}
            onPress={() => handleServiceTypeSelect(service.id)}
            activeOpacity={0.9}
            disabled={!service.available}
          >
            <View style={[styles.serviceIcon, { backgroundColor: 'rgba(37, 99, 235, 0.12)' }] }>
              <Ionicons name={service.icon} size={22} color={theme.colors.primary} />
            </View>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <Text style={styles.servicePrice}>{service.price}</Text>
            {!service.available && (
              <View style={styles.unavailableOverlay}>
                <Ionicons name="close-circle" size={18} color={theme.colors.error} />
                <Text style={styles.unavailableText}>Temporalmente no disponible</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Detalles de la solicitud</Text>
      <Text style={styles.stepSubtitle}>Completa la información para procesar tu solicitud</Text>

      {selectedService && (
        <View style={styles.selectedServiceCard}>
          <View style={styles.selectedServiceHeader}>
            <View style={styles.selectedServiceIcon}>
              <Ionicons name={selectedService.icon} size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.selectedServiceInfo}>
              <Text style={styles.selectedServiceName}>{selectedService.name}</Text>
              <Text style={styles.selectedServicePrice}>{selectedService.price}</Text>
            </View>
            <TouchableOpacity onPress={() => setCurrentStep(1)}>
              <Text style={styles.changeServiceText}>Cambiar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.selectedServiceDescription}>{selectedService.description}</Text>
        </View>
      )}

      <View style={styles.formContainer}>
        {/* Ubicación */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Dirección de recogida *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa la dirección completa"
            value={serviceRequest.address}
            onChangeText={(address) => setServiceRequest({ ...serviceRequest, address })}
            multiline
            numberOfLines={2}
          />
        </View>

        {/* Tipo de vehículo */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo de vehículo</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Selecciona tu vehículo</Text>
          </TouchableOpacity>
        </View>

        {/* Descripción del problema */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Descripción del problema</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe el problema o situación..."
            value={serviceRequest.description}
            onChangeText={(description) => setServiceRequest({ ...serviceRequest, description })}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Servicio urgente */}
        <View style={styles.formGroup}>
          <View style={styles.switchContainer}>
            <View style={styles.switchLabel}>
              <Text style={styles.switchText}>Servicio urgente</Text>
            </View>
            <Switch
              value={serviceRequest.urgent}
              onValueChange={(urgent) => setServiceRequest({ ...serviceRequest, urgent })}
              trackColor={{ false: theme.colors.border, true: theme.colors.warning }}
              thumbColor={serviceRequest.urgent ? theme.colors.background : theme.colors.surface}
            />
          </View>
          <Text style={styles.switchDescription}>
            Los servicios urgentes tienen prioridad y costo adicional
          </Text>
        </View>

        {/* Mapa */}
        <View style={styles.mapContainer}>
          <CustomMapView
            style={styles.map}
            towTrucks={enhancedTowTrucks}
            onTowTruckSelect={(towTruck) => setServiceRequest(prev => ({ ...prev, towTruckId: towTruck.id }))}
            showRequestButton={false}
          />
        </View>

        {/* Recomendaciones */}
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsTitle}>Conductores cercanos</Text>
          {recommendedTowTrucks.map(truck => (
            <TouchableOpacity
              key={truck.id}
              style={[styles.recommendationCard, serviceRequest.towTruckId === truck.id && styles.recommendationSelected]}
              onPress={() => setServiceRequest(prev => ({ ...prev, towTruckId: truck.id }))}
            >
              <View style={styles.recommendationHeader}>
                <View style={styles.recommendationIcon}>
                  <Ionicons name="car" size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.recommendationInfo}>
                  <Text style={styles.recommendationTitle}>{truck.title}</Text>
                  <Text style={styles.recommendationSubtitle}>Conductor {truck.driverName}</Text>
                </View>
                <View style={styles.recommendationMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={14} color={theme.colors.warning} />
                    <Text style={styles.metaText}>{truck.rating}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="navigate" size={14} color={theme.colors.primary} />
                    <Text style={styles.metaText}>{truck.distance} km</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setCurrentStep(1)}
          >
            <Text style={styles.secondaryButtonText}>Atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleSubmitRequest}
          >
            <Text style={styles.primaryButtonText}>Enviar Solicitud</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (currentStep === 1) {
                router.back();
              } else {
                setCurrentStep(1);
              }
            }}
          >
            <Ionicons name="chevron-back" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Solicitar Servicio</Text>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>Paso {currentStep} de 2</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: currentStep === 1 ? '50%' : '100%' }]} />
        </View>

        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.supportButton} onPress={() => Alert.alert('Soporte', 'Llamando al centro de soporte...')}>
            <Ionicons name="call" size={18} color={theme.colors.primary} />
            <Text style={styles.supportButtonText}>Contactar soporte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportButton} onPress={() => Alert.alert('Compartir ubicación', 'Enviando tu ubicación actual...')}>
            <Ionicons name="location" size={18} color={theme.colors.primary} />
            <Text style={styles.supportButtonText}>Compartir ubicación</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {currentStep === 1 ? renderStep1() : renderStep2()}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: theme.colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  stepIndicator: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  progressContainer: {
    height: 4,
    backgroundColor: theme.colors.border,
    marginHorizontal: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceCardDisabled: {
    opacity: 0.5,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  unavailableOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  unavailableText: {
    fontSize: 12,
    color: theme.colors.error,
    textAlign: 'center',
  },
  selectedServiceCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  selectedServiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  selectedServiceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedServiceInfo: {
    flex: 1,
    marginHorizontal: 14,
  },
  selectedServiceName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  selectedServicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  selectedServiceDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  changeServiceText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  formContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: theme.colors.background,
  },
  dropdownText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 8,
  },
  switchDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  recommendationsContainer: {
    marginTop: 24,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 12,
  },
  recommendationCard: {
    backgroundColor: theme.colors.background,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  recommendationSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recommendationIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationInfo: {
    flex: 1,
    marginHorizontal: 14,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  recommendationMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  supportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  supportButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
  },
});
