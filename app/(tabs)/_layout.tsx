import {Tabs, useNavigation, router} from "expo-router"

const tabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options = {{
                headerTitle: "Home",
                title: "Home"
            }}/>
        </Tabs>
    )
}

export default tabsLayout