import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const Blank = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.content}>
        <Text>Blank</Text>
      </View>
        <View style={styles.buttonContainer}></View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    flex:1
  },
  buttonContainer: {
    marginTop: 20,
  },
});
export default Blank;
