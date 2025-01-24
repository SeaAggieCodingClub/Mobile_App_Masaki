import {Stack} from "expo-router"
import { ActivityIndicator, Text, View } from "react-native"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import Auth from "./auth"

const RootLayout = () => {

    const [loaded, error] = useFonts({
        'Montserrat-Regular': require("../assets/fonts/Montserrat-Regular.ttf"),
        'Montserrat-Medium': require("../assets/fonts/Montserrat-Medium.ttf"),
        'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf")
    })

    //have to use useContext i think
    const authorized = false

    if(!loaded) {
        return(
            <SafeAreaView>
                <Text>loading font</Text>
            </SafeAreaView>
        )
    }
    
    if(!authorized) {
        return(
            <Auth/>
        )
    }

    return(
        <>
            <StatusBar style="light"/>
            <Stack>
                <Stack.Screen name="(tabs)" options = {{
                    headerShown: false
                }}/>
            </Stack>
        </>
    )
}

export default RootLayout