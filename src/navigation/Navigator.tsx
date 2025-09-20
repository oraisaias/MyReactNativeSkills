/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import CustomCheckbox from '../projects/CustomCheckbox/CustomCheckbox';

function Navigator({ actual }: { actual: string }) {
  if (actual === 'CustomCheckbox') {
    return <CustomCheckbox />;
  }
}

export default Navigator;
