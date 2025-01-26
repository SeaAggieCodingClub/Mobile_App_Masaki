import { createContext, useContext } from "react"

export type authType = {
    value: boolean
    setValue: (val:boolean) => void
}

export const AuthContext = createContext<authType>({
    value: false,
    setValue: () => {}
})

export const useAuthContext = () => useContext(AuthContext)