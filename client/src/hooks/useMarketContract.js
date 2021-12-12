import { GetMarketContract } from "./useContracts"
import { useState } from "react"
import { useWeb3React } from "@web3-react/core"

import {fromEtherToWei} from './useWeb3'

export const useMarketContract = () => {
    const {account, chainId} = useWeb3React('metamask')
    
    const contract_network = GetMarketContract()
    const contract_metamask = GetMarketContract('metamask')

    const address = contract_network ? contract_network._address : null
    
    const [isCreatingSale, setIsCreatingSale] = useState(false)

    const [isBuying, setIsBuying] = useState(false)

    const singleSale = async (index, maxIndex) => {
        if (index > maxIndex) return
        const sale = await contract_network.methods.sales(index).call()
        return sale
    }

    const createSale = async (price , tokenId, nftAddress ) => {
        try{
            const _price = fromEtherToWei(price)
            setIsCreatingSale(true)
            const result = await contract_metamask.methods
                .createSale(_price, tokenId, nftAddress)
                .send({ from: account , chainId:chainId})
            setIsCreatingSale(false)
            return result
        }
        catch(err) {
            setIsCreatingSale(false)
        }
    }

    const buyItem = async (saleId, price) => {
        setIsBuying(true)
        try{
            const result = await contract_metamask.methods
                .buy(saleId)
                .send({ from: account, chainId: chainId, value: price })
            return result
        }
        catch(error){
            console.log(error)
            setIsBuying(false)
        }
        setIsBuying(false)
 
    }
    return {  singleSale  , createSale ,isCreatingSale, buyItem , isBuying , address }
}



