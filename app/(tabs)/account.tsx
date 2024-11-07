import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, Dimensions } from "react-native"
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

const style = StyleSheet.create({
    tile: {
        flexShrink: 0,
        flexGrow: 1,
        backgroundColor: "#BBBBBB",
        flexBasis: Dimensions.get("window").width / 3,
        marginRight: 5,
        marginBottom: 5,
        borderWidth: 5,
        borderRadius: 10,
        height: 250
    }
})

export default accounts