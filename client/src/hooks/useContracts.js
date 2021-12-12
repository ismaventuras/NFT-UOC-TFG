

import { useWeb3React } from "@web3-react/core"

import MarketJSON from '../contracts/Market.json'
import NFTContract from '../contracts/SimpleNFT.json'

export const GetMarketContract = (provider) => {
    const {active,library, chainId} = useWeb3React(provider)
    if (active) return new library.eth.Contract(MarketJSON.abi,MarketJSON.networks[chainId].address)
}

export const GetNftContract = (provider) => {
    const {active, library, chainId} = useWeb3React(provider)
    if (active) return new library.eth.Contract(NFTContract.abi,NFTContract.networks[chainId].address)
}
