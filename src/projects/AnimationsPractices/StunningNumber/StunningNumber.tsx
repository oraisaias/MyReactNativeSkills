import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Easing,
} from 'react-native';
import React, {  useState } from 'react';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

const StunningNumber = () => {
  const animatedValue = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const [displayNumber, setDisplayNumber] = useState(0);

  useDerivedValue(() => {
    runOnJS(setDisplayNumber)(Math.round(animatedValue.value));
  },[animatedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  const animatedToValue = (newValue: number) => {
    scale.value = withTiming(1.2,{duration:100},()=>{
      scale.value = withSpring(1,{damping:3});
    });
    opacity.value = withTiming(0.7,{duration:100},()=>{
      opacity.value = withTiming(1,{duration:200});
    });
    animatedValue.value = withTiming(newValue, {duration:1500});
  };

  const handleIncrement = () => animatedToValue(animatedValue.value + 10);

  const handleDecrement = () => animatedToValue(Math.max(animatedValue.value - 10, 0));

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.numberText, animatedStyle]}
      >
        {displayNumber}
      </Animated.Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleDecrement}
          style={[styles.button, styles.decrementButton]}
        >
          <Text style={styles.buttonText}>-10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleIncrement}
          activeOpacity={0.8}
          style={[styles.button, styles.incrementButton]}
        >
          <Text style={styles.buttonText}>+10</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8fa',
  },
  numberText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#2c3e50',
    marginTop: 50,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  decrementButton: {
    backgroundColor: '#e74c3c',
  },
  incrementButton: {
    backgroundColor: '#27ae60',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default StunningNumber;
