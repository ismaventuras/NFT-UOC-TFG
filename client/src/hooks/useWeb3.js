import { useWeb3React } from "@web3-react/core"
import Web3 from "web3";

export const getWeb3NoAccount = () => {
    const httpProvider = new Web3.providers.HttpProvider(process.env.REACT_APP_LOCAL_RPC)
    const web3NoAccount = new Web3(httpProvider)
  
    return web3NoAccount
}


export const FromWeiToEther = (veryLargeNumber) => {
    const {library} = useWeb3React()

    if (veryLargeNumber <= 0) return null
    return library.utils.fromWei(veryLargeNumber,'ether')
}

export const fromEtherToWei = (number) => {
    const w3 = getWeb3NoAccount()

    if (number <= 0) return null
    return w3.utils.toWei(number,'ether')
}

export const switchNetwork = async (chainId , rpcUrls , active) => {
    if(window.ethereum && !active){
        let params = []
        switch(chainId){
            case 80001:
                params = [{
                    chainId:`0x${chainId.toString(16)}`,
                    chainName: "Mumbai",
                    nativeCurrency: {
                        name:"MATIC Token",
                        symbol:"MATIC",
                        decimals:18
                    },
                    rpcUrls: [].concat(rpcUrls),
                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]

                }]
                break
            case 1337:
                params = [{
                    chainId:`0x${chainId.toString(16)}`,
                    chainName: "Ganache",
                    nativeCurrency: {
                        name:"TEST Ether",
                        symbol:"TEST Ether",
                        decimals:18
                    },
                    rpcUrls: [].concat(rpcUrls),
                    blockExplorerUrls: [""]
                }]
                break
            default:
        }

        await window.ethereum.request({
            method:"wallet_addEthereumChain",
            params:params
        })
    }
}