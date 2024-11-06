import {Tabs, useNavigation, router, Stack} from "expo-router"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"

const tabsLayout = () => {
    return (
        <Tabs initialRouteName = "index">
            <Tabs.Screen name="index" options = {{
                headerShown: false,
                title: "Home",
                tabBarStyle: {
                    backgroundColor: styleColors.dark,
                    borderTopWidth: 0
                }
                
            }}/>
            <Tabs.Screen name="browse" options = {{
                headerShown: false,
                title: "Browse",
                tabBarStyle: {
                    backgroundColor: styleColors.dark,
                    borderTopWidth: 0
                }
            }}/>
            <Tabs.Screen name="sessions" options = {{
                headerShown: false,
                title: "Sessions",
                tabBarStyle: {
                    backgroundColor: styleColors.dark,
                    borderTopWidth: 0
                }
            }}/>
            <Tabs.Screen name="account" options = {{
                headerShown: false,
                title: "Account",
                tabBarStyle: {
                    backgroundColor: styleColors.dark,
                    borderTopWidth: 0
                }
            }}/>     
        </Tabs>
    )
}

export default tabsLayout