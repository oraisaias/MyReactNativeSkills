/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useRoute, RouteProp } from '@react-navigation/native';
import CustomCheckbox from '../projects/CustomCheckbox/CustomCheckbox';
import { RootStackParamList } from '../types/navigation';
import SqliteStorage from '../projects/SqliteStorage/SqliteStorage';

function Navigator() {
  const route = useRoute<RouteProp<RootStackParamList>>();
  if (route.params?.name === 'CustomCheckbox') {
    return <CustomCheckbox />;
  }
  if (route.params?.name === 'SqliteStorage') {
    return <SqliteStorage />;
  }
  return null;
}

export default Navigator;
