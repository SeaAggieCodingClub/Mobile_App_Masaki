import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme } from "react-native"
import { useEffect, useState } from "react"
import globalStyles from "../globalStyles"
const sessions = () => {

    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <Text>Sessions</Text>
        </SafeAreaView>
    )  
}

export default sessions