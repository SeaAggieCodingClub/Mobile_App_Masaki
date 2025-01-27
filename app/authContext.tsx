import { createContext, useContext } from "react"

export type authType = {
    value: boolean | string
    setValue: (val:boolean | string) => void
}

export const AuthContext = createContext<authType>({
    value: false,
    setValue: () => {}
})

export const useAuthContext = () => useContext(AuthContext)