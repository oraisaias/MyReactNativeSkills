import {
  View,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  StyleSheet,
  Text,
  Animated,
  LayoutAnimation,
  Easing,
  Platform,
  UIManager,
} from 'react-native';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export interface Step {
  label: string;
  subTitle: string;
  icon: ImageSourcePropType;
}

interface MultiStepProgressBarProps {
  steps: Step[];
  currentStep: number;
  height?: number;
  width?: number;
  circleSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const theme = {
  text: '#ffffff',
  inactive: '#D1D5D8',
  active: '#3B82F6',
  completed: '#10b981',
  current: '#f59e0b',
  label: '#374151',
  ripple: '#fde68a',
  black: '#000',
  white: '#fff',
};

const MultiStepProgressBar: FC<MultiStepProgressBarProps> = ({
  steps,
  currentStep,
  height = 300,
  width = 250,
  circleSize = 45,
  containerStyle,
}) => {
  const totalSteps = steps.length;
  const progressAnimations = useRef(
    Array(totalSteps - 1)
      .fill(null)
      .map(() => new Animated.Value(0)),
  ).current;

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const colorAnimations = useRef(
    Array(totalSteps)
      .fill(null)
      .map(() => new Animated.Value(0)),
  ).current;

  const [highLightedStep, setHighLightedStep] = useState(currentStep);

  const animateCircleColor = useCallback(
    (index: number) => {
      colorAnimations[index].setValue(0);
      Animated.timing(colorAnimations[index], {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    },
    [colorAnimations],
  );

  useEffect(() => {
    if (currentStep === 1) {
      setHighLightedStep(currentStep);
      animateCircleColor(0);
    }
    if (currentStep > 1 && currentStep <= totalSteps) {
      const index = currentStep - 2;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      progressAnimations[index].setValue(0);
      Animated.timing(progressAnimations[index], {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }).start(() => {
        setHighLightedStep(currentStep);
        animateCircleColor(currentStep - 1);
        animateCircleColor(currentStep - 2);
      });
    }
  }, [currentStep, animateCircleColor, progressAnimations, totalSteps]);

  useEffect(() => {
    if (highLightedStep > 0 && highLightedStep <= totalSteps) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
      );
      pulse.start();
      return () => {
        pulse.stop();
      };
    }
  }, [highLightedStep]);

  const TotalCircleSize = circleSize * totalSteps;
  const ProgressHeight = height - TotalCircleSize;
  const PROGRESS_HEIGHT = Math.round(ProgressHeight / (totalSteps - 1));
  return (
    <View style={[{ width, height }, containerStyle]}>
      <View style={styles.container}>
        {steps.map((step, i) => {
          function getInterpolatedColor(
            anim: Animated.Value,
            from: string,
            to: string,
          ) {
            return anim.interpolate({
              inputRange: [0, 1],
              outputRange: [from, to],
            });
          }
          const isCompleted = highLightedStep > i + 1;
          const isCurrent = highLightedStep === i + 1;

          const bgColor = isCompleted
            ? theme.completed
            : isCurrent
            ? getInterpolatedColor(
                colorAnimations[i],
                theme.black,
                theme.white,
              )
            : theme.inactive;
          const tintColor = getInterpolatedColor(
            colorAnimations[i],
            theme.inactive,
            theme.active,
          )
          return (
            <View key={`step-${i}`} style={styles.stepItem}>
              <View style={styles.circleContainer}>
                <Animated.View
                  style={[
                    styles.circle,
                    {
                      width: circleSize,
                      height: circleSize,
                      borderRadius: circleSize,
                      backgroundColor: bgColor,
                      borderWidth: isCurrent ? 3 : 0,
                      transform: isCurrent ? [{ scale: pulseAnim }] : [],
                      borderColor: isCurrent ? theme.ripple : 'transparent',
                    },
                  ]}
                >
                  {steps[i].icon ? (
                    <Animated.Image
                      source={step.icon}
                      style={styles.icon}
                      resizeMode="contain"
                      tintColor={tintColor}
                    />
                  ) : (
                    <Text style={styles.title}>{i + 1}</Text>
                  )}
                </Animated.View>
                {i < totalSteps - 1 && (
                  <View
                    style={{
                      height: PROGRESS_HEIGHT,
                      backgroundColor: theme.inactive,
                      width: 4,
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Animated.View
                      style={{
                        backgroundColor: theme.completed,
                        width: '100%',
                        height: progressAnimations[i].interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                      }}
                    ></Animated.View>
                  </View>
                )}
              </View>
              <View
                style={{
                  height: circleSize,
                  justifyContent: 'center',
                  flex: 1,
                }}
              >
                <Text numberOfLines={1} style={styles.label}>
                  {step.label}
                </Text>
                <Text numberOfLines={1} style={styles.subTitle}>
                  {step.subTitle}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
  circleContainer: {
    alignItems: 'center',
    marginRight: 12,
    height: '100%',
  },
  icon: {
    width: 24,
    height: 24,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 12,
  },
  label: {
    color: theme.label,
    fontSize: 16,
    textAlign: 'left',
  },
  subTitle: {
    color: '#6b7280',
    fontSize: 11,
    marginTop: 2,
  },
});

export default MultiStepProgressBar;
