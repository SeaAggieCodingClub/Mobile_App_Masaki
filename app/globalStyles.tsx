import { StyleSheet, Platform, StatusBar, } from "react-native"
import styleColors from "./styleColors"

export default StyleSheet.create({

    androidSafeView: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
        backgroundColor: styleColors.darkest,
    },

    screenContainer: {
        padding : 16,
        backgroundColor: "#141419" 
    },

    screenHeader: {
        backgroundColor: "#141419",
        color: "#FFFFFF"
    },

    pageTitle: {
        fontSize: 40,
        fontFamily:"Montserrat-Bold",
        color: "#ffffff"
    }


})


