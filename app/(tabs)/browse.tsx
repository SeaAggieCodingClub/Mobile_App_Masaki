import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, FlatList, Pressable } from "react-native"
import { Link, router, Stack } from "expo-router"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
import BottomSheet, {BottomSheetBackdrop, BottomSheetView, TouchableOpacity} from "@gorhom/bottom-sheet"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import { GestureHandlerRootView, ScrollView, TextInput } from "react-native-gesture-handler"
import Icon from '@expo/vector-icons/MaterialIcons'
import { WorkoutsContext, workoutInterface, workoutsType } from "../(browse)/workoutsContext"
import { useAuthContext, secureStoreGet, secureStoreSet } from "../(preAuth)/authContext"
import { workoutObj, sessionObj, useSessionContext } from "../(session)/sessionContext"
const axios = require('axios').default

  

const browse = () => {
    const workoutData = useContext(WorkoutsContext)

    const [muscleFiltersLabel, setMuscleFiltersLabel] = useState("Muscles")

    const muscleFilters = [
        {value: "All" },
        {value: "Abductors" },
        {value: "Abs" },
        {value: "Adductors" },
        {value: "Biceps" },
        {value: "Calves" },
        {value: "Chest" },
        {value: "Forearms" },
        {value: "Glutes" },
        {value: "Hamstrings" },
        {value: "Hip Flexors" },
        {value: "IT Band" },
        {value: "Lats" },
        {value: "Lower Back" },
        {value: "Upper Back" },
        {value: "Neck" },
        {value: "Obliques" },
        {value: "Palmar Fascia" },
        {value: "Plantar Fascia" },
        {value: "Quads" },
        {value: "Shoulders" },
        {value: "Traps" },
        {value: "Triceps" }
    ]
      
    const workoutTypeFilters = [
        { key: "Type", value: "All"},
        { key: "Strength", value: "Strength"},
        { key: "Endurance", value: "Endurance"},
        { key: "Cardio", value: "Cardio"},
    ]

    const difficultyFilters = [
        { key: "Difficulty", value: "All" },
        { key: "Difficulty: 1", value: "1" },
        { key: "Difficulty: 2", value: "2" },
        { key: "Difficulty: 3", value: "3" },
        { key: "Difficulty: 4", value: "4" },
        { key: "Difficulty: 5", value: "5" }
    ]

    const [searchInput, setSearchInput] = useState<string>("")
    const [selectedType, setSelectedType] = useState<string>("All")
    const [selectedMuscles, setSelectedMuscles] = useState<Array<string>>(["All"])
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")
    const {value: userSessions, setValue: setUserSessions} = useSessionContext()
    const [errorMessage, setErrorMessage] = useState<String>()
    const {value: auth, setValue: setAuth} = useAuthContext()
    const [workoutDataFiltered, setWorkoutDataFiltered] = useState<workoutInterface[]>(workoutData.value)
    
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
            newFilteredData = newFilteredData.filter(item => selectedMuscles.every(sMuscle => item.muscle.includes(sMuscle.toLowerCase())))
            setMuscleFiltersLabel("Muscles (" + selectedMuscles.length.toString() + ")")
        } else {
            setMuscleFiltersLabel("Muscles")
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
    const [workoutName, setWorkoutName] = useState("")
    const [updatedSessions, setUpdatedSessions] = useState({})
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
                <View style={[{display: "flex", flexDirection: "row", gap: 8, marginHorizontal: 16}]}>
                    {/* filter dropdowns */}
                    <Dropdown
                        style={{flex: 1, backgroundColor: styleColors.dark, paddingVertical: 16, paddingHorizontal: 8}}
                        selectedTextStyle={{color: styleColors.light, fontSize: 16, fontFamily: "Montserrat-Medium"}}
                        containerStyle={{borderWidth: 0}}
                        data={workoutTypeFilters}
                        labelField="key"
                        valueField="value"
                        placeholder={"Type"}
                        value={selectedType}
                        placeholderStyle={{color: styleColors.light, fontSize: 16, fontFamily: "Montserrat-Medium"}}
                        onChange={(type)=> {
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
                        placeholder={muscleFiltersLabel}
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
                                    <Text 
                                        style={{
                                            color: isSelected? styleColors.primary : styleColors.light , 
                                            fontSize: 16, 
                                            fontFamily: "Montserrat-Medium"
                                        }}
                                    >{muscle.value}</Text>
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
                        labelField="key"
                        valueField="value"
                        placeholder={"Difficulty"}
                        value={selectedDifficulty}
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
                                        }}
                                    >{difficulty.value}</Text>
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
                    keyExtractor={(item) => item._id} 
                    renderItem={({item})=>(
                        <Pressable 
                            style={[globalStyles.tile]}
                            onPress={() => {
                                router.push({pathname: "(browse)/[workoutID]", params: {
                                    _id: item._id
                                }})
                                console.log(item._id)
                            }}
                        >
                            <Text style={globalStyles.text}>{item.name}</Text>
                            <View style={{flex: 1}}></View>
                            
                            <Pressable 
                                // style={{backgroundColor: styleColors.darkest, alignItems: "center", justifyContent: "center", borderRadius: 999, flex: 1,}} 
                                style={{borderRadius: 999, backgroundColor: styleColors.darkest, alignItems: "center", justifyContent: "center", width: '8%', aspectRatio: 1, position: "absolute", top: 10, right: 10}}
                                onPress={() => {{
                                    setBottomSheetText(item.name)
                                    setWorkoutName(workoutData.value.filter((i)=> i._id == item._id)[0].name)
                                    //backend pull session
                                    // axios.post('http://localhost:4000/api/workouts/retrieveData',
                                    // axios.post("http://10.0.2.2:4000/api/workouts/retrieveData",
                                    // {
                                    //     username: auth,
                                    // })
                                    // .then((response:any) => {
                                    //     console.log(response.data.session)
                                    //     setUserSessions(response.data.session)
                                    //     // if(response["data" as keyof object]["success"]) {
                                    //     //     console.log(response)
                                    //     //     // setWorkoutDataFiltered(response)
                                    //     // }
                                    //     // else {
                                    //     //     setErrorMessage(response["data" as keyof object]["message"])
                                    //     // }
                                    // })
                                    // .catch(function (error : object) {
                                    //     console.log(error)
                                    // })
                                    bottomSheetRef.current?.expand()
                                    
                                }}}>
                                <Icon
                                    name="add"
                                    color={"rgba(255, 255, 255, 0.75)"}
                                    size={24}
                                />
                            </Pressable>
                            
                        </Pressable>
                    )}  
                    ListFooterComponent={<View style={{height: 16}}></View>}
                />
                
                    
                <BottomSheet 
                    ref={bottomSheetRef}
                    enableDynamicSizing={false}
                    index={-1} 
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    handleIndicatorStyle={{backgroundColor: styleColors.light}}
                    backgroundStyle={{backgroundColor: styleColors.darkest}}
                    backdropComponent={renderBackdrop}
                >
                    
                    

                    <BottomSheetView>
                        <Text style={globalStyles.baseText}>Add {bottomSheetText} </Text>
                        {/*show sessions Important*/}
                        <FlatList
                            data={userSessions}
                            keyExtractor={(item) => item.name}
                            renderItem={({item})=>(
                                <Pressable
                                    onPress ={()=>{
                                        const filteredUserSessions = userSessions.map(({ _id, ...session }) => ({
                                            ...session,
                                            workoutObject: session.workoutObject.map(({ _id, ...workout }) => workout),
                                          }));
                                        let newWorkoutObject = {
                                            "workout": workoutName,
                                            "sets": 0,
                                            "reps": 0,
                                            "weights": "0 lbs"
                                        }                                        
                                        let sessionSelectedIndex = userSessions.findIndex((i) => i._id == item._id)
                                        let sessionSelected = filteredUserSessions[sessionSelectedIndex]
                                        let updateSession = [...sessionSelected.workoutObject, newWorkoutObject]
                                        let newSessionObject = {
                                            "name": item.name,
                                            "daysOfSession": item.daysOfSession,
                                            "workoutObject": updateSession
                                        }
                                        let newSession = [
                                            ...filteredUserSessions.slice(0, sessionSelectedIndex),
                                            newSessionObject,
                                            ...filteredUserSessions.slice(sessionSelectedIndex + 1)
                                        ]
                                        //setUpdatedSessions(newSession);
                                
                                        //backend post session
                                        axios.post("http://10.0.2.2:4000/api/workouts/updateData",
                                        // axios.post('http://localhost:4000/api/workouts/updateData',
                                        {
                                            username: auth,
                                            session: newSession
                                            //problem came from userSessions not updating each time I call the backend
                                        })
                                        .then((response:any) => {
                                            //console.log(response.data[0])   
                                            //console.log(response.data)  
                                            setUserSessions(response.data.session)                                       
                                            // if(response["data" as keyof object]["success"]) {
                                            //     console.log(response)
                                            //     // setWorkoutDataFiltered(response)
                                            // }
                                            // else {
                                            //     setErrorMessage(response["data" as keyof object]["message"])
                                            // }
                                        })
                                        .catch(function (error : object) {
                                            console.log(error)
                                            newSession = []
                                        })
                                    }} 
                                >
                                    <Text style={{color: '#ffff'}}>
                                    {item.name}
                                    </Text>
                                </Pressable>
                            )}
                        />
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