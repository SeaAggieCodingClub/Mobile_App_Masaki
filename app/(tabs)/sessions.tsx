import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme } from "react-native"
import { useEffect, useState } from "react"
import globalStyles from "../globalStyles"
const sessions = () => {
    
    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <Text style={globalStyles.pageTitle}>Sessions</Text>
            <View style={{display: "flex", flex: 1, flexDirection: "row", backgroundColor: "red", height: 10}}>
                <View style={{flex: 1,  backgroundColor: "blue", height: 10}}/>
                <View style={{flex: 1,  backgroundColor: "green"}}/>
            </View>
        </SafeAreaView>
    )  
}

export default sessions