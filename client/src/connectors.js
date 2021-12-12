import { InjectedConnector } from '@web3-react/injected-connector'
import {NetworkConnector} from '@web3-react/network-connector'

//mumbai 80001
//local 1337

export const RPC_URLS = {
    local: process.env.REACT_APP_LOCAL_RPC,
    mumbai: process.env.REACT_APP_MUMBAI_RPC,
}
export const SUPPORTED_CHAINS = {
    local: 1337,
    mumbai: 80001
}

const injected = new InjectedConnector(
    {
        supportedChainIds: [parseInt(process.env.REACT_APP_DEFAULT_CHAIN_ID)]
    }
)


const network = new NetworkConnector({
    urls: {
        1337: RPC_URLS.local,
        80001: RPC_URLS.mumbai,
    },
    defaultChainId: parseInt(process.env.REACT_APP_DEFAULT_CHAIN_ID),
    
})

export {
    network,
    injected
}