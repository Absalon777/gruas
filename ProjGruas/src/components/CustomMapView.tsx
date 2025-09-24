import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Dimensions, Alert, TouchableOpacity, Text } from 'react-native';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { mockData } from '../data/mockData';

const { width, height } = Dimensions.get('window');

// Definir interfaces localmente para evitar dependencias de react-native-maps
interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface TowTruck {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
  status: 'available' | 'busy' | 'offline';
  driverName: string;
  rating: number;
  distance: number; // en km
}

interface MapViewProps {
  initialRegion?: Region;
  onLocationChange?: (region: Region) => void;
  towTrucks?: TowTruck[];
  onTowTruckSelect?: (towTruck: TowTruck) => void;
  showUserLocation?: boolean;
  style?: any;
  showRequestButton?: boolean;
  onRequestService?: () => void;
}

export const CustomMapView: React.FC<MapViewProps> = ({
  initialRegion,
  onLocationChange,
  towTrucks = [],
  onTowTruckSelect,
  showUserLocation = true,
  style,
  showRequestButton = false,
  onRequestService,
}) => {
  const defaultRegion = useMemo<Region>(() => {
    if (initialRegion) {
      return initialRegion;
    }

    return {
      latitude: mockData.currentLocation.latitude,
      longitude: mockData.currentLocation.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
  }, [initialRegion]);

  const [userLocation] = useState<Region>(defaultRegion);
  const [selectedTowTruck, setSelectedTowTruck] = useState<TowTruck | null>(null);

  useEffect(() => {
    if (onLocationChange) {
      onLocationChange(userLocation);
    }
  }, [onLocationChange, userLocation]);

  const getTowTruckIcon = (status: string) => {
    switch (status) {
      case 'available':
        return 'car';
      case 'busy':
        return 'car-sport';
      case 'offline':
        return 'car-outline';
      default:
        return 'car';
    }
  };

  const getTowTruckColor = (status: string) => {
    switch (status) {
      case 'available':
        return theme.colors.success;
      case 'busy':
        return theme.colors.warning;
      case 'offline':
        return theme.colors.textSecondary;
      default:
        return theme.colors.primary;
    }
  };

  const handleTowTruckPress = (towTruck: TowTruck) => {
    setSelectedTowTruck(towTruck);
    if (onTowTruckSelect) {
      onTowTruckSelect(towTruck);
    }
  };

  const clearSelection = () => {
    setSelectedTowTruck(null);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Mapa simulado */}
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={64} color={theme.colors.textSecondary} />
        <Text style={styles.mapPlaceholderText}>Mapa de grúas cercanas</Text>
        <Text style={styles.mapPlaceholderSubtext}>
          {`${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}`}
        </Text>
        {showUserLocation && (
          <View style={styles.userLocationBadge}>
            <Ionicons name="navigate-circle" size={20} color={theme.colors.primary} />
            <Text style={styles.userLocationText}>Tu ubicación simulada</Text>
          </View>
        )}
      </View>

      {/* Marcadores de grúas simulados */}
      {towTrucks.map((towTruck, index) => (
        <TouchableOpacity
          key={towTruck.id}
          style={[
            styles.marker,
            {
              top: 50 + index * 60,
              left: 50 + index * 40,
              backgroundColor: getTowTruckColor(towTruck.status),
            }
          ]}
          onPress={() => handleTowTruckPress(towTruck)}
        >
          <Ionicons
            name={getTowTruckIcon(towTruck.status) as any}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      ))}

      {/* Información de la grúa seleccionada */}
      {selectedTowTruck && (
        <View style={styles.selectedTowTruckCard}>
          <View style={styles.cardHeader}>
            <View style={styles.towTruckInfo}>
              <Text style={styles.towTruckName}>{selectedTowTruck.title}</Text>
              <Text style={styles.towTruckDriver}>{selectedTowTruck.driverName}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getTowTruckColor(selectedTowTruck.status) }]}>
              <Text style={styles.statusText}>
                {selectedTowTruck.status === 'available' ? 'Disponible' :
                 selectedTowTruck.status === 'busy' ? 'Ocupada' : 'Offline'}
              </Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.towTruckDescription}>{selectedTowTruck.description}</Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.routeButton]}
                onPress={() => Alert.alert('Ruta', 'Funcionalidad de ruta próximamente')}
              >
                <Ionicons name="navigate" size={16} color="white" />
                <Text style={styles.routeButtonText}>Ver ruta</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.callButton]}
                onPress={() => Alert.alert('Llamar', `Llamando a ${selectedTowTruck.driverName}...`)}
              >
                <Ionicons name="call" size={16} color="white" />
                <Text style={styles.callButtonText}>Llamar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={clearSelection}>
            <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      )}

      {/* Botón de solicitar servicio */}
      {showRequestButton && (
        <TouchableOpacity style={styles.requestButton} onPress={onRequestService}>
          <Ionicons name="car" size={24} color="white" />
          <Text style={styles.requestButtonText}>Solicitar Grúa</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    margin: 20,
    borderRadius: 16,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 16,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 8,
  },
  userLocationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
  },
  userLocationText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  marker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedTowTruckCard: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  towTruckInfo: {
    flex: 1,
  },
  towTruckName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  towTruckDriver: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    marginBottom: 12,
  },
  towTruckDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  routeButton: {
    backgroundColor: theme.colors.primary,
  },
  callButton: {
    backgroundColor: theme.colors.success,
  },
  routeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  callButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  requestButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CustomMapView;
