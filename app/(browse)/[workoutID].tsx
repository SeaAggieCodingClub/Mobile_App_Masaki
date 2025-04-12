import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useLayoutEffect} from 'react';
import globalStyles from '../globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import styleColors from '../styleColors';
import { WorkoutsContext } from './workoutsContext';


const SubBrowseData = () => {

  const { _id } = useLocalSearchParams<{ _id: string }>()
  const workoutData = useContext(WorkoutsContext).value
  const [currentWorkout, setCurrentWorkout] = useState((workoutData.filter((item) => item._id == _id))[0])


  // const navigation = useNavigation();

  // useLayoutEffect(() => {
  //     navigation.setOptions({
  //         tabBarStyle: { display: 'none' }, // Hide the tab bar for this screen
  //     });
  // }, [navigation]);

  return (
    <View style={globalStyles.screenContainer}>
      <Stack.Screen options = {{
        headerTitle: currentWorkout.name,
        headerTitleStyle: {fontFamily: "Montserrat-Bold"},
        headerBackTitle: "Back",
        headerTintColor: styleColors.light,
        headerStyle: {
          backgroundColor: styleColors.dark,
        }
      }}/>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Workout: {currentWorkout.name}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Workout Type: {currentWorkout.workoutType}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Target Muscles: {currentWorkout.muscle.toString()}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Description: {currentWorkout.description}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Equipment: {currentWorkout.equipment}{"\n"}</Text>
      <Text style={{fontFamily: "Montserrat-Regular", color: "#FFFFFF", fontSize: 18}}>Difficulty: {currentWorkout.difficulty}{"\n"}</Text>

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