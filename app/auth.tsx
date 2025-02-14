import { SafeAreaView, Text, TextInput, View, StyleSheet, Pressable } from "react-native"
import globalStyles from "./globalStyles"
import styleColors from "./styleColors"
import { useContext, useState } from "react"
import { router, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useAuthContext, secureStoreGet, secureStoreSet } from "./authContext"

const axios = require('axios').default

const testUser = ["johndoe", "1"]

const auth = () => {
    const [usernameInput, setUsernameInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")

    const {setValue: setAuth} = useAuthContext()



    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <View style={{marginHorizontal: "auto", width: "80%", height: "100%"}}>
                <View style={{marginVertical: "auto"}}>
                    <Text style={globalStyles.pageSubtitle}>Username</Text>
                    <TextInput onChangeText={input => setUsernameInput(input)} style={style.textInput} selectionColor={"rgba(255, 255, 255, 0.25)"}/>
                    <Text style={globalStyles.pageSubtitle}>Password</Text>
                    <TextInput onChangeText={input => setPasswordInput(input)} secureTextEntry={true} style={style.textInput} selectionColor={"rgba(255, 255, 255, 0.25)"}/>
                    
                    <Pressable onPress={() => {
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
                            }
                        })
                        .catch(function (error : object) {
                            console.log("error")
                            console.log(error)
                        })

                        // if(usernameInput == testUser[0] && passwordInput == testUser[1]) {
                        //     setAuth(usernameInput)

                        //     secureStoreSet("authUser", usernameInput)
                        //     secureStoreSet("authPass", passwordInput)
                        // }

                    }} style={[globalStyles.button, {marginHorizontal: "auto", width: "40%", height: "10%", marginTop: 20}]}>
                        <Text style={[globalStyles.buttonText, {color: styleColors.light}]}>Login</Text>
                    </Pressable>
                    <View style={{paddingBottom: "70%"}}></View>
                </View>
                
                
            </View>
            
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