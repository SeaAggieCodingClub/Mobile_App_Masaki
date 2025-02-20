import { View, Text, Image, StyleSheet, FlatList, Pressable, SafeAreaView, Appearance, useColorScheme } from "react-native"
import { useEffect, useState } from "react"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"

interface sessionsProps {
    name: string,
    day: Array<string>,
}

const sessions = () => {
    const sessions = [{name: "test1", day: ["M"]}, {name: "test2", day: ["T", "Th"]}, {name: "test3", day: ["T", "Th"]}, {name: "test4", day: ["T", "Th"]}]
    
    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <Text style={globalStyles.pageTitle}>Sessions</Text>

            

            <FlatList
                style={{paddingHorizontal: 16}}
                numColumns={2}
                data={sessions}
                keyExtractor={(item) => item.name}
                renderItem={({item}: {item: sessionsProps})=>(
                    <Pressable style={globalStyles.sessionTile}>
                        <Text style={{fontFamily: "Montserrat-Medium", color: styleColors.light}}>{item.name}</Text>
                        <Image source={require("...\assets\sessionsIcons\UnfilledArm2.png")}/>
                    </Pressable>
                )}
            />

        </SafeAreaView>
    )  
}

export default sessions