import { BlurView } from 'expo-blur';
import { useEffect } from 'react';
import { View, Text, useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  SharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  headerTopPosition?: SharedValue<number>;
  children: React.ReactNode;
};

export default function NavigationHeader({
  headerTopPosition,
  children,
}: Props) {
  const insets = useSafeAreaInsets();

  if (headerTopPosition) {
    return (
      <Animated.View
        className={`absolute w-screen z-10`}
        style={{ top: headerTopPosition }}>
        <BaseNavigationHeader>{children}</BaseNavigationHeader>
      </Animated.View>
    );
  }

  return <BaseNavigationHeader>{children}</BaseNavigationHeader>;
}

function BaseNavigationHeader({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      tint={
        colorScheme === 'light'
          ? 'systemMaterialLight'
          : 'systemChromeMaterialDark'
      }>
      <View
        className="flex-row justify-between pb-3 px-4 items-center gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
        style={{ paddingTop: insets.top }}>
        {children}
      </View>
    </BlurView>
  );
}
