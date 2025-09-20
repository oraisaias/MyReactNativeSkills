import { memo } from 'react';
import { useDerivedValue, withTiming } from 'react-native-reanimated';
import Svg from 'react-native-svg';
import AnimatedColor from './AnimatedColor';
import AnimatedCheckmark from './AnimatedCheckmark';

interface CheckboxProps {
  checked: boolean;
  width: number;
  height: number;
  checkmarkColor: string;
  checkedBorderColor: string;
  uncheckedBorderColor: string;
  checkedBackgroundColor: string;
  uncheckedBackgroundColor: string;
}

const Checkbox = memo(
  ({
    checked,
    width,
    height,
    checkedBorderColor,
    uncheckedBorderColor,
    checkedBackgroundColor,
    uncheckedBackgroundColor,
  }: CheckboxProps) => {
    const progress: any = useDerivedValue(() =>
      withTiming(checked ? 1 : 0, { duration: 300 }),
    );
    return (
      <Svg width={width} height={height} viewBox={`0 0 49 49`}>
        <AnimatedColor
          progress={progress}
          checkedBorderColor={checkedBorderColor}
          uncheckedBorderColor={uncheckedBorderColor}
          checkedBackgroundColor={checkedBackgroundColor}
          uncheckedBackgroundColor={uncheckedBackgroundColor}
        />
        <AnimatedCheckmark
          progress={progress}
          checkmarkColor="white"
        />
      </Svg>
    );
  },
);

export default Checkbox;
