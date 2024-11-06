import NavigationHeader from '@/components/navigation/NavigationHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

export default function SearchLayout() {
  const colorScheme = useColorScheme();
  const [searchTitle, setSearchTitle] = useState('');

  const handleChangeText = (text: string) => {
    setSearchTitle(text);
  };

  const handleNavigateBack = () => {
    router.navigate({
      pathname: 'explore',
    });
  };

  const handleSearchPress = () => {
    router.navigate({
      pathname: '/explore/search/[title]',
      params: {
        title: searchTitle,
      },
    });
  };

  return (
    <View className="flex-1">
      <NavigationHeader>
        <TouchableOpacity activeOpacity={0.6} onPress={handleNavigateBack}>
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            color={colorScheme === 'light' ? '#0f172a' : 'white'}
          />
        </TouchableOpacity>
        <TextInput
          value={searchTitle}
          onChangeText={handleChangeText}
          placeholder="Search movie by title"
          placeholderTextColor={colorScheme === 'light' ? '#64748b' : '#94a3b8'}
          className="flex-1 ml-1 px-2 py-2 text-slate-900 dark:text-white border border-slate-900 dark:border-slate-300 rounded-md -left-1"
        />
        <TouchableOpacity activeOpacity={0.6} onPress={handleSearchPress}>
          <Text className="text-base text-slate-900 dark:text-white">
            Search
          </Text>
        </TouchableOpacity>
      </NavigationHeader>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[title]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}
