export type workoutObj = {
    workout: string,
    sets: number,
    reps: number,
    weights: string
}
export type sessionObj = {
    name: string,
    daysOfSession: string[],
    workoutObject: workoutObj[]
}

