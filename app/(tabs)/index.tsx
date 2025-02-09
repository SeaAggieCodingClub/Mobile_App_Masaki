import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions } from "react-native"
import { useCallback, useEffect, useState } from "react"
import globalStyles from "../globalStyles"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"
import styleColors from "../styleColors"
import { useFocusEffect } from "expo-router"

const DOTW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const index = () => {

    const [date, setDate] = useState<String>()

    useFocusEffect(
        useCallback(() => {
            setDate(DOTW[new Date().getDay()])
        }, [])
    )

    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
                <Text style={globalStyles.pageTitle}>Home</Text>
                <FlatList
                    style={{borderRadius: styles.listContainer.borderRadius, marginLeft: 16, marginRight: 16}}
                    data = {[
                        {id: "1", title: date}, 
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
                    decelerationRate={"fast"}
                    snapToAlignment={"start"}
                    snapToInterval={styles.listContainer.width + 20}
                    //snapToInterval={Dimensions.get("window").width - 2 * globalStyles.screenContainer.paddingLeft}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{columnGap: 20}}
                    
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: Dimensions.get("window").width - 2 * globalStyles.screenContainer.paddingLeft,
        height: 500,
        backgroundColor: styleColors.dark,
        padding: 10,
        borderRadius: 10,
    },

    listText: {
        color: "#ffffff",
        fontFamily: "Montserrat-Medium",
    }
})

export default index