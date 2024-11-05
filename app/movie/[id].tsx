import ErrorPage from '@/components/ErrorPage';
import YoutubeVideo from '@/components/YoutubeVideo';
import useFetchMovieDetail from '@/hooks/useFetchMovieDetail';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router, Link } from 'expo-router';
import { useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

export default function MovieScreen() {
  const { id: movieId } = useLocalSearchParams<{ id?: string }>();
  if (!movieId) {
    return;
  }

  const { movie, loading, error, refetch, movieYoutubeTrailer } =
    useFetchMovieDetail(movieId);
  const thumbnailHeight = useMemo(() => {
    return screenWidth * (9 / 16);
  }, [screenWidth]);

  const handleNavigateBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1f2937" />
      </View>
    );
  }

  if (error) {
    return <ErrorPage text={error} onNavigate={handleNavigateBack} />;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="relative z-10">
        <TouchableOpacity onPress={handleNavigateBack}>
          <View className="absolute m-4 mt-0 top-0 right-0 ">
            <MaterialIcons
              name="close"
              size={28}
              color="white"
              className="absolute top-0"
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            width: screenWidth,
            height: thumbnailHeight,
            position: 'relative',
          }}>
          {movieYoutubeTrailer ? (
            <View className="flex-1 m-4 mt-0 mb-8">
              <YoutubeVideo embedUrl={movieYoutubeTrailer} />
            </View>
          ) : (
            <>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${
                    movie?.backdrop_path ?? ''
                  }`,
                }}
                resizeMode="cover"
                className="flex-1 m-4 mt-0 mb-8 bg-slate-800 rounded-md"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                className="absolute top-0 bottom-8 left-4 right-4 rounded-md">
                <View className="flex-1 justify-center items-center">
                  <MaterialIcons
                    name="play-circle-outline"
                    size={52}
                    color="white"
                  />
                </View>
              </LinearGradient>
            </>
          )}
        </View>
        <View className="mt-[-16px] p-4 pt-0">
          <View className="gap-4">
            <Text className="max-w-[240px] self-center text-center text-3xl font-medium">{`Movie Page: ${movie?.title}`}</Text>
            <Text className="text-base">{`Movie Page: ${
              movie?.overview ?? 'N/A'
            }`}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
