import { createContext, useContext } from "react";

export type workoutObj = {
    workout: string,
    sets: number,
    reps: number,
    weights: string
}
export type sessionObj = {
    name: string,
    daysOfSession: string[],
    sessionWorkouts: workoutObj[]
}

export type userSessions = {
    value: sessionObj[],
    setValue: (val:sessionObj[]) => void
}

export const SessionContext = createContext<userSessions>({
    value: [],
    setValue: () => {}
})

export const useSessionContext = () => useContext(SessionContext)