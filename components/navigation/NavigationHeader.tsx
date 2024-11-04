import { BlurView } from 'expo-blur';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  SharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  // basedHeaderTopPosition: number;
  headerTopPosition: SharedValue<number>;
  contentOffsetY: number;
  children: React.ReactNode;
};

export default function NavigationHeader({
  headerTopPosition,
  children,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      className={`absolute w-screen z-10`}
      style={{ top: headerTopPosition }}>
      <BlurView tint="systemMaterialLight" className={`w-[100%]`}>
        <View
          className="flex-row justify-between flex-1 pb-3 px-2"
          style={{ paddingTop: insets.top }}>
          {children}
        </View>
      </BlurView>
    </Animated.View>
  );
}
