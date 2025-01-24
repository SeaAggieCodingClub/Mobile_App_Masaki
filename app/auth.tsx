import { SafeAreaView, Text, TextInput, View, StyleSheet, Pressable } from "react-native"
import globalStyles from "./globalStyles"
import styleColors from "./styleColors"
import { useState } from "react"
import { router, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

const testUser = ["user1", "pass1"]




const auth = () => {
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <View style={{marginHorizontal: "auto", width: "80%", height: "100%"}}>
                <View style={{marginVertical: "auto"}}>
                    <Text style={globalStyles.pageSubtitle}>Username</Text>
                    <TextInput onChangeText={input => setUsernameInput(input)} style={style.textInput} selectionColor={"rgba(255, 255, 255, 0.25)"}/>
                    <Text style={globalStyles.pageSubtitle}>Password</Text>
                    <TextInput secureTextEntry={true} style={style.textInput} selectionColor={"rgba(255, 255, 255, 0.25)"}/>
                    <Pressable onPress={() => {
                        console.log("login pressed")
                        //connect to backend
                        if(usernameInput == testUser[0] && passwordInput == testUser[1]) {
                            
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