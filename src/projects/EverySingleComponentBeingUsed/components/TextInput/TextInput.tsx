import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const TextInputComponent = () => {
  const [text, setText] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const onChangeText = (text: string) => {
    setText(text);
  };
  const onChangeNumber = (number: string) => {
    setNumber(number);
  };
  const onChangePassword = (password: string) => {
    setPassword(password);
  };
  return (
    <SafeAreaView style={[styles.container]}>
    <ScrollView>   
      <View style={styles.content}>
        <Text
            allowFontScaling={false}
        >Normal</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Text
            allowFontScaling={false}
        >Numeric</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
          autoCapitalize='none'
        />
        <Text
            allowFontScaling={false}
        >Password</Text>
        <TextInput 
            style={styles.input}
            onChangeText ={onChangePassword}
            defaultValue=''
        />
        <Text
            allowFontScaling={false}
        >No Editable</Text>
        <TextInput 
            style={styles.input}
            editable={false}
            defaultValue='something'
            allowFontScaling={false}
        />
        <Text
            allowFontScaling={false}
        >Multiline</Text>
        <TextInput 
            style={[styles.input,{height: 100}]}
            editable={false}
            multiline={true}
            defaultValue='Note that some props are only available with multiline={true/false}. Additionally, border styles that apply to only one side of the element (e.g., borderBottomColor, borderLeftWidth, etc.) will not be applied if multiline=true. To achieve the same effect, you can wrap your TextInput in a View'
            allowFontScaling={false}
        />
         <Text
            allowFontScaling={false}
        >Multiline with number of lines</Text>
        <TextInput 
            style={[styles.input,{height: 100}]}
            editable={false}
            multiline={true}
            numberOfLines={2}
            defaultValue='Note that some props are only available with multiline={true/false}. Additionally, border styles that apply to only one side of the element (e.g., borderBottomColor, borderLeftWidth, etc.) will not be applied if multiline=true. To achieve the same effect, you can wrap your TextInput in a View'
            allowFontScaling={false}
        />
          <Text
            allowFontScaling={true}
        > allowFontScaling</Text>
        <TextInput 
            style={[styles.input,{height: 100}]}
            editable={false}
            multiline={true}
            numberOfLines={2}
            defaultValue='Note that some props are only available with multiline={true/false}. Additionally, border styles that apply to only one side of the element (e.g., borderBottomColor, borderLeftWidth, etc.) will not be applied if multiline=true. To achieve the same effect, you can wrap your TextInput in a View'
            allowFontScaling={true}
        />
        <Text
            allowFontScaling={true}
        > autoCapitalize and autoCorrect false</Text>
        <TextInput 
            style={[styles.input,{height: 100}]}
            editable={true}
            multiline={true}
            allowFontScaling={false}
            autoCapitalize='characters'
            autoCorrect={false}
        />
        <Text
            allowFontScaling={true}
        > autoCapitalize and autoCorrect true</Text>
        <TextInput 
            style={[styles.input,{height: 100}]}
            editable={true}
            multiline={true}
            allowFontScaling={false}
            autoCapitalize='characters'
            autoCorrect={true}
        />
         <Text
            allowFontScaling={false}
        >Auto Complete</Text>
        <TextInput 
            style={styles.input}
            allowFontScaling={false}
            autoComplete='email'
            autoCorrect={true}
            autoCapitalize='none'
            caretHidden={true}
            submitBehavior='newline'
            onChangeText={onChangeText}
            
            onPressIn={() => {
                console.log('press in');
            }}
            onPressOut={() => {
                console.log('press out');
            }}
            onPress={() => {
                console.log('press');
            }}
            onLongPress={() => {
                console.log('long press');
            }}
            onSelectionChange={() => {
                console.log('selection change');
            }}
        />
        
      </View>
      </ScrollView>
      <View style={styles.buttonContainer}></View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
export default TextInputComponent;
