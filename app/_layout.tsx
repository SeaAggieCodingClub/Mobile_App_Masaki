import {Stack} from "expo-router"
import { ActivityIndicator, Text, View } from "react-native"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"

const RootLayout = () => {

    const [loaded, error] = useFonts({
        'Montserrat-Regular': require("../assets/fonts/Montserrat-Regular.ttf"),
        'Montserrat-Medium': require("../assets/fonts/Montserrat-Medium.ttf"),
        'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf")
    })

    if(!loaded) {
        return(
            <SafeAreaView>
                <Text>loading font</Text>
            </SafeAreaView>
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