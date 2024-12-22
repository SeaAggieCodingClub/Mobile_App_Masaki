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
        borderTopWidth: 0,
    },

    shadow: {
        shadowColor: "#000000",
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 5,
    },

    tile: {
        backgroundColor: styleColors.dark,
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: (Dimensions.get("window").width - 32 )/ 2 - 5,
        height: ((Dimensions.get("window").width - 32 )/ 2 - 10 ) * (2/3),
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 5,
    },

    screenHeader: {
        backgroundColor: "#141419",
        color: "#FFFFFF"
    },

    pageTitle: {
        fontSize: 40,
        fontFamily:"Montserrat-Bold",
        color: "#ffffff",
        padding: 16,
        paddingBottom: 5,

    },

    baseText: {
        fontFamily: "Montserrat-Regular",
        color: "#FFFFFF",
        fontSize: 18
    },

})


