import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useLayoutEffect} from 'react';


const SubBrowseData = () => {

  const {id, name, type, muscle, equipment, difficulty} = useLocalSearchParams<{id: string, name: string, type: string, muscle: string, equipment: string, difficulty: string}>()

  // const navigation = useNavigation();

  // useLayoutEffect(() => {
  //     navigation.setOptions({
  //         tabBarStyle: { display: 'none' }, // Hide the tab bar for this screen
  //     });
  // }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options = {{
        headerTitle: name,
        headerBackTitle: "Back"
      }}/>
      <Text>{type}</Text>
      <Text>{muscle}</Text>
      <Text>{equipment}</Text>
      <Text>{difficulty}</Text>
    </View>
  )
}

export default SubBrowseData