import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions } from "react-native"
import { useEffect, useState } from "react"
import globalStyles from "../globalStyles"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"
import styleColors from "../styleColors"

const index = () => {
    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <View style={globalStyles.screenContainer}>
                <Text style={globalStyles.pageTitle}>Home</Text>
                <FlatList
                    style={{borderRadius: styles.listContainer.borderRadius}}
                    data = {[
                        {id: "1", title: "test"}, 
                        {id: "2", title: "test2"},
                        {id: "3", title: "test3"},
                    ]}
                    keyExtractor={(item) => item.id}  
                    renderItem={ ({item}) => (
                        <View  style={styles.listContainer}>
                            <Text style={styles.listText}>{item.title}</Text>
                        </View>
                    )}  
                    horizontal={true}
                    disableIntervalMomentum={true}
                    snapToAlignment = "start"
                    decelerationRate={"fast"}
                    snapToInterval={Dimensions.get("window").width - 2 * globalStyles.screenContainer.padding}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        marginRight: 10,
        width: Dimensions.get("window").width - 2 * globalStyles.screenContainer.padding - 10,
        height: 500,
        backgroundColor: styleColors.primary,
        borderColor:  styleColors.primary,
        padding: 10,
        borderWidth: 5,
        borderRadius: 10,
    },

    listText: {
        color: "#ffffff",
        fontFamily: "Montserrat-Medium",
    }
})

export default index