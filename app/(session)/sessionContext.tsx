import { createContext, useContext } from "react";

export type workoutObj = {
    workout: string,
    sets: number,
    reps: number,
    weights: string
    _id: string
}
export type sessionObj = {
    name: string,
    daysOfSession: string[],
    workoutObject: workoutObj[],
    _id: string
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