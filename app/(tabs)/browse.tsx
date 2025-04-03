import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, FlatList, Pressable } from "react-native"
import { Link, router, Stack } from "expo-router"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
import BottomSheet, {BottomSheetBackdrop, BottomSheetView, TouchableOpacity} from "@gorhom/bottom-sheet"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import { GestureHandlerRootView, ScrollView, TextInput } from "react-native-gesture-handler"
import Icon from '@expo/vector-icons/MaterialIcons'

const workoutData = [
    {
      name: "Bicep Curls",
      muscle: ["biceps", "forearms"],
      description: "A strength exercise targeting the biceps by curling weights upward while keeping elbows close to the body.",
      equipment: "Dumbbells",
      difficulty: 2,
      workoutType: "strength"
    },
    {
      name: "Barbell Bench Press",
      muscle: ["chest", "shoulders", "triceps"],
      description: "A strength-building exercise that primarily targets the chest muscles, involving pressing a barbell upward from a lying position to develop upper body strength and stability.",
      equipment: "Barbells",
      difficulty: 3,
      workoutType: "strength"
    },
    {
      name: "Dumbbell Bench Press",
      muscle: ["chest", "shoulders", "triceps"],
      description: "A strength-building exercise that primarily targets the chest muscles, involving pressing a pair of dumbbells upward from a lying position to enhance upper body strength, stability, and muscle balance.",
      equipment: "Dumbbells",
      difficulty: 2,
      workoutType: "strength"
    },
    {
      name: "Hammer Curl",
      muscle: ["biceps", "forearms"],
      description: "A strength-building exercise that primarily targets the biceps and forearms, involving curling dumbbells upward with a neutral grip (palms facing each other) to improve arm strength and muscle definition.",
      equipment: "Dumbbells",
      difficulty: 2,
      workoutType: "strength"
    },
    {
      name: "Dumbbell Curl",
      muscle: ["biceps"],
      description: "A strength-building exercise that primarily targets the biceps, involving curling dumbbells upward with a supinated grip (palms facing up) to increase arm strength and muscle size.",
      equipment: "Dumbbells",
      difficulty: 2,
      workoutType: "strength"
    },
    {
      name: "Dumbbell Goblet Squats",
      muscle: ["Quads", "Abs", "Adductor", "Calves", "Glutes", "Hamstrings", "Lower Back"],
      description: "A lower-body strength exercise that primarily targets the quadriceps, glutes, and core, involving holding a dumbbell close to your chest in a goblet position while squatting down and standing back up to build leg strength and stability.",
      equipment: "Dumbbells",
      difficulty: 2,
      workoutType: "strength"
    },
    {
      name: "Barbell Back Squats",
      muscle: ["Quads", "Calves", "Glutes", "Hamstring", "Lower Back"],
      description: "A compound strength exercise that primarily targets the quadriceps, glutes, hamstrings, and lower back, involving placing a barbell across the upper back and shoulders while squatting down and standing back up to build lower body and core strength.",
      equipment: "Barbell",
      difficulty: 4,
      workoutType: "strength"
    },
    {
      name: "Leg Press",
      muscle: ["Quads", "Abs", "Adductors", "Calves", "Glutes", "Hamstring", "Lower Back"],
      description: "A lower-body strength exercise that primarily targets the quadriceps, glutes, and hamstrings, involving pushing a weighted platform away from the body using the legs while seated in a leg press machine to build leg strength.",
      equipment: "Leg Press Machine",
      difficulty: 2,
      workoutType: "strength"
    },
    {
      name: "Tricep Extension",
      muscle: ["Triceps"],
      description: "A strength-building exercise that primarily targets the triceps, involving extending the arms to lift a weight (such as a dumbbell, barbell, or cable) overhead or behind the head to develop arm strength and muscle definition.",
      equipment: "Cable Machine",
      difficulty: 2,
      workoutType: "strength"
    },
    {
      name: "Cable Tricep Extension",
      muscle: ["Triceps"],
      description: "A strength-building exercise that primarily targets the triceps, involving extending the arms while holding a cable attachment at a high pulley, pushing the weight downward to isolate and develop the tricep muscles.",
      equipment: "Cable Machine",
      difficulty: 3,
      workoutType: "strength"
    },
    {
      name: "Dumbbell Tricep Extension",
      muscle: ["Triceps"],
      description: "A strength-building exercise that primarily targets the triceps, involving holding a single dumbbell with both hands overhead and extending the arms upward to engage the triceps and develop arm strength and muscle definition.",
      equipment: "Dumbbell",
      difficulty: 2,
      workoutType: "strength"
    },
    {
      name: "Pull-Up",
      muscle: ["Back", "Biceps", "Forearms"],
      description: "A bodyweight exercise that targets the upper back, biceps, and forearms by pulling the body upward while hanging from a bar with an overhand grip, building upper body strength and muscle endurance.",
      equipment: "Pull-Up Bar",
      difficulty: 4,
      workoutType: "strength"
    },
    {
      name: "Deadlift",
      muscle: ["Lower Back", "Glutes", "Hamstrings", "Quads"],
      description: "A compound strength exercise that targets the lower back, glutes, hamstrings, and quadriceps by lifting a barbell from the ground to a standing position, developing full-body strength and power.",
      equipment: "Barbell",
      difficulty: 4,
      workoutType: "strength"
    }
  ];
  
  
interface workout {
    name: string,
    muscle: string[],
    description: string,
    equipment: string,
    difficulty: number,
    workoutType: string,
}

const muscleFilters = [
    { value: "All" },
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
    { key: "Type", value: "All"},
    { key: "Type", value: "Strength"},
    { key: "Type", value: "Endurance"},
    { key: "Type", value: "Cardio"},
]

const difficultyFilters = [
    { key: "Difficulty", value: "All" },
    { key: "Difficulty", value: "1" },
    { key: "Difficulty", value: "2" },
    { key: "Difficulty", value: "3" },
    { key: "Difficulty", value: "4" },
    { key: "Difficulty", value: "5" }
  ]
  

const browse = () => {
    const [searchInput, setSearchInput] = useState<string>("")
    const [selectedType, setSelectedType] = useState<string>("All")
    const [selectedMuscles, setSelectedMuscles] = useState<Array<string>>(["All"])
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")

    const [workoutDataFiltered, setWorkoutDataFiltered] = useState<Array<workout>>(workoutData)
    

    
    useEffect(() => {
        let newFilteredData = workoutData
        //console.log("filter" + newFilteredData)
        if(searchInput != "") {
            //console.log("theres stuff")
            newFilteredData = newFilteredData.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
            //console.log("filtered" + newFilteredData)
        }
        if(selectedType != "All") {
            newFilteredData = newFilteredData.filter(item => item.workoutType.toLowerCase() == selectedType.toLowerCase())
        }
        if(!selectedMuscles.includes("All")) {
            console.log(selectedMuscles)
            //newFilteredData.forEach(item => item.muscle.forEach(item2 => console.log(item2.toLowerCase())))
            //newFilteredData = newFilteredData.filter(item => selectedMuscles.includes(item.muscle[0]) )
            //newFilteredData = newFilteredData.filter(item => item.muscle.every(muscle => selectedMuscles.includes(muscle.toLowerCase())))
            newFilteredData = newFilteredData.filter(item => selectedMuscles.every(sMuscle => item.muscle.includes(sMuscle)))
        }
        if(selectedDifficulty != "All") {
            console.log(selectedDifficulty)
            newFilteredData = newFilteredData.filter(item => item.difficulty.toString() == selectedDifficulty)
        }
        // console.log(newFilteredData)
        setWorkoutDataFiltered(newFilteredData)
    }, [searchInput, selectedType, selectedMuscles, selectedDifficulty])
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


    return (
        <GestureHandlerRootView>
            <SafeAreaView style={[globalStyles.androidSafeView]}>
                <Text style={[globalStyles.pageTitle]}>Browse</Text>
                {/* search bar muscle */}
                <TextInput 
                    style={[globalStyles.textInput, {marginHorizontal: 16, marginBottom: 8, fontSize: 16}]}
                    placeholder={"Search..."}
                    placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
                    selectionColor={"rgba(255, 255, 255, 0.25)"}
                    onChangeText={(input) => {
                        setSearchInput(input.trim())
                    }}
                ></TextInput>
                {/* row of filters */}
                <View style={{display: "flex", flexDirection: "row", gap: 8, marginHorizontal: 16}}>
                    {/* filter dropdowns */}
                    <Dropdown
                        style={{flex: 1, backgroundColor: styleColors.dark, paddingVertical: 16, paddingHorizontal: 8}}
                        selectedTextStyle={{color: styleColors.light, fontSize: 16, fontFamily: "Montserrat-Medium"}}
                        containerStyle={{borderWidth: 0}}
                        data={workoutTypeFilters}
                        selectedTextProps={{}}
                        labelField="key"
                        valueField="value"
                        placeholder={"Type"}
                        placeholderStyle={{color: styleColors.light, fontSize: 16, fontFamily: "Montserrat-Medium"}}
                        onChange={(type)=> {
                            console.log("bob")
                            setSelectedType(type.value)
                        }}

                        renderItem={(type) => {
                            const isSelected = selectedType == type.value
                            return(
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: isSelected? styleColors.darkest : styleColors.dark,
                                        padding: 8,
                                        paddingVertical: 16,
                                    }}
                                    >
                                    <Text style={{
                                        color: isSelected? styleColors.primary : styleColors.light,
                                        fontSize: 16, 
                                        fontFamily: "Montserrat-Medium"
                                    }}>{type.value}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    <MultiSelect
                        style={{flex: 1, backgroundColor: styleColors.dark, paddingVertical: 16, paddingHorizontal: 8}}
                        containerStyle={{borderWidth: 0, borderRadius: 8}}
                        data={muscleFilters}
                        labelField="value"
                        valueField="value"
                        visibleSelectedItem={false}
                        placeholder={"Muscle"}
                        placeholderStyle={{color: styleColors.light, fontSize: 16, fontFamily: "Montserrat-Medium"}}
                        onChange={(value: Array<string>) => {
                            if(value[0] == "All") {
                                setSelectedMuscles(["All"])
                            } else {
                                if(selectedMuscles.includes(value[0])) {
                                    if(selectedMuscles.length == 1) {
                                        setSelectedMuscles(["All"])
                                    } else {
                                        setSelectedMuscles(selectedMuscles.filter((item) => item != value[0]))
                                    }
                                } else {
                                    setSelectedMuscles([...selectedMuscles.filter((item) => item != "All"), ...[value[0]]])
                                }
                               
                            }
                            
                        }}
                        renderItem={(muscle) => {
                            const isSelected = selectedMuscles.includes(muscle.value)
                            return(
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: isSelected? styleColors.darkest : styleColors.dark,
                                        padding: 8,
                                        paddingVertical: 16
                                    }}
                                >
                                    <Text style={{
                                        color: isSelected? styleColors.primary : styleColors.light , 
                                        fontSize: 16, 
                                        fontFamily: "Montserrat-Medium"
                                    }}>{muscle.value}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    
                    {/* difficulty */}
                    <Dropdown
                        style={{flex: 1, backgroundColor: styleColors.dark, paddingVertical: 16, paddingHorizontal: 8}}
                        selectedTextStyle={{color: styleColors.light, fontSize: 16, fontFamily: "Montserrat-Medium"}}
                        containerStyle={{borderWidth: 0}}
                        data={difficultyFilters}
                        selectedTextProps={{}}
                        labelField="key"
                        valueField="value"
                        placeholder={"Difficulty"}
                        placeholderStyle={{color: styleColors.light, fontSize: 16, fontFamily: "Montserrat-Medium"}}
                        onChange={(difficulty)=> {
                            setSelectedDifficulty(difficulty.value)
                        }}

                        renderItem={(difficulty) => {
                            const isSelected = selectedDifficulty == difficulty.value
                            return(
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: isSelected? styleColors.darkest : styleColors.dark,
                                        padding: 8,
                                        paddingVertical: 16,
                                    }}
                                    >
                                    <Text style={{
                                        color: isSelected? styleColors.primary : styleColors.light,
                                        fontSize: 16, 
                                        fontFamily: "Montserrat-Medium"
                                    }}>{difficulty.value}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />

                    

                </View>


                {/* muscles list */}
                {/* <FlatList>

                </FlatList> */}
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
                */}
                <View style={{marginHorizontal: 8, marginVertical: 16, backgroundColor: "rgba(255, 255, 255, 0.25)", borderWidth: 1, height: 4}}></View>
                <FlatList 
                    // ListHeaderComponent={<View style={{backgroundColor: styleColors.darkest}}><Text style={globalStyles.pageTitle}>Browse</Text></View>}
                    // stickyHeaderIndices={[0]}
                    style={{paddingHorizontal: 16}}
                    contentContainerStyle={{gap: 8}}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={workoutDataFiltered} 
                    keyExtractor={(item) => item.name} 
                    renderItem={({item})=>(
                        <Pressable style={globalStyles.tile} onPress={() => {router.push({pathname: "(browse)/[workoutID]", params: {
                            name: item.name,
                            muscle: item.muscle,
                            description: item.description,
                            equipment: item.equipment,
                            difficulty: item.difficulty,
                            workoutType: item.workoutType,
                            }})}}>
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
                />
                
                    
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