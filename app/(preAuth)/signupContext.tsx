import { createContext, useContext } from "react"

export type signupType = {
    value: boolean
    setValue: (val:boolean) => void
}

export const SignupContext = createContext<signupType>({
    value: false,
    setValue: () => {}
})

export const useSignupContext = () => useContext(SignupContext)