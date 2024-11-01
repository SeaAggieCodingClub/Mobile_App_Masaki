import { StyleSheet, Platform, StatusBar, } from "react-native"

export default StyleSheet.create({
        androidSafeView: {
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
        },
        pageTitle: {
            fontSize: 40,
            fontFamily:"Montserrat-Bold"
        }
    })


