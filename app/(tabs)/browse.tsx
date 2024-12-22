import { useEffect, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Appearance, useColorScheme, FlatList, Pressable } from "react-native"
import { Link, router, Stack } from "expo-router"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
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
        },
        {
            "id": 17,
            "name": "Leg Curl",
            "type": "strength",
            "muscle": "hamstrings",
            "equipment": "machine",
            "difficulty": "medium",
            "instructions": "Lie face down on the leg curl machine and curl your legs upwards, squeezing your hamstrings, then slowly lower the weight."
        },
        {
            "id": 18,
            "name": "Chin-Up",
            "type": "strength",
            "muscle": "biceps",
            "equipment": "bar",
            "difficulty": "hard",
            "instructions": "Grab the pull-up bar with your palms facing you. Pull yourself up until your chin is above the bar, then lower yourself slowly."
        },
        {
            "id": 19,
            "name": "Tricep Dips",
            "type": "strength",
            "muscle": "triceps",
            "equipment": "bench",
            "difficulty": "medium",
            "instructions": "Place your hands behind you on a bench, lower your body by bending your elbows, then push back up to the starting position."
        },
        {
            "id": 20,
            "name": "Side Plank",
            "type": "endurance",
            "muscle": "core",
            "equipment": "bodyweight",
            "difficulty": "medium",
            "instructions": "Lie on your side, lift your body with one arm while keeping your body straight, and hold the position."
        },
        {
            "id": 21,
            "name": "Kettlebell Swing",
            "type": "strength",
            "muscle": "full body",
            "equipment": "kettlebell",
            "difficulty": "medium",
            "instructions": "Stand with feet shoulder-width apart, swing a kettlebell between your legs and up to shoulder height, then lower it back down."
        },
        {
            "id": 22,
            "name": "Goblet Squat",
            "type": "strength",
            "muscle": "legs",
            "equipment": "kettlebell",
            "difficulty": "medium",
            "instructions": "Hold a kettlebell close to your chest and squat down, keeping your chest up and your knees tracking over your toes."
        },
        {
            "id": 23,
            "name": "Barbell Row",
            "type": "strength",
            "muscle": "back",
            "equipment": "barbell",
            "difficulty": "medium",
            "instructions": "Bend over at the waist, grip the barbell, and pull it towards your torso, squeezing your shoulder blades together."
        },
        {
            "id": 24,
            "name": "Jumping Jacks",
            "type": "endurance",
            "muscle": "full body",
            "equipment": "bodyweight",
            "difficulty": "easy",
            "instructions": "Jump while spreading your legs and raising your arms above your head, then return to the starting position."
        },
        {
            "id": 25,
            "name": "Leg Extension",
            "type": "strength",
            "muscle": "quadriceps",
            "equipment": "machine",
            "difficulty": "easy",
            "instructions": "Sit on the leg extension machine, place your feet under the pad, and extend your legs out, then lower them slowly."
        },
        {
            "id": 26,
            "name": "Face Pull",
            "type": "strength",
            "muscle": "shoulders",
            "equipment": "cable machine",
            "difficulty": "medium",
            "instructions": "Set the cable to face height, grip the rope, and pull it towards your face, squeezing your shoulder blades together."
        },
        {
            "id": 27,
            "name": "Jump Squat",
            "type": "endurance",
            "muscle": "legs",
            "equipment": "bodyweight",
            "difficulty": "medium",
            "instructions": "Perform a regular squat, then jump explosively as you reach the standing position."
        },
        {
            "id": 28,
            "name": "Hip Thrust",
            "type": "strength",
            "muscle": "glutes",
            "equipment": "barbell",
            "difficulty": "hard",
            "instructions": "Sit on the floor with a barbell over your hips, bend your knees, and thrust your hips upwards, squeezing your glutes."
        },
        {
            "id": 29,
            "name": "Hammer Curl",
            "type": "strength",
            "muscle": "biceps",
            "equipment": "dumbbell",
            "difficulty": "medium",
            "instructions": "Hold a dumbbell in each hand with palms facing inwards, curl the weights up while keeping your elbows stationary."
        },
        {
            "id": 30,
            "name": "Pistol Squat",
            "type": "strength",
            "muscle": "legs",
            "equipment": "bodyweight",
            "difficulty": "hard",
            "instructions": "Stand on one leg, lower your body into a squat while extending the other leg out in front, then return to standing."
        },
        {
            "id": 31,
            "name": "T-Bar Row",
            "type": "strength",
            "muscle": "back",
            "equipment": "T-bar machine",
            "difficulty": "medium",
            "instructions": "Stand over the T-bar, grip the handles, and row the weight towards your chest while keeping your back flat."
        },
        {
            "id": 32,
            "name": "Lunge Jumps",
            "type": "endurance",
            "muscle": "legs",
            "equipment": "bodyweight",
            "difficulty": "medium",
            "instructions": "Perform a regular lunge, but jump explosively to switch legs in mid-air."
        },
        {
            "id": 33,
            "name": "Chest Fly",
            "type": "strength",
            "muscle": "chest",
            "equipment": "dumbbells",
            "difficulty": "medium",
            "instructions": "Lie on a bench, hold a dumbbell in each hand, and extend your arms out to the sides, then bring them back together."
        },
        {
            "id": 34,
            "name": "Seated Calf Raise",
            "type": "strength",
            "muscle": "calves",
            "equipment": "machine",
            "difficulty": "easy",
            "instructions": "Sit on a calf raise machine, place your feet on the platform, and raise your heels as high as possible, then lower them slowly."
        },
        {
            "id": 35,
            "name": "Renegade Row",
            "type": "strength",
            "muscle": "back",
            "equipment": "dumbbells",
            "difficulty": "medium",
            "instructions": "Start in a plank position with a dumbbell in each hand. Row one dumbbell towards your torso while maintaining the plank position."
        },
        {
            "id": 36,
            "name": "Glute Bridge",
            "type": "strength",
            "muscle": "glutes",
            "equipment": "bodyweight",
            "difficulty": "easy",
            "instructions": "Lie on your back with knees bent, feet flat on the floor, and lift your hips towards the ceiling by contracting your glutes."
        },
        {
            "id": 37,
            "name": "Box Jump",
            "type": "endurance",
            "muscle": "legs",
            "equipment": "box",
            "difficulty": "medium",
            "instructions": "Stand in front of a box, bend your knees, and jump onto the box, landing softly with your knees slightly bent."
        },
        {
            "id": 38,
            "name": "Inverted Row",
            "type": "strength",
            "muscle": "back",
            "equipment": "barbell",
            "difficulty": "medium",
            "instructions": "Set a barbell on a squat rack, lie underneath it, and pull your chest towards the bar while keeping your body straight."
        },
        {
            "id": 39,
            "name": "Wall Sit",
            "type": "endurance",
            "muscle": "legs",
            "equipment": "bodyweight",
            "difficulty": "medium",
            "instructions": "Lean your back against a wall, lower into a squat position, and hold for as long as you can."
        },
        {
            "id": 40,
            "name": "Cable Tricep Pushdown",
            "type": "strength",
            "muscle": "triceps",
            "equipment": "cable machine",
            "difficulty": "medium",
            "instructions": "Stand in front of a cable machine, grip the rope, and push the rope down to extend your arms fully, then return slowly."
        },
        {
            "id": 41,
            "name": "Cable Bicep Curl",
            "type": "strength",
            "muscle": "biceps",
            "equipment": "cable machine",
            "difficulty": "medium",
            "instructions": "Stand in front of a cable machine, grip the bar, and curl the cable towards your shoulders, then lower it slowly."
        },
        {
            "id": 42,
            "name": "Hip Abduction",
            "type": "strength",
            "muscle": "glutes",
            "equipment": "machine",
            "difficulty": "easy",
            "instructions": "Sit on a hip abduction machine, place your legs against the pads, and push your legs outward, then return slowly."
        },
        {
            "id": 43,
            "name": "Wide Grip Pull-Up",
            "type": "strength",
            "muscle": "back",
            "equipment": "bar",
            "difficulty": "hard",
            "instructions": "Grab the pull-up bar with a wide grip and pull your chin above the bar, then slowly lower yourself back down."
        },
        {
            "id": 44,
            "name": "Frog Jump",
            "type": "endurance",
            "muscle": "full body",
            "equipment": "bodyweight",
            "difficulty": "medium",
            "instructions": "Squat down, jump forward explosively while bringing your knees towards your chest, and land softly."
        },
        {
            "id": 45,
            "name": "Cable Chest Fly",
            "type": "strength",
            "muscle": "chest",
            "equipment": "cable machine",
            "difficulty": "medium",
            "instructions": "Stand in front of a cable machine, hold the handles, and bring them together in front of your chest, squeezing your chest muscles."
        },
        {
            "id": 46,
            "name": "Single-Leg Deadlift",
            "type": "strength",
            "muscle": "hamstrings",
            "equipment": "dumbbell",
            "difficulty": "medium",
            "instructions": "Stand on one leg, hold a dumbbell in the opposite hand, and bend forward at the hips while extending the free leg behind you."
        },
        {
            "id": 47,
            "name": "Russian Deadlift",
            "type": "strength",
            "muscle": "hamstrings",
            "equipment": "barbell",
            "difficulty": "medium",
            "instructions": "Hold a barbell in front of your thighs, hinge at the hips, lower the bar to your shins, and return to standing."
        },
        {
            "id": 48,
            "name": "Barbell Curl",
            "type": "strength",
            "muscle": "biceps",
            "equipment": "barbell",
            "difficulty": "medium",
            "instructions": "Grip the barbell with palms facing up, curl the bar towards your chest, then lower it slowly."
        },
        {
            "id": 49,
            "name": "Clamshell",
            "type": "strength",
            "muscle": "glutes",
            "equipment": "bodyweight",
            "difficulty": "easy",
            "instructions": "Lie on your side with knees bent, and lift your top knee while keeping your feet together, then lower it back."
        },
        {
            "id": 50,
            "name": "Boxing",
            "type": "endurance",
            "muscle": "full body",
            "equipment": "boxing gloves",
            "difficulty": "hard",
            "instructions": "Throw punches in the air or on a heavy bag to increase cardiovascular endurance and strength."
        }
    ]
    
const typeFilters = [
    {type: "All"},
    {type: "Endurance"},
    {type: "Strength"}
]

const muscleFilters = [
    {muscle: "All"},
    {muscle: "Biceps"},
    {muscle: "Back"},
    {muscle: "Calves"},
    {muscle: "Chest"},
    {muscle: "Core"},
    {muscle: "Full Body"},
    {muscle: "Glutes"},
    {muscle: "Hamstrings"},
    {muscle: "Legs"},
    {muscle: "Quadriceps"},
    {muscle: "Shoulders"},
    {muscle: "Triceps"}

]


interface itemProps {
    name: string,
    type: string,
    muscle: string,
    equipment: string,
    difficulty: string,
    instructions: string   
}


let typeItem = "All"
let muscleItem = "All"

const browse = () => {
    const [filter, setFilter] = useState(dataSample)

const changeFilters = () => {
    let filteredData = dataSample
    console.log(typeItem, muscleItem, muscleItem.length)

    if(typeItem != "All") {
        filteredData = filteredData.filter(function(value){
            return value.type == typeItem.toLowerCase()
        })
    }

    if(muscleItem != "All") {
        filteredData = filteredData.filter(function(value){
            return value.muscle == muscleItem.toLowerCase()
        })
    }
    setFilter(filteredData)
}

    return (
        <SafeAreaView style={[globalStyles.androidSafeView]}>
                <Text style={[globalStyles.pageTitle, {paddingLeft: 16, paddingRight: 16, paddingTop: 16}]}>Browse</Text>

                <View style={{display: "flex", flexDirection: "row"}}>
                    <Dropdown
                        style={{marginHorizontal: 16, flex: 1, height: 50}}
                        containerStyle={{backgroundColor: styleColors.darkest, borderRadius: 5}}
                        itemContainerStyle={{backgroundColor: styleColors.dark, borderRadius: 5}}
                        itemTextStyle={{color: styleColors.light, fontFamily: "Montserrat-Regular"}}
                        selectedTextStyle={{color: styleColors.light, fontFamily: "Montserrat-Regular"}}
                        data={typeFilters}
                        value={typeFilters[0]}
                        activeColor={styleColors.darkest}
                        placeholder="Type"
                        labelField="type"
                        valueField="type"
                        onChange={item=>{
                            typeItem = item.type
                            changeFilters()
                        }}
                    />
 
                    <Dropdown
                        style={{marginHorizontal: 16, flex: 1}}
                        containerStyle={{backgroundColor: styleColors.darkest, borderRadius: 5}}
                        itemContainerStyle={{backgroundColor: styleColors.dark, borderRadius: 5}}
                        itemTextStyle={{color: styleColors.light, fontFamily: "Montserrat-Regular"}}
                        selectedTextStyle={{color: styleColors.light, fontFamily: "Montserrat-Regular"}}
                        data={muscleFilters}
                        value={muscleFilters[0]}
                        activeColor={styleColors.darkest}
                        placeholder="Muscle"
                        labelField="muscle"
                        valueField="muscle"
                        onChange={item=>{
                            muscleItem = item.muscle
                            changeFilters()
                        }}
                    />
                </View>
                <FlatList 
                    // ListHeaderComponent={<View style={{backgroundColor: styleColors.darkest}}><Text style={globalStyles.pageTitle}>Browse</Text></View>}
                    // stickyHeaderIndices={[0]}
                    style={{padding: 16, paddingTop: 0,}}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={filter} 
                    keyExtractor={(item) => item.name} 
                    renderItem={({item}: {item: itemProps})=>(
                        <Pressable style={globalStyles.tile} onPress={() => {router.push({pathname: "/(browse)/[workouts]", params: {id: item.name, name: item.name, type: item.type, muscle: item.muscle, equipment: item.equipment, difficulty: item.difficulty, instructions: item.instructions}})}}>
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