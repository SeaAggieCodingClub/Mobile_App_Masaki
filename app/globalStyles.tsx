import { StyleSheet, Platform, StatusBar, } from "react-native"

export default StyleSheet.create({
        androidSafeView: {
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
            backgroundColor: "#08080c"
        },
        screenContainer: {
            padding : 16,
            backgroundColor: "#08080c"
        },
        pageTitle: {
            fontSize: 40,
            fontFamily:"Montserrat-Bold",
            color: "#ffffff"
        }
    })


