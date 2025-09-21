/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useRoute, RouteProp } from '@react-navigation/native';
import CustomCheckbox from '../projects/CustomCheckbox/CustomCheckbox';
import { RootStackParamList } from '../types/navigation';

function Navigator() {
  const route = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  if (route.params?.name === 'CustomCheckbox') {
    return <CustomCheckbox />;
  }
  return null;
}

export default Navigator;
