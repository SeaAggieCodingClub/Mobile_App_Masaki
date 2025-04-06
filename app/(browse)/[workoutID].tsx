import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useLayoutEffect} from 'react';
import globalStyles from '../globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import styleColors from '../styleColors';


const SubBrowseData = () => {

  interface workout {
    name: string,
    muscle: string[],
    description: string,
    equipment: string,
    difficulty: number,
    workoutType: string,
}

  const {
    name,
    muscle,
    description,
    equipment,
    difficulty,
    workoutType,
  } = useLocalSearchParams<{
    name: string,
    muscle: string[],
    description: string,
    equipment: string,
    difficulty: string,
    workoutType: string,
  }>()

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
        headerTitleStyle: {fontFamily: "Montserrat-Bold"},
        headerBackTitle: "Back",
        headerTintColor: styleColors.light,
        headerStyle: {
          backgroundColor: styleColors.dark,
        }
      }}/>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Workout: {name}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Workout Type: {workoutType}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Target Muscles: {muscle.toString()}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Description: {description}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Equipment: {equipment}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Difficulty: {difficulty}{"\n"}</Text>

    </View>
    //  name: item.name,
    //  muscle: item.muscle,
    //  description: item.description,
    //  equipment: item.equipment,
    //  difficulty: item.difficulty,
    //  workoutType: item.workoutType,
  )
}

export default SubBrowseData