import { Pressable, Text, View, TextInput, StyleSheet, Alert} from "react-native"
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



const sessionID = () => {



    const _id = useLocalSearchParams<{_id: string}>()
    const {value: auth, setValue: setAuth} = useAuthContext()
    const {value: userSessions, setValue: setUserSessions} = useSessionContext()
    const [currentSession, setCurrentSession] = useState((userSessions.filter((item) => item._id == _id._id))[0])
    //console.log(currentSession.workoutObject)

    const dayAbbreviations = {
        monday: 'M',
        tuesday: 'T',
        wednesday: 'W',
        thursday: 'Th',
        friday: 'F',
        saturday: 'Sa',
        sunday: 'Su',
      }

    const [srwData, setSrwData] = useState<{id: string, srwType: string, value: number}[]>([]) 

    const handleSrwChange = (_id:string, srw: string, newValue:number) => {
        if(srwData.filter(item => item.id == _id && item.srwType == srw).length == 1) {
            console.log("edit old")
            setSrwData(prev => prev.map(item => item.id == _id ? item.srwType == srw ? {...item, value: newValue} : item : item))
        } else {
            console.log("add new")
            setSrwData((prev) => [...prev, {id: _id, srwType: srw, value: newValue}])
        }
        
    }

    useEffect(() => {
        console.log(srwData)
    }, [srwData])
    
    const loadSessions = async (user:string): Promise<void> => {
        await axios.post("http://10.0.2.2:4000/api/workouts/retrieveData",
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

    const updateSessions = async (user:string, newSessions: sessionObj[]): Promise<void> => {
        await axios.post("http://10.0.2.2:4000/api/workouts/updateData",
            {
                username: user,
                session: newSessions,
            })
            .then(response => {
                console.log(response.data)
                loadSessions(user)
                //setUserSessions(response.data.message)
            }).catch((error) => {
                console.log("session error")
                console.log(error.response)
            }
        )
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

                    if(typeof auth == "string") {
                        //loadSessions(auth)
                        console.log(userSessions)
                        console.log(_id._id)
                        updateSessions(auth, userSessions.filter((item) => item._id != _id._id))
                        loadSessions(auth)
                        router.back()
                        
                    }
                    
                   


                }}><Text style={{color: "#FF0000", fontSize: 16, fontFamily: "Montserrat-Medium"}}>Delete</Text></Pressable>,
                headerStyle: {
                backgroundColor: styleColors.dark,
                }
            }}/>

            <FlatList 
            horizontal={true}
            data={currentSession.daysOfSession}
            contentContainerStyle={{ display: "flex", 
                flexDirection: "row", 
                paddingHorizontal: 16, 
                marginHorizontal: 15,
                paddingTop: 15,
                paddingBottom: 15, 
                gap: 8,
            }}
            renderItem={({item})=>(
                <View>
                <Pressable
                        style={{
                            aspectRatio: 1, 
                            right: 16,
                            gap: 1,
                            backgroundColor: styleColors.primary,
                            borderRadius: 999,
                            width: 45,
                            alignItems: 'center'
                        }}
                        > 

                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold", color: styleColors.dark}}>
                                {dayAbbreviations[item as keyof typeof dayAbbreviations] ?? item}
                            </Text>
    
                </Pressable>
                </View>
            )}
            />

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
        
        {/* workouts within session */}
        <FlatList
        style={{paddingHorizontal: 16}}
            data={currentSession.workoutObject}
            keyExtractor={item => item._id}
            contentContainerStyle={{gap: 8}}
            // ListHeaderComponent={() => (
            //     <Text style={[globalStyles.baseText, {fontFamily: "Montserrat-Bold"}]}>Workouts</Text>
            // )}
            onViewableItemsChanged={(item) => {
                item.changed.map(workout => {
                    console.log(workout.item)
                    handleSrwChange(workout.item._id, "sets", workout.item.sets)
                    handleSrwChange(workout.item._id, "reps", workout.item.reps)
                    handleSrwChange(workout.item._id, "weights", Number(workout.item.weights.split(" ")[0]))
                })
            }}
            renderItem={(item) => (
                <>
                    <View style={{backgroundColor: styleColors.dark, padding: 16, borderRadius: 8}}>
                        {/* workout text and remove */}
                        <View style={{display: "flex", flexDirection: "row", paddingBottom: 8}}>
                            <Text adjustsFontSizeToFit={true} style={[globalStyles.text, {flex: 4, fontFamily: "Montserrat-Bold"}]}>{item.item.workout}</Text>
                            <Pressable style={{flex: 1}}><Text style={[globalStyles.text, {color: "#FF0000", fontSize: 16, textAlign: "right"}]}>Remove</Text></Pressable>
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
                                    handleSrwChange(item.item._id, "sets", Number(input))
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
                                    handleSrwChange(item.item._id, "reps", Number(input))
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
                                    handleSrwChange(item.item._id, "weights", Number(input))
                                }}
                            />
                        </View>
                    </View>
                </>
            )}
            ListFooterComponent={() => (
                <Pressable 
                    style={{backgroundColor: styleColors.dark,borderRadius: 8, padding: 8, marginBottom: 16}}
                    onPress={() => {
                        //saves current changes


                        router.back()
                        console.log(srwData)
                        router.push({pathname: "../(tabs)/browse"
                            

                    })}}>
                        <Text style={[globalStyles.text, {marginHorizontal: "auto", textAlignVertical: "center"}]}>Add workouts</Text>
                </Pressable>


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
        flex: 7
    }
})

export default sessionID