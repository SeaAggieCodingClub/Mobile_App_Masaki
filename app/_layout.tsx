import {Stack} from "expo-router"

const RootLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="(tabs)" options = {{
                headerShown: false
            }}/>
            <Stack.Screen name="(browse)" options = {{
                headerShown: false
            }}/>
        </Stack>
    )
}

export default RootLayout