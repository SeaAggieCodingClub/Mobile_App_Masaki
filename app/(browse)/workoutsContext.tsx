import { createContext } from "react"

export type workoutType = {
    name: string,
    muscle: string[],
    description: string,
    equipment: string,
    difficulty: number,
    workoutType: [string],
}

export type workoutsType = {
    value: workoutType[]
}

export const WorkoutsContext = createContext<workoutsType>( {} as workoutsType)