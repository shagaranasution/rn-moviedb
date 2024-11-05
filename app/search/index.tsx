import useFetchDiscoverMovies from '@/hooks/useFetchDiscoverMovies';
import { Movie } from '@/types/movie';
import { router } from 'expo-router';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Search() {
  const insets = useSafeAreaInsets();
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
    <View className="flex-1">
      {discoveries && (
        <FlatList
          data={discoveries}
          renderItem={({ item: movie }) => <SearchItem movie={movie} />}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
          scrollEventThrottle={16}
          ItemSeparatorComponent={() => <View className="h-2" />}
          contentContainerStyle={{
            paddingHorizontal: 8,
          }}
        />
      )}
    </View>
  );
}

function SearchItem({ movie }: { movie: Movie }) {
  const { width: screenWidth } = useWindowDimensions();
  const imageWidth = Math.floor((screenWidth - 32 - 8) / 2);
  const imageHeight = Math.floor((imageWidth * 4) / 3);

  const handlePress = () => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: movie.id.toString() },
    });
  };

  return (
    <View
      className={`flex-1 w-[100%]rounded-md`}
      style={{ height: imageHeight }}>
      <TouchableOpacity
        activeOpacity={0.6}
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
