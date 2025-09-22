import { View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { EverySingleComponentStackParamList } from '../../types/navigation'
import { StackNavigationProp } from '@react-navigation/stack'

const EverySingleComponent = () => {
  const navigation = useNavigation< StackNavigationProp<EverySingleComponentStackParamList>>();
  return (
    <View>
      <Button
        title="ActivityIndicator"
        onPress={() => navigation.navigate('ActivityIndicator')}
      />
      <Button
        title="FlatList"
        onPress={() => navigation.navigate('FlatList')}
      />
      <Button
        title="TextInput"
        onPress={() => navigation.navigate('TextInput')}
      />
    </View>
  )
}

export default EverySingleComponent