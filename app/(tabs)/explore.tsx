import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import useFetchDiscoverMovies from '@/hooks/useFetchDiscoverMovies';
import { Movie } from '@/types/movie';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const {
    data: discoveries,
    loading,
    error,
    refetch,
  } = useFetchDiscoverMovies();
  const [contentOffsetY, setContentOffsetY] = useState(0);
  const [contentOffsetYWhenEndDrag, setContentOffsetYWhenEndDrag] = useState(0);
  const headerTopPosition = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setContentOffsetY(offsetY);
  };

  const handleScrollEndDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setContentOffsetYWhenEndDrag(offsetY);
  };

  const animatedHeaderTopPostion = () => {
    if (contentOffsetY < 100 || contentOffsetY < contentOffsetYWhenEndDrag) {
      headerTopPosition.value = withTiming(0);
    } else {
      headerTopPosition.value = withTiming(-120);
    }
  };

  useEffect(() => {
    animatedHeaderTopPostion();
  }, [contentOffsetY]);

  const handleSearchPress = () => {
    console.log('search clicked');
  };

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
      <NavigationHeader
        headerTopPosition={headerTopPosition}
        contentOffsetY={contentOffsetY}>
        <View className="w-7" />
        <Text className="text-black font-medium text-xl">Explore</Text>
        <MaterialIcons.Button
          name="search"
          size={28}
          onPress={handleSearchPress}
          backgroundColor={'transparent'}
          color={'black'}
          activeOpacity={1}
          underlayColor={'transparent'}
          iconStyle={{ marginRight: 0, marginLeft: 4 }}
          className="p-0 self-end justify-end items-end text-end m-0"
        />
      </NavigationHeader>
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
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollEndDrag}
          scrollEventThrottle={16}
          ItemSeparatorComponent={() => <View className="h-2" />}
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingTop: insets.top + 44,
          }}
        />
      )}
    </View>
    // </SafeAreaView>
  );
}

function ExploreItem({ movie }: { movie: Movie }) {
  const { push } = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const imageWidth = Math.floor((screenWidth - 32 - 8) / 2);
  const imageHeight = Math.floor((imageWidth * 4) / 3);

  const handlePress = () => {
    push({
      pathname: '/movie/[id]',
      params: { id: movie.id.toString() },
    });
  };

  return (
    <View
      className={`flex-1 w-[100%]rounded-md`}
      style={{ height: imageHeight }}>
      <TouchableOpacity
        activeOpacity={0.7}
        className="frlex-1"
        onPress={handlePress}>
        <Image
          className={`w-[100%] h-[100%] bg-gray-800 rounded-md`}
          resizeMode="cover"
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path ?? ''}`,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
