import { FontAwesome } from '@expo/vector-icons';
import { Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

interface TabIconProps {
  name?: string;
  source?: ImageSourcePropType;
  color: string;
  size: number;
  style?: StyleProp<ImageStyle>;
}

export function TabIcon({ name, source, color, size, style }: TabIconProps) {
  if (name) {
    return <FontAwesome name={name} size={size} color={color} style={style} />;
  }
  if (source) {
    return (
      <Image
        source={source}
        style={[{ tintColor: color, width: size, height: size }, style]}
      />
    );
  }
  return null;
}