import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, Dimensions } from "react-native"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import { useEffect, useState } from "react"
import { Pressable } from "react-native"
import { AuthContext, useAuthContext } from "../authContext"

const accounts = () => {

    const {setValue: setAuth} = useAuthContext()

    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <Text style={globalStyles.pageTitle}>Account</Text>
            <Pressable onPress={() => {
                        console.log("logout pressed")
                        setAuth(false)
                    }} style={[globalStyles.button, {marginHorizontal: "auto", width: "40%", height: "10%", marginTop: 20}]}>
                        <Text style={[globalStyles.buttonText, {color: styleColors.light, textAlign: "center"}]}>Log out</Text>
                    </Pressable>
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