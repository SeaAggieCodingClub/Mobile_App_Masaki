import { View, Text, Image, StyleSheet, FlatList, Pressable, SafeAreaView, Appearance, useColorScheme } from "react-native"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "expo-router"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Icon from '@expo/vector-icons/MaterialIcons'

interface sessionsProps {
    name: string,
    day: Array<string>,
}

const sessions = () => {
    const sessions = [
        { "id": 1, "name": "test1", "day": ["M"] },
        { "id": 2, "name": "test2", "day": ["T"] },
        { "id": 3, "name": "test2", "day": ["Th"] },
        { "id": 4, "name": "test3", "day": ["T"] },
        { "id": 5, "name": "test3", "day": ["Th"] },
        { "id": 6, "name": "test4", "day": ["T"] },
        { "id": 7, "name": "test4", "day": ["Th"] },
        { "id": 8, "name": "test5", "day": ["W"] },
        { "id": 9, "name": "test6", "day": ["F"] },
        { "id": 10, "name": "test7", "day": ["M", "W"] }
      ]

    const router = useRouter()

    const createSessionRef = useRef<BottomSheet>(null)
    const createSessionSnapPoints = useMemo(()=> ['90%'], [])
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>, [])


    return (
        <GestureHandlerRootView>
        <SafeAreaView style={globalStyles.androidSafeView}>
            <View style={{display: "flex", flexDirection: "row"}}>
                <Text style={[globalStyles.pageTitle, {flex: 1}]}>Sessions</Text>
                <Pressable 
                    style={{aspectRatio: 1, 
                        flex:0, 
                        right: 16, 
                        marginTop: 20, 
                        marginBottom: 12, 
                        backgroundColor: styleColors.dark, 
                        borderRadius: 999,
                    }}
                    onPress={() => {
                        createSessionRef.current?.expand()
                    }}    
                >
                    <Icon
                        name="add"
                        color={styleColors.light}
                        size={24}
                        style={{margin: "auto"}}
                    />
                </Pressable>
            </View>

            <FlatList
                style={{paddingHorizontal: 16}}
                numColumns={2}
                contentContainerStyle={{gap: 8}}
                columnWrapperStyle={{gap: 8}}
                data={sessions}
                keyExtractor={(item) => item.name}
                renderItem={({item}: {item: sessionsProps})=>(
                    <Pressable 
                        style={globalStyles.sessionTile}
                        onPress={()=> {
                            router.push({pathname: "(session)/[sessionID]"})
                        }}
                    >
                        <Text style={{fontFamily: "Montserrat-Medium", color: styleColors.light}}>{item.name}</Text>
                        
                    </Pressable>
                )}
            />

            <BottomSheet
                ref={createSessionRef}
                index={-1}
                snapPoints={createSessionSnapPoints}
                enablePanDownToClose={true}
                handleIndicatorStyle={{backgroundColor: styleColors.light}}
                backgroundStyle={{backgroundColor: styleColors.dark}}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView>
                    <View style={{paddingHorizontal: 16}}>
                        <Text style={globalStyles.baseText}>Add</Text>
                    </View>
                    
                </BottomSheetView>
            </BottomSheet>

            {/* add session button */}
            

        </SafeAreaView>
        </GestureHandlerRootView>
    )  
}

export default sessions