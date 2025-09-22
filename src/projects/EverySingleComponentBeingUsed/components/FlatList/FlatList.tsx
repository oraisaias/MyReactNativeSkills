import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const mixData: Item[] = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Jim' },
  { id: 4, name: 'Jill' },
  { id: 5, name: 'Jack' },
  { id: 6, name: 'Jill' },
  { id: 7, name: 'Jack' },
  { id: 8, name: 'Jill' },
  { id: 9, name: 'Jack' },
  { id: 10, name: 'Jill' },
  { id: 11, name: 'Jack' },
  { id: 12, name: 'Jill' },
  { id: 13, name: 'Jack' },
  { id: 14, name: 'Jill' },
  { id: 15, name: 'Jack' },
  { id: 16, name: 'Jill' },
  { id: 17, name: 'Jack' },
  { id: 18, name: 'Jill' },
  { id: 19, name: 'Jack' },
  { id: 20, name: 'Jill' },
  { id: 21, name: 'Jack' },
];


interface Item {
  id: number;
  name: string;
}

const renderItem = ({ item, index }: { item: Item; index: number }) => {
  return (
    <Text style={styles.item}>
      {item.name} index:{index}
    </Text>
  );
};

const ItemSeparatorComponent = () => {
  return (
    <View style={styles.separator}>
      <Text style={styles.separatorText}>ItemSeparatorComponent</Text>
    </View>
  );
};
const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>ListEmptyComponent</Text>
    </View>
  );
};
const ListFooterComponent = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={{fontSize: 16}}>ListFooterComponent internal box</Text>
    </View>
  );
};
const ListHeaderComponent = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={{fontSize: 16}}>ListHeaderComponent</Text>
    </View>
  );
};


const FlatListComponent = () => {


  const [isEmptyArray, setIsEmptyArray] = useState(false);
  const [horizontal, setHorizontal] = useState(false);
  const [data,setData]   = useState(mixData);
  const [inverted, setInverted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const handleHorizontal = () => {
    setHorizontal(!horizontal);
  };
  const getItemLayout = (_: any, index: number) => ({
    length: 100,
    offset: 100 * index,
    index,
  });
  const onRefresh = () => {
    

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refresh complete');
    }, 1000);
  };
  const flashScrollIndicators = () => {
    console.log('flashScrollIndicators');
    const nativeScrollRef = flatListRef.current?.getNativeScrollRef();
    console.log(nativeScrollRef);

  };
  return (
      <SafeAreaView style={[styles.container]}>
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          refreshing={refreshing}
          style={styles.flatList}
          data={isEmptyArray ? [] : data}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={ListFooterComponent}
          ListFooterComponentStyle={styles.ListFooterComponentStyle}
          ListHeaderComponent={ListHeaderComponent}
          horizontal={horizontal}
          initialNumToRender={2}
          initialScrollIndex={10}
          getItemLayout={getItemLayout}
          inverted={inverted}
          onRefresh={onRefresh}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => setIsEmptyArray(!isEmptyArray)}
            title={isEmptyArray ? 'Empty Array' : 'Full Array'}
          />
          <Button
            onPress={handleHorizontal}
            title={horizontal ? 'Vertical' : 'Horizontal'}
          />
          <Button
            onPress={() => setInverted(!inverted)}
            title={inverted ? 'Normal' : 'Inverted'}
          />
          <Button
            onPress={flashScrollIndicators}
            title='Flash Scroll Indicators'
          />
          {/* <Button
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
          /> */}
        </View> 
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    height: '100%',
    borderWidth: 10,
    borderColor: 'gray',
  },
  content: {
    flexDirection: 'row',
    flex:1
  },
  buttonContainer: {
    marginTop: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  separator: {
    padding: 2,
    backgroundColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  separatorText: {
    fontSize: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  emptyText: {
    fontSize: 16,
  },
  footerContainer: {
    borderWidth: 2,
    borderColor: 'red',
    flex:1
  },
  footerText: {
    fontSize: 16,
  },
  ListFooterComponentStyle: {
    backgroundColor: 'green',
    borderWidth: 10,
    borderColor: 'purple',
    height: 200,
  },  
  headerContainer: {
    borderWidth: 2,
    borderColor: 'red',
    flex:1,
    height: 50,
  },
  columnWrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'blue',
    justifyContent: 'space-between',
  },
});

export default FlatListComponent;
