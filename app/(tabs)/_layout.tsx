import {Tabs, useNavigation, router, Stack} from "expo-router"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"

const tabsLayout = () => {
    return (
        <Tabs initialRouteName = "index">
            <Tabs.Screen name="index" options = {{
                headerShown: false,
                title: "Home",
                tabBarStyle: globalStyles.tabs
            }}/>
            <Tabs.Screen name="browse" options = {{
                headerShown: false,
                title: "Browse",
                tabBarStyle: globalStyles.tabs
            }}/>
            <Tabs.Screen name="sessions" options = {{
                headerShown: false,
                title: "Sessions",
                tabBarStyle: globalStyles.tabs
            }}/>
            <Tabs.Screen name="account" options = {{
                headerShown: false,
                title: "Account",
                tabBarStyle: globalStyles.tabs
            }}/>     
        </Tabs>
    )
}

export default tabsLayout