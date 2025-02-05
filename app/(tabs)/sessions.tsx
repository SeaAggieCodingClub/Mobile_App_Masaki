import { View, Text, StyleSheet, FlatList, Pressable, SafeAreaView, Appearance, useColorScheme } from "react-native"
import { useEffect, useState } from "react"
import globalStyles from "../globalStyles"

interface sessionsProps {
    name: string,
    day: Array<string>,
}

const sessions = () => {
    const sessions = [{name: "test1", day: ["M"]}, {name: "test2", day: ["T", "Th"]}]
    
    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <Text style={globalStyles.pageTitle}>Sessions</Text>

            <FlatList
                style={{}}
                data={sessions}
                keyExtractor={(item) => item.name} 
                renderItem={({item}: {item: sessionsProps})=>(
                    <Pressable style={globalStyles.tile}>
                        <Text>{item.name}</Text>
                    </Pressable>
                )}
            />

        </SafeAreaView>
    )  
}

export default sessions