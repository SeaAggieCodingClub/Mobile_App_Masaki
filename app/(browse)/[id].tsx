import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useLayoutEffect} from 'react';
import globalStyles from '../globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import styleColors from '../styleColors';


const SubBrowseData = () => {

  const {id, name, type, muscle, equipment, difficulty} = useLocalSearchParams<{id: string, name: string, type: string, muscle: string, equipment: string, difficulty: string}>()

  // const navigation = useNavigation();

  // useLayoutEffect(() => {
  //     navigation.setOptions({
  //         tabBarStyle: { display: 'none' }, // Hide the tab bar for this screen
  //     });
  // }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.androidSafeView}>
      <Stack.Screen options = {{
        headerTitle: name,
        headerBackTitle: "Back",
        headerTintColor: styleColors.primary,
        headerStyle: {
          backgroundColor: styleColors.dark,
        }
      }}/>
      <Text>{type}</Text>
      <Text>{muscle}</Text>
      <Text>{equipment}</Text>
      <Text>{difficulty}</Text>
    </SafeAreaView>
  )
}

export default SubBrowseData