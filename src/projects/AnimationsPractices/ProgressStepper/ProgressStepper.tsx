import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNMultiStepProgressBar, { Step } from './MultiStepProgressBar';

const ProgressStepper = () => {
  const steps: Step[] = [
    {
      label: 'Start',
      subTitle: 'Step 1 subtitle',
      // icon: require('../../assets/images/step1.png'),
    },
    {
      label: 'Verify',
      subTitle: 'Step 2 subtitle',
      // icon: require('../../assets/images/step2.png'),
    },
    {
      label: 'Upload',
      subTitle: 'Step 3 subtitle',
      // icon: require('../../assets/images/step3.png'),
    },
    {
      label: 'Complete',
      subTitle: 'Step 4 subtitle',
      // icon: require('../../assets/images/step4.png'),
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const handleNext = () => {
    if (currentStep >= steps.length || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsAnimating(false);
    }, 1000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <RNMultiStepProgressBar
        height={400}
        width={250}
        // containerStyle={{
        //   backgroundColor: 'red',
        // }}

        steps={steps}
        currentStep={currentStep}
      />
      <TouchableOpacity
        disabled={currentStep >= steps.length || isAnimating}
        style={[
          styles.button,
          {
            backgroundColor: currentStep >= steps.length ? 'green' : 'blue',
          },
        ]}
        onPress={handleNext}
      >
        <Text style={styles.title}>
          {currentStep >= steps.length ? 'Completed' : steps[currentStep].label}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProgressStepper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
