import { StyleSheet, Platform, StatusBar, Dimensions, } from "react-native"
import styleColors from "./styleColors"

export default StyleSheet.create({

    androidSafeView: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
        backgroundColor: styleColors.darkest,
    },

    screenContainer: {
        padding : 16,
        backgroundColor: styleColors.darkest,
        flex: 1,
    },

    tile: {
        backgroundColor: styleColors.primary,
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 20,
        width: (Dimensions.get("window").width - 32 )/ 2 - 5,
        height: ((Dimensions.get("window").width - 32 )/ 2 - 10 ) * (2/3),
    },

    screenHeader: {
        backgroundColor: "#141419",
        color: "#FFFFFF"
    },

    pageTitle: {
        fontSize: 40,
        fontFamily:"Montserrat-Bold",
        color: "#ffffff",
        paddingBottom: 5,
    }

})


