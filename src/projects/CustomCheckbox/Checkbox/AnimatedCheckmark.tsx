import React, { memo, useRef, useState } from 'react';
// Arriba en tus importaciones
import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { Check_Mark_Path } from '../Data';

interface AnimatedCheckmarkProps {
  progress: SharedValue<number>;
  checkmarkColor: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedCheckmark = memo(
  ({
    progress,
    checkmarkColor,
  }: AnimatedCheckmarkProps) => {
  
    const pathRef = useRef<any>(null);
    const [length, setLength] = useState(0);

    const animatedProps = useAnimatedProps(() => {

        return {
           
            strokedDashoffset: length * (1 - progress.value),
             opacity: progress.value,
        }
    })
    return (
      <AnimatedPath
        animatedProps={animatedProps}
        strokeWidth={4}
        d={Check_Mark_Path}
        ref={pathRef}
        stroke={checkmarkColor}
        strokeDasharray={length}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        onLayout={() => {
            if (pathRef.current) {
                const totalLength = pathRef.current.getTotalLength();
                if (totalLength) {
                    setLength(totalLength);
                }
            }
        }}
      />
    );
  },
);

export default AnimatedCheckmark;
