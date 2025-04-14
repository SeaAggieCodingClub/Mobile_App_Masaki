import { View, Text, TextInput, Image, StyleSheet, FlatList, Pressable, SafeAreaView, Appearance, useColorScheme } from "react-native"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import React from 'react';
import { useRouter } from "expo-router"
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

    const [workoutNameInput, setNameInput] = useState("Name")
    const [setNum, setNumInput] = useState("")
    let selectedDays: string[] = []

    const router = useRouter()

    const createSessionRef = useRef<BottomSheet>(null)
    const createSessionSnapPoints = useMemo(()=> ['90%', '90%'], [])
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>, [])

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



    const updateSessions = async (user:string, newSessions: any): Promise<void> => {
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

    return (
        <GestureHandlerRootView>
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

            : <Text style={globalStyles.baseText}>Press the + button to create a new session</Text>}

            <BottomSheet
                ref={createSessionRef}
                enableDynamicSizing={false}
                index={-1}
                snapPoints={createSessionSnapPoints}
                enablePanDownToClose={true}
                handleIndicatorStyle={{backgroundColor: styleColors.light}}
                backgroundStyle={{backgroundColor: styleColors.dark}}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView>
                    <View style={{paddingHorizontal: 6}}>
                        <TextInput 
                        onChangeText={input => setNameInput(input)} 
                        placeholder = "Name"
                        placeholderTextColor={styleColors.light}
                        style={style.textInput} 
                        selectionColor={"rgba(255, 255, 255, 0.25)"}/>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", paddingHorizontal: 16, marginHorizontal: 15, gap: 8}}>
                    <Pressable
                        style={({pressed}) =>({
                            aspectRatio: 1, 
                            flex:1, 
                            right: 16, 
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: pressed || selectedDays.includes("monday") ? styleColors.primary : styleColors.light,
                            borderRadius: 999,
                            width: 10
                        })}
                        onPress={()=> {
                            selectedDays = toggleItem(selectedDays, "monday")
                        }}
                        > 

                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold", color: styleColors.dark}}>
                                M
                            </Text>
    
                        </Pressable>
                        <Pressable
                            style={({pressed}) =>({
                                aspectRatio: 1, 
                                flex:1, 
                                right: 16, 
                                marginTop: 20, 
                                marginBottom: 12, 
                                backgroundColor: pressed || selectedDays.includes("tuesday") ? styleColors.primary : styleColors.light,
                                borderRadius: 999,
                                width: 10
                            })}
                            onPress={()=> {
                                selectedDays = toggleItem(selectedDays, "tuesday")
                            }}>

                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold", color: styleColors.dark}}>
                                T 
                            </Text>
                            
                        </Pressable>
                        <Pressable
                            style={({pressed}) =>({
                                aspectRatio: 1, 
                                flex:1, 
                                right: 16, 
                                marginTop: 20, 
                                marginBottom: 12, 
                                backgroundColor: pressed || selectedDays.includes("wednesday") ? styleColors.primary : styleColors.light,
                                borderRadius: 999,
                                width: 10
                            })}
                            onPress={()=> {
                                selectedDays = toggleItem(selectedDays, "wednesday")
                            }}>

                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold", color: styleColors.dark}}>
                                W
                            </Text>

                        </Pressable>
                        <Pressable
                        style={({pressed}) =>({
                            aspectRatio: 1, 
                            flex:1, 
                            right: 16, 
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: pressed || selectedDays.includes("thursday") ? styleColors.primary : styleColors.light,
                            borderRadius: 999,
                            width: 10
                        })}
                        onPress={()=> {
                            selectedDays = toggleItem(selectedDays, "thursday")
                        }}>
                            
                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold", color: styleColors.dark}}>
                                Th
                            </Text>

                        </Pressable>
                        <Pressable
                        style={({pressed}) =>({
                            aspectRatio: 1, 
                            flex:1, 
                            right: 16, 
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: pressed || selectedDays.includes("friday") ? styleColors.primary : styleColors.light,
                            borderRadius: 999,
                            width: 10
                        })}
                        onPress={()=> {
                            selectedDays = toggleItem(selectedDays, "friday")
                        }}>
                            
                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold", color: styleColors.dark}}>
                                F
                            </Text>

                        </Pressable>
                        <Pressable
                        style={({pressed}) =>({
                            aspectRatio: 1, 
                            flex:1, 
                            right: 16, 
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: pressed || selectedDays.includes("saturday") ? styleColors.primary : styleColors.light,
                            borderRadius: 999,
                            width: 10
                        })}
                        onPress={()=> {
                            selectedDays = toggleItem(selectedDays, "saturday")
                        }}>
                            
                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold", color: styleColors.dark}}>
                                S
                            </Text>

                        </Pressable>
                        <Pressable
                        style={({pressed}) =>({
                            aspectRatio: 1, 
                            flex:1, 
                            right: 16, 
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: pressed || selectedDays.includes("sunday") ? styleColors.primary : styleColors.light,
                            borderRadius: 999,
                            width: 10
                        })}
                        onPress={()=> {
                            selectedDays = toggleItem(selectedDays, "sunday")
                        }}>
                            
                            <Text style={{margin: "auto", fontFamily: "Montserrat-Bold", color: styleColors.dark}}>
                                Su
                            </Text>

                        </Pressable>
                    </View>

                    <View style={{marginHorizontal: "auto"}}>
                    <Pressable
                        style={{ 
                            alignItems: "center",
                            length: 250,
                            width: 250, 
                            marginTop: 20, 
                            marginBottom: 12, 
                            backgroundColor: styleColors.primary,
                            borderRadius: 10,
                        }}
                        onPress={()=> {

                            if (selectedDays.length > 0){
                                const tempSession =
                                {
                                    name: workoutNameInput,
                                    daysOfSession: selectedDays,
                                    workoutObject: [],
                                }
                        
                                
                                if((typeof auth)=="string"){
                                    const howdy = userSessions.map(({ _id, ...session }) => ({
                                        ...session,
                                        workoutObject: session.workoutObject.map(({ _id, ...workout }) => workout),
                                    })); 
                                    const inputSession = [
                                        ...howdy,
                                        tempSession
                                    ]

                                    updateSessions(auth,  inputSession)
                                
                                }
                            }
                        }}>
                        <Text>Create Session</Text>
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
      return list.filter(i => i !== item); // remove item
    } else {
      return [...list, item]; // add item
    }
  }  

export default sessions