import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

type TabIconProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  name: string;
};

const TabIcon = ({ icon, color, name }: TabIconProps) => {
  return (
    <View className="items-center  justify-center">
      <MaterialIcons name={icon} size={28} color={color} />
      <Text className="text-xs" style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#1f2937',
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="home" color={color} name="Home" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="search" color={color} name="Explore" />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
