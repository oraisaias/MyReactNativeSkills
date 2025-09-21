import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RealmAppStackParamList } from '../../../types/navigation';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<RealmAppStackParamList>>();
  return (
    
      <View>
        <Text>Home</Text>
        <Button title="Data" onPress={() => navigation.navigate('Data')} />
      </View>
    );
  
}

export default Home