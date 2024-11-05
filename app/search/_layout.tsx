import NavigationHeader from '@/components/navigation/NavigationHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { Slot, Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function SearchLayout() {
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
      pathname: 'search/[title]',
      params: {
        title: searchTitle,
      },
    });
  };

  return (
    <>
      <StatusBar style="dark" />
      <NavigationHeader>
        <TouchableOpacity activeOpacity={0.6} onPress={handleNavigateBack}>
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            className="className=text-[#1f2937]"
          />
        </TouchableOpacity>
        <TextInput
          value={searchTitle}
          onChangeText={handleChangeText}
          placeholder="Search movie by title"
          placeholderTextColor={'grey'}
          className="flex-1 ml-1 px-2 py-2 border border-[#1f2937] rounded-md -left-1"
        />
        <TouchableOpacity activeOpacity={0.6} onPress={handleSearchPress}>
          <Text className="text-base">Search</Text>
        </TouchableOpacity>
      </NavigationHeader>
      <Slot />
    </>
  );
}
