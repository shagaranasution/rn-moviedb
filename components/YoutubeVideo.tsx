import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView, { WebViewProps } from 'react-native-webview';

type Props = {
  embedUrl: string;
};

export default function YoutubeVideo({
  embedUrl,
  ...rest
}: Props & WebViewProps) {
  return (
    <View className="flex-1 align-middle justify-center">
      <WebView
        source={{ uri: embedUrl }}
        javaScriptEnabled={true}
        startInLoadingState={true}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={false}
        renderLoading={() => (
          <View className="w-[100%] h-[100%] align-middle justify-center bg-[#1f2937]">
            <ActivityIndicator size="large" />
          </View>
        )}
        className="w-[100%] h-[100%"
        {...rest}
      />
    </View>
  );
}
