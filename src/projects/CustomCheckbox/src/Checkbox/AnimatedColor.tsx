import React, { memo } from 'react';
// Arriba en tus importaciones
import Animated, {
  createAnimatedPropAdapter,
  interpolateColor,
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { Box_Path } from '../../data/Data';

interface AnimatedColorProps {
  progress: SharedValue<number>;
  checkedBorderColor: string;
  uncheckedBorderColor: string;
  checkedBackgroundColor: string;
  uncheckedBackgroundColor: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedColor = memo(
  ({
    progress,
    checkedBorderColor,
    uncheckedBorderColor,
    checkedBackgroundColor,
    uncheckedBackgroundColor,
  }: AnimatedColorProps) => {
    const AnimatedProps: any = useAnimatedProps(
      () => {
        const fill = interpolateColor(
          progress.value,
          [0, 1],
          [uncheckedBackgroundColor, checkedBackgroundColor],
        );
        const stroke = interpolateColor(
          progress.value,
          [0, 1],
          [uncheckedBorderColor, checkedBorderColor],
        );
        return {
          fill,
          stroke,
        };
      },
      [],
      createAnimatedPropAdapter(
        props => {
          if (typeof props.fill === 'number') {
            props.fill = { type: 0, payload: props.fill };
          }
          if (typeof props.stroke === 'number') {
            props.stroke = { type: 0, payload: props.stroke };
          }
        },
        ['fill', 'stroke'],
      ),
    );

    return (
      <AnimatedPath
        animatedProps={AnimatedProps}
        strokeWidth={4}
        d={Box_Path}
      />
    );
  },
);

export default AnimatedColor;
