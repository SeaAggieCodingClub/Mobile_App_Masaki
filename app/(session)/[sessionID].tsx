import { Pressable, Text, View, TextInput, StyleSheet, Alert} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import globalStyles from "../globalStyles"
import { router, Stack, useLocalSearchParams } from "expo-router"
import styleColors from "../styleColors"
import { sessionObj, workoutObj, SessionContext, useSessionContext } from "./sessionContext"
import { FlatList } from "react-native"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const sessionID = () => {

    const _id = useLocalSearchParams<{_id: string}>()
    const {value: userSessions, setValue: setUserSessions} = useSessionContext()
    const [currentSession, setCurrentSession] = useState((userSessions.filter((item) => item._id == _id._id))[0])
    //console.log(currentSession.workoutObject)

    const editSessionRef = useRef<BottomSheet>(null)
    const editSessionSnapPoints = useMemo(() => ['95%'], [])
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>, [])

    const saveSession = async: <Promise></Promise>() => {
        
    }

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


                }}><Text style={{color: "#FF0000", fontSize: 16, fontFamily: "Montserrat-Medium"}}>Delete</Text></Pressable>,
                headerStyle: {
                backgroundColor: styleColors.dark,
                }
            }}/>
        <Text style={globalStyles.baseText}>{currentSession.daysOfSession}</Text>
        
        {/* workouts within session */}
        <FlatList
        style={{paddingHorizontal: 16}}
            data={currentSession.workoutObject}
            keyExtractor={item => item._id}
            contentContainerStyle={{gap: 8}}
            // ListHeaderComponent={() => (
            //     <Text style={[globalStyles.baseText, {fontFamily: "Montserrat-Bold"}]}>Workouts</Text>
            // )}
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
                                defaultValue={item.item.weights.toString().trim()}
                                selectionColor={"rgba(255, 255, 255, 0.25)"}
                            />
                        </View>
                    </View>
                </>
            )}
            ListFooterComponent={() => (
                <Pressable 
                    style={{backgroundColor: styleColors.dark,borderRadius: 5, padding: 8,}}
                    onPress={() => {
                        //saves current changes


                        router.back()
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