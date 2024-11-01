import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions } from "react-native"
import { useEffect, useState } from "react"
import globalStyles from "../globalStyles"

const index = () => {
    return (
        <SafeAreaView>
            <Text style={globalStyles.androidSafeView}>Home</Text>
            <FlatList
                data = {[
                    {id: "1", title: "test"}, 
                    {id: "2", title: "test2"},
                    {id: "3", title: "test3"},
                ]}
                keyExtractor={(item) => item.id}  
                renderItem={ ({item}) => (
                    <View>
                        <Text style={styles.listContainer}>{item.title}</Text>
                    </View>
                )}  
                horizontal={true}
                disableIntervalMomentum={true}
                snapToAlignment = "start"
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get("window").width}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: Dimensions.get("window").width,
        height: 500,
        backgroundColor: "gray",
        padding: 10,
        borderColor: "black",
        borderWidth: 5
    }
})

export default index