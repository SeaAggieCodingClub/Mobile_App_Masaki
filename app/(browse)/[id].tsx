import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useLayoutEffect} from 'react';
import globalStyles from '../globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import styleColors from '../styleColors';


const SubBrowseData = () => {

  const {id, name, type, muscle, equipment, difficulty, instructions} = useLocalSearchParams<{id: string, name: string, type: string, muscle: string, equipment: string, difficulty: string, instructions: string}>()

  // const navigation = useNavigation();

  // useLayoutEffect(() => {
  //     navigation.setOptions({
  //         tabBarStyle: { display: 'none' }, // Hide the tab bar for this screen
  //     });
  // }, [navigation]);

  return (
    <View style={globalStyles.screenContainer}>
      <Stack.Screen options = {{
        headerTitle: name,
        headerBackTitle: "Back",
        headerTintColor: styleColors.light,
        headerStyle: {
          backgroundColor: styleColors.dark,
        }
      }}/>
      <Text style={{fontFamily: "Montserrat-Medium", color: "#FFFFFF", fontSize: 18}}>Type: {type}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Medium", color: "#FFFFFF", fontSize: 18}}>Muscle: {muscle}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Medium", color: "#FFFFFF", fontSize: 18}}>Equipment: {equipment}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Medium", color: "#FFFFFF", fontSize: 18}}>Difficulty: {difficulty}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Medium", color: "#FFFFFF", fontSize: 18}}>Instructions: {instructions}{"\n"}</Text>
    </View>
  )
}

export default SubBrowseData