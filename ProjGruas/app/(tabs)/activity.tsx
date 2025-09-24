import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../src/theme';
import { mockData } from '../../src/data/mockData';
import { SafeAreaView } from 'react-native-safe-area-context';

type ActivityStatus = 'completed' | 'in_progress' | 'cancelled';

const statusMap: Record<ActivityStatus, { color: string; label: string; icon: keyof typeof Ionicons.glyphMap }> = {
  completed: { color: theme.colors.success, label: 'Completado', icon: 'checkmark-circle' },
  in_progress: { color: theme.colors.warning, label: 'En camino', icon: 'time' },
  cancelled: { color: theme.colors.error, label: 'Cancelado', icon: 'close-circle' },
};

export default function ActivityScreen() {
  const serviceHistory = mockData.serviceHistory;

  const activities = useMemo(() =>
    serviceHistory.map(history => {
      const status: ActivityStatus = history.status === 'completed'
        ? 'completed'
        : history.status === 'in_progress'
        ? 'in_progress'
        : 'cancelled';

      const statusInfo = statusMap[status];

      return {
        id: history.id,
        type: status,
        title: history.type,
        description: `${history.location}`,
        date: `${history.date} · ${history.time}`,
        status: statusInfo.label,
        color: statusInfo.color,
        icon: statusInfo.icon,
        cost: history.cost,
      };
    })
  , [serviceHistory]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, styles.headerCentered]}>Mi Actividad</Text>
          <Text style={[styles.subtitle, styles.headerCentered]}>Historial de tus solicitudes</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="receipt-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.statNumber}>{activities.length}</Text>
            <Text style={styles.statLabel}>Solicitudes</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={20} color={theme.colors.warning} />
            <Text style={styles.statNumber}>{activities.filter(item => item.type === 'in_progress').length}</Text>
            <Text style={styles.statLabel}>En curso</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="checkmark-done-outline" size={20} color={theme.colors.success} />
            <Text style={styles.statNumber}>{activities.filter(item => item.type === 'completed').length}</Text>
            <Text style={styles.statLabel}>Completadas</Text>
          </View>
        </View>

        {/* Activity List */}
        <View style={styles.activitiesContainer}>
          <Text style={styles.sectionTitle}>Historial de Servicios</Text>

          {activities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
                  <Ionicons name={activity.icon} size={24} color={activity.color} />
                </View>

                <View style={styles.activityContent}>
                  <View style={styles.activityTitleRow}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <View style={[styles.statusChip, { backgroundColor: `${activity.color}15` }]}>
                      <Text style={[styles.activityStatus, { color: activity.color }]}>{activity.status}</Text>
                    </View>
                  </View>

                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  <View style={styles.activityMetaRow}>
                    <View style={styles.metaItem}>
                      <Ionicons name="calendar" size={14} color={theme.colors.textSecondary} />
                      <Text style={styles.activityDate}>{activity.date}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="cash-outline" size={14} color={theme.colors.primary} />
                      <Text style={styles.activityCost}>{activity.cost}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.activityAction}>
                <Text style={styles.activityActionText}>Ver detalles</Text>
                <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Empty State */}
        {activities.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyStateTitle}>Sin actividad</Text>
            <Text style={styles.emptyStateSubtitle}>Tus solicitudes aparecerán aquí</Text>
          </View>
        )}

        {/* Help Section */}
        <View style={styles.helpSection}>
          <TouchableOpacity style={styles.helpCard}>
            <Ionicons name="help-circle" size={24} color={theme.colors.primary} />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>¿Necesitas ayuda?</Text>
              <Text style={styles.helpSubtitle}>Contacta nuestro soporte</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
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
    padding: 20,
    backgroundColor: theme.colors.surface,
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
  headerCentered: {
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  statCard: {
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
  activitiesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  activityDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  activityMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activityDate: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  activityCost: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  activityAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  activityActionText: {
    fontSize: 14,
    color: theme.colors.primary,
    marginRight: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  helpSection: {
    padding: 20,
    paddingTop: 0,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },
  helpContent: {
    flex: 1,
    marginLeft: 16,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  helpSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});
