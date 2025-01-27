import { SafeAreaView, Text, TextInput, View, StyleSheet, Pressable } from "react-native"
import globalStyles from "./globalStyles"
import styleColors from "./styleColors"
import { useContext, useState } from "react"
import { router, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useAuthContext } from "./authContext"
import * as SecureStore from "expo-secure-store"

const testUser = ["1", "2"]

const checkIfExist = async (key: string, value: string): Promise<string | null> => {
    let result = await SecureStore.getItemAsync(key)
    if(result == null) {
        console.log("it didnt exist")
    } else {
        console.log("it existed")
    }
    return(result)
}

const secureStoreSet = async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value)
    console.log("saved")
}

const secureStoreGet = async (key: string): Promise<string | null> => {
    let result = await SecureStore.getItemAsync(key)
    return result
}

const auth = () => {
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

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
                        console.log("login pressed")
                        //connect to backend
                        if(usernameInput == testUser[0] && passwordInput == testUser[1]) {
                            setAuth(usernameInput)
                            checkIfExist(usernameInput, passwordInput)
                        }

                    }} style={[globalStyles.button, {marginHorizontal: "auto", width: "40%", height: "10%", marginTop: 20}]}>
                        <Text style={[globalStyles.buttonText, {color: styleColors.light, textAlign: "center"}]}>Login</Text>
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