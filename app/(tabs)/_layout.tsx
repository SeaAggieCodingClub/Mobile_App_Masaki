import {Tabs, useNavigation, router, Stack} from "expo-router"
import { View, Image, Text } from "react-native"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import Icon from '@expo/vector-icons/MaterialIcons'

const tabsLayout = () => {
    return (
        <Tabs initialRouteName = "index">
            <Tabs.Screen name="index" options = {{
                headerShown: false,
                //title: "Home",
                tabBarLabel: ({focused}) => (
                    <Text style = {{color: focused ? styleColors.primary : styleColors.light, 
                    fontFamily: "Montserrat-Regular"}}>
                        Home
                    </Text>
                ),
                tabBarLabelPosition: "below-icon",
                tabBarStyle:  {
                    backgroundColor: styleColors.dark,
                    borderTopWidth: 0
                },
                tabBarIcon: ({focused}) => (
                    <Icon 
                    name="home" 
                    size={24} 
                    color={focused ? styleColors.primary : styleColors.light}/>
                )
            }}
            />
            <Tabs.Screen name="browse" options = {{
                headerShown: false,
                //title: "Browse",
                tabBarLabel: ({focused}) => ( 
                    <Text style = {{
                        color: 
                        focused ? styleColors.primary : styleColors.light,
                        fontFamily: 
                        "Montserrat-Regular"
                    }}>
                        Browse
                    </Text>
                ),
                tabBarLabelPosition: "below-icon",
                tabBarStyle: {
                    backgroundColor: styleColors.dark,
                    borderTopWidth: 0
                },
                tabBarIcon: ({focused}) => (
                    <Icon 
                    name="search" 
                    size={24} 
                    color={focused ? styleColors.primary : styleColors.light}/>
                )
            }}/>
            <Tabs.Screen name="sessions" options = {{
                headerShown: false,
                // title: "Sessions",
                tabBarLabel: ({focused}) => (
                    <Text style = {{
                        color: 
                        focused ? styleColors.primary : styleColors.light,
                        fontFamily: 
                        "Montserrat-Regular"}}>
                        Sessions
                    </Text>
                ),
                tabBarLabelPosition: "below-icon",
                tabBarStyle: {
                    backgroundColor: styleColors.dark,
                    borderTopWidth: 0
                },
                tabBarIcon: ({focused}) => (
                    <Icon 
                    name="fitness-center" 
                    size={24} 
                    color={focused ? styleColors.primary : styleColors.light}/>
                )
            }}/>
            <Tabs.Screen name="account" options = {{
                headerShown: false,
                // title: "Account",
                tabBarLabel: ({focused}) => (
                    <Text style = {{
                        color: 
                        focused ? styleColors.primary : styleColors.light,
                        fontFamily: 
                        "Montserrat-Regular"}}>
                        Account
                    </Text>
                ),
                tabBarLabelPosition: "below-icon",
                tabBarStyle: {
                    backgroundColor: styleColors.dark,
                    borderTopWidth: 0
                },
                tabBarIcon: ({focused}) => (
                    <Icon 
                    name="person" 
                    size={24} 
                    color={focused ? styleColors.primary : styleColors.light}/>
                )
            }}/>     
        </Tabs>
    )
}

export default tabsLayout