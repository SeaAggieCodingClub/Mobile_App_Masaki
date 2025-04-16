import { Pressable, Text, View, TextInput, StyleSheet, Alert, ActivityIndicator} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import globalStyles from "../globalStyles"
import { router, Stack, useLocalSearchParams } from "expo-router"
import styleColors from "../styleColors"
import { sessionObj, workoutObj, SessionContext, useSessionContext, useLoadSessions } from "./sessionContext"
import { FlatList } from "react-native"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useAuthContext } from "../(preAuth)/authContext"
import axios from "axios" 
import browse from "../(tabs)/browse"

const sessionID = () => {
    const _id = useLocalSearchParams<{_id: string}>()
    const {value: auth, setValue: setAuth} = useAuthContext()
    const {value: userSessions, setValue: setUserSessions} = useSessionContext()
    const [currentSession, setCurrentSession] = useState((userSessions.filter((item) => item._id == _id._id))[0])
    const uneditedSession = JSON.parse(JSON.stringify(userSessions.filter((item) => item._id == _id._id)[0]))
    // const [uneditedSession, setUneditedSession] = useState(currentSession)
    //console.log(currentSession.workoutObject)

    const viewableItemsChanged = useRef(false) //keeps track if flatlist got rendered

    const dayAbbreviations = {
        monday: 'M',
        tuesday: 'T',
        wednesday: 'W',
        thursday: 'Th',
        friday: 'F',
        saturday: 'Sa',
        sunday: 'Su',
    }

    const [loading, setLoading] = useState(false)

    
    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ];

    const [srwData, setSrwData] = useState<{id: string, srwType: string, value: number}[]>([]) 

    const handleSrwChange = (_id:string, srw: string, newValue:number) => {
        console.log(_id, srw, newValue)
        if(srwData.filter(item => item.id == _id && item.srwType == srw).length == 1) {
            console.log("edit old")
            setSrwData(prev => prev.map(item => item.id == _id ? item.srwType == srw ? {...item, value: newValue} : item : item))
        } else {
            console.log("add new")
            setSrwData((prev) => [...prev, {id: _id, srwType: srw, value: newValue}])
        }
        
    }

    // useEffect(() => {
    //     console.log(srwData)
    // }, [srwData])
    
    const loadSessions = async (user:string): Promise<void> => {
        await axios.post("http://10.0.2.2:4000/api/workouts/retrieveData",
        //await axios.post("http://10.0.2.2:4000/api/workouts/retrieveData",
            {
                username: user
            })
            .then(response => {
                setUserSessions(response.data.session)
            }).catch((error) => {
                console.log("session error")
                console.log(error.response)
            }
        )
        
    }

    const updateSessions = async (user:string, newSessions: sessionObj[], from:string): Promise<void> => {
        setLoading(true)
        await axios.post("http://10.0.2.2:4000/api/workouts/updateData",
        //await axios.post("http://10.0.2.2:4000/api/workouts/updateData",
            {
                username: user,
                session: newSessions,
            })
            .then(response => {
                //console.log(response.data)
                // loadSessions(user)

                if(from == "delete") {
                    console.log("deleteite")
                    router.back()
                }

                if(from == "add") {
                    router.back()
                    router.push({pathname: "../(tabs)/browse"})
                }

                if(from == "save") {
                    router.back()
                }

                setUserSessions(response.data.session)
                setCurrentSession((response.data.session as sessionObj[]).filter((item) => item._id == _id._id)[0])
                //setUserSessions(response.data.message)
            }).catch((error) => {
                console.log("session error")
                console.log(error.response)
            }
        )
        
        
        setLoading(false)
        //router.back()
    }

    const editSessionRef = useRef<BottomSheet>(null)
    const editSessionSnapPoints = useMemo(() => ['95%'], [])
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>, [])

    

    return (
        <GestureHandlerRootView>
        <View style={{backgroundColor: styleColors.darkest, flex: 1}}>
            <Stack.Screen options = {{
                headerTitle: currentSession.name,
                headerTitleStyle: {fontFamily: "Montserrat-Bold"},
                headerBackTitle: "Back",
                headerTintColor: styleColors.light,
                headerRight: () => <Pressable onPress={() => {
                    //Alert.alert("Are you sure you want to delete " + currentSession.name.toString() + "?", " ", [{text: "Cancel"}, {text: "Delete"}])
                    //delete session

                    console.log("srwdata", srwData)

                    const newData = currentSession
                    srwData.forEach((newValue) => {
                        const target = newData.workoutObject.findIndex(w => w._id == newValue.id)
                        console.log(target)
                        if(target != -1) {
                            // console.log(newValue)
                            if(newValue.srwType == "sets") {
                                newData.workoutObject[target].sets = newValue.value
                                console.log("changed sets")
                            } else if(newValue.srwType == "reps") {
                                newData.workoutObject[target].reps = newValue.value
                                console.log("changed reps")
                            } else if(newValue.srwType == "weights") {
                                newData.workoutObject[target].weights = newValue.value + " lbs"
                                console.log("changed weights")
                            }

                        }
                        console.log(newData)
                        setCurrentSession(newData)
                    })
                    
                    //console.log("current", currentSession)
                    // console.log(srwData)
                    //console.log(newData)
                    //console.log("unedited", uneditedSession)
                    //console.log(JSON.stringify(currentSession) != JSON.stringify(uneditedSession))
                    let sessionSelectedIndex = userSessions.findIndex((element) => element._id == currentSession._id)
                            //console.log(sessionSelectedIndex)
                    let newSession = [
                        ...userSessions.slice(0, sessionSelectedIndex),
                        {...newData},
                        ...userSessions.slice(sessionSelectedIndex + 1)
                    ]

                    console.log("ne", newSession)
                    console.log("un", uneditedSession)

                    if(JSON.stringify(newSession.filter((item) => item._id == _id._id)[0]) != JSON.stringify(uneditedSession)) {
                        if(typeof auth == "string" ) {
                            //loadSessions(auth)
                            // console.log(userSessions)
                            // console.log(_id._id)
                            
                            
                            
                            updateSessions(auth, newSession, "save")


                        } 
                    } else {
                        router.back()
                    }


                }}><Text style={{color: styleColors.primary, fontSize: 16, fontFamily: "Montserrat-Medium"}}>Save</Text></Pressable>,
                headerStyle: {
                backgroundColor: styleColors.dark,
                }
            }}/>

            {/*
            <FlatList
                style={{paddingHorizontal: 16}}
                numColumns={1}
                contentContainerStyle={{gap: 8}}
                //columnWrapperStyle={{gap: 8}}
                data={userSessions}
                keyExtractor={(item) => item._id}
                renderItem={({item})=>(
                    <Pressable
                        style={globalStyles.tile}
                        onPress={()=> {
                            // send session data to session slideout
                            router.push({pathname: "(session)/[sessionID]", params: {
                            _id: item._id,
                            }
                        })}}
                    >
                        <Text style={globalStyles.text}>{item.name}</Text>
                        
                    </Pressable>
                )}
            />
            */}
        {loading ? 
        //width: "30%", borderRadius: 8, aspectRatio: 1,
        //left: "35%", top: "20%", 
        <>
            <View style={{width: "100%", height: "100%", position: "absolute", zIndex: 1, margin: "auto", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                <ActivityIndicator style={{margin: "auto"}}size={"large"} color={"rgba(255, 255, 255, 0.5)"}/>
            </View>
        </> : <></>
        }

        {/* <Text style={globalStyles.baseText}>{currentSession.daysOfSession}</Text> */}
        
        {/* workouts within session */}
        <FlatList
        style={{paddingHorizontal: 16}}
            data={currentSession.workoutObject}
            keyExtractor={item => item._id}
            contentContainerStyle={{gap: 8}}
            ListHeaderComponent={() => (
                <>
                <FlatList 
                style={{
                    marginHorizontal: "auto",
                    paddingVertical: 16,
                }}
                horizontal={true}
                data={days}
                contentContainerStyle={{
                    gap: 8,
                }}
                renderItem={({item})=>(
                    <View>
                    <Pressable
                            style={{
                                aspectRatio: 1, 
                                //gap: 1,
                                backgroundColor: 
                                (currentSession.daysOfSession).includes(item) 
                                ? styleColors.primary 
                                : styleColors.dark,
                                borderRadius: 999,
                                width: 50,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            > 
    
                                <Text style={{margin: "auto", fontFamily: "Montserrat-Bold", 
                                    color: (currentSession.daysOfSession).includes(item) 
                                    ? styleColors.dark 
                                    : styleColors.light}}>
                                    {dayAbbreviations[item as keyof typeof dayAbbreviations]}
                                </Text>
        
                    </Pressable>
                    </View>
                )}
                />
                {currentSession.workoutObject.length == 0 ? <Text style={[globalStyles.text, {color: "rgba(255, 255, 255, 0.5)", textAlign: "center"}]}>Click 'Add Workouts' to Begin</Text> : <></> }
                </>
            )}
            onViewableItemsChanged={(item) => {
                if(viewableItemsChanged.current) return

                item.changed.map(workout => {
                    console.log(workout.item)
                    handleSrwChange(workout.item._id, "sets", workout.item.sets)
                    handleSrwChange(workout.item._id, "reps", workout.item.reps)
                    handleSrwChange(workout.item._id, "weights", Number(workout.item.weights.split(" ")[0]))
                })
                viewableItemsChanged.current = true 
            }}
            renderItem={(item) => (
                <>
                    <View style={{backgroundColor: styleColors.dark, padding: 16, borderRadius: 8}}>
                        {/* workout text and remove */}
                        <View style={{display: "flex", flexDirection: "row", paddingBottom: 8}}>
                            <Text adjustsFontSizeToFit={true} style={[globalStyles.text, {flex: 4, fontFamily: "Montserrat-Bold"}]}>{item.item.workout}</Text>
                            <Pressable 
                                style={{flex: 1}}
                                onPress={() => {
                                    //console.log(item.item.workout)
                                    if(typeof auth == "string") {
                                        // updateSessions(auth, userSessions.filter((thisWorkout) => thisWorkout._id !=))
                                        //let sessionSelectedIndex = userSessions.findIndex((element) => element._id == currentSession._id)
                                        //console.log(sessionSelectedIndex)
                                        // let newSession = [
                                        //     ...userSessions.slice(0, sessionSelectedIndex),
                                        //     {...currentSession, workoutObject: currentSession.workoutObject.filter((thisWorkout) => thisWorkout._id != item.item._id)},
                                        //     ...userSessions.slice(sessionSelectedIndex + 1)
                                        // ]
                                        // updateSessions(auth, newSession)
                                        
                                        //edit local session to remove workout
                                        console.log("filterlog", srwData.filter(element => element.id != item.item._id))
                                        setSrwData((prev) => prev.filter(element => element.id != item.item._id))
                                        
                                        setCurrentSession({...currentSession, workoutObject: currentSession.workoutObject.filter((thisWorkout) => thisWorkout._id != item.item._id)})
                                    }                            
                                }}
                            >
                                    <Text style={[globalStyles.text, {color: styleColors.primary, fontSize: 16, textAlign: "right"}]}>Remove</Text>
                            </Pressable>
                        </View>
                        {/* sets */}
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Text style={[globalStyles.text, style.srwText]}>Sets: </Text>
                            <TextInput 
                                style={style.srwInput}
                                textAlign={"center"}
                                inputMode={"numeric"}
                                maxLength={3}
                                defaultValue={item.item.sets.toString().trim()}
                                selectionColor={"rgba(255, 255, 255, 0.25)"}
                                onChangeText={(input) => {
                                    if(!isNaN(Number(input))) {
                                        handleSrwChange(item.item._id, "sets", Number(input))
                                    } else {
                                        handleSrwChange(item.item._id, "sets", 0)
                                    }
                                    
                                }}
                            />
                        </View>
                        <View style={{height: 8}}></View>
                        {/* reps */}
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Text style={[globalStyles.text, style.srwText]}>Reps: </Text>
                            <TextInput 
                                style={style.srwInput}
                                textAlign={"center"}
                                inputMode={"numeric"}
                                maxLength={3}
                                defaultValue={item.item.reps.toString().trim()}
                                selectionColor={"rgba(255, 255, 255, 0.25)"}
                                onChangeText={(input) => {
                                    if(!isNaN(Number(input))) {
                                        handleSrwChange(item.item._id, "reps", Number(input))
                                    } else {
                                        handleSrwChange(item.item._id, "reps", 0)
                                    }
                                }}
                            />
                        </View>
                        <View style={{height: 8}}></View>
                        {/* weights */}
                        <View style={{display: "flex", flexDirection: "row",}}>
                            <Text style={[globalStyles.text, style.srwText]}>Weights: </Text>
                            <TextInput 
                                style={style.srwInput}
                                textAlign={"center"}
                                inputMode={"numeric"}
                                maxLength={3}
                                defaultValue={item.item.weights.toString().split(" ")[0]}
                                selectionColor={"rgba(255, 255, 255, 0.25)"}
                                onChangeText={(input) => {
                                    if(!isNaN(Number(input))) {
                                        handleSrwChange(item.item._id, "weights", Number(input))
                                    } else {
                                        handleSrwChange(item.item._id, "weights", 0)
                                    }
                                }}
                            />
                        </View>
                    </View>
                </>
            )}
            ListFooterComponent={() => (
                <>
                    <Pressable 
                        style={{backgroundColor: styleColors.dark,borderRadius: 8, padding: 8, marginBottom: 8}}
                        onPress={() => {
                            //saves current changes

                            if(typeof auth == "string") {
                            // console.log(srwData)

                                const newData = currentSession
                                srwData.forEach((newValue) => {
                                    const target = newData.workoutObject.findIndex(w => w._id == newValue.id)
                                    console.log(target)
                                    if(target != -1) {
                                        // console.log(newValue)
                                        if(newValue.srwType == "sets") {
                                            newData.workoutObject[target].sets = newValue.value
                                            console.log("changed sets")
                                        } else if(newValue.srwType == "reps") {
                                            newData.workoutObject[target].reps = newValue.value
                                            console.log("changed reps")
                                        } else if(newValue.srwType == "weights") {
                                            newData.workoutObject[target].weights = newValue.value + " lbs"
                                            console.log("changed weights")
                                        }
            
                                    }
                                    console.log(newData)
                                    setCurrentSession(newData)
                                })

                                let sessionSelectedIndex = userSessions.findIndex((element) => element._id == currentSession._id)
                            //console.log(sessionSelectedIndex)
                                let newSession = [
                                    ...userSessions.slice(0, sessionSelectedIndex),
                                    {...newData},
                                    ...userSessions.slice(sessionSelectedIndex + 1)
                                ]
                                
                                if(JSON.stringify(newSession.filter((item) => item._id == _id._id)[0]) != JSON.stringify(uneditedSession)) {
                                    let sessionSelectedIndex = userSessions.findIndex((element) => element._id == currentSession._id)
                                    updateSessions(auth, newSession, "add")
                                } else {
                                    router.back()
                                    router.push({pathname: "../(tabs)/browse"})
                                }
                                
                            }
                            
                        }}>
                            <Text style={[globalStyles.text, {marginHorizontal: "auto", textAlignVertical: "center"}]}>Add Workouts</Text>
                    </Pressable>

                    {/* delete session */}
                    <Pressable 
                        style={{backgroundColor: styleColors.dark, borderRadius: 8, padding: 8, marginBottom: 16}}
                        onPress={() => {
                            if(typeof auth == "string") {
                                updateSessions(auth, userSessions.filter((item) => item._id != _id._id), "delete")
                            }   
                            
                        }}>
                            <Text style={[globalStyles.text, {color: "#FF0000", marginHorizontal: "auto", textAlignVertical: "center"}]}>Delete Session</Text>
                    </Pressable>
                </>

        )}
        />

        <BottomSheet
            ref={editSessionRef}
            snapPoints={editSessionSnapPoints}
            index={-1} 
            enablePanDownToClose={true}
            enableDynamicSizing={false}
            handleIndicatorStyle={{backgroundColor: styleColors.light}}
            backgroundStyle={{backgroundColor: styleColors.darkest}}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetView>
                <FlatList
                    style={{paddingHorizontal: 16}}
                    data={currentSession.workoutObject}
                    keyExtractor={item => item._id}
                    renderItem={(item) => (
                        <>
                            
                        </>
                    )}
                />
                
            </BottomSheetView>
        </BottomSheet>
        
        </View>

        </GestureHandlerRootView>
    )
}

const style = StyleSheet.create({
    srwInput: {
        backgroundColor: styleColors.darkest,
        padding: 8,
        height: 50,
        fontFamily: "Montserrat-Medium",
        color: styleColors.light,
        fontSize: 24,
        flex: 1,
    },
    srwText: {
        textAlignVertical: "center",
        flex: 6
    }
})

export default sessionID