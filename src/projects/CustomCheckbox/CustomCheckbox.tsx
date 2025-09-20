import Settings from './Settings';
import { View } from 'react-native';
export default function CustomCheckbox() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Settings />
    </View>
  );
}
