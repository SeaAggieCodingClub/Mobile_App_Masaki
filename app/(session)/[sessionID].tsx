import { SafeAreaView } from "react-native-safe-area-context"
import globalStyles from "../globalStyles"
import { Stack } from "expo-router"
import styleColors from "../styleColors"

const sessionID = () => {
    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <Stack.Screen options = {{
                headerTitle: "Session",
                headerTitleStyle: {fontFamily: "Montserrat-Bold"},
                headerBackTitle: "Back",
                headerTintColor: styleColors.light,
                headerStyle: {
                backgroundColor: styleColors.dark,
                }
            }}/>
        </SafeAreaView>
    )
}

export default sessionID