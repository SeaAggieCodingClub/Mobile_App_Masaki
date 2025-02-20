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

const testUser = ["johndoe", "1"]

const auth = () => {
    const [usernameInput, setUsernameInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [stayCheck, setStayCheck] = useState<boolean>(false)

    const {value: auth, setValue: setAuth} = useAuthContext()
    const {value: signup, setValue: setSignup} = useSignupContext()


    return (
        
        <SafeAreaView style={[globalStyles.androidSafeView]}>
            <GestureHandlerRootView><ScrollView>
            <View style={{marginHorizontal: "auto", marginTop: "20%", width: "80%", height: "100%"}}>
                    <Text style={[globalStyles.pageTitle, {marginHorizontal: "auto", paddingBottom: 32, fontSize: 32}]}>Welcome back!</Text>
                    <Text style={globalStyles.pageSubtitle}>Username</Text>
                    <TextInput onChangeText={input => setUsernameInput(input)} style={style.textInput} selectionColor={"rgba(255, 255, 255, 0.25)"}/>
                    <Text style={globalStyles.pageSubtitle}>Password</Text>
                    <TextInput onChangeText={input => setPasswordInput(input)} secureTextEntry={true} style={style.textInput} selectionColor={"rgba(255, 255, 255, 0.25)"}/>
                    
                    <View style={{display: "flex", flexDirection: "row", paddingTop: 16}}>
                        <BouncyCheckbox
                            style={{flex: 1}}
                            fillColor={styleColors.primary}
                            iconStyle={{borderColor: styleColors.dark}}
                            innerIconStyle={{borderColor: styleColors.dark}}
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
                    

                    <Pressable 
                        style={[globalStyles.button, {marginHorizontal: "auto", width: "50%", height: "5%", marginTop: 64, backgroundColor: styleColors.dark, borderRadius: 16}]}
                        onPress={() => {
                            console.log(signup)
                            //connect to backend

                            axios.post('http://10.0.2.2:4000/check-user', 
                            {
                                username: usernameInput,
                                password: passwordInput
                            })
                            .then(function (response : object) {
                                console.log(response["data" as keyof boolean])
                                if(response["data" as keyof boolean]) {
                                    setAuth(usernameInput)
                                    console.log("authorized")

                                    if(stayCheck) {
                                        secureStoreSet("authUser", usernameInput)
                                        secureStoreSet("authPass", passwordInput)
                                    }
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