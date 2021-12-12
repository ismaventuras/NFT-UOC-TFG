
import { useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import { ConnectionContext } from "../context/ConnectionContext"
import { init } from "../reducers/marketReducer"
import useMarketService from "../services/marketService"


export const Loader = ({children}) => {
    const {getAll , market_contract} = useMarketService()
    const dispatch = useDispatch()
    const {connected} = useContext(ConnectionContext)

    useEffect(()=>{

        if(connected && market_contract){
            getAll()
                .then(items => dispatch(init(items)))
                .catch(err => console.log(err))
        }

        const interval = setInterval(()=>{
            getAll()
                .then(items => dispatch(init(items)))
                .catch(err => console.log(err))
            console.log('fetching. . .')
        },20000)
        return ()=> clearInterval(interval)

    },[dispatch, getAll, connected, market_contract])

    return (
        <>
            {children}
        </>
    )
}