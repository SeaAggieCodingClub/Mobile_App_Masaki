import {Tabs, useNavigation, router, Stack} from "expo-router"
import globalStyles from "../globalStyles"

const tabsLayout = () => {
    return (
        <Tabs initialRouteName = "index">
            <Tabs.Screen name="index" options = {{
                headerShown: false,
                title: "Home",
                tabBarStyle: {
                    backgroundColor: "#232633",
                    borderTopWidth: 0
                }
                
            }}/>
            <Tabs.Screen name="browse" options = {{
                headerShown: false,
                title: "Browse",
                tabBarStyle: {
                    backgroundColor: "#232633",
                    borderTopWidth: 0
                }
            }}/>
            <Tabs.Screen name="sessions" options = {{
                headerShown: false,
                title: "Sessions",
                tabBarStyle: {
                    backgroundColor: "#232633",
                    borderTopWidth: 0
                }
            }}/>
            <Tabs.Screen name="account" options = {{
                headerShown: false,
                title: "Account",
                tabBarStyle: {
                    backgroundColor: "#232633",
                    borderTopWidth: 0
                }
            }}/>     
        </Tabs>
    )
}

export default tabsLayout