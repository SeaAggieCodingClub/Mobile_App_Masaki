import { createContext, useContext } from "react"
import * as SecureStore from "expo-secure-store"

export type authType = {
    value: boolean | string
    setValue: (val:boolean | string) => void
}

export const AuthContext = createContext<authType>({
    value: false,
    setValue: () => {}
})

export const useAuthContext = () => useContext(AuthContext)

export const secureStoreSet = async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value)
    console.log("saved")
}

export const secureStoreGet = async (key: string): Promise<string | null> => {
    let result = await SecureStore.getItemAsync(key)
    console.log(result)
    return result
}