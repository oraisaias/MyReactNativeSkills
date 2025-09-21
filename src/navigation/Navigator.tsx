/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useRoute } from '@react-navigation/native';
import CustomCheckbox from '../projects/CustomCheckbox/CustomCheckbox';

function Navigator() {
  const route = useRoute();
  if (route.params?.name === 'CustomCheckbox') {
    return <CustomCheckbox />;
  }
}

export default Navigator;
