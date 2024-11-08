import {Tabs, useNavigation, router, Stack} from "expo-router"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"

const tabsLayout = () => {
    return (
        <Tabs initialRouteName = "index">
            <Tabs.Screen name="index" options = {{
                headerShown: false,
                title: "Home",
                tabBarStyle: [globalStyles.tabs, globalStyles.shadow]
            }}/>
            <Tabs.Screen name="browse" options = {{
                headerShown: false,
                title: "Browse",
                tabBarStyle: [globalStyles.tabs, globalStyles.shadow]
            }}/>
            <Tabs.Screen name="sessions" options = {{
                headerShown: false,
                title: "Sessions",
                tabBarStyle: [globalStyles.tabs, globalStyles.shadow]
            }}/>
            <Tabs.Screen name="account" options = {{
                headerShown: false,
                title: "Account",
                tabBarStyle: [globalStyles.tabs, globalStyles.shadow]
            }}/>     
        </Tabs>
    )
}

export default tabsLayout