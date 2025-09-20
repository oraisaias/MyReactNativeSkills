import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Checkbox from './Checkbox';
import { COLOR_SET } from './Data';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const options = [
  {
    title: 'App settings',
    data: [
      {
        label: 'Receive notifications',
        ...COLOR_SET[0],
      },
      {
        label: 'Dark mode',
        ...COLOR_SET[1],
      },
    ],
  },
  {
    title: 'Preferences',
    data: [
      {
        label: 'Auto-Update App',
        ...COLOR_SET[2],
      },
      {
        label: 'Personalized Ads',
        ...COLOR_SET[3],
      },
    ],
  },
];
{
  /*  */
}

export default function Settings() {
  const [checkedMap, setCheckedMap] = useState<any>({});
  const toggleChecked = (key: string) => {
    setCheckedMap((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView>
        {options.map((group, groupIndex) => (
          <View key={Math.random()} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            {group.data.map((item, itemIndex) => {
              const key = `${groupIndex}-${itemIndex}`;
              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.8}
                  onPress={() => {
                    toggleChecked(key);
                  }}
                  style={styles.optionsRow}
                >
                  <Checkbox
                    width={24}
                    height={24}
                    checked={!!checkedMap[key]}
                    checkmarkColor={'white'}
                    checkedBackgroundColor={item.color3}
                    uncheckedBackgroundColor={item.color4}
                    checkedBorderColor={checkedMap[key] ? item.color1 : item.color2}
                    uncheckedBorderColor={checkedMap[key] ? item.color1 : item.color2}
                  />
                  <Text style={styles.optionsRowTitle}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerTitle: {
    fontSize: 24,
    alignSelf: 'center',
    color: 'rgba(10,130,199,1)',
    fontWeight: 'bold',
  },
  groupContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  optionsRowTitle: {
    marginLeft: 16,
    fontSize: 16,
    color: '#444',
  },
});
