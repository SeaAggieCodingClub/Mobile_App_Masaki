import { useEffect, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, FlatList, Pressable } from "react-native"
import { Link, router, Stack } from "expo-router"
import globalStyles from "../globalStyles"


const dataSample= 
    [
        {
            "id": 1,
            "name": "Push-Up",
            "type": "strength",
            "muscle": "chest",
            "equipment": "bodyweight",
            "difficulty": "easy",
            "instructions": "Start in a high plank position. Lower your body until your chest is just above the floor, then push back up to the starting position."
        },
        {
            "id": 2,
            "name": "Pull-Up",
            "type": "strength",
            "muscle": "back",
            "equipment": "bar",
            "difficulty": "hard",
            "instructions": "Grab the pull-up bar with your palms facing away from you. Pull yourself up until your chin is above the bar, then slowly lower yourself back down."
        },
        {
            "id": 3,
            "name": "Squat",
            "type": "strength",
            "muscle": "legs",
            "equipment": "bodyweight",
            "difficulty": "medium",
            "instructions": "Stand with feet shoulder-width apart. Lower your hips down and back as if sitting in a chair, then return to the standing position."
        },
        {
            "id": 4,
            "name": "Bicep Curl",
            "type": "strength",
            "muscle": "biceps",
            "equipment": "dumbbell",
            "difficulty": "easy",
            "instructions": "Hold a dumbbell in each hand with your arms at your sides. Curl the weights while contracting your biceps, then slowly lower them back to the starting position."
        },
        {
            "id": 5,
            "name": "Plank",
            "type": "endurance",
            "muscle": "core",
            "equipment": "bodyweight",
            "difficulty": "medium",
            "instructions": "Hold a plank position with your elbows on the ground and body in a straight line from head to heels."
        },
        {
            "id": 6,
            "name": "Deadlift",
            "type": "strength",
            "muscle": "hamstrings",
            "equipment": "barbell",
            "difficulty": "hard",
            "instructions": "Stand with your feet shoulder-width apart, grip the bar, and lift it while keeping your back straight and driving through your heels."
        },
        {
            "id": 7,
            "name": "Lateral Raise",
            "type": "strength",
            "muscle": "shoulders",
            "equipment": "dumbbell",
            "difficulty": "medium",
            "instructions": "Hold a dumbbell in each hand by your sides. Raise your arms out to the sides until they're level with your shoulders, then slowly lower them."
        },
        {
            "id": 8,
            "name": "Lunges",
            "type": "strength",
            "muscle": "legs",
            "equipment": "bodyweight",
            "difficulty": "easy",
            "instructions": "Step forward with one leg and lower your hips until both knees are at 90-degree angles, then return to the starting position."
        }
    ]
    
interface itemProps {
    name: string,
    type: string,
    muscle: string,
    equipment: string,
    difficulty: string,
    instructions: string   
}

const browse = () => {
    const [data, setData] = useState(dataSample)

    return (
        <SafeAreaView style={globalStyles.androidSafeView}>
            <Text>browse</Text>
            <Text></Text>
            <FlatList data={data} keyExtractor={(item) => item.name} renderItem={({item}: {item: itemProps})=>(
                <View>
                    <Text style={itemText.text}>{item.name}</Text>
                    <Text style={itemText.text}>{item.type}</Text>
                    <Text style={itemText.text}>{item.muscle}</Text>
                    <Text style={itemText.text}>{item.equipment}</Text>
                    <Text style={itemText.text}>{item.difficulty}</Text>
                    <Link href={{pathname: "/(browse)/[id]", params: {id: item.name, name: item.name, type: item.type, muscle: item.muscle, equipment: item.equipment, difficulty: item.difficulty}}} style={itemText.text}>
                    Learn More
                    </Link>
                    <Text></Text>
                </View>
            )}  
            />
        </SafeAreaView>
    )

}

const itemText = StyleSheet.create({
    text: {
        color: "#ffffff",
        fontFamily: "Montserrat-Regular"
    }
})

export default browse