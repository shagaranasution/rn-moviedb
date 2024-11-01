import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, { useMemo } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import useFetchDiscoverMovies from '@/hooks/useFetchDiscoverMovies';
import { Movie } from '@/types/movie';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ExploreScreen() {
  const { top } = useSafeAreaInsets();
  const {
    data: discoveries,
    loading,
    error,
    refetch,
  } = useFetchDiscoverMovies();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1f2937" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    // <SafeAreaView className="flex-1">
    <View className="flex-1">
      <StatusBar style="dark" />
      {discoveries && (
        <FlatList
          data={discoveries}
          renderItem={({ item: movie }) => <ExploreItem movie={movie} />}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
          scrollEventThrottle={16}
          ItemSeparatorComponent={() => <View className="h-2" />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: top }}
        />
      )}
    </View>
    // </SafeAreaView>
  );
}

function ExploreItem({ movie }: { movie: Movie }) {
  const { push } = useRouter();
  const { width: scrrenWidth } = useWindowDimensions();
  const imageWidth = useMemo(() => {
    return Math.floor((scrrenWidth - 32 - 8) / 2);
  }, [scrrenWidth]);
  const imageHeight = useMemo(() => {
    return Math.floor((imageWidth * 4) / 3).toFixed();
  }, [imageWidth]);

  const handlePress = () => {
    push({
      pathname: '/movie/[id]',
      params: { id: movie.id.toString() },
    });
  };

  return (
    <View className="flex-1 bg-gray-800 rounded-md">
      <TouchableOpacity
        activeOpacity={0.7}
        className="frlex-1"
        onPress={handlePress}>
        <Image
          className={`w-[100%] h-[${imageHeight}px] bg-gray-800 rounded-md`}
          resizeMode="cover"
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path ?? ''}`,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
