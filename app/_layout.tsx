import {Redirect, Stack} from "expo-router"
import { ActivityIndicator, Pressable, Text, View } from "react-native"
import { useFonts } from "expo-font"
import { createContext, useContext, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import Auth from "./(preAuth)/auth"
import Signup from "./(preAuth)/signup"

import { secureStoreGet, AuthContext, useAuthContext } from "./(preAuth)/authContext"
import * as SecureStore from "expo-secure-store"
import { SignupContext, useSignupContext } from "./(preAuth)/signupContext"
import { WorkoutsContext, workoutType } from "./(browse)/workoutsContext"
import axios from "axios"

const RootLayout = () => {

    const [authLoaded, setAuthLoaded] = useState(false)
    const [auth, setAuth] = useState<boolean | string>(false)

    const [workouts, setWorkouts] = useState<workoutType[]>([])
    const [workoutsLoaded, setWorkoutsLoaded] = useState(false)

    const [signup, setSignup] = useState<boolean>(false)

    const [loaded, error] = useFonts({
        'Montserrat-Regular': require("../assets/fonts/Montserrat-Regular.ttf"),
        'Montserrat-Medium': require("../assets/fonts/Montserrat-Medium.ttf"),
        'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf")
    })

    const loadAuth = async (): Promise<void> => {
        let loadAuthUser = await SecureStore.getItemAsync("authUser")
        let loadAuthPass = await SecureStore.getItemAsync("authPass")

        console.log("loaded " + loadAuthUser)

        if(loadAuthUser && loadAuthPass) {
            setAuth(loadAuthUser)
        }
        setAuthLoaded(true)
    }

    const loadData = async (): Promise<void> => {
        await axios.get('http://10.0.2.2:4000/api/workouts')
        .then(response => {
            setWorkouts(response.data)
            setWorkoutsLoaded(true)
        })
        .catch((error) => {
            console.log("error")
            console.log(error)
        })
    }

    useEffect(() => {
        loadAuth()
        loadData()
    }, []) 


    if(!loaded) {
        return(
            <SafeAreaView>
                <Text>loading font</Text>
            </SafeAreaView>
        )
    }

    if(!authLoaded) {
        return(
            <SafeAreaView>
                <Text>loading auth</Text>
            </SafeAreaView>
        )
    }
    
    if(!workoutsLoaded) {
        return(
            <View>
                <Text>loading data</Text>
            </View>
        )
    }



    if(!auth && !signup) {
        return(
            <AuthContext.Provider value={{ value: auth, setValue: setAuth }}>
            <SignupContext.Provider value={{value: signup, setValue: setSignup}}>
                <StatusBar style="light"/>
                <Auth/>
            </SignupContext.Provider>
            </AuthContext.Provider>
        )
    }
    
    if(signup) {
        return(
            <AuthContext.Provider value={{ value: auth, setValue: setAuth }}>
            <SignupContext.Provider value={{value: signup, setValue: setSignup}}>
                <StatusBar style="light"/>
                <Signup/>
            </SignupContext.Provider>
            </AuthContext.Provider>
        )
        
    }

    return(
        <>
            <AuthContext.Provider value={{ value: auth, setValue: setAuth }}>
            <WorkoutsContext.Provider value={{value: workouts}}>
                <StatusBar style="light"/>
                <Stack>
                    <Stack.Screen name="(tabs)" options = {{
                        headerShown: false
                    }}/>
                </Stack>
            </WorkoutsContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default RootLayout