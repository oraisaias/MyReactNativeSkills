import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';

const ActivityIndicatorComponent = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [size, setSize] = useState<'small' | 'large'>('small');
  const [color, setColor] = useState<'#0000ff' | '#00ff00'>('#0000ff');
  const [hidesWhenStopped, setHidesWhenStopped] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>
        <View style={styles.content}>
          <ActivityIndicator animating={isAnimating} size={size} color={color} hidesWhenStopped={hidesWhenStopped} />
          <ActivityIndicator animating={isAnimating} size={size} color={color} hidesWhenStopped={hidesWhenStopped} />
          <ActivityIndicator
            size={size}
            color={color}
            hidesWhenStopped={hidesWhenStopped}
            animating={isAnimating}
          />
          <ActivityIndicator
            size={size}
            color={color}
            hidesWhenStopped={hidesWhenStopped}
            animating={isAnimating}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => setIsAnimating(!isAnimating)}
            title={isAnimating ? 'Stop' : 'Animate'}
          />
          <Button
            onPress={() => setSize(size === 'small' ? 'large' : 'small')}
            title={size === 'small' ? 'Large' : 'Small'}
          />
          <Button
            onPress={() => setColor(color === '#0000ff' ? '#00ff00' : '#0000ff')}
            title={color === '#0000ff' ? 'Green' : 'Blue'}
          />
          <Button
            onPress={() => setHidesWhenStopped(!hidesWhenStopped)}
            title={hidesWhenStopped ? 'Hide when stopped' : 'Show when stopped'}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ActivityIndicatorComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'column',
  },
  content: {
    flexDirection: 'row',
    flex:1
  },
  buttonContainer: {
    marginTop: 20,
  },
});
