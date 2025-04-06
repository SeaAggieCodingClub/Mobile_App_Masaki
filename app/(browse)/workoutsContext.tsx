import { createContext } from "react"

export type workoutInterface = {
    name: string,
    muscle: string[],
    description: string,
    equipment: string,
    difficulty: number,
    workoutType: [string],
}

export type workoutsType = {
    value: workoutInterface[]
}

export const WorkoutsContext = createContext<workoutsType>( {} as workoutsType)