import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';

type Props = {
  embedUrl: string;
};

export default function YoutubeVideo({ embedUrl }: Props) {
  console.log('embedUrl:', embedUrl);
  return (
    <View className="flex-1 align-middle justify-center">
      <WebView
        source={{ uri: embedUrl }}
        javaScriptEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View className="w-[100%] h-[100%] align-middle justify-center bg-[#1f2937]">
            <ActivityIndicator size="large" />
          </View>
        )}
        className="w-[100%] h-[100%"
      />
    </View>
  );
}
