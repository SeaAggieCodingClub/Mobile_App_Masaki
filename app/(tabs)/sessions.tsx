import { View, Text, TextInput, Image, StyleSheet, FlatList, Pressable, SafeAreaView, Appearance, useColorScheme, ActivityIndicator } from "react-native"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import React from 'react';
import { router } from "expo-router"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Icon from '@expo/vector-icons/MaterialIcons'
import { sessionObj, useSessionContext, workoutObj } from "../(session)/sessionContext";
import axios from "axios";
import { AuthContext, useAuthContext } from "../(preAuth)/authContext";

interface sessionsProps {
    name: string,
    day: Array<string>,
}



const sessions = () => {
    const {value: auth, setValue: setAuth} = useAuthContext()
    const {value: userSessions, setValue: setUserSessions} = useSessionContext()

    const [workoutNameInput, setNameInput] = useState("")
    const [setNum, setNumInput] = useState("")
    let selectedDays: string[] = []
    const [newSelectedDays, setNewSelectedDays] = useState<string[]>([])

    const [loading, setLoading] = useState(false)

    const createSessionRef = useRef<BottomSheet>(null)
    const createSessionTextInputRef = useRef<TextInput>(null)
    const createSessionSnapPoints = useMemo(()=> ['30%'], [])
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>, [])

    const loadSessions = async (user:string): Promise<void> => {
        await axios.post("http://localhost:4000/api/workouts/retrieveData",
        //await axios.post("http://10.0.2.2:4000/api/workouts/retrieveData",
            {
                username: user
            })
            .then(response => {
                setUserSessions(response.data.session)
                router.push({pathname: "(session)/[sessionID]", params: {_id: response.data.session[response.data.session.length - 1]._id}})
            }).catch((error) => {
                console.log("session error")
                console.log(error.response)
            }
        )
    }

    const updateSessions = async (user:string, newSessions: any, from:string): Promise<void> => {
        setLoading(true)
        await axios.post("http://localhost:4000/api/workouts/updateData",
        //await axios.post("http://10.0.2.2:4000/api/workouts/updateData",
            {
                username: user,
                session: newSessions,
            })
            .then(response => {
                console.log(response)
                loadSessions(user)
                if(from == "new") {
                    console.log(response.data.session)
                    console.log(response.data.session[response.data.session.length - 1]._id)
                    //router.push("./sessions")

                    // router.push("../sessionID")
                    //console.log()
                    // router.push({pathname: "../(session)/[sessionID]", params: {
                    //     _id: response.data.session[0]._id
                    // }})
                }
                //setUserSessions(response.data.message)
            }).catch((error) => {
                console.log("session error")
                console.log(error.response)
            }
        )
        setLoading(false)
    }

    return (
        
        <GestureHandlerRootView>
            {loading ? 
                //width: "30%", borderRadius: 8, aspectRatio: 1,
                //left: "35%", top: "20%", 
                <>
                    <View style={{width: "100%", height: "100%", position: "absolute", zIndex: 1, margin: "auto", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <ActivityIndicator style={{margin: "auto"}}size={"large"} color={"rgba(255, 255, 255, 0.3)"}/>
                    </View>
                </> : <></>
            }
        <SafeAreaView style={globalStyles.androidSafeView}>
            <View style={{display: "flex", flexDirection: "row"}}>
                <Text style={[globalStyles.pageTitle, {flex: 1}]}>Sessions</Text>
                <Pressable 
                    style={{aspectRatio: 1, 
                        flex:0, 
                        right: 16, 
                        marginTop: 20, 
                        marginBottom: 12, 
                        backgroundColor: styleColors.dark, 
                        borderRadius: 999,
                    }}
                    onPress={() => {
                        createSessionRef.current?.expand()
                    }}    
                >
                    <Icon
                        name="add"
                        color={styleColors.light}
                        size={24}
                        style={{margin: "auto"}}
                    />
                </Pressable>
            </View>

            {userSessions && userSessions.length != 0 ?

            <FlatList
                style={{paddingHorizontal: 16}}
                numColumns={1}
                contentContainerStyle={{gap: 8}}
                //columnWrapperStyle={{gap: 8}}
                data={userSessions}
                keyExtractor={(item) => item._id}
                ListFooterComponent={(
                    <View style={{height: 16}}></View>
                )}
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

            : <Text style={[globalStyles.text, {marginHorizontal: 16}]}>Press the + button to create a new session</Text>}

            <BottomSheet
                ref={createSessionRef}
                enableDynamicSizing={false}
                index={-1}
                snapPoints={createSessionSnapPoints}
                enablePanDownToClose={true}
                handleIndicatorStyle={{backgroundColor: styleColors.light}}
                backgroundStyle={{backgroundColor: styleColors.darkest}}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView>   
                    <View style={{paddingHorizontal: 6}}>
                        <TextInput 
                        ref={createSessionTextInputRef}
                        onChangeText={input => setNameInput(input)} 
                        //value={workoutNameInput.length != 0 ? workoutNameInput : ""}
                        multiline={true}
                        numberOfLines={1}
                        textAlign = "center"
                        placeholder = "Name"
                        placeholderTextColor={"rgba(255, 255, 255, 0.25)"}
                        style={[style.textInput, {backgroundColor: styleColors.darkest}]}     
                        selectionColor={"rgba(255, 255, 255, 0.25)"}
                        />
                        <View style={{height: 2, width: "100%", backgroundColor: styleColors.dark, paddingHorizontal: 8}}></View>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", paddingHorizontal: 16, marginHorizontal: 15, gap: 8, justifyContent: "center", alignItems: "center"}}>
                    <Pressable
                        style={({pressed}) =>({
                            aspectRatio: 1, 
                            flex:1, 
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: newSelectedDays.includes("monday") ? styleColors.primary : styleColors.dark,
                            borderRadius: 999,
                            width: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        })}
                        onPress={()=> {
                            // selectedDays = toggleItem(selectedDays, "monday")
                            setNewSelectedDays(toggleItem(newSelectedDays, "monday"))
                        }}
                        > 

                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold", 
                                color: 
                                (newSelectedDays.includes("monday")) 
                                ? styleColors.dark 
                                : styleColors.light}}>
                                M
                            </Text>
    
                        </Pressable>
                        <Pressable
                            style={({pressed}) =>({
                                aspectRatio: 1, 
                                flex:1, 
                                marginTop: 20, 
                                marginBottom: 12, 
                                backgroundColor: newSelectedDays.includes("tuesday") ? styleColors.primary : styleColors.dark,
                                borderRadius: 999,
                                width: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            })}
                            onPress={()=> {
                                // selectedDays = toggleItem(selectedDays, "tuesday")
                                setNewSelectedDays(toggleItem(newSelectedDays, "tuesday"))
                            }}>

                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold",
                                color: 
                                (newSelectedDays.includes("tuesday")) 
                                ? styleColors.dark 
                                : styleColors.light
                            }}>
                                T 
                            </Text>
                            
                        </Pressable>
                        <Pressable
                            style={({pressed}) =>({
                                aspectRatio: 1, 
                                flex:1, 
                                marginTop: 20, 
                                marginBottom: 12, 
                                backgroundColor: newSelectedDays.includes("wednesday") ? styleColors.primary : styleColors.dark,
                                borderRadius: 999,
                                width: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            })}
                            onPress={()=> {
                                // selectedDays = toggleItem(selectedDays, "wednesday")
                                setNewSelectedDays(toggleItem(newSelectedDays, "wednesday"))
                            }}>

                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold",
                                color: 
                                (newSelectedDays.includes("wednesday")) 
                                ? styleColors.dark 
                                : styleColors.light
                            }}>
                                W
                            </Text>

                        </Pressable>
                        <Pressable
                        style={({pressed}) =>({
                            aspectRatio: 1, 
                            flex:1, 
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: newSelectedDays.includes("thursday") ? styleColors.primary : styleColors.dark,
                            borderRadius: 999,
                            width: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        })}
                        onPress={()=> {
                            // selectedDays = toggleItem(selectedDays, "thursday")
                            setNewSelectedDays(toggleItem(newSelectedDays, "thursday"))
                        }}>
                            
                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold",
                                color: 
                                (newSelectedDays.includes("thursday")) 
                                ? styleColors.dark 
                                : styleColors.light
                            }}>
                                Th
                            </Text>

                        </Pressable>
                        <Pressable
                        style={({pressed}) =>({
                            aspectRatio: 1, 
                            flex:1,  
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: newSelectedDays.includes("friday") ? styleColors.primary : styleColors.dark,
                            borderRadius: 999,
                            width: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        })}
                        onPress={()=> {
                            // selectedDays = toggleItem(selectedDays, "friday")
                            setNewSelectedDays(toggleItem(newSelectedDays, "friday"))
                        }}>
                            
                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold",
                                color: 
                                (newSelectedDays.includes("friday")) 
                                ? styleColors.dark 
                                : styleColors.light
                            }}>
                                F
                            </Text>

                        </Pressable>
                        <Pressable
                        style={({pressed}) =>({
                            aspectRatio: 1, 
                            flex:1,  
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: newSelectedDays.includes("saturday") ? styleColors.primary : styleColors.dark,
                            borderRadius: 999,
                            width: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        })}
                        onPress={()=> {
                            // selectedDays = toggleItem(selectedDays, "saturday")
                            setNewSelectedDays(toggleItem(newSelectedDays, "saturday"))
                        }}>
                            
                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold",
                                color: 
                                (newSelectedDays.includes("saturday")) 
                                ? styleColors.dark 
                                : styleColors.light
                            }}>
                                S
                            </Text>

                        </Pressable>
                        <Pressable
                        style={({pressed}) =>({
                            aspectRatio: 1, 
                            flex:1, 
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: newSelectedDays.includes("sunday") ? styleColors.primary : styleColors.dark,
                            borderRadius: 999,
                            width: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        })}
                        onPress={()=> {
                            // selectedDays = toggleItem(selectedDays, "sunday")
                            setNewSelectedDays(toggleItem(newSelectedDays, "sunday"))
                        }}>
                            
                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold",
                                color: 
                                (newSelectedDays.includes("sunday")) 
                                ? styleColors.dark 
                                : styleColors.light
                            }}>
                                Su
                            </Text>

                        </Pressable>
                    </View>

                    <View style={{marginHorizontal: "auto"}}>
                    <Pressable
                        style={{ 
                            alignItems: "center",
                            width: 175,
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: styleColors.primary,
                            borderRadius: 20,
                            borderColor: styleColors.dark,
                            borderWidth: 3
                        }}
                        onPress={()=> {
                            
                            if (newSelectedDays.length > 0){
                                const tempSession =
                                {
                                    name: workoutNameInput.length != 0 ? workoutNameInput : "New Session",
                                    daysOfSession: newSelectedDays,
                                    workoutObject: [],
                                }
                        
                                
                                if((typeof auth)=="string"){
                                    if(typeof userSessions != "undefined"){

                                    
                                    const howdy = userSessions.map(({ _id, ...session }) => ({
                                        ...session,
                                        workoutObject: session.workoutObject.map(({ _id, ...workout }) => workout),
                                    })); 
                                    const inputSession = [
                                        ...howdy,
                                        tempSession
                                    ]
                                    

                                    updateSessions(auth,  inputSession, "new")
                                } else {
                                    updateSessions(auth, [tempSession], "new")
                                }
                                
                                }
                                // selectedDays = []
                                setNewSelectedDays([])
                                //setNameInput("")
                                createSessionTextInputRef.current?.clear()
                                console.log("clear thing")
                                createSessionRef.current?.close()
                            }
                        }}>
                        <Text style={{margin: "auto", 
                            fontFamily: "Montserrat-Medium", 
                            color: styleColors.dark, 
                            marginHorizontal: 20,
                            padding: 10,
                            }}>Create Session</Text>
                    </Pressable>
                    </View>
                </BottomSheetView>
            </BottomSheet>

            {/* add session button */}
            

        </SafeAreaView>
        </GestureHandlerRootView>
    )  
}
const style = StyleSheet.create({
    textInput: {
        backgroundColor: styleColors.dark,
        padding: 8,
        height: 50,
        fontFamily: "Montserrat-Medium",
        color: styleColors.light,
        fontSize: 24,
    }
})

function toggleItem<T>(list: T[], item: T): T[] {
    if (list.includes(item)) {
        console.log()
        return list.filter(i => i !== item); // remove item
    } else {
        return [...list, item]; // add item
    }
    
  }  

export default sessions