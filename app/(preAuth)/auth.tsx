import { SafeAreaView, Text, TextInput, View, StyleSheet, Pressable, KeyboardAvoidingView, useWindowDimensions } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import { useContext, useState } from "react"
import { router, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useAuthContext, secureStoreGet, secureStoreSet } from "./authContext"
import { useSignupContext } from "./signupContext"
import signup from "./signup"
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler"

const axios = require('axios').default

const auth = () => {
    const [usernameInput, setUsernameInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [stayCheck, setStayCheck] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<String>()

    const {value: auth, setValue: setAuth} = useAuthContext()
    const {value: signup, setValue: setSignup} = useSignupContext()


    return (
        <SafeAreaView style={[globalStyles.androidSafeView]}>
            <GestureHandlerRootView><ScrollView>
            <View style={{marginHorizontal: "auto", marginTop: "20%", width: "80%", height: "100%"}}>
                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={[globalStyles.pageTitle, {marginHorizontal: "auto", paddingBottom: 32, fontSize: 32}]}>Welcome back!</Text>
                    <Text style={globalStyles.pageSubtitle}>Username</Text>
                    <TextInput onChangeText={input => setUsernameInput(input)} style={style.textInput} selectionColor={"rgba(255, 255, 255, 0.25)"}/>
                    <Text style={globalStyles.pageSubtitle}>Password</Text>
                    <TextInput onChangeText={input => setPasswordInput(input)} secureTextEntry={true} style={style.textInput} selectionColor={"rgba(255, 255, 255, 0.25)"}/>
                    
                    <View style={{display: "flex", flexDirection: "row", paddingTop: 16}}>
                        <BouncyCheckbox
                            style={{flex: 1}}
                            fillColor={styleColors.primary}
                            iconStyle={{borderColor: styleColors.dark, borderWidth: 4}}
                            innerIconStyle={{borderColor: styleColors.dark, borderWidth: 0}}
                            textStyle={{textDecorationLine: "none", fontFamily: "Montserrat-Medium", color: styleColors.light, fontSize: 18}}
                            text={"Stay logged in"}
                            onPress={isChecked => {
                                setStayCheck(isChecked)
                            }}
                        />
                        <Pressable onPress={() => {
                                setSignup(true)
                            }}>
                            <Text style={{textDecorationLine: "underline", fontFamily: "Montserrat-Medium", color: styleColors.light, fontSize: 18, flex: 1}}>Sign up</Text>
                        </Pressable>
                    </View>

                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[globalStyles.baseText, {color: "red", paddingVertical: 16, marginHorizontal: "auto"}]}>{errorMessage}</Text>

                    <Pressable 
                        style={[globalStyles.button, {marginHorizontal: "auto", width: "50%", height: "5%", backgroundColor: styleColors.dark, borderRadius: 16}]}
                        onPress={() => {
                            //connect to backend

                            axios.post('http://www.fitnessapp.duckdns.org:4000/check-user', 
                            {
                                username: usernameInput,
                                password: passwordInput
                            })
                            .then(function (response : object) {
                                if(response["data" as keyof boolean]) {
                                    setAuth(usernameInput)
                                    console.log("authorized")

                                    if(stayCheck) {
                                        secureStoreSet("authUser", usernameInput)
                                        secureStoreSet("authPass", passwordInput)
                                    }
                                } else {
                                    setErrorMessage("Invalid username or password")
                                }
                            })
                            .catch(function (error : object) {
                                console.log("error")
                                console.log(error)
                        })
                    }}>
                    <Text style={[globalStyles.buttonText, {color: styleColors.light}]}>Login</Text>
                    </Pressable>
                    <View style={{paddingBottom: "70%"}}></View>
                
                
            </View>
            </ScrollView></GestureHandlerRootView>
        </SafeAreaView>
        
    )
}

const style = StyleSheet.create({
    textInput: {
        backgroundColor: styleColors.dark,
        padding: 8,
        height: 50,
        fontFamily: "Montserrat-Medium",
        color: styleColors.light,
        fontSize: 24,
    }
})

export default auth