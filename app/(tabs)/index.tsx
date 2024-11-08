import {
  ActivityIndicator,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'expo-router';
import useFetchHomeScreenMovies, {
  Category,
} from '@/hooks/useFetchHomeScreenMovies';
import { Movie } from '@/types/movie';
import { LinearGradient } from 'expo-linear-gradient';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import NavigationHeader from '@/components/navigation/NavigationHeader';

export default function HomeScreen() {
  const { data, loading, error, refetch } = useFetchHomeScreenMovies();
  const headerTopPosition = useSharedValue(-120);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    animatedHeaderTopPostion(offsetY);
  };

  const animatedHeaderTopPostion = (contentOffsetY: number) => {
    if (contentOffsetY < 240) {
      headerTopPosition.value = withTiming(-120);
    } else {
      headerTopPosition.value = withTiming(0);
    }
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
    <View className="flex-1 bg-white dark:bg-slate-800">
      <StatusBar style="auto" />
      <NavigationHeader headerTopPosition={headerTopPosition}>
        <Text className="flex-1 text-center  font-medium text-xl text-slate-900 dark:text-white">
          The Movie
        </Text>
      </NavigationHeader>
      {data && (
        <FlatList
          data={data}
          renderItem={({ item: category }) => (
            <HomeCategoryList category={category} />
          )}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-3" />}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
          ListHeaderComponent={<HeaderComponent categories={data} />}
          ListHeaderComponentStyle={{ marginBottom: 16 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
}

function HomeCategoryList({ category }: { category: Category }) {
  return (
    <View className="gap-2">
      <View className="px-4">
        <Text className="text-base text-slate-900 dark:text-white font-medium">
          {category.title.replace('_', ' ').toUpperCase()}
        </Text>
      </View>
      <FlatList
        data={category.items}
        renderItem={({ item }) => <HomeCategoryItem movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-1" />}
      />
    </View>
  );
}

function HomeCategoryItem({ movie }: { movie: Movie }) {
  return (
    <Link
      href={{ pathname: '/movie/[id]', params: { id: movie.id.toString() } }}
      asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <View className="w-[120px]">
          <Image
            className="w-[100%] h-[160px] bg-slate-500 dark:bg-slate\ rounded-md"
            resizeMode="cover"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path ?? ''}`,
            }}
          />
          <Text
            className="text-sm text-slate-900 dark:text-white"
            numberOfLines={2}>
            {movie.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const HeaderComponent = React.memo(function HeaderComponent({
  categories,
}: {
  categories: Category[];
}) {
  const [_currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const moviesToShown = useMemo(() => {
    let moviesToShown: Movie[] = [];
    for (const category of categories) {
      let movie =
        category.items[Math.floor(Math.random() * category.items.length)];

      while (moviesToShown.map((item) => item.id).includes(movie.id)) {
        movie =
          category.items[Math.floor(Math.random() * category.items.length)];
      }
      moviesToShown.push(movie);
    }

    return moviesToShown;
  }, [categories]);

  useEffect(() => {
    const intervaId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % moviesToShown.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3 * 1000);

    return () => clearInterval(intervaId);
  }, []);

  return (
    <FlatList
      ref={flatListRef}
      data={moviesToShown}
      renderItem={({ item }: { item: Movie }) => <HeaderItem movie={item} />}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      decelerationRate="fast"
      bounces={false}
    />
  );
});

function HeaderItem({ movie }: { movie: Movie }) {
  const { id: movieId, title, overview, backdrop_path } = movie;
  const trimmedOverview = useMemo(() => {
    if (overview.length > 150) {
      return overview.substring(0, 150 - 3) + '...';
    }

    return overview;
  }, [overview]);

  return (
    <Link href={{ pathname: '/movie/[id]', params: { id: movieId } }}>
      <View className="w-[100vw] h-[320px] relative">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${backdrop_path ?? ''}`,
          }}
          resizeMode="cover"
          className="w-[100%] h-[100%] bg-gray-800"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          className="absolute w-[100%] h-[100%]">
          <View className="flex-1 relative justify-end items-center p-4 gap-1">
            <View className="absolute top-0 bottom-0 left-0 right-0 justify-center items-center">
              <MaterialIcons
                name="play-circle-outline"
                size={52}
                color="white"
              />
            </View>
            <Text
              className="w-[100%] text-white text-lg font-medium"
              numberOfLines={2}>
              {title}
            </Text>
            <Text className="w-[100%] text-slate-300">{trimmedOverview}</Text>
          </View>
        </LinearGradient>
      </View>
    </Link>
  );
}
