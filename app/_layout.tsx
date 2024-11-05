import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View className="flex-1">
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            presentation: 'fullScreenModal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="search/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="search/[title]"
          options={{
            headerShown: false,
          }}
        /> */}
      </Stack>
      <StatusBar style="dark" />
    </View>
  );
}
