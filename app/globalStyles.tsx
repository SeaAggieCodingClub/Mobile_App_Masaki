import { StyleSheet, Platform, StatusBar, Dimensions, } from "react-native"
import styleColors from "./styleColors"

export default StyleSheet.create({

    androidSafeView: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
        backgroundColor: styleColors.darkest,
    },

    screenContainer: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 16,
        backgroundColor: styleColors.darkest,
        flex: 1,
    },

    tabs: {
        backgroundColor: styleColors.dark,
        borderTopWidth: 0.5,
        borderColor: styleColors.light,
    },

    shadow: {
        shadowColor: "#000000",
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 5,
    },

    tile: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        backgroundColor: styleColors.dark,
        borderRadius: 5,
        aspectRatio: 8,
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 5,
    },

    sessionTile: {
        display: "flex",
        flex: 1,
        backgroundColor: styleColors.dark,
        borderRadius: 10,
        padding: 10,
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 5,
        aspectRatio: 1.2,
    },

    pageTitle: {
        fontSize: 36,
        fontFamily:"Montserrat-Bold",
        color: "#ffffff",
        padding: 16,
        paddingTop: 20,
        paddingBottom: 4,

    },

    pageSubtitle: {
        fontSize: 18,
        fontFamily: "Montserrat-Bold",
        color: styleColors.light,
        paddingTop: 20,
        paddingBottom: 4,
    },

    button: {
        
        backgroundColor: styleColors.dark,
    },

    buttonText: {
        fontSize: 18,
        fontFamily: "Montserrat-Medium",
        margin: "auto"
    },

    baseText: {
        fontFamily: "Montserrat-Regular",
        color: "#FFFFFF",
        fontSize: 18
    },

    dropdown: {
        backgroundColor: styleColors.dark
    },

    textInput: {
        backgroundColor: styleColors.dark,
        padding: 8,
        height: 50,
        fontFamily: "Montserrat-Medium",
        color: styleColors.light,
        fontSize: 24,
    }

})


