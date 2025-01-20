import {Tabs, useNavigation, router, Stack, } from "expo-router"
import { View, Image, Text, Platform } from "react-native"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import Icon from '@expo/vector-icons/MaterialIcons'

const tabsLayout = () => {
    return (
        <Tabs initialRouteName = "index">
            <Tabs.Screen name="index" options = {{
                tabBarShowLabel: false,

                headerShown: false,
                title: "Home",
                tabBarLabel: ({focused}) => (
                    <Text style = {{
                        color: focused ? styleColors.primary : styleColors.light, 
                        fontFamily: "Montserrat-Regular", 
                        fontSize: 12
                    }}>Home</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <Icon 
                        name="home" 
                        size={24} 
                        color={focused ? styleColors.primary : styleColors.light}
                    />
                ),
                tabBarLabelPosition: "below-icon",
                tabBarStyle: [globalStyles.tabs, globalStyles.shadow],
            }}/>

            <Tabs.Screen name="browse" options = {{
                tabBarShowLabel: false,

                headerShown: false,
                title: "Browse",
                tabBarLabel: ({focused}) => ( 
                    <Text style = {{
                        color: focused ? styleColors.primary : styleColors.light, 
                        fontFamily: "Montserrat-Regular", 
                        fontSize: 12
                    }}>Browse</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <Icon 
                        name="search" 
                        size={24} 
                        color={focused ? styleColors.primary : styleColors.light}
                    />
                ),
                tabBarLabelPosition: "below-icon",
                tabBarStyle: [globalStyles.tabs, globalStyles.shadow],
            }}/>

            <Tabs.Screen name="sessions" options = {{
                tabBarShowLabel: false,

                headerShown: false,
                title: "Sessions",
                tabBarLabel: ({focused}) => (
                    <Text style = {{
                        color: focused ? styleColors.primary : styleColors.light, 
                        fontFamily: "Montserrat-Regular", 
                        fontSize: 12
                    }}>Sessions</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <Icon 
                        name="fitness-center" 
                        size={24} 
                        color={focused ? styleColors.primary : styleColors.light}
                    />
                ),
                tabBarLabelPosition: "below-icon",
                tabBarStyle: [globalStyles.tabs, globalStyles.shadow],
            }}/>

            <Tabs.Screen name="account" options = {{
                tabBarShowLabel: false,
                
                headerShown: false,
                title: "Account",
                tabBarLabel: ({focused}) => (
                    <Text style = {{
                        color: focused ? styleColors.primary : styleColors.light, 
                        fontFamily: "Montserrat-Regular", 
                        fontSize: 12
                    }}>Account</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <Icon 
                        name="person" 
                        size={24} 
                        color={focused ? styleColors.primary : styleColors.light}
                    />
                ),
                tabBarLabelPosition: "below-icon",
                tabBarStyle: [globalStyles.tabs, globalStyles.shadow],
            }}/>     
        </Tabs>
    )
}

export default tabsLayout