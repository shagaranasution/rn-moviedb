import { View, Text, TouchableOpacity } from 'react-native';

type ErrorPageProps = {
  text: string;
  onNavigate: () => void;
};

export default function ErrorPage({ text, onNavigate }: ErrorPageProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-center p-4">{text}</Text>
      <TouchableOpacity activeOpacity={0.6} onPress={onNavigate}>
        <Text className="text-base font-semibold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
