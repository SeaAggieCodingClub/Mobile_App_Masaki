import { useEffect, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, FlatList, Pressable } from "react-native"
import { Link, router, Stack } from "expo-router"
import globalStyles from "../globalStyles"
import styleColors from "../styleColors"

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
        },
        {
            "id": 9,
            "name": "Bench Press",
            "type": "strength",
            "muscle": "chest",
            "equipment": "barbell",
            "difficulty": "medium",
            "instructions": "Lie back on a bench with feet flat on the floor. Grip the barbell and lower it to your chest, then push it back up to full arm extension."
        },
        {
            "id": 10,
            "name": "Russian Twist",
            "type": "endurance",
            "muscle": "core",
            "equipment": "bodyweight",
            "difficulty": "medium",
            "instructions": "Sit on the floor with your legs bent, lean back slightly, and rotate your torso to each side while holding your hands together."
        },
        {
            "id": 11,
            "name": "Mountain Climbers",
            "type": "endurance",
            "muscle": "full body",
            "equipment": "bodyweight",
            "difficulty": "easy",
            "instructions": "Start in a high plank position, then alternate bringing each knee towards your chest in a running motion."
        },
        {
            "id": 12,
            "name": "Burpees",
            "type": "endurance",
            "muscle": "full body",
            "equipment": "bodyweight",
            "difficulty": "hard",
            "instructions": "Start standing, squat down, kick your feet back into a plank, do a push-up, then jump back up to the starting position."
        },
        {
            "id": 13,
            "name": "Leg Press",
            "type": "strength",
            "muscle": "legs",
            "equipment": "machine",
            "difficulty": "medium",
            "instructions": "Sit on a leg press machine, place feet on the platform, and press the weight away by extending your legs, then return to starting position."
        },
        {
            "id": 14,
            "name": "Seated Row",
            "type": "strength",
            "muscle": "back",
            "equipment": "cable machine",
            "difficulty": "medium",
            "instructions": "Sit at a row machine with feet on the platform, pull the handle towards you while keeping your back straight, then return to starting position."
        },
        {
            "id": 15,
            "name": "Crunches",
            "type": "endurance",
            "muscle": "core",
            "equipment": "bodyweight",
            "difficulty": "easy",
            "instructions": "Lie on your back with knees bent, lift your shoulders off the ground, and contract your abs, then lower back down."
        },
        {
            "id": 16,
            "name": "Overhead Press",
            "type": "strength",
            "muscle": "shoulders",
            "equipment": "barbell",
            "difficulty": "medium",
            "instructions": "Stand with feet shoulder-width apart, grip the barbell at shoulder height, and press it overhead until your arms are fully extended."
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
        <SafeAreaView style={[globalStyles.androidSafeView]}>
                <Text style={[globalStyles.pageTitle, {paddingLeft: 16, paddingRight: 16, paddingTop: 16}]}>Browse</Text>
                <FlatList 
                    // ListHeaderComponent={<View style={{backgroundColor: styleColors.darkest}}><Text style={globalStyles.pageTitle}>Browse</Text></View>}
                    // stickyHeaderIndices={[0]}
                    style={{padding: 16, paddingTop: 0,}}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={data} 
                    keyExtractor={(item) => item.name} 
                    renderItem={({item}: {item: itemProps})=>(
                        <Pressable style={globalStyles.tile} onPress={() => {router.push({pathname: "/(browse)/[id]", params: {id: item.name, name: item.name, type: item.type, muscle: item.muscle, equipment: item.equipment, difficulty: item.difficulty, instructions: item.instructions}})}}>
                            <Text style={[itemText.text]}>{item.name}</Text>
                        </Pressable>
                    )}  
                />
        </SafeAreaView>
    )

}

const itemText = StyleSheet.create({
    text: {
        color: "#ffffff",
        fontFamily: "Montserrat-Regular",
        fontSize: 18,
    }
})

export default browse