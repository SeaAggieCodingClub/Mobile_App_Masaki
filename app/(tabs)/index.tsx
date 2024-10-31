import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, FlatList } from "react-native"
import { useEffect, useState } from "react"

const index = () => {

    return (
        <SafeAreaView>
            <Text>Home</Text>
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
                snapToAlignment = "start"
                decelerationRate={"fast"}
                snapToInterval={500}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: 500,
        height: 500,
        backgroundColor: "gray",
        padding: 10,
        borderColor: "black",
        borderWidth: 5
    }
})

export default index