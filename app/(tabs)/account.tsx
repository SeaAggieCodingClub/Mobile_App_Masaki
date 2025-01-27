import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, Dimensions } from "react-native"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import { useEffect, useState } from "react"
import { Pressable } from "react-native"
import { AuthContext, useAuthContext } from "../authContext"

import * as SecureStore from "expo-secure-store"
import { secureStoreGet, secureStoreSet } from "../authContext"

const secureStoreDelete = async (key: string): Promise<void> => {
    await SecureStore.deleteItemAsync(key)
    console.log("removed")
}

const accounts = () => {

    const {value: auth, setValue: setAuth} = useAuthContext()

    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <Text style={globalStyles.pageTitle}>Account</Text>
            <Pressable onPress={() => {
                        secureStoreGet("authUser")
                        secureStoreGet("authPass")

                        if(typeof auth === "string") {
                            secureStoreDelete("authUser")
                            secureStoreDelete("authPass")
                        }



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