import { useWeb3React } from '@web3-react/core'
import React, { useContext, useEffect, useState } from 'react'
import { network } from '../../connectors'
import { LoadingApp } from './Loading'
import { useEagerConnect } from "../../hooks/useEagerConnect";
import { useInactiveListener } from "../../hooks/useInactiveListener"
import { ConnectionContext } from '../../context/ConnectionContext';


export const ConnectedToRPC = ({children , RPC}) => {

    const context = useWeb3React()
    const {connected, setConnected} = useContext(ConnectionContext)
    const [err, setErr] = useState('')

    // check if node is up
    useEffect(()=> {
        let isSubscribed = true
        const check = async () => {
            try{
                await fetch(RPC)
                if (isSubscribed){
                    context.activate(network)
                    setConnected(true)
                }
            }
            catch(error){
                setErr(error.message)
            }
        }
        check()
        const interval = setInterval(check,20000)
        return ()=> {
            isSubscribed = false
            clearInterval(interval)
        }
    },[])

    // // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()
    useInactiveListener(!triedEager)

    return(
        <>
            {connected 
                ?
                children
                : <LoadingApp err={err}/>
            }
        </>
    )
}

export const NotConnectedMetamask = ({ children }) => {
    const contextMetamask = useWeb3React('metamask')

    const [connected, setConnected] = useState(false);

    useEffect(() => {

        if (contextMetamask.active) {
            setConnected(true);
        }

        return () => {
            setConnected(false)
        }
    }, [contextMetamask])

    return (
        <>
            {!connected 
            ?  
                    <h2 className="my-4 text-center p-5">Please connect your wallet </h2>
            : children}
        </>
    )
}

