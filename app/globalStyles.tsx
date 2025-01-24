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
        flexDirection: "row",
        backgroundColor: styleColors.dark,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: (Dimensions.get("window").width - 32 ) - 5,
        height: ((Dimensions.get("window").width - 32 )/ 2 - 10 ) * (1/3),
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 5,
    },

    pageTitle: {
        fontSize: 36,
        fontFamily:"Montserrat-Bold",
        color: "#ffffff",
        padding: 16,
        paddingTop: 20,
        paddingBottom: 5,

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
    },

    baseText: {
        fontFamily: "Montserrat-Regular",
        color: "#FFFFFF",
        fontSize: 18
    },

})


