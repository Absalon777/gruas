import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../src/theme';

const tabIconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  explore: 'compass-outline',
  services: 'construct-outline',
  request: 'add-circle-outline',
  activity: 'time-outline',
  profile: 'person-outline',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const iconName = tabIconMap[route.name] ?? 'ellipse-outline';
        return {
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            height: 64,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? iconName.replace('-outline', '') as any : iconName} size={size} color={color} />
          ),
        };
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="services" options={{ title: 'Servicios' }} />
      <Tabs.Screen name="request" options={{ title: 'Solicitar' }} />
      <Tabs.Screen name="activity" options={{ title: 'Actividad' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
