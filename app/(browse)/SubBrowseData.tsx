import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, Stack } from 'expo-router';
import { useEffect, useLayoutEffect} from 'react';


const SubBrowseData = () => {
  // const navigation = useNavigation();

  // useLayoutEffect(() => {
  //     navigation.setOptions({
  //         tabBarStyle: { display: 'none' }, // Hide the tab bar for this screen
  //     });
  // }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options = {{
        headerTitle: "Info"
      }}/>
      <Text>whatever</Text>
    </View>
  )
}

export default SubBrowseData