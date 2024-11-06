import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, useColorScheme } from 'react-native';

type TabIconProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  name: string;
};

const TabIcon = ({ icon, color, name }: TabIconProps) => {
  return (
    <View className="items-center  justify-center">
      <MaterialIcons name={icon} size={24} color={color} />
      <Text className="text-xs" style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colorScheme === 'light' ? '#1f2937' : 'white',
        tabBarStyle: {
          backgroundColor: colorScheme === 'light' ? 'white' : '#1f2937',
        },
      }}>
      <Tabs.Screen
        name="index"
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
            <TabIcon icon="explore" color={color} name="Explore" />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
