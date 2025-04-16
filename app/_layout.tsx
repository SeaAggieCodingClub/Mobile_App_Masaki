import {Redirect, Stack} from "expo-router"
import { ActivityIndicator, Pressable, Text, View } from "react-native"
import { useFonts } from "expo-font"
import { createContext, useContext, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import Auth from "./(preAuth)/auth"
import Signup from "./(preAuth)/signup"
//require('dotenv').config({ path: "../api/private.env"})

import { secureStoreGet, AuthContext, useAuthContext } from "./(preAuth)/authContext"
import { sessionObj, workoutObj, SessionContext, userSessions, useSessionContext } from "./(session)/sessionContext"
import * as SecureStore from "expo-secure-store"
import { SignupContext, useSignupContext } from "./(preAuth)/signupContext"
import { WorkoutsContext, workoutInterface } from "./(browse)/workoutsContext"
import axios from "axios"
import globalStyles from "./globalStyles"
import styleColors from "./styleColors"

const RootLayout = () => {

    const [authLoaded, setAuthLoaded] = useState(false)
    const [auth, setAuth] = useState<boolean | string>(false)

    const [workouts, setWorkouts] = useState<workoutInterface[]>([])
    const [workoutsLoaded, setWorkoutsLoaded] = useState(false)

    const [userSessions, setUserSessions] = useState<sessionObj[]>([] as sessionObj[])
    const [sessionsLoaded, setSessionsLoaded] = useState(false)

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
            loadSessions(loadAuthUser)
        }
        setAuthLoaded(true)
    }

    const loadWorkouts = async (): Promise<void> => {
        await axios.get('http://10.0.2.2:4000/api/workouts')
        //await axios.get('http://10.0.2.2:4000/api/workouts')
        .then(response => {
            setWorkouts(response.data)
            setWorkoutsLoaded(true)
        })
        .catch((error) => {
            console.log("workouts error")
            console.log(error)
        })
    }

    const loadSessions = async (user:string): Promise<void> => {
        //await axios.post("http://10.0.2.2:4000/api/workouts/retrieveData",
        await axios.post("http://10.0.2.2:4000/api/workouts/retrieveData",
            {
                username: user
            })
            .then(response => {
                setUserSessions(response.data.session)
                setSessionsLoaded(true)
            }).catch((error) => {
                console.log("session error")
                console.log(error.response)
            }
        )
    }

    useEffect(() => {
        loadAuth()
        loadWorkouts()
        console.log("yeah")
    }, []) 
    
    useEffect(() => {
        if(typeof auth === "string") {
            loadSessions(auth)
        }
        console.log("yier")
    }, [auth])

    if(!loaded) {
        return(
            <SafeAreaView style={globalStyles.screenContainer}>
                <View style={{margin: "auto"}}>
                    <ActivityIndicator
                        color={"rgba(255, 255, 255, 0.5)"}
                        size={"large"}
                    />
                    <Text style={{color: "rgba(255, 255, 255, 0.5)"}}>Loading fonts</Text>
                </View>
            </SafeAreaView>
        )
    }

    if(!authLoaded) {
        return(
            <SafeAreaView style={globalStyles.screenContainer}>
                <View style={{margin: "auto"}}>
                    <ActivityIndicator
                        color={"rgba(255, 255, 255, 0.5)"}
                        size={"large"}
                    />
                    <Text style={{color: "rgba(255, 255, 255, 0.5)"}}>Loading user</Text>
                </View>
            </SafeAreaView>
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

    if(!workoutsLoaded) {
        return(
            <SafeAreaView style={globalStyles.screenContainer}>
                <View style={{margin: "auto"}}>
                    <ActivityIndicator
                        color={"rgba(255, 255, 255, 0.5)"}
                        size={"large"}
                    />
                    <Text style={{color: "rgba(255, 255, 255, 0.5)"}}>Loading workouts</Text>
                </View>
            </SafeAreaView>
        )
    }

    if(!sessionsLoaded) {
        return(
            <SafeAreaView style={globalStyles.screenContainer}>
                <View style={{margin: "auto"}}>
                    <ActivityIndicator
                        color={"rgba(255, 255, 255, 0.5)"}
                        size={"large"}
                    />
                    <Text style={{color: "rgba(255, 255, 255, 0.5)"}}>Loading sessions</Text>
                </View>
            </SafeAreaView>
        )
    }

    return(
        <>
            <AuthContext.Provider value={{ value: auth, setValue: setAuth }}>
            <WorkoutsContext.Provider value={{value: workouts}}>
            <SessionContext.Provider value={{value: userSessions, setValue: setUserSessions}}>
                <StatusBar style="light"/>
                <Stack>
                    <Stack.Screen name="(tabs)" options = {{
                        headerShown: false
                    }}/>
                </Stack>
            </SessionContext.Provider>
            </WorkoutsContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default RootLayout