import {Redirect, Stack} from "expo-router"
import { ActivityIndicator, Pressable, Text, View } from "react-native"
import { useFonts } from "expo-font"
import { createContext, useContext, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import Auth from "./auth"

import { AuthContext, useAuthContext } from "./authContext"

const RootLayout = () => {

    const [loaded, error] = useFonts({
        'Montserrat-Regular': require("../assets/fonts/Montserrat-Regular.ttf"),
        'Montserrat-Medium': require("../assets/fonts/Montserrat-Medium.ttf"),
        'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf")
    })

    //have to use useContext i think
    const [auth, setAuth] = useState<boolean>(false)

    if(!loaded) {
        return(
            <SafeAreaView>
                <Text>loading font</Text>
            </SafeAreaView>
        )
    }
    
    if(!auth) {
        return(
            <AuthContext.Provider value={{ value: auth, setValue: setAuth }}>
                <Auth/>
            </AuthContext.Provider>
        )
    }

    return(
        <>
            <AuthContext.Provider value={{ value: auth, setValue: setAuth }}>
                <StatusBar style="light"/>
                <Stack>
                    <Stack.Screen name="(tabs)" options = {{
                        headerShown: false
                    }}/>
                </Stack>
            </AuthContext.Provider>
        </>
    )
}

export default RootLayout