import {Tabs, useNavigation, router} from "expo-router"

const tabsLayout = () => {
    return (
        <Tabs initialRouteName = "index">
            <Tabs.Screen name="index" options = {{
                headerShown: false,
                title: "Home"
            }}/>
            <Tabs.Screen name="browse" options = {{
                headerShown: false,
                title: "Browse"
            }}/>
            <Tabs.Screen name="sessions" options = {{
                headerShown: false,
                title: "Sessions"
            }}/>
            <Tabs.Screen name="account" options = {{
                headerShown: false,
                title: "Account"
            }}/>
        </Tabs>
    )
}

export default tabsLayout