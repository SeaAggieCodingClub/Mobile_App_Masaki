import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, Pressable } from "react-native"
import { useCallback, useEffect, useState } from "react"
import globalStyles from "../globalStyles"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"
import styleColors from "../styleColors"
import { useFocusEffect } from "expo-router"
import { sessionObj, useSessionContext, workoutObj } from "../(session)/sessionContext"
import { useRouter } from "expo-router"

const DOTW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const index = () => {

    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")
    const {value: userSessions, setValue: setUserSessions} = useSessionContext()

    const router = useRouter()

    useFocusEffect(
        useCallback(() => {
            setDate(DOTW[new Date().getDay()])
            setTime((new Date().getHours()).toString() + ":" + (new Date().getMinutes()).toString() + ":" + (new Date().getSeconds()).toString())
        }, [])
    )

    const todaySessions = userSessions.filter(userSessions => (userSessions.daysOfSession.includes(date.toLowerCase())))

    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
                <Text style={globalStyles.pageTitle}>Home</Text>
                
                <FlatList
                    style={{borderRadius: styles.listContainer.borderRadius, marginLeft: 16, marginRight: 16}}
                    data = {[
                        {id: "1", title: date}, 
                        {id: "2", title: time},
                    ]}
                    keyExtractor={(item) => item.id}  
                    renderItem={ ({item}) => (
                        <View  style={styles.listContainer}>
                            <Text style={styles.listText}>{item.title}</Text>
                        </View>
                    )}  
                    horizontal={true}
                    disableIntervalMomentum={true}
                    decelerationRate={"fast"}
                    snapToAlignment={"start"}
                    snapToInterval={styles.listContainer.width + 20}
                    //snapToInterval={Dimensions.get("window").width - 2 * globalStyles.screenContainer.paddingLeft}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{columnGap: 20}}
                    
                />
                <FlatList
                    style={{paddingHorizontal: 16, paddingTop: 10}}
                    numColumns={1}
                    contentContainerStyle={{gap: 8}}
                    //columnWrapperStyle={{gap: 8}}
                    data={todaySessions}
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: Dimensions.get("window").width - 2 * globalStyles.screenContainer.paddingLeft,
        height: 75,
        backgroundColor: styleColors.dark,
        borderColor: styleColors.light,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },

    listText: {
        color: styleColors.light,
        fontFamily: "Montserrat-Medium",
        fontSize: 25,
    }
})

export default index