import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, FlatList, Pressable } from "react-native"
import { Link, router, Stack } from "expo-router"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
import BottomSheet, {BottomSheetBackdrop, BottomSheetView, TouchableOpacity} from "@gorhom/bottom-sheet"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler"
import Icon from '@expo/vector-icons/MaterialIcons'

const dataSample = [
    {
      "name": "Bicep Curls",
      "muscle": ["biceps", "forearms"],
      "description": "A strength exercise targeting the biceps by curling weights upward while keeping elbows close to the body.",
      "equipment": "Dumbbells",
      "difficulty": 2,
      "workoutType": "strength"
    },
    {
      "name": "Barbell Bench Press",
      "muscle": ["chest", "shoulders", "triceps"],
      "description": "A strength-building exercise that primarily targets the chest muscles, involving pressing a barbell upward from a lying position to develop upper body strength and stability.",
      "equipment": "Barbells",
      "difficulty": 3,
      "workoutType": "strength"
    },
    {
      "name": "Dumbbell Bench Press",
      "muscle": ["chest", "shoulders", "triceps"],
      "description": "A strength-building exercise that primarily targets the chest muscles, involving pressing a pair of dumbbells upward from a lying position to enhance upper body strength, stability, and muscle balance.",
      "equipment": "Dumbbells",
      "difficulty": 2,
      "workoutType": "strength"
    },
    {
      "name": "Hammer Curl",
      "muscle": ["biceps", "forearms"],
      "description": "A strength-building exercise that primarily targets the biceps and forearms, involving curling dumbbells upward with a neutral grip (palms facing each other) to improve arm strength and muscle definition.",
      "equipment": "Dumbbells",
      "difficulty": 2,
      "workoutType": "strength"
    },
    {
      "name": "Dumbbell Curl",
      "muscle": ["biceps"],
      "description": "A strength-building exercise that primarily targets the biceps, involving curling dumbbells upward with a supinated grip (palms facing up) to increase arm strength and muscle size.",
      "equipment": "Dumbbells",
      "difficulty": 2,
      "workoutType": "strength"
    },
    {
      "name": "Dumbbell Goblet Squats",
      "muscle": ["Quads", "Abs", "Adductor", "Calves", "Glutes", "Hamstrings", "Lower Back"],
      "description": "A lower-body strength exercise that primarily targets the quadriceps, glutes, and core, involving holding a dumbbell close to your chest in a goblet position while squatting down and standing back up to build leg strength and stability.",
      "equipment": "Dumbbells",
      "difficulty": 2,
      "workoutType": "strength"
    },
    {
      "name": "Barbell Back Squats",
      "muscle": ["Quads", "Calves", "Glutes", "Hamstring", "Lower Back"],
      "description": "A compound strength exercise that primarily targets the quadriceps, glutes, hamstrings, and lower back, involving placing a barbell across the upper back and shoulders while squatting down and standing back up to build lower body and core strength.",
      "equipment": "Barbell",
      "difficulty": 4,
      "workoutType": "strength"
    },
    {
      "name": "Leg Press",
      "muscle": ["Quads", "Abs", "Adductors", "Calves", "Glutes", "Hamstring", "Lower Back"],
      "description": "A lower-body strength exercise that primarily targets the quadriceps, glutes, and hamstrings, involving pushing a weighted platform away from the body using the legs while seated in a leg press machine to build leg strength.",
      "equipment": "Leg Press Machine",
      "difficulty": 2,
      "workoutType": "strength"
    },
    {
      "name": "Tricep Extension",
      "muscle": ["Triceps"],
      "description": "A strength-building exercise that primarily targets the triceps, involving extending the arms to lift a weight (such as a dumbbell, barbell, or cable) overhead or behind the head to develop arm strength and muscle definition.",
      "equipment": "Cable Machine",
      "difficulty": 2,
      "workoutType": "strength"
    },
    {
      "name": "Cable Tricep Extension",
      "muscle": ["Triceps"],
      "description": "A strength-building exercise that primarily targets the triceps, involving extending the arms while holding a cable attachment at a high pulley, pushing the weight downward to isolate and develop the tricep muscles.",
      "equipment": "Cable Machine",
      "difficulty": 3,
      "workoutType": "strength"
    },
    {
      "name": "Dumbbell Tricep Extension",
      "muscle": ["Triceps"],
      "description": "A strength-building exercise that primarily targets the triceps, involving holding a single dumbbell with both hands overhead and extending the arms upward to engage the triceps and develop arm strength and muscle definition.",
      "equipment": "Dumbbell",
      "difficulty": 2,
      "workoutType": "strength"
    },
    {
      "name": "Pull-Up",
      "muscle": ["Back", "Biceps", "Forearms"],
      "description": "A bodyweight exercise that targets the upper back, biceps, and forearms by pulling the body upward while hanging from a bar with an overhand grip, building upper body strength and muscle endurance.",
      "equipment": "Pull-Up Bar",
      "difficulty": 4,
      "workoutType": "strength"
    },
    {
      "name": "Deadlift",
      "muscle": ["Lower Back", "Glutes", "Hamstrings", "Quads"],
      "description": "A compound strength exercise that targets the lower back, glutes, hamstrings, and quadriceps by lifting a barbell from the ground to a standing position, developing full-body strength and power.",
      "equipment": "Barbell",
      "difficulty": 4,
      "workoutType": "strength"
    }
  ]
  


const muscleFilters = [
    { value: "Abductors" },
    { value: "Abs" },
    { value: "Adductors" },
    { value: "Biceps" },
    { value: "Calves" },
    { value: "Chest" },
    { value: "Forearms" },
    { value: "Glutes" },
    { value: "Hamstrings" },
    { value: "Hip Flexors" },
    { value: "IT Band" },
    { value: "Lats" },
    { value: "Lower Back" },
    { value: "Upper Back" },
    { value: "Neck" },
    { value: "Obliques" },
    { value: "Palmar Fascia" },
    { value: "Plantar Fascia" },
    { value: "Quads" },
    { value: "Shoulders" },
    { value: "Traps" },
    { value: "Triceps" }
  ]
  
const workoutTypeFilters = [
    { key: "Strength", value: "strength"},
    { key: "Endurance", value: "endurance"},
    { key: "Cardio", value: "cardio"},
]

const difficultyFilters = [
    { key: "1", value: 1 },
    { key: "2", value: 2 },
    { key: "3", value: 3 },
    { key: "4", value: 4 },
    { key: "5", value: 5 }
  ]
  

const browse = () => {
    const [selectedMuscles, setSelectedMuscles] = useState<Array<String>>([])

    // const changeFilters = () => {
    //     let filteredData = dataSample
    //     console.log(typeItem, muscleItem, muscleItem.length)

    //     if(typeItem != "All") {
    //         filteredData = filteredData.filter(function(value){
    //             return value.type == typeItem.toLowerCase()
    //         })
    //     }

    //     if(muscleItem != "All") {
    //         filteredData = filteredData.filter(function(value){
    //             return value.muscle == muscleItem.toLowerCase()
    //         })
    //     }
    //     setFilter(filteredData)
    // }

    const snapPoints = useMemo(() => ['70%'], [])
    const bottomSheetRef = useRef<BottomSheet>(null)
    const [bottomSheetText, setBottomSheetText] = useState("")

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>, [])

    const muscleOnPress = (value: Array<String>) => {
        if(!selectedMuscles.includes(value[0])) {
            setSelectedMuscles([...selectedMuscles, ...value])
        } else {
            setSelectedMuscles(selectedMuscles.filter((item) => item != value[0]))
        }
    }

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={[globalStyles.androidSafeView]}>
                <Text style={[globalStyles.pageTitle]}>Browse</Text>
                {/* row of filters */}
                <View style={{display: "flex", flexDirection: "row"}}>
                    {/* filter dropdowns */}
                    <Dropdown
                    style={{flex: 2}}
                        data={workoutTypeFilters}
                        labelField="key"
                        valueField="value"
                        onChange={(value)=> {
                            console.log("bob")
                            // let newSelectedMuscles = [...selectedMuscles, ...muscle]
                            // setSelectedMuscles(newSelectedMuscles)
                            // console.log(selectedMuscles)
                        }}
                    />
                    <MultiSelect
                        style={{flex: 2}}
                        data={muscleFilters}
                        labelField="value"
                        valueField="value"
                        visibleSelectedItem={false}
                        onChange={muscleOnPress}
                        renderItem={(muscle) => {
                            const isSelected = selectedMuscles.includes(muscle.value)
                            return(
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: isSelected? "#00FF00" : "#FFFFFF"
                                    }}
                                    >
                                    <Text>{muscle.value}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    
                    <Dropdown
                    style={{flex: 1}}
                        data={difficultyFilters}
                        labelField="key"
                        valueField="value"
                        onChange={(value)=> {
                            console.log("bob")
                            // let newSelectedMuscles = [...selectedMuscles, ...muscle]
                            // setSelectedMuscles(newSelectedMuscles)
                            // console.log(selectedMuscles)
                        }}
                    />

                    

                </View>

                <Text style={globalStyles.baseText}>{selectedMuscles}</Text>

                {/* <<View style={{display: "flex", flexDirection: "row"}}>
                    <Dropdown
                        style={{marginHorizontal: 16, flex: 1, height: 50}}
                        containerStyle={{backgroundColor: styleColors.darkest, borderRadius: 5}}
                        itemContainerStyle={{backgroundColor: styleColors.dark, borderRadius: 5}}
                        itemTextStyle={{color: styleColors.light, fontFamily: "Montserrat-Regular"}}
                        selectedTextStyle={{color: styleColors.light, fontFamily: "Montserrat-Regular"}}
                        data={typeFilters}
                        value={typeFilters[0]}
                        activeColor={styleColors.darkest}
                        placeholder="Type"
                        labelField="type"
                        valueField="type"
                        onChange={item=>{
                            typeItem = item.type
                            changeFilters()
                        }}
                    />

                    <Dropdown
                        style={{marginHorizontal: 16, flex: 1}}
                        containerStyle={{backgroundColor: styleColors.darkest, borderRadius: 5}}
                        itemContainerStyle={{backgroundColor: styleColors.dark, borderRadius: 5}}
                        itemTextStyle={{color: styleColors.light, fontFamily: "Montserrat-Regular"}}
                        selectedTextStyle={{color: styleColors.light, fontFamily: "Montserrat-Regular"}}
                        data={muscleFilters}
                        value={muscleFilters[0]}
                        activeColor={styleColors.darkest}
                        placeholder="Muscle"
                        labelField="muscle"
                        valueField="muscle"
                        onChange={item=>{
                            muscleItem = item.muscle
                            changeFilters()
                        }}
                    />
                </View>
                <FlatList 
                    // ListHeaderComponent={<View style={{backgroundColor: styleColors.darkest}}><Text style={globalStyles.pageTitle}>Browse</Text></View>}
                    // stickyHeaderIndices={[0]}
                    style={{paddingHorizontal: 16}}
                    contentContainerStyle={{gap: 8}}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={filter} 
                    keyExtractor={(item) => item.name} 
                    renderItem={({item}: {item: itemProps})=>(
                        <Pressable style={globalStyles.tile} onPress={() => {router.push({pathname: "(browse)/[workoutID]", params: {id: item.name, name: item.name, type: item.type, muscle: item.muscle, equipment: item.equipment, difficulty: item.difficulty, instructions: item.instructions}})}}>
                            <Text style={[itemText.text]}>{item.name}</Text>
                            <View style={{flex: 1}}></View>
                            
                            <Pressable 
                                // style={{backgroundColor: styleColors.darkest, alignItems: "center", justifyContent: "center", borderRadius: 999, flex: 1,}} 
                                style={{borderRadius: 999, backgroundColor: styleColors.darkest, alignItems: "center", justifyContent: "center", width: '8%', aspectRatio: 1, position: "absolute", top: 10, right: 10}}
                                onPress={() => {{
                                    setBottomSheetText(item.name)
                                    bottomSheetRef.current?.expand()
                                    
                                }}}
                                >
                                <Icon
                                    name="add"
                                    color={styleColors.light}
                                    size={24}
                                />
                            </Pressable>
                            
                        </Pressable>
                    )}  
                /> */}
                
                    
                <BottomSheet 
                    ref={bottomSheetRef}
                    
                    index={-1} 
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    handleIndicatorStyle={{backgroundColor: styleColors.light}}
                    backgroundStyle={{backgroundColor: styleColors.darkest}}
                    backdropComponent={renderBackdrop}
                >
                    
                    

                    <BottomSheetView>
                        <Text style={globalStyles.baseText}>Add {bottomSheetText}</Text>
                        
                    </BottomSheetView>
                </BottomSheet>
                
            </SafeAreaView>
        </GestureHandlerRootView>
    )

}

const itemText = StyleSheet.create({
    text: {
        color: "#ffffff",
        fontFamily: "Montserrat-Regular",
        fontSize: 18,
        padding: 10,
        flex: 3,
        //borderWidth: 1, borderColor: "#0000ff",
    }
})

export default browse