import { createContext, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "../(preAuth)/authContext";

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

export const useLoadSessions = () => {
    // const {value: auth, setValue: setAuth} = useAuthContext()
    // const {value: userSessions, setValue: setUserSessions} = useSessionContext()
    console.log("using ookk")
    const loadSessions = async (name: string): Promise<void> => {
        await axios.post("http://10.0.2.2:4000/api/workouts/retrieveData",
            {
                username: name
            })
            .then(response => {
                // setUserSessions(response.data.session)
                // setSessionsLoaded(true)
                console.log(response.data.session)
            }).catch((error) => {
                console.log("session error")
                console.log(error.response)
            }
        )
    }
    
    return {loadSessions}
}