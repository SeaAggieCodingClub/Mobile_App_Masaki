import { Pressable, Text, View, } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import globalStyles from "../globalStyles"
import { router, Stack, useLocalSearchParams } from "expo-router"
import styleColors from "../styleColors"
import { sessionObj, workoutObj, SessionContext, useSessionContext } from "./sessionContext"
import { FlatList } from "react-native"
import { useEffect, useState } from "react"

const sessionID = () => {

    const _id = useLocalSearchParams<{_id: string}>()
    const {value: userSessions, setValue: setUserSessions} = useSessionContext()
    const [currentSession, setCurrentSession] = useState((userSessions.filter((item) => item._id == _id._id))[0])
    console.log(currentSession.workoutObject)


    return (
        <View style={{backgroundColor: styleColors.darkest, flex: 1}}>
            <Stack.Screen options = {{
                headerTitle: currentSession.name,
                headerTitleStyle: {fontFamily: "Montserrat-Bold"},
                headerBackTitle: "Back",
                headerTintColor: styleColors.light,
                headerStyle: {
                backgroundColor: styleColors.dark,
                }
            }}/>
        <Text style={globalStyles.baseText}>{currentSession.daysOfSession}</Text>
        <FlatList
        style={{paddingHorizontal: 16}}
            data={currentSession.workoutObject}
            keyExtractor={item => item._id}
            renderItem={(item) => (
                <View>
                    <View style={{display: "flex", flexDirection: "row"}}>
                        <Text style={[globalStyles.baseText, {flex: 1}]}>{item.item.workout}</Text>
                        <Text style={[globalStyles.baseText, {flex: 1}]}>Sets: {item.item.sets}</Text>
                        <Text style={[globalStyles.baseText, {flex: 1}]}>Reps: {item.item.reps}</Text>
                        <Text style={[globalStyles.baseText, {flex: 1}]}>Weights: {item.item.weights}</Text>
                    </View>
                    <Pressable onPress={() => {
                        router.back()
                        router.push({pathname: "../(tabs)/browse"

                        })}}><Text>add</Text></Pressable>
                </View>
            )}
        />
        </View>
    )
}

export default sessionID