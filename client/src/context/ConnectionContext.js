import { createContext, useState } from "react";

export const ConnectionContext = createContext()

const ConnectionProvider = ({ children }) => {

    const [connected, setConnected] = useState(false)

    const data = {
        connected, setConnected
    }


    return (
        <ConnectionContext.Provider value={data}>
            {children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionProvider