import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, FlatList, Pressable } from "react-native"
import { Link, router, Stack } from "expo-router"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
import BottomSheet, {BottomSheetBackdrop, BottomSheetView, TouchableOpacity} from "@gorhom/bottom-sheet"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import { GestureHandlerRootView, ScrollView, TextInput } from "react-native-gesture-handler"
import Icon from '@expo/vector-icons/MaterialIcons'
import { WorkoutsContext, workoutType, workoutsType } from "../(browse)/workoutsContext"

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
    const workoutData = useContext(WorkoutsContext)

    const [searchInput, setSearchInput] = useState<string>("")
    const [selectedType, setSelectedType] = useState<string>("All")
    const [selectedMuscles, setSelectedMuscles] = useState<Array<string>>(["All"])
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")

    const [workoutDataFiltered, setWorkoutDataFiltered] = useState<workoutType[]>(workoutData.value)
    

    
    useEffect(() => {
        let newFilteredData = workoutData.value
        //console.log("filter" + newFilteredData)
        if(searchInput != "") {
            //console.log("theres stuff")
            newFilteredData = newFilteredData.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
            //console.log("filtered" + newFilteredData)
        }
        if(selectedType != "All") {
            newFilteredData = newFilteredData.filter(item => item.workoutType[0].toLowerCase() == selectedType.toLowerCase())
        }
        if(!selectedMuscles.includes("All")) {
            //newFilteredData.forEach(item => item.muscle.forEach(item2 => console.log(item2.toLowerCase())))
            //newFilteredData = newFilteredData.filter(item => selectedMuscles.includes(item.muscle[0]) )
            //newFilteredData = newFilteredData.filter(item => item.muscle.every(muscle => selectedMuscles.includes(muscle.toLowerCase())))
            newFilteredData = newFilteredData.filter(item => selectedMuscles.every(sMuscle => item.muscle.includes(sMuscle)))
        }
        if(selectedDifficulty != "All") {
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
                        <Pressable 
                            style={globalStyles.tile}
                            onPress={() => {
                                router.push({pathname: "(browse)/[workoutID]", params: {
                                    name: item.name,
                                    muscle: item.muscle,
                                    description: item.description,
                                    equipment: item.equipment,
                                    difficulty: item.difficulty,
                                    workoutType: item.workoutType,
                                }})
                            }}
                        >
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