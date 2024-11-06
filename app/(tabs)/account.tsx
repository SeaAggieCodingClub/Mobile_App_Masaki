import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme } from "react-native"
import globalStyles from "../globalStyles"
import { useEffect, useState } from "react"

const accounts = () => {

    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <View style={globalStyles.screenContainer}>
                <Text>account</Text>
            </View>
        </SafeAreaView>
    )
}

export default accounts